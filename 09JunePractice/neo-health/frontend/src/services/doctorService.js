import apiClient from '../api/apiClient';

/**
 * Doctor Service
 */
const doctorService = {
  /**
   * Fetch list of available doctors with search filters.
   * @param {Object} filters
   * @returns {Promise<Array>} List of doctors
   */
  async getDoctors(filters = {}) {
    // In next sprint: return (await apiClient.get('/doctors', { params: filters })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'doc-001',
            name: 'Dr. Elizabeth Blackwell',
            specialty: 'Cardiology',
            experience: '12 Years',
            rating: 4.8,
            reviewsCount: 34,
            fee: 200,
            avatar: 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=80',
            nextAvailable: 'Tomorrow, 09:00 AM'
          },
          {
            id: 'doc-002',
            name: 'Dr. Charles Drew',
            specialty: 'Hematology',
            experience: '8 Years',
            rating: 4.6,
            reviewsCount: 19,
            fee: 150,
            avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=80',
            nextAvailable: 'Monday, 10:30 AM'
          },
          {
            id: 'doc-003',
            name: 'Dr. Virginia Apgar',
            specialty: 'Anesthesiology',
            experience: '15 Years',
            rating: 4.9,
            reviewsCount: 42,
            fee: 180,
            avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=80',
            nextAvailable: 'Wednesday, 02:00 PM'
          }
        ]);
      }, 500);
    });
  },

  /**
   * Fetch details of a single doctor.
   * @param {string} id
   * @returns {Promise<Object>} Doctor object
   */
  async getDoctorById(id) {
    // In next sprint: return (await apiClient.get(`/doctors/${id}`)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: id || 'doc-001',
          name: id === 'doc-002' ? 'Dr. Charles Drew' : id === 'doc-003' ? 'Dr. Virginia Apgar' : 'Dr. Elizabeth Blackwell',
          specialty: id === 'doc-002' ? 'Hematology' : id === 'doc-003' ? 'Anesthesiology' : 'Cardiology',
          experience: id === 'doc-002' ? '8 Years' : id === 'doc-003' ? '15 Years' : '12 Years',
          rating: id === 'doc-002' ? 4.6 : id === 'doc-003' ? 4.9 : 4.8,
          reviewsCount: id === 'doc-002' ? 19 : id === 'doc-003' ? 42 : 34,
          fee: id === 'doc-002' ? 150 : id === 'doc-003' ? 180 : 200,
          school: id === 'doc-002' ? 'Columbia University VP&S' : id === 'doc-003' ? 'Columbia University VP&S' : 'Geneva Medical College',
          bio: 'Dedicated medical professional committed to providing empathetic, high-fidelity telehealth care options.',
          avatar: id === 'doc-002' ? 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=80' : id === 'doc-003' ? 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=80' : 'https://images.unsplash.com/photo-1594824813573-246434de83fb?auto=format&fit=crop&q=80&w=80'
        });
      }, 300);
    });
  },

  /**
   * Update doctor profile details.
   * @param {Object} data
   * @returns {Promise<Object>} Update result
   */
  async updateProfile(data) {
    // In next sprint: return (await apiClient.put('/doctors/profile', data)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Doctor profile updated.' });
      }, 600);
    });
  },

  /**
   * Get available scheduler slots.
   * @returns {Promise<Array>} Available slots
   */
  async getAvailability() {
    // In next sprint: return (await apiClient.get('/doctors/availability')).data;
    return Promise.resolve([
      { id: 'slot-1', time: '09:00 AM - 09:30 AM', status: 'available', day: 'Monday' },
      { id: 'slot-2', time: '10:00 AM - 10:30 AM', status: 'booked', day: 'Monday' },
      { id: 'slot-3', time: '02:00 PM - 02:30 PM', status: 'available', day: 'Tuesday' }
    ]);
  },

  /**
   * Save doctor weekly schedule blocks.
   * @param {Array} slots
   * @returns {Promise<Object>} Save result
   */
  async saveAvailability(slots) {
    // In next sprint: return (await apiClient.post('/doctors/availability', { slots })).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Availability schedule saved.' });
      }, 500);
    });
  }
};

export default doctorService;
