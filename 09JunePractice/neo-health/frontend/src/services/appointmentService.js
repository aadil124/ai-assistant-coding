import apiClient from '../api/apiClient';

/**
 * Appointment Service
 */
const appointmentService = {
  /**
   * Fetch appointments filtered by user role.
   * @param {string} role - 'patient' | 'doctor' | 'admin'
   * @returns {Promise<Array>} List of appointments
   */
  async getAppointments(role) {
    // In next sprint: return (await apiClient.get('/appointments', { params: { role } })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'APT-10432',
            patientName: 'John Doe',
            patientEmail: 'john.doe@example.com',
            doctorName: 'Dr. Sarah Jenkins',
            doctorSpecialty: 'Pediatrics',
            dateTime: 'June 26, 2026 • 02:00 PM',
            fee: '$120.00',
            status: 'booked',
            type: 'Video Consultation'
          },
          {
            id: 'APT-10431',
            patientName: 'Jane Smith',
            patientEmail: 'jane.smith@example.com',
            doctorName: 'Dr. Charles Drew',
            doctorSpecialty: 'Hematology',
            dateTime: 'June 25, 2026 • 10:30 AM',
            fee: '$150.00',
            status: 'completed',
            type: 'Video Consultation'
          }
        ]);
      }, 500);
    });
  },

  /**
   * Fetch full details for a single consultation booking.
   * @param {string} id
   * @returns {Promise<Object>} Appointment object
   */
  async getAppointmentDetails(id) {
    // In next sprint: return (await apiClient.get(`/appointments/${id}`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id || 'APT-10432',
          patientName: 'John Doe',
          patientEmail: 'john.doe@example.com',
          doctorName: 'Dr. Sarah Jenkins',
          doctorSpecialty: 'Pediatrics',
          dateTime: 'June 26, 2026 • 02:00 PM',
          fee: '$120.00',
          status: 'booked',
          type: 'Video Consultation',
          paymentStatus: 'Paid (Stripe)',
          transactionId: 'ch_3Mv8x9L2k10Zpqw9',
          notes: 'Routine checkup for persistent dry cough and allergy symptoms.'
        });
      }, 300);
    });
  },

  /**
   * Book a specific schedule time block.
   * @param {string} slotId
   * @param {string} doctorId
   * @returns {Promise<Object>} Booking result
   */
  async bookSlot(slotId, doctorId) {
    // In next sprint: return (await apiClient.post('/appointments/book', { slotId, doctorId })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, appointmentId: `APT-${Math.floor(10000 + Math.random() * 90000)}` });
      }, 600);
    });
  },

  /**
   * Cancel an active consultation booking.
   * @param {string} id
   * @returns {Promise<Object>} Cancel result
   */
  async cancelAppointment(id) {
    // In next sprint: return (await apiClient.post(`/appointments/${id}/cancel`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Appointment cancelled.' });
      }, 500);
    });
  },

  /**
   * Process refund on Stripe for cancelled bookings.
   * @param {string} id
   * @returns {Promise<Object>} Refund result
   */
  async processRefund(id) {
    // In next sprint: return (await apiClient.post(`/appointments/${id}/refund`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Stripe refund disbursed.' });
      }, 500);
    });
  }
};

export default appointmentService;
