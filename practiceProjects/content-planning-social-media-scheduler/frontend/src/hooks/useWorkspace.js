import { useState } from 'react';

export default function useWorkspace() {
  const [activeWorkspace, setActiveWorkspace] = useState({
    id: '8c3b6d27-6f68-4ad0-b2f7-ec87b415a7ee',
    name: 'Acme Marketing Agency',
    plan: 'Enterprise Plan',
    role: 'ADMIN'
  });

  const [workspaces, setWorkspaces] = useState([
    { id: '8c3b6d27-6f68-4ad0-b2f7-ec87b415a7ee', name: 'Acme Marketing Agency', plan: 'Enterprise Plan', role: 'ADMIN' },
    { id: '40446806-0107-6201-9311-2daaf0cf3638', name: 'Dev Sandbox', plan: 'Free Trial', role: 'ADMIN' },
    { id: '95847153-1310-6173-0300-b1864046ce85', name: 'Global Retail Corp', plan: 'Growth Plan', role: 'EDITOR' }
  ]);

  const [teamMembers, setTeamMembers] = useState([
    { id: '1', name: 'Alex Rivera', email: 'alex@creatorsuite.io', role: 'ADMIN', status: 'ACTIVE' },
    { id: '2', name: 'Sarah Lopez', email: 'sarah.l@acme.com', role: 'APPROVER', status: 'ACTIVE' },
    { id: '3', name: 'Marcus Chen', email: 'marcus@acme.com', role: 'EDITOR', status: 'ACTIVE' },
    { id: '4', name: 'Elena Rostova', email: 'elena@acme.com', role: 'VIEW_CLIENT', status: 'ACTIVE' }
  ]);

  const inviteMember = (email, role) => {
    const newMember = {
      id: String(teamMembers.length + 1),
      name: email.split('@')[0],
      email,
      role,
      status: 'PENDING'
    };
    setTeamMembers([...teamMembers, newMember]);
  };

  const createWorkspace = (name) => {
    const newWs = {
      id: Math.random().toString(36).substring(2, 9),
      name,
      plan: 'Growth Plan',
      role: 'ADMIN'
    };
    setWorkspaces([...workspaces, newWs]);
    setActiveWorkspace(newWs);
  };

  const changeWorkspace = (id) => {
    const found = workspaces.find(w => w.id === id);
    if (found) setActiveWorkspace(found);
  };

  return {
    activeWorkspace,
    workspaces,
    teamMembers,
    inviteMember,
    createWorkspace,
    changeWorkspace
  };
}
