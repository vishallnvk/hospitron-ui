export interface Appointment {
  appointment_id: string
  patient_id: string
  doctor_id: string
  patient_name: string
  patient_phone?: string
  doctor_name: string
  appointment_datetime: string
  appointment_type?: string
  status: 'scheduled' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled' | 'no_show'
  duration?: number
  room_number?: string
  notes?: string
  created_at: string
  updated_at: string
}

export interface CreateAppointmentRequest {
  patient_id: string
  doctor_id: string
  appointment_datetime: string
  appointment_type?: string
  duration?: number
  room_number?: string
  notes?: string
}

export interface UpdateAppointmentRequest {
  appointment_datetime?: string
  appointment_type?: string
  status?: string
  duration?: number
  room_number?: string
  notes?: string
}

export interface AppointmentFilter {
  date?: string
  status?: string
  patient_id?: string
  doctor_id?: string
}

export interface AppointmentResponse {
  success: boolean
  message?: string
  data?: Appointment | Appointment[]
  total?: number
  page?: number
  limit?: number
}
