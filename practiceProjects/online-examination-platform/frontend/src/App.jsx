import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ExamProvider } from './context/ExamContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import PreflightCheck from './pages/PreflightCheck';
import BiometricVerify from './pages/BiometricVerify';
import ExamWorkspace from './pages/ExamWorkspace';
import ProctorDashboard from './pages/ProctorDashboard';
import ResultsView from './pages/ResultsView';
import VerificationPortal from './pages/VerificationPortal';
import ExaminerPortal from './pages/ExaminerPortal';

const App = () => {
  return (
    <ExamProvider>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Auth Sign In */}
          <Route path="/login" element={<LoginPage />} />

          {/* Candidate Journey */}
          <Route path="/exams/:exam_id/readiness" element={<PreflightCheck />} />
          <Route path="/exams/:exam_id/identification" element={<BiometricVerify />} />
          <Route path="/exams/:session_id/workspace" element={<ExamWorkspace />} />
          <Route path="/exams/:session_id/results" element={<ResultsView />} />

          {/* Proctor Panel */}
          <Route path="/proctor/dashboard" element={<ProctorDashboard />} />

          {/* Examiner Panel */}
          <Route path="/examiner/dashboard" element={<ExaminerPortal />} />

          {/* Public stateless verification lookups */}
          <Route path="/verify" element={<VerificationPortal />} />
          <Route path="/verify/:certId" element={<VerificationPortal />} />
        </Routes>
      </Router>
    </ExamProvider>
  );
};

export default App;
