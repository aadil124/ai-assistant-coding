import { body, validationResult } from 'express-validator';

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

export const postRules = [
  body('caption')
    .notEmpty().withMessage('Caption is required')
    .custom((val, { req }) => {
      const platforms = req.body.platforms || [];
      if (platforms.includes('twitter') && val.length > 280) {
        throw new Error('Twitter caption cannot exceed 280 characters');
      }
      return true;
    }),
  body('platforms')
    .isArray({ min: 1 }).withMessage('At least one platform must be specified')
    .custom((val) => {
      const allowed = ['instagram', 'linkedin', 'twitter', 'facebook'];
      const invalid = val.filter(p => !allowed.includes(p));
      if (invalid.length > 0) {
        throw new Error(`Invalid platform(s): ${invalid.join(', ')}`);
      }
      return true;
    }),
  body('scheduledTime')
    .notEmpty().withMessage('Scheduled time is required')
    .isISO8601().withMessage('Scheduled time must be a valid ISO8601 date string')
    .custom((val) => {
      if (new Date(val).getTime() < Date.now()) {
        throw new Error('Scheduled time must be in the future');
      }
      return true;
    }),
  body('media').optional().isArray().withMessage('Media must be an array of urls'),
  validate
];
