import apiClient from '../api/apiClient';

/**
 * Medical Record Service
 */
const medicalRecordService = {
  /**
   * Fetch health records list.
   * @returns {Promise<Array>} List of records
   */
  async getRecords() {
    // In next sprint: return (await apiClient.get('/records')).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 'REC-301',
            fileName: 'blood_chemistry_test.pdf',
            category: 'Lab Results',
            uploadedBy: 'Dr. Sarah Jenkins',
            date: 'June 20, 2026',
            size: '2.4 MB'
          },
          {
            id: 'REC-302',
            fileName: 'cardio_electrocardiogram.pdf',
            category: 'Diagnostic Reports',
            uploadedBy: 'Dr. Elizabeth Blackwell',
            date: 'June 18, 2026',
            size: '4.1 MB'
          }
        ]);
      }, 500);
    });
  },

  /**
   * Upload record file to cloud storage.
   * @param {File} file - Raw file binary
   * @param {Object} metadata - File detail properties
   * @returns {Promise<Object>} Upload status
   */
  async uploadRecord(file, metadata = {}) {
    // In next sprint:
    // const formData = new FormData();
    // formData.append('file', file);
    // Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));
    // return (await apiClient.post('/records/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } })).data;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          record: {
            id: `REC-${Math.floor(300 + Math.random() * 700)}`,
            fileName: file.name || 'document.pdf',
            category: metadata.category || 'General Health Note',
            uploadedBy: 'Self',
            date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
            size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
          }
        });
      }, 1000);
    });
  }
};

export default medicalRecordService;
