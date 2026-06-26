import apiClient from '../api/apiClient';

/**
 * Admin Service
 */
const adminService = {
  /**
   * Fetch core metrics cards stats.
   * @returns {Promise<Object>} Platform statistics
   */
  async getSystemMetrics() {
    // In next sprint: return (await apiClient.get('/admin/metrics')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          patientsCount: 1420,
          doctorsCount: 84,
          appointmentsCount: 3124,
          grossRevenue: 184320
        });
      }, 500);
    });
  },

  /**
   * Fetch activity audit trail.
   * @returns {Promise<Array>} List of audits
   */
  async getAuditLogs() {
    // In next sprint: return (await apiClient.get('/admin/audit-logs')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'AUD-001',
            adminName: 'Admin User',
            adminEmail: 'admin@neohealth.com',
            action: 'Approved verification for Dr. Sarah Jenkins',
            module: 'doctor',
            target: 'DOC-001',
            timestamp: 'June 26, 2026 • 10:42 AM',
            status: 'success'
          },
          {
            id: 'AUD-002',
            adminName: 'Admin User',
            adminEmail: 'admin@neohealth.com',
            action: 'Flagged consultation review #10432',
            module: 'reviews',
            target: 'REV-102',
            timestamp: 'June 26, 2026 • 09:15 AM',
            status: 'success'
          }
        ]);
      }, 400);
    });
  },

  /**
   * Fetch active billing refund dispute claims.
   * @returns {Promise<Array>} Refund claims list
   */
  async getRefundClaims() {
    // In next sprint: return (await apiClient.get('/admin/refunds')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'REF-201',
            bookingId: 'APT-10430',
            patientName: 'Robert Johnson',
            amount: '$200.00',
            reason: 'Patient requested cancellation.',
            date: 'June 24, 2026',
            status: 'pending',
            timeline: [
              { title: 'Appointment Cancelled', time: 'June 24, 2026 • 04:20 PM' }
            ]
          }
        ]);
      }, 450);
    });
  },

  /**
   * Updates baseline system constants.
   * @param {Object} config - Config parameters
   * @returns {Promise<Object>} Save result
   */
  async updateSystemConfig(config) {
    // In next sprint: return (await apiClient.put('/admin/settings', config)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Administrative parameters saved.' });
      }, 500);
    });
  }
};

export default adminService;
