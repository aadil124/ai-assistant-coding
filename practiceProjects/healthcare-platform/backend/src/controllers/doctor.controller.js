import * as doctorService from '../services/doctor.service.js';

export const registerDoctor = async (req, res) => {
  try {
    const result = await doctorService.registerDoctor(req.body);
    return res.status(201).json(result);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const searchDoctors = async (req, res) => {
  try {
    const result = await doctorService.searchDoctors(req.query);
    return res.status(200).json(result);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const verifyDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { action } = req.body;
    const adminId = req.user.id;
    const clientIp = req.ip || req.headers['x-forwarded-for'];

    if (!['approve', 'reject'].includes(action)) {
      return res.status(400).json({ message: 'Invalid verify action. Choose approve or reject' });
    }

    const result = await doctorService.verifyDoctorStatus(doctorId, action, adminId, clientIp);
    return res.status(200).json({
      doctor_id: result._id,
      status: result.verificationStatus,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
