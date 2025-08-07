import { apiClient } from './client'
import { 
  Appointment, 
  CreateAppointmentRequest, 
  UpdateAppointmentRequest, 
  AppointmentFilter, 
  AppointmentResponse 
} from '@/types/appointment'

export const appointmentApi = {
  // Get appointments by doctor
  async getAppointmentsByDoctor(
    doctorId: string,
    filters?: AppointmentFilter
  ): Promise<AppointmentResponse> {
    try {
      const params = new URLSearchParams()
      if (filters?.date) params.append('date', filters.date)
      if (filters?.status) params.append('status', filters.status)
      
      const queryString = params.toString()
      const url = `/appointments/doctor/${doctorId}${queryString ? `?${queryString}` : ''}`
      
      const response = await apiClient.get(url)
      return response.data
    } catch (error: any) {
      console.error('Error fetching doctor appointments:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointments',
        data: []
      }
    }
  },

  // Get appointments by patient
  async getAppointmentsByPatient(
    patientId: string,
    filters?: AppointmentFilter
  ): Promise<AppointmentResponse> {
    try {
      const params = new URLSearchParams()
      if (filters?.date) params.append('date', filters.date)
      if (filters?.status) params.append('status', filters.status)
      
      const queryString = params.toString()
      const url = `/appointments/patient/${patientId}${queryString ? `?${queryString}` : ''}`
      
      const response = await apiClient.get(url)
      return response.data
    } catch (error: any) {
      console.error('Error fetching patient appointments:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointments',
        data: []
      }
    }
  },

  // Get single appointment
  async getAppointment(appointmentId: string): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.get(`/appointments/${appointmentId}`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching appointment:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch appointment'
      }
    }
  },

  // Create appointment
  async createAppointment(appointmentData: CreateAppointmentRequest): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.post('/appointments', appointmentData)
      return response.data
    } catch (error: any) {
      console.error('Error creating appointment:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to create appointment'
      }
    }
  },

  // Update appointment
  async updateAppointment(
    appointmentId: string, 
    updateData: UpdateAppointmentRequest
  ): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.put(`/appointments/${appointmentId}`, updateData)
      return response.data
    } catch (error: any) {
      console.error('Error updating appointment:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update appointment'
      }
    }
  },

  // Update appointment status
  async updateAppointmentStatus(
    appointmentId: string, 
    status: string
  ): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.patch(`/appointments/${appointmentId}/status`, { status })
      return response.data
    } catch (error: any) {
      console.error('Error updating appointment status:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update appointment status'
      }
    }
  },

  // Delete appointment
  async deleteAppointment(appointmentId: string): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.delete(`/appointments/${appointmentId}`)
      return response.data
    } catch (error: any) {
      console.error('Error deleting appointment:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to delete appointment'
      }
    }
  },

  // Get today's appointments for a doctor
  async getTodayAppointments(doctorId: string): Promise<AppointmentResponse> {
    const today = new Date().toISOString().split('T')[0]
    return this.getAppointmentsByDoctor(doctorId, { date: today })
  },

  // Get upcoming appointments for a doctor
  async getUpcomingAppointments(doctorId: string): Promise<AppointmentResponse> {
    try {
      const response = await apiClient.get(`/appointments/doctor/${doctorId}/upcoming`)
      return response.data
    } catch (error: any) {
      console.error('Error fetching upcoming appointments:', error)
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to fetch upcoming appointments',
        data: []
      }
    }
  }
}

export default appointmentApi
