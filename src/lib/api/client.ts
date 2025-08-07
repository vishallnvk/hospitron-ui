import axios from 'axios'
import appConfig from '@/app-config.json'

// Create axios instance with base configuration
export const apiClient = axios.create({
  baseURL: appConfig.apiBaseUrl,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    // For now, we'll add auth token later when we integrate with Cognito
    // const token = localStorage.getItem('access_token')
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`
    // }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    // Handle common errors here
    if (error.response?.status === 401) {
      // Handle unauthorized
      console.warn('Unauthorized access - redirecting to login')
      // window.location.href = '/login'
    } else if (error.response?.status === 403) {
      // Handle forbidden
      console.warn('Forbidden access')
    } else if (error.response?.status >= 500) {
      // Handle server errors
      console.error('Server error:', error.response.status)
    }
    
    return Promise.reject(error)
  }
)

export default apiClient
