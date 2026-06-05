import Joi from 'joi';

export const lockSlotSchema = Joi.object({
  doctor_id: Joi.string().hex().length(24).required(),
  scheduled_time: Joi.date().iso().greater('now').required(),
  symptoms_description: Joi.string().max(500).optional(),
});

export const confirmAppointmentSchema = Joi.object({
  appointment_id: Joi.string().hex().length(24).required(),
});

export const updateStatusSchema = Joi.object({
  status: Joi.string().valid('confirmed', 'completed', 'canceled', 'no_show').required(),
});
