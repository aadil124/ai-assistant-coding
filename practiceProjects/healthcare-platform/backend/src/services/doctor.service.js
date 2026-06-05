import bcrypt from 'bcryptjs';
import { User, DoctorDetails } from '../models/User.js';
import { AuditLog } from '../models/AuditLog.js';

export const registerDoctor = async (doctorData) => {
  const existingUser = await User.findOne({ email: doctorData.email });
  if (existingUser) {
    throw new Error('Email already registered');
  }

  const existingLicense = await DoctorDetails.findOne({ licenseNumber: doctorData.license_number });
  if (existingLicense) {
    throw new Error('License number already registered');
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(doctorData.password, salt);

  // Create User
  const user = new User({
    email: doctorData.email,
    passwordHash,
    role: 'doctor',
    phoneNumber: doctorData.phone_number,
  });
  await user.save();

  // Create Doctor Profile (initial status is pending)
  const doctorDetails = new DoctorDetails({
    userId: user._id,
    firstName: doctorData.first_name,
    lastName: doctorData.last_name,
    specialty: doctorData.specialty,
    licenseNumber: doctorData.license_number,
    licenseState: doctorData.license_state,
    licenseExpiry: doctorData.license_expiry,
    consultationFee: doctorData.consultation_fee,
    languages: doctorData.languages || ['English'],
    clinicAddress: {
      city: doctorData.city,
      state: doctorData.state,
      zip: doctorData.zip,
    },
    verificationStatus: 'pending',
  });
  await doctorDetails.save();

  return { doctorId: doctorDetails._id, status: 'pending' };
};

export const searchDoctors = async (filters) => {
  const query = { verificationStatus: 'verified' };

  if (filters.specialty) {
    // Regex fuzzy match for specialty typos
    query.specialty = { $regex: filters.specialty, $options: 'i' };
  }

  if (filters.query) {
    query.$or = [
      { firstName: { $regex: filters.query, $options: 'i' } },
      { lastName: { $regex: filters.query, $options: 'i' } },
      { specialty: { $regex: filters.query, $options: 'i' } }
    ];
  }

  if (filters.min_fee !== undefined || filters.max_fee !== undefined) {
    query.consultationFee = {};
    if (filters.min_fee !== undefined) query.consultationFee.$gte = filters.min_fee;
    if (filters.max_fee !== undefined) query.consultationFee.$lte = filters.max_fee;
  }

  if (filters.min_rating !== undefined) {
    query.ratingAverage = { $gte: filters.min_rating };
  }

  if (filters.languages) {
    const langArray = filters.languages.split(',').map((l) => l.trim());
    query.languages = { $in: langArray };
  }

  if (filters.zip_code) {
    query['clinicAddress.zip'] = filters.zip_code;
  }

  const skip = (filters.page - 1) * filters.limit;

  const [doctors, total] = await Promise.all([
    DoctorDetails.find(query).skip(skip).limit(filters.limit).sort({ ratingAverage: -1 }),
    DoctorDetails.countDocuments(query),
  ]);

  return {
    total_hits: total,
    current_page: filters.page,
    total_pages: Math.ceil(total / filters.limit),
    data: doctors,
  };
};

export const verifyDoctorStatus = async (doctorId, action, adminId, clientIp) => {
  const status = action === 'approve' ? 'verified' : 'rejected';
  
  const doctor = await DoctorDetails.findByIdAndUpdate(
    doctorId,
    { verificationStatus: status },
    { new: true }
  );

  if (!doctor) {
    throw new Error('Doctor profile not found');
  }

  // Create immutable Audit Log
  const log = new AuditLog({
    actorId: adminId,
    actionType: 'VERIFY_DOCTOR',
    resourceId: doctorId,
    details: { verificationStatus: status },
    clientIp,
  });
  await log.save();

  return doctor;
};
