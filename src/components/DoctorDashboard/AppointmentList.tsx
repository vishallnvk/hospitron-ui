'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Calendar, Clock, User, Phone, MapPin, Filter, Search } from 'lucide-react'
import { appointmentApi } from '@/lib/api/appointment'
import { Appointment } from '@/types/appointment'

interface AppointmentListProps {
  doctorId: string
  onAppointmentSelect?: (appointment: Appointment) => void
}

export default function AppointmentList({ doctorId, onAppointmentSelect }: AppointmentListProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  )

  const fetchAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const response = await appointmentApi.getAppointmentsByDoctor(doctorId, {
        date: selectedDate,
        status: statusFilter === 'all' ? undefined : statusFilter
      })
      
      if (response.success) {
        const appointmentsData = Array.isArray(response.data) ? response.data : response.data ? [response.data] : []
        setAppointments(appointmentsData)
      } else {
        setError(response.message || 'Failed to load appointments')
      }
    } catch (err) {
      console.error('Error fetching appointments:', err)
      setError('Failed to load appointments')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAppointments()
  }, [doctorId, selectedDate, statusFilter])

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.appointment_type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.notes?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadgeVariant = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'default'
      case 'confirmed':
        return 'secondary'
      case 'in_progress':
        return 'outline'
      case 'completed':
        return 'success'
      case 'cancelled':
        return 'destructive'
      case 'no_show':
        return 'destructive'
      default:
        return 'default'
    }
  }

  const formatTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString)
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'scheduled':
        return 'text-blue-600'
      case 'confirmed':
        return 'text-green-600'
      case 'in_progress':
        return 'text-yellow-600'
      case 'completed':
        return 'text-green-800'
      case 'cancelled':
        return 'text-red-600'
      case 'no_show':
        return 'text-red-800'
      default:
        return 'text-gray-600'
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 bg-gray-200 animate-pulse rounded"></div>
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-lg"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-red-600">
            <p>{error}</p>
            <Button onClick={fetchAppointments} className="mt-2" variant="outline">
              Try Again
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2">
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-40"
          />
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="scheduled">Scheduled</option>
            <option value="confirmed">Confirmed</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="no_show">No Show</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <div className="space-y-4">
        {filteredAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-8">
              <div className="text-center text-gray-500">
                <Calendar className="mx-auto h-12 w-12 mb-4 opacity-50" />
                <h3 className="text-lg font-medium mb-2">No appointments found</h3>
                <p className="text-sm">
                  {searchTerm || statusFilter !== 'all' || selectedDate !== new Date().toISOString().split('T')[0]
                    ? 'No appointments match your current filters.'
                    : 'No appointments scheduled for today.'}
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredAppointments.map((appointment) => (
            <Card
              key={appointment.appointment_id}
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => onAppointmentSelect?.(appointment)}
            >
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium text-lg">{appointment.patient_name}</h3>
                      <Badge variant={getStatusBadgeVariant(appointment.status)}>
                        {appointment.status?.replace('_', ' ')}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        <span>{formatTime(appointment.appointment_datetime)}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{appointment.appointment_type || 'Consultation'}</span>
                      </div>
                      
                      {appointment.patient_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{appointment.patient_phone}</span>
                        </div>
                      )}
                      
                      {appointment.room_number && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>Room {appointment.room_number}</span>
                        </div>
                      )}
                    </div>
                    
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 italic">
                        {appointment.notes.length > 100
                          ? `${appointment.notes.substring(0, 100)}...`
                          : appointment.notes}
                      </p>
                    )}
                  </div>
                  
                  <div className="ml-4 text-right">
                    <div className={`text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status?.replace('_', ' ').toUpperCase()}
                    </div>
                    {appointment.duration && (
                      <div className="text-xs text-gray-500 mt-1">
                        {appointment.duration} min
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {filteredAppointments.length > 0 && (
        <div className="text-center text-sm text-gray-500 pt-4">
          Showing {filteredAppointments.length} appointment{filteredAppointments.length !== 1 ? 's' : ''}
          {selectedDate && ` for ${new Date(selectedDate).toLocaleDateString()}`}
        </div>
      )}
    </div>
  )
}
