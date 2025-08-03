'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  CircularProgress,
} from '@mui/material'
import { LocalHospital } from '@mui/icons-material'
import { useAuth } from '@/components/AuthProvider'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%', borderRadius: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3 }}>
            <LocalHospital sx={{ fontSize: 40, color: 'primary.main', mr: 2 }} />
            <Typography component="h1" variant="h4" color="primary">
              Hospitron
            </Typography>
          </Box>
          
          <Typography variant="h5" align="center" gutterBottom>
            Hospital Management System
          </Typography>
          
          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            Sign in to access your dashboard
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoading}
            />
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1.5 }}
              disabled={isLoading}
            >
              {isLoading ? (
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CircularProgress size={20} sx={{ mr: 1 }} />
                  Signing In...
                </Box>
              ) : (
                'Sign In'
              )}
            </Button>
          </Box>

          {/* Demo credentials info */}
          <Box sx={{ mt: 3, p: 2, bgcolor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              <strong>Demo Credentials:</strong>
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Email: doctor@hospital.com
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Password: doctor123
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  )
}
