import React, { useContext, useEffect, useState, useRef } from 'react';
import { ExamContext } from '../context/ExamContext';
import { Alert, Button, Modal } from 'react-bootstrap';
import { ShieldAlert, Maximize } from 'lucide-react';

const SecureLockdownWrapper = ({ children }) => {
  const { isLocked, setIsLocked, logAnomaly, fullscreenExits, activeSession } = useContext(ExamContext);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const countdownTimer = useRef(null);

  useEffect(() => {
    if (!activeSession || activeSession.status !== 'active') return;

    // Enforce Lockdown Key Blockers (FEAT-005 / FR-5.2)
    const handleKeydown = (e) => {
      const isCmdOrCtrl = e.ctrlKey || e.metaKey;
      
      // Block Copy (C), Paste (V), Cut (X), Print (P), Save (S)
      if (isCmdOrCtrl && ['c', 'v', 'x', 'p', 's'].includes(e.key.toLowerCase())) {
        e.preventDefault();
        alert('Action Blocked: Clipboard, printing, and file save options are disabled during exams.');
      }

      // Block Function keys (F12, F5)
      if (e.key === 'F12' || e.key === 'F5') {
        e.preventDefault();
      }
    };

    // Block Context Menu (Mouse Right Click)
    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    // Detect focus loss (blur event)
    const handleBlur = () => {
      logAnomaly('FOCUS_LOST', 'User navigated away from workspace window.');
    };

    // Handle Fullscreen Event Change
    const handleFullscreenChange = () => {
      const fullEl = document.fullscreenElement || document.webkitFullscreenElement;
      const isCurrentlyFull = !!fullEl;
      setIsFullscreen(isCurrentlyFull);

      if (!isCurrentlyFull && !isLocked) {
        logAnomaly('FULLSCREEN_EXIT', 'User exited fullscreen mode.');
        startCountdown();
      } else {
        clearCountdown();
      }
    };

    window.addEventListener('keydown', handleKeydown);
    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('blur', handleBlur);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    return () => {
      window.removeEventListener('keydown', handleKeydown);
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('blur', handleBlur);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      clearCountdown();
    };
  }, [activeSession, isLocked, fullscreenExits]);

  const startCountdown = () => {
    clearCountdown();
    setCountdown(20);
    countdownTimer.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearCountdown();
          setIsLocked(true); // Terminate session
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const clearCountdown = () => {
    if (countdownTimer.current) {
      clearInterval(countdownTimer.current);
      countdownTimer.current = null;
    }
  };

  const enterFullscreen = () => {
    const docEl = document.documentElement;
    if (docEl.requestFullscreen) {
      docEl.requestFullscreen().then(() => setIsFullscreen(true));
    } else if (docEl.webkitRequestFullscreen) {
      docEl.webkitRequestFullscreen();
    }
  };

  if (!activeSession) return <>{children}</>;

  if (isLocked) {
    return (
      <div className="lockdown-shield-overlay text-center px-4">
        <div className="max-w-md bg-slate-900 p-5 rounded-3xl border border-danger">
          <ShieldAlert className="text-danger mb-3" size={64} />
          <h2 className="text-danger font-bold mb-3 h2">Session Terminated</h2>
          <p className="text-slate-300 mb-4">
            Your examination session has been suspended due to multiple security violations. 
            This incident has been logged and escalated to the examination board.
          </p>
          <Button variant="outline-danger" onClick={() => window.location.reload()}>
            Return to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  if (!isFullscreen) {
    return (
      <div className="lockdown-shield-overlay text-center px-4">
        <div className="bg-slate-900 p-5 rounded-3xl border border-warning max-w-md">
          <ShieldAlert className="text-warning mb-3" size={64} />
          <h2 className="text-warning font-bold mb-2 h2">Security Alert</h2>
          <p className="text-slate-300 mb-4">
            SecureExam requires you to take this test in Fullscreen Mode to prevent unauthorized access.
            <br />
            <strong className="text-danger">
              Exam will terminate in {countdown} seconds if you do not re-enter.
            </strong>
          </p>
          <p className="text-slate-500 small mb-4">
            Fullscreen exits: {fullscreenExits} / 3 allowed.
          </p>
          <Button variant="primary" className="w-100" onClick={enterFullscreen}>
            <Maximize className="me-2" size={18} />
            Enter Fullscreen and Resume
          </Button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default SecureLockdownWrapper;
