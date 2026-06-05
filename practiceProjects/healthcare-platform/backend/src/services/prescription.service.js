import { Prescription } from '../models/Prescription.js';
import { Appointment, Consultation } from '../models/Appointment.js';
import redis from '../server.js'; // Will import Redis stub from server file
import crypto from 'crypto';

export const createPrescriptionDraft = async (data, doctorId) => {
  const appointment = await Appointment.findById(data.appointment_id);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  if (appointment.doctorId.toString() !== doctorId) {
    throw new Error('Only the assigned doctor can write prescriptions');
  }

  // Check 4 hour deadline limit
  const limitTime = new Date(appointment.updatedAt.getTime() + 4 * 60 * 60 * 1000);
  if (appointment.status === 'completed' && new Date() > limitTime) {
    throw new Error('Prescription window has closed (4-hour limit exceeded)');
  }

  const prescription = new Prescription({
    appointmentId: data.appointment_id,
    doctorId,
    patientId: appointment.patientId,
    diagnosis: data.diagnosis,
    medications: data.medications,
    status: 'draft',
  });
  await prescription.save();

  return {
    prescription_id: prescription._id,
    status: 'draft',
    requires_signature: true,
  };
};

export const signPrescription = async (prescriptionId, otpToken, doctorId) => {
  const prescription = await Prescription.findById(prescriptionId);
  if (!prescription) {
    throw new Error('Prescription not found');
  }

  if (prescription.doctorId.toString() !== doctorId) {
    throw new Error('Only the issuing doctor can sign this prescription');
  }

  // Verify OTP code (mock verification against Redis stub)
  // In a production server: redis.get(`otp:doctor:${doctorId}:prescription:${prescriptionId}`)
  const mockValidOtp = '887321';
  if (otpToken !== mockValidOtp) {
    throw new Error('Invalid verification code');
  }

  // Generate Cryptographic Signature Hash of the prescription data
  const signPayload = JSON.stringify({
    id: prescription._id,
    patientId: prescription.patientId,
    medications: prescription.medications,
    signedAt: new Date(),
  });

  const signatureHash = crypto
    .createHmac('sha256', process.env.SIGNING_SECRET || 'fallback-signing-secret-key')
    .update(signPayload)
    .digest('hex');

  prescription.signatureHash = signatureHash;
  prescription.status = 'signed_and_issued';
  prescription.signedAt = new Date();
  await prescription.save();

  return {
    prescription_id: prescription._id,
    status: 'signed_and_issued',
    digital_signature_hash: signatureHash,
    pdf_download_url: `https://telehealthconnect.com/download/rx/${prescription._id}.pdf`
  };
};
