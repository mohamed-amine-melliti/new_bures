import http from './http';
export const getBookings = () => http.get('/bookings');
export const createBooking = (data) => http.post('/bookings', data);
//# sourceMappingURL=booking.js.map