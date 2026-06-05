import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User, DoctorDetails } from '../models/User.js';
import { Appointment } from '../models/Appointment.js';
import { Consultation } from '../models/Appointment.js';
import { Prescription } from '../models/Prescription.js';
import { AuditLog } from '../models/AuditLog.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/telehealth';

const seedDatabase = async () => {
  try {
    console.log('Connecting to database...');
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB.');

    // Clear existing collections
    console.log('Clearing existing database collections...');
    await User.deleteMany({});
    await DoctorDetails.deleteMany({});
    await Appointment.deleteMany({});
    await Consultation.deleteMany({});
    await Prescription.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('Hashing passwords...');
    const salt = await bcrypt.genSalt(10);
    const commonPasswordHash = await bcrypt.hash('Password123!', salt);

    // Create Admin User
    console.log('Creating Admin User...');
    const adminUser = new User({
      email: 'admin@telehealthconnect.com',
      passwordHash: commonPasswordHash,
      role: 'admin',
      phoneNumber: '+919876543210',
    });
    await adminUser.save();

    // Create Doctor User
    console.log('Creating Doctor User (Dr. Aris)...');
    const doctorUser = new User({
      email: 'dr.aris@telehealthconnect.com',
      passwordHash: commonPasswordHash,
      role: 'doctor',
      phoneNumber: '+919876543211',
    });
    await doctorUser.save();

    // Create Doctor Profile Details (Verified status)
    const doctorDetails = new DoctorDetails({
      userId: doctorUser._id,
      firstName: 'Aris',
      lastName: 'Aethelgard',
      specialty: 'Cardiology',
      licenseNumber: 'LIC998877',
      licenseState: 'MA',
      licenseExpiry: new Date('2028-12-31'),
      verificationStatus: 'verified',
      consultationFee: 150,
      ratingAverage: 4.8,
      reviewCount: 24,
      languages: ['English', 'Greek'],
      clinicAddress: {
        city: 'Boston',
        state: 'MA',
        zip: '02115',
      },
      availabilitySettings: {
        slot_duration_minutes: 30,
        weekly_hours: [
          {
            day_of_week: 1, // Monday
            is_active: true,
            intervals: [{ start: '09:00', end: '17:00' }],
          },
          {
            day_of_week: 2, // Tuesday
            is_active: true,
            intervals: [{ start: '09:00', end: '17:00' }],
          },
          {
            day_of_week: 3, // Wednesday
            is_active: true,
            intervals: [{ start: '09:00', end: '17:00' }],
          },
          {
            day_of_week: 4, // Thursday
            is_active: true,
            intervals: [{ start: '09:00', end: '17:00' }],
          },
          {
            day_of_week: 5, // Friday
            is_active: true,
            intervals: [{ start: '09:00', end: '17:00' }],
          },
        ],
      },
    });
    await doctorDetails.save();

    // Create Patient User (Sarah Johnson)
    console.log('Creating Patient User (Sarah Johnson)...');
    const patientUser = new User({
      email: 'sarah.johnson@example.com',
      passwordHash: commonPasswordHash,
      role: 'patient',
      phoneNumber: '+919876543212',
    });
    await patientUser.save();

    // Create Confirmed Appointment scheduled for today (starts now)
    console.log('Creating Confirmed Appointment...');
    const scheduledTime = new Date();
    // Set scheduled time to be exactly now
    const appointment = new Appointment({
      patientId: patientUser._id,
      doctorId: doctorUser._id,
      scheduledTime,
      durationMinutes: 30,
      status: 'confirmed',
      symptomsDescription: 'Persistent fatigue, post-op chest pain checkup.',
    });
    await appointment.save();

    console.log('\n--- SEEDING COMPLETED SUCCESSFULY ---');
    console.log('Environment: Development');
    console.log('Login credentials:');
    console.log('  1. Doctor:');
    console.log(`     Email:    dr.aris@telehealthconnect.com`);
    console.log(`     Password: Password123!`);
    console.log(`     Doctor User ID: ${doctorUser._id}`);
    console.log(`     Doctor Details ID: ${doctorDetails._id}`);
    console.log('  2. Patient:');
    console.log(`     Email:    sarah.johnson@example.com`);
    console.log(`     Password: Password123!`);
    console.log(`     Patient User ID: ${patientUser._id}`);
    console.log('  3. Admin:');
    console.log(`     Email:    admin@telehealthconnect.com`);
    console.log(`     Password: Password123!`);
    console.log('  4. Active Appointment:');
    console.log(`     ID:       ${appointment._id}`);
    console.log(`     Time:     ${appointment.scheduledTime.toISOString()}`);
    console.log('-------------------------------------\n');

    await mongoose.connection.close();
    console.log('Database connection closed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding database failed:', err);
    process.exit(1);
  }
};

seedDatabase();
