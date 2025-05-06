import { pgTable, serial, text, timestamp, varchar, numeric } from 'drizzle-orm/pg-core';

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  code: varchar('code', { length: 50 }).notNull(),
  car: text('car').notNull(),
  passengerInfo: text('passenger_info').notNull(),
  departureDate: timestamp('departure_date').notNull(),
  tripType: varchar('trip_type', { length: 50 }).notNull(),
  forfaitDeparture: varchar('forfait_departure', { length: 255 }),
  forfaitDestination: varchar('forfait_destination', { length: 255 }),
  location: text('location'),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});
