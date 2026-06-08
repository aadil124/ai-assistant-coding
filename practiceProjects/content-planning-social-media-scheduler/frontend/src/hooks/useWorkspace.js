import { useState, useEffect, useCallback } from 'react';
import api from '../utils/api';

export default function useWorkspace(isAuthenticated) {
  const [activeWorkspace, setActiveWorkspace] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);

  const loadWorkspaces = useCallback(async () => {
    if (!localStorage.getItem('token')) return;
    try {
      const res = await api.get('/workspaces');
      if (res.success && res.data.length > 0) {
        setWorkspaces(res.data.map(w => ({
          id: w._id,
          name: w.name,
          plan: w.plan,
          role: w.members.find(m => m.userId === localStorage.getItem('userId'))?.role || 'EDITOR'
        })));

        const activeId = localStorage.getItem('workspaceId');
        const found = res.data.find(w => w._id === activeId) || res.data[0];
        
        if (found) {
          localStorage.setItem('workspaceId', found._id);
          setActiveWorkspace({
            id: found._id,
            name: found.name,
            plan: found.plan,
            role: found.members.find(m => m.userId === localStorage.getItem('userId'))?.role || 'ADMIN'
          });
          loadMembers(found._id);
        }
      }
    } catch (err) {
      console.error('Failed to load workspaces:', err.message);
    }
  }, []);

  const loadMembers = async (wsId) => {
    try {
      const res = await api.get('/workspaces/members', { 'x-workspace-id': wsId });
      if (res.success && res.data) {
        setTeamMembers(res.data.map(m => ({
          id: m.userId._id,
          name: m.userId.displayName,
          email: m.userId.email,
          role: m.role,
          status: m.status
        })));
      }
    } catch (err) {
      console.error('Failed to load workspace members:', err.message);
    }
  };

  const inviteMember = async (email, role) => {
    try {
      const res = await api.post('/workspaces/invite', { email, role });
      if (res.success && activeWorkspace) {
        loadMembers(activeWorkspace.id);
      }
      return res;
    } catch (err) {
      console.error('Failed to invite member:', err.message);
      throw err;
    }
  };

  const createWorkspace = async (name) => {
    try {
      const res = await api.post('/workspaces', { name });
      if (res.success && res.data) {
        const newWs = {
          id: res.data._id,
          name: res.data.name,
          plan: res.data.plan,
          role: 'ADMIN'
        };
        localStorage.setItem('workspaceId', newWs.id);
        setWorkspaces(prev => [...prev, newWs]);
        setActiveWorkspace(newWs);
        loadMembers(newWs.id);
      }
      return res;
    } catch (err) {
      console.error('Failed to create workspace:', err.message);
      throw err;
    }
  };

  const changeWorkspace = async (id) => {
    try {
      const res = await api.put(`/workspaces/switch/${id}`);
      if (res.success) {
        localStorage.setItem('workspaceId', id);
        const found = workspaces.find(w => w.id === id);
        if (found) {
          setActiveWorkspace(found);
          loadMembers(id);
        }
      }
    } catch (err) {
      console.error('Failed to switch workspace:', err.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      loadWorkspaces();
    }
  }, [isAuthenticated, loadWorkspaces]);

  return {
    activeWorkspace,
    workspaces,
    teamMembers,
    inviteMember,
    createWorkspace,
    changeWorkspace,
    loadWorkspaces
  };
}
