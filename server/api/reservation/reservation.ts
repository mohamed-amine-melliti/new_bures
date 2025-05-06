const express = require('express');
const router = express.Router();
const { db } = require('../../../db/drizzle');
const { reservations } = require('../../../db/schema');

router.post('/', async (req, res) => {
  try {
    const reservation = req.body;
    const [newReservation] = await db
      .insert(reservations)
      .values({
        code: reservation.code,
        car: JSON.stringify(reservation.car),
        passengerInfo: JSON.stringify(reservation.passengerInfo),
        departureDate: new Date(reservation.departureDate),
        tripType: reservation.tripType,
        forfaitDeparture: reservation.forfaitDeparture,
        forfaitDestination: reservation.forfaitDestination,
        location: reservation.location,
        amount: reservation.amount
      })
      .returning();

    res.status(201).json(newReservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ error: 'Failed to create reservation' });
  }
});

module.exports = router;