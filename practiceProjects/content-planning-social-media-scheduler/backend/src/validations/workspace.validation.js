import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export const createWorkspaceRules = [
  body('name').notEmpty().withMessage('Workspace name is required').trim(),
  validate
];

export const inviteMemberRules = [
  body('email').isEmail().withMessage('Please provide a valid email address'),
  body('role')
    .isIn(['ADMIN', 'EDITOR', 'APPROVER', 'VIEW_CLIENT'])
    .withMessage('Role must be ADMIN, EDITOR, APPROVER, or VIEW_CLIENT'),
  validate
];
