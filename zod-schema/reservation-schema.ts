// src/zod-schemas/reservation-schema.ts
import { z } from 'zod'

export const ReservationSchema = z.object({
  code: z.string().optional(), // generated server-side
  car: z.string().min(1, 'Car is required'),
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(6, 'Phone number is too short'),
  passengers: z.coerce.number().int().min(1, 'At least one passenger'),
  baggage: z.coerce.number().int().min(0),
  departureDate: z.coerce.date({ required_error: 'Departure date is required' }),
  tripType: z.string().min(1, 'Trip type is required'),
  forfaitDeparture: z.string().optional(),
  forfaitDestination: z.string().optional(),
  location: z.string().optional(),
})

export type ReservationInput = z.infer<typeof ReservationSchema>
