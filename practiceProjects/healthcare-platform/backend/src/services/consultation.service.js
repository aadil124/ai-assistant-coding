import { Appointment, Consultation } from '../models/Appointment.js';
import { encrypt, decrypt } from '../utils/crypto.js';

export const joinConsultationRoom = async (appointmentId, userId) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  // Verify user is patient or doctor for the appointment
  if (
    appointment.patientId.toString() !== userId &&
    appointment.doctorId.toString() !== userId
  ) {
    throw new Error('Unauthorized to join this consultation');
  }

  // Ensure appointment is confirmed
  if (appointment.status !== 'confirmed') {
    throw new Error('Appointment is not in confirmed state');
  }

  // Find or create Consultation Room
  let consultation = await Consultation.findOne({ appointmentId });
  if (!consultation) {
    consultation = new Consultation({
      appointmentId,
      webrtcChannelName: `ch_con_${appointmentId}`,
      status: 'active',
      startedAt: new Date(),
    });
    await consultation.save();
  } else if (consultation.status === 'completed') {
    throw new Error('Room has expired');
  }

  // Generate Agora Token Stub (valid for 1 hour)
  const fakeWebRTCToken = `agora_token_stub_${appointmentId}_role_${userId}`;

  return {
    consultation_id: consultation._id,
    webrtc_channel: consultation.webrtcChannelName,
    webrtc_token: fakeWebRTCToken,
    expires_at: new Date(Date.now() + 60 * 60 * 1000), // 1 hour
  };
};

export const saveClinicalNotes = async (consultationId, notesText, isFinalized, doctorId) => {
  const consultation = await Consultation.findById(consultationId);
  if (!consultation) {
    throw new Error('Consultation room not found');
  }

  const appointment = await Appointment.findById(consultation.appointmentId);
  if (appointment.doctorId.toString() !== doctorId) {
    throw new Error('Only the assigned doctor can update clinical notes');
  }

  if (consultation.status === 'completed') {
    throw new Error('Cannot edit clinical notes for completed consultations');
  }

  // Encrypt clinical notes using symmetric AES-256 helper
  consultation.encryptedNotes = encrypt(notesText);

  if (isFinalized) {
    consultation.status = 'completed';
    consultation.endedAt = new Date();
    consultation.durationSeconds = Math.floor(
      (consultation.endedAt.getTime() - consultation.startedAt.getTime()) / 1000
    );

    appointment.status = 'completed';
    await appointment.save();
  }

  await consultation.save();
  return { success: true, last_saved_at: new Date() };
};

export const getClinicalNotes = async (consultationId, userId) => {
  const consultation = await Consultation.findById(consultationId);
  if (!consultation) {
    throw new Error('Consultation not found');
  }

  const appointment = await Appointment.findById(consultation.appointmentId);
  if (
    appointment.patientId.toString() !== userId &&
    appointment.doctorId.toString() !== userId
  ) {
    throw new Error('Unauthorized to read clinical notes');
  }

  // Decrypt clinical notes
  const notesText = decrypt(consultation.encryptedNotes);
  return {
    consultation_id: consultationId,
    clinical_notes: notesText,
    status: consultation.status,
  };
};
