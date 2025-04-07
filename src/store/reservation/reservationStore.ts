// stores/reservationStore.ts
import { defineStore } from 'pinia'

export const useReservationStore = defineStore('reservation', {
  state: () => ({
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
    saveReservation(data: any) {
      this.selectedCar = data.selectedCar
      this.passengerInfo = data.passengerInfo
      this.departureDate = data.departureDate
      this.tripType = data.tripType
      this.forfait = data.forfait
      this.custom = data.custom
    },
  },
})
