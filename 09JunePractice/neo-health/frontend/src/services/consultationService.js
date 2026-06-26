import apiClient from '../api/apiClient';

/**
 * Consultation Service
 */
const consultationService = {
  /**
   * Fetch active video session details and room settings.
   * @param {string} appointmentId
   * @returns {Promise<Object>} Session object
   */
  async getSessionDetails(appointmentId) {
    // In next sprint: return (await apiClient.get(`/consultations/${appointmentId}`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          appointmentId: appointmentId,
          roomName: `neo-room-${appointmentId}`,
          rtcToken: 'mock-webrtc-token-payload-xyz123',
          patientName: 'John Doe',
          doctorName: 'Dr. Sarah Jenkins',
          startTime: new Date().toISOString()
        });
      }, 400);
    });
  },

  /**
   * Broadcast message to chat logs.
   * @param {string} appointmentId
   * @param {Object} message - Chat payload
   * @returns {Promise<Object>} Status result
   */
  async sendChatMessage(appointmentId, message) {
    // In next sprint: return (await apiClient.post(`/consultations/${appointmentId}/chat`, { message })).data;
    return Promise.resolve({ success: true, timestamp: new Date().toISOString() });
  },

  /**
   * Save and sign diagnostic e-prescriptions.
   * @param {string} appointmentId
   * @param {Object} prescriptionData
   * @returns {Promise<Object>} File compile result
   */
  async savePrescription(appointmentId, prescriptionData) {
    // In next sprint: return (await apiClient.post(`/consultations/${appointmentId}/prescription`, prescriptionData)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          prescriptionId: `RX-${Math.floor(10000 + Math.random() * 90000)}`,
          fileUrl: 'dummy_rx_download_link'
        });
      }, 700);
    });
  }
};

export default consultationService;
