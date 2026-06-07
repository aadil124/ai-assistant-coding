import Workspace from '../models/Workspace.js';

export const verifyWorkspaceAccess = (allowedRoles = ['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT']) => {
  return async (req, res, next) => {
    const workspaceId = req.headers['x-workspace-id'] || req.query.workspaceId || req.body.workspaceId;

    if (!workspaceId) {
      return res.status(400).json({ success: false, message: 'Workspace context header (x-workspace-id) is missing.' });
    }

    try {
      const workspace = await Workspace.findById(workspaceId);
      if (!workspace) {
        return res.status(404).json({ success: false, message: 'Workspace not found.' });
      }

      // Check if user is a member of the workspace
      const membership = workspace.members.find(
        m => m.userId.toString() === req.user._id.toString()
      );

      if (!membership) {
        return res.status(403).json({ success: false, message: 'Forbidden. You are not a member of this workspace.' });
      }

      // If status is pending, restrict access
      if (membership.status === 'PENDING') {
        return res.status(403).json({ success: false, message: 'Your workspace invitation is pending.' });
      }

      // Check if user's role is permitted for this action
      if (!allowedRoles.includes(membership.role)) {
        return res.status(403).json({ success: false, message: `Forbidden. Role '${membership.role}' lacks sufficient privileges.` });
      }

      req.workspace = workspace;
      req.membership = membership;
      next();
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Error checking workspace permissions.', error: error.message });
    }
  };
};
