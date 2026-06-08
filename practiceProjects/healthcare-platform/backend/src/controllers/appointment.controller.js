import * as appointmentService from '../services/appointment.service.js';

export const lockSlot = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { doctor_id, scheduled_time, symptoms_description } = req.body;

    const appointment = await appointmentService.lockSlot(
      patientId,
      doctor_id,
      scheduled_time,
      symptoms_description
    );

    return res.status(201).json({
      message: 'Slot locked successfully for 10 minutes',
      appointment,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const confirmBooking = async (req, res) => {
  try {
    const patientId = req.user.id;
    const { appointment_id } = req.body;

    const appointment = await appointmentService.confirmBooking(appointment_id, patientId);
    return res.status(200).json({
      message: 'Booking confirmed successfully',
      appointment,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    let appointments;

    if (role === 'doctor') {
      appointments = await appointmentService.getDoctorAppointments(userId);
    } else {
      appointments = await appointmentService.getPatientAppointments(userId);
    }

    return res.status(200).json(appointments);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user.id;
    const role = req.user.role;

    const appointment = await appointmentService.updateAppointmentStatus(id, status, userId, role);
    return res.status(200).json({
      message: `Appointment status updated to ${status}`,
      appointment,
    });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

export const getParticipants = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const participants = await appointmentService.getUniqueParticipants(userId, role);
    return res.status(200).json(participants);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const getStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const role = req.user.role;
    const stats = await appointmentService.getStats(userId, role);
    return res.status(200).json(stats);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
