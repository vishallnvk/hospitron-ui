'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Paper,
  Button,
  IconButton,
  AppBar,
  Toolbar,
} from '@mui/material'
import {
  LocalHospital,
  CalendarToday,
  People,
  Assignment,
  ExitToApp,
  Notifications,
  Schedule,
  Person,
  MedicalServices,
} from '@mui/icons-material'
import { useAuth } from '@/components/AuthProvider'

// Mock data for dashboard
const todayAppointments = [
  { id: 1, time: '9:00 AM', patient: 'John Smith', type: 'Consultation', status: 'confirmed' },
  { id: 2, time: '10:30 AM', patient: 'Sarah Johnson', type: 'Follow-up', status: 'confirmed' },
  { id: 3, time: '2:00 PM', patient: 'Michael Brown', type: 'Check-up', status: 'pending' },
  { id: 4, time: '3:30 PM', patient: 'Emily Davis', type: 'Consultation', status: 'confirmed' },
]

const recentPatients = [
  { id: 1, name: 'Alice Wilson', lastVisit: '2 days ago', condition: 'Hypertension' },
  { id: 2, name: 'Robert Lee', lastVisit: '1 week ago', condition: 'Diabetes' },
  { id: 3, name: 'Maria Garcia', lastVisit: '3 days ago', condition: 'Asthma' },
]

const stats = [
  { title: 'Today\'s Appointments', value: '8', icon: <CalendarToday /> },
  { title: 'Active Patients', value: '156', icon: <People /> },
  { title: 'Pending Reports', value: '12', icon: <Assignment /> },
  { title: 'Consultations This Week', value: '42', icon: <MedicalServices /> },
]

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user, router])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  if (!user) return null

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* Top Navigation */}
      <AppBar position="static" elevation={1}>
        <Toolbar>
          <LocalHospital sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Hospitron - Doctor Dashboard
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <IconButton color="inherit">
              <Notifications />
            </IconButton>
            <Avatar sx={{ bgcolor: 'secondary.main' }}>
              {user.name.charAt(0)}
            </Avatar>
            <Typography variant="body2" sx={{ display: { xs: 'none', md: 'block' } }}>
              {user.name}
            </Typography>
            <IconButton color="inherit" onClick={handleLogout}>
              <ExitToApp />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
        {/* Welcome Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            Welcome back, {user.name}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Here's an overview of your schedule and patient information
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {/* Statistics Cards */}
          {stats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card elevation={2}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'between' }}>
                    <Box>
                      <Typography color="textSecondary" gutterBottom variant="body2">
                        {stat.title}
                      </Typography>
                      <Typography variant="h4" component="h2" color="primary">
                        {stat.value}
                      </Typography>
                    </Box>
                    <Box sx={{ color: 'primary.main', ml: 2 }}>
                      {stat.icon}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}

          {/* Today's Appointments */}
          <Grid item xs={12} md={8}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Today's Appointments
                </Typography>
                <Button variant="outlined" size="small" startIcon={<CalendarToday />}>
                  View All
                </Button>
              </Box>
              
              {todayAppointments.map((appointment) => (
                <Box
                  key={appointment.id}
                  sx={{
                    display: 'flex',
                    justifyContent: 'between',
                    alignItems: 'center',
                    p: 2,
                    mb: 1,
                    border: 1,
                    borderColor: 'grey.200',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'grey.50' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Schedule sx={{ color: 'primary.main', mr: 2 }} />
                    <Box>
                      <Typography variant="body1" fontWeight="medium">
                        {appointment.time} - {appointment.patient}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {appointment.type}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={appointment.status}
                    color={appointment.status === 'confirmed' ? 'success' : 'warning'}
                    size="small"
                  />
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Recent Patients */}
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Patients
                </Typography>
                <Button variant="outlined" size="small" startIcon={<People />}>
                  View All
                </Button>
              </Box>
              
              {recentPatients.map((patient) => (
                <Box
                  key={patient.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    mb: 1,
                    border: 1,
                    borderColor: 'grey.200',
                    borderRadius: 1,
                    '&:hover': { bgcolor: 'grey.50' }
                  }}
                >
                  <Avatar sx={{ bgcolor: 'secondary.light', mr: 2 }}>
                    <Person />
                  </Avatar>
                  <Box>
                    <Typography variant="body1" fontWeight="medium">
                      {patient.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {patient.condition} • {patient.lastVisit}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Paper>
          </Grid>

          {/* Quick Actions */}
          <Grid item xs={12}>
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<CalendarToday />}
                    sx={{ py: 1.5 }}
                  >
                    Schedule Appointment
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Person />}
                    sx={{ py: 1.5 }}
                  >
                    Add Patient
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<Assignment />}
                    sx={{ py: 1.5 }}
                  >
                    View Reports
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<MedicalServices />}
                    sx={{ py: 1.5 }}
                  >
                    Medical Records
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}
