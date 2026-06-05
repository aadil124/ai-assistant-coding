import * as consultationService from '../services/consultation.service.js';

export const joinRoom = async (req, res) => {
  try {
    const { appointment_id } = req.body;
    const userId = req.user.id;

    const result = await consultationService.joinConsultationRoom(appointment_id, userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};

export const saveNotes = async (req, res) => {
  try {
    const { id } = req.params; // consultation ID
    const { clinical_notes, is_finalized } = req.body;
    const doctorId = req.user.id;

    const result = await consultationService.saveClinicalNotes(id, clinical_notes, is_finalized, doctorId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await consultationService.getClinicalNotes(id, userId);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(403).json({ message: err.message });
  }
};
