// stores/reservationStore.ts
import { defineStore } from 'pinia'

// Define a TypeScript interface for the state
interface Forfait {
  departure: string;
  destination: string;
}

interface Custom {
  departure: string;
  destination: string;
}

interface PassengerInfo {
  name: string;
  email: string;
  phone: string;
  passengers: string;
  baggage: string;
}

interface ReservationState {
  selectedCar: string | null;  // Assuming car is a string, change it if it's an object
  passengerInfo: PassengerInfo | {};  // Optional empty object or a defined type
  departureDate: Date | null;
  tripType: 'Forfaitaire' | 'Personnalise';  // You can extend these types if needed
  forfait: Forfait;
  custom: Custom;
}

export const useReservationStore = defineStore('reservation', {
  state: (): ReservationState => ({
    selectedCar: null,
    passengerInfo: {},
    departureDate: null,
    tripType: 'Forfaitaire',
    forfait: {
      departure: '',
      destination: '',
    },
    custom: {
      departure: '',
      destination: '',
    },
  }),
  actions: {
    // Typing the data argument for the saveReservation action
    saveReservation(data: {
      selectedCar: string;
      passengerInfo: PassengerInfo;
      departureDate: Date;
      tripType: 'Forfaitaire' | 'Personnalise';
      forfait: Forfait;
      custom: Custom;
    }) {
      this.selectedCar = data.selectedCar
      this.passengerInfo = data.passengerInfo
      this.departureDate = data.departureDate
      this.tripType = data.tripType
      this.forfait = data.forfait
      this.custom = data.custom
    },
  },
})
