// // composables/googleCalendar.ts
// import { ref } from 'vue'
// import { gapi } from 'gapi-script'

// const CLIENT_ID = '60001087269-604l6oqd1cfsgumafrg1hu599n32f7v3.apps.googleusercontent.com'
// const API_KEY = 'AIzaSyDERLtexY6NQlF16gz1SQ_WDeUub3IhbB0'
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest']
// const SCOPES = 'https://www.googleapis.com/auth/calendar.events'

// const isSignedIn = ref(false)

// export function useGoogleCalendar() {
//   function initClient() {
//     return new Promise<void>((resolve, reject) => {
//       gapi.load('client:auth2', async () => {
//         try {
//           await gapi.client.init({
//             apiKey: API_KEY,
//             clientId: CLIENT_ID,
//             discoveryDocs: DISCOVERY_DOCS,
//             scope: SCOPES,
//           })

//           gapi.auth2.getAuthInstance().isSignedIn.listen((val) => {
//             isSignedIn.value = val
//           })

//           isSignedIn.value = gapi.auth2.getAuthInstance().isSignedIn.get()
//           resolve()
//         } catch (error) {
//           reject(error)
//         }
//       })
//     })
//   }

//   function signIn() {
//     return gapi.auth2.getAuthInstance().signIn()
//   }

//   function signOut() {
//     return gapi.auth2.getAuthInstance().signOut()
//   }

//   async function createEvent(summary: string, start: string, end: string) {
//     const event = {
//       summary,
//       start: {
//         dateTime: start,
//         timeZone: 'Europe/Paris',
//       },
//       end: {
//         dateTime: end,
//         timeZone: 'Europe/Paris',
//       },
//     }

//     const request = gapi.client.calendar.events.insert({
//       calendarId: 'primary',
//       resource: event,
//     })

//     return request.execute()
//   }

//   return {
//     initClient,
//     signIn,
//     signOut,
//     createEvent,
//     isSignedIn,
//   }
// }
