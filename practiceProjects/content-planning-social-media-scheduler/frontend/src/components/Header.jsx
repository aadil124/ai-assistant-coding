import React from 'react';

export default function Header({ activeTab, setActiveTab }) {
  const getHeaderTitle = () => {
    switch (activeTab) {
      case 'dashboard': return 'Dashboard';
      case 'calendar': return 'Content Calendar';
      case 'composer': return 'Post Composer';
      case 'ai-assistant': return 'AI Creative Assistant';
      case 'media-library': return 'Media Library';
      case 'approvals': return 'Approvals Hub';
      case 'queue': return 'Scheduler Queue';
      case 'analytics': return 'Analytics & Reports';
      case 'settings': return 'Workspace Settings';
      default: return 'CreatorSuite';
    }
  };

  return (
    <header 
      className="d-flex align-items-center justify-content-between px-4 bg-white border-bottom sticky-top z-2"
      style={{ height: '64px', marginLeft: '260px' }}
    >
      <div className="d-flex align-items-center gap-3">
        <h4 className="m-0 font-weight-bold text-dark" style={{ fontSize: '18px' }}>
          {getHeaderTitle()}
        </h4>
        
        {/* Contextual Sub-Nav Toggles */}
        {activeTab === 'composer' && (
          <>
            <div className="vr bg-secondary opacity-25" style={{ height: '16px' }}></div>
            <div className="d-flex gap-3">
              <a href="#editor" className="text-decoration-none text-primary font-weight-bold" style={{ fontSize: '12px' }}>Editor</a>
              <a href="#drafts" className="text-decoration-none text-muted" style={{ fontSize: '12px' }}>Drafts</a>
              <a href="#history" className="text-decoration-none text-muted" style={{ fontSize: '12px' }}>History</a>
            </div>
          </>
        )}
      </div>

      <div className="d-flex align-items-center gap-3">
        {activeTab !== 'composer' && (
          <button 
            className="btn btn-primary btn-sm d-flex align-items-center gap-1 font-weight-bold shadow-sm"
            style={{ borderRadius: '8px', padding: '6px 16px', fontSize: '12px' }}
            onClick={() => setActiveTab('composer')}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>add</span>
            Create Post
          </button>
        )}

        <div className="vr bg-secondary opacity-25" style={{ height: '20px' }}></div>

        <button className="btn btn-link text-muted p-1 hover-primary border-0 bg-transparent">
          <span className="material-symbols-outlined">search</span>
        </button>

        <button className="btn btn-link text-muted p-1 border-0 bg-transparent position-relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="position-absolute p-1 bg-danger border border-white rounded-circle" style={{ top: '6px', right: '6px' }}></span>
        </button>

        <button 
          className={`btn btn-link p-1 border-0 bg-transparent ${activeTab === 'settings' ? 'text-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('settings')}
        >
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
