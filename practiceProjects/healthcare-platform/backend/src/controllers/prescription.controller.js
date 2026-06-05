import * as prescriptionService from '../services/prescription.service.js';

export const createPrescriptionDraft = async (req, res) => {
  try {
    const doctorId = req.user.id;
    const result = await prescriptionService.createPrescriptionDraft(req.body, doctorId);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const signPrescription = async (req, res) => {
  try {
    const { id } = req.params; // Prescription ID
    const { otp_token } = req.body;
    const doctorId = req.user.id;

    const result = await prescriptionService.signPrescription(id, otp_token, doctorId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
