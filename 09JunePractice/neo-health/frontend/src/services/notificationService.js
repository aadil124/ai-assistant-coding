import apiClient from '../api/apiClient';

/**
 * Notification Service
 */
const notificationService = {
  /**
   * Fetch active alerts logs.
   * @returns {Promise<Array>} List of alerts
   */
  async getNotifications() {
    // In next sprint: return (await apiClient.get('/notifications')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: '1', title: 'Consultation Complete', message: 'You have completed your session with Dr. Jenkins.', time: '10m ago', read: false },
          { id: '2', title: 'Payment Confirmed', message: 'Stripe transaction cleared for APT-10432.', time: '1h ago', read: true }
        ]);
      }, 300);
    });
  },

  /**
   * Flag notification as read.
   * @param {string} id
   * @returns {Promise<Object>} Status result
   */
  async markAsRead(id) {
    // In next sprint: return (await apiClient.post(`/notifications/${id}/read`)).data;
    return Promise.resolve({ success: true });
  }
};

export default notificationService;
