import { ref } from 'vue'

export interface PassengerInfo {
  name: string
  email: string
  phone: string
  passengers: string
  baggage: string
}

export const passengerInfo = ref<PassengerInfo>({
  name: '',
  email: '',
  phone: '',
  passengers: '',
  baggage: ''
})
