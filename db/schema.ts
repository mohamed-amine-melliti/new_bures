import { pgTable, varchar, integer, timestamp } from 'drizzle-orm/pg-core'

export const reservationTable = pgTable('reservations', {
  code: varchar('code', { length: 20 }).primaryKey(), // code is now the primary key
  car: varchar('car', { length: 100 }).notNull(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull(),
  phone: varchar('phone', { length: 20 }).notNull(),
  passengers: integer('passengers').notNull(),
  baggage: integer('baggage').notNull(),
  departureDate: timestamp('departure_date').notNull(),
  tripType: varchar('trip_type', { length: 50 }).notNull(),
  forfaitDeparture: varchar('forfait_departure', { length: 100 }),
  forfaitDestination: varchar('forfait_destination', { length: 100 }),
  location: varchar('location', { length: 100 }),
})
