import axios from 'axios'

const http = axios.create({
  baseURL: 'http://localhost:8000/api', // Laravel backend URL
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default http
