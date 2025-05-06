import { google } from 'googleapis'
import { Request, Response } from 'express'

export default async function handler(req: Request, res: Response) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed')

  const { token, event } = req.body

  try {
    const auth = new google.auth.OAuth2()
    auth.setCredentials({ access_token: token })

    const calendar = google.calendar({ version: 'v3', auth })

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    })

    res.status(200).json({ message: 'Event created', eventId: response.data.id })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Failed to create event' })
  }
}
