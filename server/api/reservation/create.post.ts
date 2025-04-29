import { Router } from 'express'
import { z } from 'zod'
import { db } from '../../../db/drizzle'
import { reservationTable } from '../../../db/schema'
import { ReservationSchema } from '../../../zod-schema/reservation-schema'

const router = Router()

// Define the reservation creation route
router.post('/reservation', async (req, res) => {
  try {
    // Validate the request body using the ReservationSchema
    const result = ReservationSchema.safeParse(req.body)

    if (!result.success) {
      const errorFields = result.error.issues.map(issue => issue.path.join('.')).join(', ')
      console.error('Validation failed for:', errorFields)
      return res.status(400).json({ message: `Validation failed for: ${errorFields}` })
    }
    const code = 'VTC-' + Math.random().toString(36).substring(2, 8).toUpperCase()

    // Destructure the validated data from the request body
    const {
      car,
      name,
      email,
      phone,
      passengers,
      baggage,
      departureDate,
      tripType,
      forfaitDeparture,
      forfaitDestination,
      location,
    } = result.data

    // Generate a unique reservation code (you can customize this)

    // Insert the reservation into the database
    await db.insert(reservationTable).values({
      code, // primary key
      car,
      name,
      email,
      phone,
      passengers,
      baggage,
      departureDate,
      tripType,
      forfaitDeparture,
      forfaitDestination,
      location,
    })
    

    // Send the success response back to the client
    return res.status(201).json({ message: 'Reservation created successfully!' })
  } catch (err) {
    // Handle any server errors
    console.error('Server error:', err)
    return res.status(500).json({ message: 'Internal Server Error' })
  }
})

export default router
