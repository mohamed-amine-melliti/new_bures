import http from './http'

export const getBookings = () => http.get('/bookings')

export const createBooking = (data: any) => http.post('/bookings', data)
