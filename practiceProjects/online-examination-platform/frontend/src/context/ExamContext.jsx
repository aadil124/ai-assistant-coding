import React, { createContext, useState, useEffect } from 'react';
import * as dbCache from 'idb-keyval';

export const ExamContext = createContext();

const MOCK_QUESTIONS = [
  {
    id: 'q_mcq_1',
    type: 'mcq',
    section: 'System Design',
    body: 'When designing a highly available distributed cache, which strategy most effectively minimizes \"thundering herd\" problems during a cache node failure?',
    options: [
      { id: 'opt_a', text: 'Consistent Hashing with Virtual Nodes', subtext: 'Redistributing the keyspace across healthy nodes using a hash ring.' },
      { id: 'opt_b', text: 'Probabilistic Early Recomputation (PER)', subtext: 'Refreshing the cache based on a random variable before the actual TTL expiration.' },
      { id: 'opt_c', text: 'Write-Through Cache Invalidation', subtext: 'Updating the underlying data store and cache synchronously on every write operation.' },
      { id: 'opt_d', text: 'Exponential Backoff with Jitter', subtext: 'Delaying client-side retries by increasing intervals with added randomness.' }
    ],
    weight: 5
  },
  {
    id: 'q_essay_2',
    type: 'essay',
    section: 'Software Engineering',
    body: 'Describe the core concepts of cellular respiration, detailing glycolysis, the Krebs cycle, and electron transport chains.',
    weight: 15
  },
  {
    id: 'q_mcq_3',
    type: 'mcq',
    section: 'Network Security',
    body: 'Which cryptographic algorithm is recommended for signing metadata inside verifiable digital PDF credentials?',
    options: [
      { id: 'opt_rsa', text: 'RSA-2048 with SHA-256', subtext: 'Standard asymmetric encryption signature.' },
      { id: 'opt_md5', text: 'MD5 with RSA-1024', subtext: 'Older legacy hash algorithm (deprecating).' }
    ],
    weight: 5
  }
];

export const ExamProvider = ({ children }) => {
  // Authentication State
  const [user, setUser] = useState(() => {
    const cached = localStorage.getItem('se_user');
    return cached ? JSON.parse(cached) : null;
  });

  // Active Candidate Exam State
  const [activeSession, setActiveSession] = useState(null);
  const [answers, setAnswers] = useState({});
  const [fullscreenExits, setFullscreenExits] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [networkStatus, setNetworkStatus] = useState('online');

  // Proctor Console Live State
  const [proctorCandidates, setProctorCandidates] = useState([
    {
      session_id: 'sess_sarah_101',
      candidate_name: 'Sarah Jenkins',
      candidate_id: '4429-XJ',
      exam_title: 'Advanced Systems Architecture',
      status: 'active',
      suspicion_score: 12,
      anomalies: [],
      chats: []
    },
    {
      session_id: 'sess_michael_102',
      candidate_name: 'Michael Chen',
      candidate_id: '8812-LQ',
      exam_title: 'Advanced Systems Architecture',
      status: 'active',
      suspicion_score: 5,
      anomalies: [],
      chats: []
    }
  ]);

  // Certifications verification registry
  const [certificates, setCertificates] = useState([
    {
      id: 'cert_772a-99cd3',
      session_id: 'sess_sarah_101',
      recipient_name: 'Sarah Jenkins',
      exam_title: 'Advanced Systems Architecture Certification',
      score_achieved: 92,
      issued_at: '2026-06-05T11:29:11Z',
      is_revoked: false
    }
  ]);

  // Actions
  const loginUser = (username, role) => {
    const newUser = { username, role, id: `usr_${Math.random().toString(36).substr(2, 9)}` };
    setUser(newUser);
    localStorage.setItem('se_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('se_user');
    setActiveSession(null);
    setAnswers({});
  };

  const startExamSession = async (examId) => {
    const sessionId = `sess_${Math.random().toString(36).substr(2, 9)}`;
    const newSession = {
      sessionId,
      examId,
      examTitle: 'Advanced Systems Architecture Certification',
      durationSeconds: 2700, // 45 minutes
      status: 'active',
      currentQuestionIdx: 0,
      questions: MOCK_QUESTIONS
    };
    setActiveSession(newSession);
    setAnswers({});
    setFullscreenExits(0);
    setIsLocked(false);
    
    // Initialize Local IndexedDB Cache
    await dbCache.set(sessionId, { answers: {}, exits: 0 });
  };

  // Sync candidate response
  const syncAnswer = async (questionId, value) => {
    if (!activeSession) return;
    const updatedAnswers = { ...answers, [questionId]: value };
    setAnswers(updatedAnswers);

    // Save to local IndexedDB for resilience
    try {
      const cache = await dbCache.get(activeSession.sessionId) || {};
      cache.answers = updatedAnswers;
      await dbCache.set(activeSession.sessionId, cache);
    } catch (err) {
      console.warn('IndexedDB write failure: falling back to local storage', err);
    }
  };

  // Log browser/lockdown anomalies
  const logAnomaly = async (anomalyType, details) => {
    if (!activeSession) return;
    
    // Update local state
    if (anomalyType === 'FULLSCREEN_EXIT') {
      const exits = fullscreenExits + 1;
      setFullscreenExits(exits);
      
      // Save exits count to IndexedDB
      const cache = await dbCache.get(activeSession.sessionId) || {};
      cache.exits = exits;
      await dbCache.set(activeSession.sessionId, cache);

      if (exits >= 4) {
        setIsLocked(true);
        setActiveSession(prev => ({ ...prev, status: 'invalidated' }));
        return;
      }
    }

    // Proctor update (Mock websocket notification trigger)
    setProctorCandidates(prev => prev.map(cand => {
      if (cand.candidate_name === user?.username) {
        const updatedAnomalies = [
          ...cand.anomalies,
          { type: anomalyType, details, timestamp: new Date().toLocaleTimeString() }
        ];
        // Calculate suspicion score change
        const scoreMultiplier = anomalyType === 'FULLSCREEN_EXIT' ? 25 : 10;
        return {
          ...cand,
          anomalies: updatedAnomalies,
          suspicion_score: Math.min(100, cand.suspicion_score + scoreMultiplier)
        };
      }
      return cand;
    }));
  };

  const proctorWarn = (sessionId, message) => {
    setProctorCandidates(prev => prev.map(cand => {
      if (cand.session_id === sessionId) {
        return {
          ...cand,
          chats: [...cand.chats, { sender: 'proctor', text: message, timestamp: new Date().toLocaleTimeString() }]
        };
      }
      return cand;
    }));
  };

  const proctorTerminate = (sessionId) => {
    setProctorCandidates(prev => prev.map(cand => {
      if (cand.session_id === sessionId) {
        return { ...cand, status: 'invalidated' };
      }
      return cand;
    }));
  };

  const verifyCertificate = (id) => {
    return certificates.find(cert => cert.id === id) || null;
  };

  return (
    <ExamContext.Provider value={{
      user,
      loginUser,
      logout,
      activeSession,
      setActiveSession,
      answers,
      syncAnswer,
      fullscreenExits,
      isLocked,
      setIsLocked,
      networkStatus,
      setNetworkStatus,
      logAnomaly,
      proctorCandidates,
      proctorWarn,
      proctorTerminate,
      verifyCertificate,
      certificates,
      setCertificates
    }}>
      {children}
    </ExamContext.Provider>
  );
};
