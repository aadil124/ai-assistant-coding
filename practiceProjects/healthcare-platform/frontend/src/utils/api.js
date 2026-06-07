const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

class ApiClient {
  constructor() {
    this.token = localStorage.getItem('token') || null;
  }

  setToken(token) {
    this.token = token;
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }

  getToken() {
    return this.token;
  }

  async request(path, options = {}) {
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      const err = new Error(data.message || 'Something went wrong');
      err.errors = data.errors; // Attach validation details if present
      throw err;
    }

    return data;
  }

  // Authentication
  async login(email, password) {
    const data = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(data.token);
    return data;
  }

  async registerPatient(email, password, phoneNumber) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, phone_number: phoneNumber }),
    });
  }

  // Appointments
  async getAppointments() {
    return this.request('/appointments');
  }

  async lockSlot(doctorId, scheduledTime, symptomsDescription) {
    return this.request('/appointments/lock', {
      method: 'POST',
      body: JSON.stringify({
        doctor_id: doctorId,
        scheduled_time: scheduledTime,
        symptoms_description: symptomsDescription,
      }),
    });
  }

  async confirmAppointment(appointmentId) {
    return this.request('/appointments/confirm', {
      method: 'POST',
      body: JSON.stringify({ appointment_id: appointmentId }),
    });
  }

  // Consultations
  async joinConsultation(appointmentId) {
    return this.request('/consultations/join', {
      method: 'POST',
      body: JSON.stringify({ appointment_id: appointmentId }),
    });
  }

  async getClinicalNotes(consultationId) {
    return this.request(`/consultations/${consultationId}/notes`);
  }

  async saveClinicalNotes(consultationId, clinicalNotes, isFinalized) {
    return this.request(`/consultations/${consultationId}/notes`, {
      method: 'POST',
      body: JSON.stringify({ clinical_notes: clinicalNotes, is_finalized: isFinalized }),
    });
  }

  // Prescriptions
  async createPrescription(appointmentId, diagnosis, medications) {
    return this.request('/prescriptions', {
      method: 'POST',
      body: JSON.stringify({
        appointment_id: appointmentId,
        diagnosis,
        medications,
      }),
    });
  }

  async signPrescription(prescriptionId, otpToken) {
    return this.request(`/prescriptions/${prescriptionId}/sign`, {
      method: 'POST',
      body: JSON.stringify({ otp_token: otpToken }),
    });
  }
}

export const api = new ApiClient();
export default api;
