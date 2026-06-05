import React, { useState } from 'react';

const initialChannels = [
  { id: '1', platform: 'linkedin', username: 'Acme Agency Corporate', status: 'ACTIVE' },
  { id: '2', platform: 'instagram', username: 'acme_marketing_official', status: 'ACTIVE' }
];

export default function Settings({ activeWorkspace, teamMembers, inviteMember }) {
  const [channels, setChannels] = useState(initialChannels);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState('EDITOR');
  const [activeTab, setActiveTab] = useState('team'); // team, integrations

  const handleInviteSubmit = (e) => {
    e.preventDefault();
    if (!inviteEmail) return;
    inviteMember(inviteEmail, inviteRole);
    setInviteEmail('');
    alert(`Invitation sent to ${inviteEmail}!`);
  };

  const handleToggleChannel = (platform) => {
    const exists = channels.find(c => c.platform === platform);
    if (exists) {
      if (confirm(`Are you sure you want to disconnect your ${platform} channel?`)) {
        setChannels(channels.filter(c => c.platform !== platform));
      }
    } else {
      const handle = prompt(`Enter ${platform} Profile Username:`, `@acme_${platform}`);
      if (handle) {
        setChannels([...channels, {
          id: Math.random().toString(),
          platform,
          username: handle,
          status: 'ACTIVE'
        }]);
      }
    }
  };

  return (
    <div className="p-4 overflow-auto custom-scrollbar bg-light" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Sub tabs navigation */}
      <div className="d-flex border-bottom gap-4 mb-4">
        <button 
          className={`btn p-0 pb-2 border-0 rounded-0 font-weight-bold text-xs-caps ${activeTab === 'team' ? 'text-primary border-bottom border-3 border-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('team')}
        >
          Team Collaboration
        </button>
        <button 
          className={`btn p-0 pb-2 border-0 rounded-0 font-weight-bold text-xs-caps ${activeTab === 'integrations' ? 'text-primary border-bottom border-3 border-primary' : 'text-muted'}`}
          onClick={() => setActiveTab('integrations')}
        >
          Social Integrations
        </button>
      </div>

      {activeTab === 'team' ? (
        <div className="row g-4">
          {/* Invite Member form */}
          <div className="col-12 col-md-5">
            <div className="card border rounded-3 bg-white p-3 shadow-sm">
              <h5 className="font-weight-bold text-dark mb-3" style={{ fontSize: '15px' }}>Invite Team Member</h5>
              <form onSubmit={handleInviteSubmit} className="d-flex flex-column gap-3">
                <div className="form-group">
                  <label className="text-xs-caps mb-1">Email Address</label>
                  <input 
                    type="email" 
                    className="form-control rounded-3" 
                    placeholder="e.g. editor@acme-brand.com" 
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="text-xs-caps mb-1">Workspace Role</label>
                  <select 
                    className="form-select rounded-3"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                  >
                    <option value="EDITOR">Editor (Create/Edit Content)</option>
                    <option value="APPROVER">Approver (Review Content)</option>
                    <option value="VIEW_CLIENT">Client Viewer (Read Only)</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary w-100 py-2 font-weight-bold rounded-3">Send Invite</button>
              </form>
            </div>
          </div>

          {/* Members Table */}
          <div className="col-12 col-md-7">
            <div className="card border rounded-3 bg-white p-3 shadow-sm">
              <h5 className="font-weight-bold text-dark mb-3" style={{ fontSize: '15px' }}>Workspace Users</h5>
              <div className="table-responsive">
                <table className="table align-middle m-0" style={{ fontSize: '12px' }}>
                  <thead>
                    <tr className="text-muted">
                      <th>Name</th>
                      <th>Role</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {teamMembers.map(member => (
                      <tr key={member.id}>
                        <td>
                          <div className="font-weight-bold text-dark">{member.name}</div>
                          <div className="text-muted" style={{ fontSize: '10px' }}>{member.email}</div>
                        </td>
                        <td>
                          <span className="badge bg-light text-dark text-xs-caps" style={{ fontSize: '9px' }}>{member.role}</span>
                        </td>
                        <td>
                          <span className={`badge ${member.status === 'ACTIVE' ? 'bg-success-subtle text-success' : 'bg-warning-subtle text-warning'}`} style={{ fontSize: '9px' }}>
                            {member.status.toLowerCase()}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row g-3" style={{ maxWidth: '820px' }}>
          <div className="col-12">
            <h5 className="font-weight-bold text-dark mb-2" style={{ fontSize: '15px' }}>Linked Social Profiles</h5>
            <p className="text-muted mb-3" style={{ fontSize: '12px' }}>Authorize CreatorSuite to automatically post drafts to your social channels using secure OAuth protocols.</p>
          </div>

          {['linkedin', 'instagram', 'twitter', 'facebook'].map(plat => {
            const isConnected = channels.find(c => c.platform === plat);
            return (
              <div key={plat} className="col-12 col-sm-6">
                <div className={`card border rounded-3 p-3 bg-white shadow-sm d-flex flex-row align-items-center justify-content-between`}>
                  <div className="d-flex align-items-center gap-3">
                    <div className="bg-light rounded-circle p-2 d-flex align-items-center justify-content-center" style={{ width: '40px', height: '40px' }}>
                      <i className={`bi bi-${plat === 'twitter' ? 'twitter-x' : plat} text-primary`} style={{ fontSize: '20px' }}></i>
                    </div>
                    <div>
                      <h6 className="m-0 font-weight-bold text-dark text-capitalize">{plat}</h6>
                      <span className="text-muted" style={{ fontSize: '11px' }}>
                        {isConnected ? isConnected.username : 'Not connected'}
                      </span>
                    </div>
                  </div>
                  <button 
                    className={`btn btn-sm px-3 rounded-pill font-weight-bold ${isConnected ? 'btn-outline-danger' : 'btn-primary'}`}
                    onClick={() => handleToggleChannel(plat)}
                  >
                    {isConnected ? 'Disconnect' : 'Connect'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
