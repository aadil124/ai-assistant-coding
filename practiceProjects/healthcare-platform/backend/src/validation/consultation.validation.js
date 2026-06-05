import Joi from 'joi';

export const joinRoomSchema = Joi.object({
  appointment_id: Joi.string().hex().length(24).required(),
});

export const saveNotesSchema = Joi.object({
  clinical_notes: Joi.string().max(10000).required(),
  is_finalized: Joi.boolean().default(false),
});

export const createPrescriptionSchema = Joi.object({
  appointment_id: Joi.string().hex().length(24).required(),
  diagnosis: Joi.string().max(1000).required(),
  medications: Joi.array().items(
    Joi.object({
      name: Joi.string().required(),
      dosage: Joi.string().required(),
      frequency: Joi.string().required(),
      durationDays: Joi.number().integer().min(1).required(),
      refills: Joi.number().integer().min(0).default(0),
    })
  ).min(1).required(),
});

export const signPrescriptionSchema = Joi.object({
  otp_token: Joi.string().length(6).pattern(/^\d+$/).required()
    .messages({
      'string.pattern.base': 'OTP must be a 6-digit numeric code'
    }),
});

export const searchDoctorsSchema = Joi.object({
  query: Joi.string().max(100).optional(),
  specialty: Joi.string().optional(),
  min_fee: Joi.number().min(0).optional(),
  max_fee: Joi.number().min(0).optional(),
  min_rating: Joi.number().min(1).max(5).optional(),
  languages: Joi.string().optional(), // Comma separated list
  zip_code: Joi.string().optional(),
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(50).default(10),
});
