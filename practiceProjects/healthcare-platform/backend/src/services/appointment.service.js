import { Appointment } from '../models/Appointment.js';
import { DoctorDetails } from '../models/User.js';

export const lockSlot = async (patientId, doctorId, scheduledTime, symptomsDescription) => {
  // Check if doctor exists and is verified
  const doctor = await DoctorDetails.findOne({ userId: doctorId, verificationStatus: 'verified' });
  if (!doctor) {
    throw new Error('Doctor profile not found or not verified');
  }

  // Ensure scheduledTime aligns with doctor's weekly hours or slot duration (simplified for development)
  const scheduledDate = new Date(scheduledTime);

  // Check if slot is already booked (confirmed or locked with expiry in the future)
  const existingAppointment = await Appointment.findOne({
    doctorId,
    scheduledTime: scheduledDate,
    $or: [
      { status: 'confirmed' },
      { status: 'locked', lockExpiresAt: { $gt: new Date() } }
    ]
  });

  if (existingAppointment) {
    throw new Error('This time slot is already booked or locked by another patient');
  }

  // Lock duration is 10 minutes
  const lockExpiresAt = new Date(Date.now() + 10 * 60 * 1000);

  const appointment = new Appointment({
    patientId,
    doctorId,
    scheduledTime: scheduledDate,
    symptomsDescription,
    status: 'locked',
    lockExpiresAt,
  });

  await appointment.save();
  return appointment;
};

export const confirmBooking = async (appointmentId, patientId) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  if (appointment.patientId.toString() !== patientId) {
    throw new Error('Unauthorized to confirm this booking');
  }

  if (appointment.status === 'confirmed') {
    return appointment;
  }

  if (appointment.status === 'locked' && appointment.lockExpiresAt < new Date()) {
    throw new Error('Booking lock has expired. Please select the slot again.');
  }

  appointment.status = 'confirmed';
  appointment.lockExpiresAt = undefined;
  await appointment.save();

  return appointment;
};

export const getDoctorAppointments = async (doctorId) => {
  return Appointment.find({ doctorId })
    .populate('patientId', 'email phoneNumber')
    .sort({ scheduledTime: 1 });
};

export const getPatientAppointments = async (patientId) => {
  return Appointment.find({ patientId })
    .populate('doctorId', 'email phoneNumber')
    .sort({ scheduledTime: 1 });
};

export const updateAppointmentStatus = async (appointmentId, status, userId, userRole) => {
  const appointment = await Appointment.findById(appointmentId);
  if (!appointment) {
    throw new Error('Appointment not found');
  }

  // Permission check
  if (userRole !== 'admin') {
    if (appointment.doctorId.toString() !== userId && appointment.patientId.toString() !== userId) {
      throw new Error('Unauthorized to update this appointment');
    }
  }

  appointment.status = status;
  await appointment.save();
  return appointment;
};

export const getUniqueParticipants = async (userId, role) => {
  if (role === 'doctor') {
    // Find unique patients
    const appointments = await Appointment.find({ doctorId: userId })
      .populate('patientId', 'email phoneNumber createdAt')
      .lean();
    
    const patientsMap = new Map();
    appointments.forEach(app => {
      if (app.patientId && !patientsMap.has(app.patientId._id.toString())) {
        patientsMap.set(app.patientId._id.toString(), {
          _id: app.patientId._id,
          email: app.patientId.email,
          phoneNumber: app.patientId.phoneNumber,
          joinedAt: app.patientId.createdAt,
          lastAppointment: app.scheduledTime,
        });
      }
    });
    return Array.from(patientsMap.values());
  } else {
    // Find unique doctors
    const appointments = await Appointment.find({ patientId: userId })
      .populate('doctorId', 'email phoneNumber')
      .lean();
    
    const doctorsMap = new Map();
    for (const app of appointments) {
      if (app.doctorId && !doctorsMap.has(app.doctorId._id.toString())) {
        const details = await DoctorDetails.findOne({ userId: app.doctorId._id }).lean();
        doctorsMap.set(app.doctorId._id.toString(), {
          _id: app.doctorId._id,
          email: app.doctorId.email,
          phoneNumber: app.doctorId.phoneNumber,
          firstName: details?.firstName || 'Doctor',
          lastName: details?.lastName || 'Practitioner',
          specialty: details?.specialty || 'General',
          clinicAddress: details?.clinicAddress,
        });
      }
    }
    return Array.from(doctorsMap.values());
  }
};

export const getStats = async (userId, role) => {
  const query = role === 'doctor' ? { doctorId: userId } : { patientId: userId };
  const appointments = await Appointment.find(query).lean();
  
  const total = appointments.length;
  const completed = appointments.filter(a => a.status === 'completed').length;
  const canceled = appointments.filter(a => a.status === 'canceled').length;
  const locked = appointments.filter(a => a.status === 'locked').length;
  const confirmed = appointments.filter(a => a.status === 'confirmed').length;

  let revenue = 0;
  let doctorProfile = null;

  if (role === 'doctor') {
    doctorProfile = await DoctorDetails.findOne({ userId }).lean();
    // Revenue is fee * completed appointments
    const fee = doctorProfile?.consultationFee || 100;
    revenue = completed * fee;
  }

  return {
    total,
    completed,
    canceled,
    locked,
    confirmed,
    revenue,
    ratingAverage: doctorProfile?.ratingAverage || 4.8,
    reviewCount: doctorProfile?.reviewCount || 12,
  };
};
