import Joi from 'joi';

export const registerDoctorSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).required()
    .messages({
      'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
    }),
  first_name: Joi.string().required(),
  last_name: Joi.string().required(),
  specialty: Joi.string().required(),
  license_state: Joi.string().length(2).uppercase().required(),
  license_number: Joi.string().alphanum().required(),
  license_expiry: Joi.date().greater('now').required(),
  phone_number: Joi.string().pattern(new RegExp('^(?:\\+91|91|0)?[6-9]\\d{9}$')).required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid Indian mobile number (e.g., +919876543210 or 9876543210).'
    }),
  consultation_fee: Joi.number().min(5).required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  zip: Joi.string().required(),
});

export const registerPatientSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])')).required()
    .messages({
      'string.pattern.base': 'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number.'
    }),
  phone_number: Joi.string().pattern(new RegExp('^(?:\\+91|91|0)?[6-9]\\d{9}$')).required()
    .messages({
      'string.pattern.base': 'Phone number must be a valid Indian mobile number (e.g., +919876543210 or 9876543210).'
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

