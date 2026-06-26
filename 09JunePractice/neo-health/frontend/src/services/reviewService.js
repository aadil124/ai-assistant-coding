import apiClient from '../api/apiClient';

/**
 * Review Service
 */
const reviewService = {
  /**
   * Fetch reviews submitted for a doctor.
   * @param {string} doctorId
   * @returns {Promise<Array>} List of reviews
   */
  async getReviews(doctorId) {
    // In next sprint: return (await apiClient.get(`/reviews`, { params: { doctorId } })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'REV-101',
            patientName: 'Alice Johnson',
            doctorName: 'Dr. Elizabeth Blackwell',
            rating: 5,
            comment: 'Amazing cardiologist! She explained everything clearly.',
            date: 'June 25, 2026',
            status: 'published'
          },
          {
            id: 'REV-102',
            patientName: 'Mark Spencer',
            doctorName: 'Dr. Sarah Jenkins',
            rating: 2,
            comment: 'Long wait times in lobby.',
            date: 'June 24, 2026',
            status: 'flagged'
          }
        ]);
      }, 400);
    });
  },

  /**
   * Submit patient rating feedback.
   * @param {Object} data - Review details
   * @returns {Promise<Object>} Submit status
   */
  async submitReview(data) {
    // In next sprint: return (await apiClient.post('/reviews', data)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Review submitted for moderation review.' });
      }, 600);
    });
  },

  /**
   * Approve or reject a review.
   * @param {string} id
   * @param {string} status - 'published' | 'flagged' | 'deleted'
   * @returns {Promise<Object>} Update status
   */
  async moderateReview(id, status) {
    // In next sprint: return (await apiClient.put(`/reviews/${id}/moderate`, { status })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: `Review status updated to ${status}.` });
      }, 500);
    });
  }
};

export default reviewService;
