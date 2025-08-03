'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface User {
  id: string
  email: string
  name: string
  role: 'Admin' | 'Doctor' | 'Nurse' | 'Receptionist' | 'Lab Staff' | 'Pharmacist' | 'Patient'
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing session on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (typeof window !== 'undefined') {
          const savedUser = localStorage.getItem('hospitron_user')
          if (savedUser) {
            setUser(JSON.parse(savedUser))
          }
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // For now, using dummy authentication
      // TODO: Replace with actual Cognito authentication
      if (email === 'doctor@hospital.com' && password === 'doctor123') {
        const mockUser: User = {
          id: '1',
          email: 'doctor@hospital.com',
          name: 'Dr. John Smith',
          role: 'Doctor',
        }
        setUser(mockUser)
        if (typeof window !== 'undefined') {
          localStorage.setItem('hospitron_user', JSON.stringify(mockUser))
        }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('hospitron_user')
    }
  }

  const contextValue: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}
