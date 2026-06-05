import React, { useState } from 'react';

export default function Sidebar({ activeTab, setActiveTab, activeWorkspace, workspaces, changeWorkspace }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'calendar', label: 'Calendar', icon: 'calendar_month' },
    { id: 'composer', label: 'Create Post', icon: 'add_circle' },
    { id: 'ai-assistant', label: 'AI Assistant', icon: 'auto_awesome' },
    { id: 'media-library', label: 'Media Library', icon: 'perm_media' },
    { id: 'approvals', label: 'Approvals', icon: 'fact_check' },
    { id: 'queue', label: 'Scheduler Queue', icon: 'view_quilt' },
    { id: 'analytics', label: 'Analytics', icon: 'bar_chart' }
  ];

  return (
    <aside className="d-flex flex-column bg-white border-end h-100 py-3 px-3 position-fixed start-0 top-0 z-3" style={{ width: '260px' }}>
      {/* Workspace Switcher Header */}
      <div className="position-relative mb-4 px-2">
        <div 
          className="d-flex align-items-center justify-content-between cursor-pointer p-2 rounded hover-bg-light"
          style={{ cursor: 'pointer' }}
          onClick={() => setDropdownOpen(!dropdownOpen)}
          data-testid="workspace-switcher"
        >
          <div>
            <h5 className="m-0 font-weight-bold text-dark truncate" style={{ fontSize: '15px' }} data-testid="active-workspace-title">
              {activeWorkspace.name}
            </h5>
            <span className="text-muted text-xs-caps" style={{ fontSize: '10px' }}>{activeWorkspace.plan}</span>
          </div>
          <span className="material-symbols-outlined text-muted">unfold_more</span>
        </div>

        {dropdownOpen && (
          <div className="position-absolute start-0 end-0 mt-1 bg-white border rounded shadow-lg z-3 p-1">
            <span className="text-muted px-2 py-1 d-block text-xs-caps" style={{ fontSize: '9px' }}>Switch Workspace</span>
            {workspaces.map(ws => (
              <button
                key={ws.id}
                className={`dropdown-item text-start p-2 rounded border-0 bg-transparent w-100 ${ws.id === activeWorkspace.id ? 'text-primary font-weight-bold' : 'text-dark'}`}
                onClick={() => {
                  changeWorkspace(ws.id);
                  setDropdownOpen(false);
                }}
              >
                {ws.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Navigation List */}
      <nav className="flex-grow-1 overflow-auto custom-scrollbar">
        <div className="nav flex-column gap-1">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-link-custom ${activeTab === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                setActiveTab(item.id);
              }}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </div>
      </nav>

      {/* Bottom Profile and Settings Info */}
      <div className="mt-auto pt-3 border-top">
        <a
          href="#settings"
          className={`nav-link-custom mb-2 ${activeTab === 'settings' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('settings');
          }}
        >
          <span className="material-symbols-outlined">settings</span>
          <span>Workspace Settings</span>
        </a>

        <div className="d-flex align-items-center gap-3 p-2 rounded bg-light mt-2">
          <img 
            alt="Profile Avatar" 
            className="rounded-circle" 
            style={{ width: '32px', height: '32px', objectFit: 'cover' }}
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=100&q=80" 
          />
          <div className="flex-grow-1 overflow-hidden">
            <p className="m-0 font-weight-bold text-dark truncate" style={{ fontSize: '12px' }}>Alex Rivera</p>
            <span className="text-muted truncate d-block" style={{ fontSize: '10px' }}>alex@creatorsuite.io</span>
          </div>
          <span className="material-symbols-outlined text-muted text-sm" style={{ cursor: 'pointer' }}>logout</span>
        </div>
      </div>
    </aside>
  );
}
