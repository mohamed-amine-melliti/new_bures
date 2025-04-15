<template>
  <div class="fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh] rounded-xl z-50 p-4 flex flex-col overflow-hidden">
    <div class="overflow-y-auto h-full space-y-4 pr-2 hide-scrollbar">
      <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4">
        <!-- Car Picker -->
        <CarPickerTrigger v-model="selectedCar" />

        <!-- Passenger Info -->
        <InfoPassager @update:info="handleInfoUpdate" />

        <!-- Departure Date -->
        <DateDepartPicker @update:departureDate="handleDateChange" />

        <!-- Trip Type Tabs -->
        <div class="flex bg-gray-100 rounded-md overflow-hidden w-full">
          <button :class="tripType === 'Forfaitaire' ? activeTabClass : tabClass" @click="tripType = 'Forfaitaire'">
            Forfaitaire
          </button>
          <button :class="tripType === 'Personnalisé' ? activeTabClass : tabClass" @click="tripType = 'Personnalisé'">
            Personnalisé
          </button>
        </div>

        <!-- Forfaitaire Section -->
        <div v-if="tripType === 'Forfaitaire'" class="space-y-4">
          <!-- Point de départ -->
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <select v-model="forfaitDeparture" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez un point</option>
              <option v-for="point in points" :key="point.value" :value="point.value"
                :disabled="point.value === forfaitDestination">
                {{ point.label }}
              </option>
            </select>
          </div>

          <!-- Destination -->
          <div>
            <label class="block text-sm font-medium">Destination</label>
            <select v-model="forfaitDestination" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez une destination</option>
              <option v-for="destination in destinations" :key="destination.value" :value="destination.value"
                :disabled="destination.value === forfaitDeparture">
                {{ destination.label }}
              </option>
            </select>
          </div>

          <!-- Reservation Button -->
          <div class="pt-4">
            <ToastProvider>
              <Button :disabled="!isPassengerInfoValid" :class="[
                'w-full font-semibold py-2 px-4 rounded-md shadow transition',
                isPassengerInfoValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              ]" @click="isPassengerInfoValid && handleClick('forfaitaire')">
                Réserver
              </Button>

              <ReservationToast v-if="isPassengerInfoValid" v-model:open="open" :eventDate="eventDateRef"
                :customCode="generateReservationCode()" />
              <ToastViewport class="[--viewport-padding:_25px] fixed top-4 left-1/2 transform -translate-x-1/2 
         flex flex-col p-[var(--viewport-padding)] gap-[10px] 
         w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] 
         outline-none pointer-events-none" />

            </ToastProvider>
          </div>
        </div>

        <!-- Personnalisé Section -->
        <div v-else class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <SearchBarDepart @placeSelected="handlePlaceSelected" />
          </div>

          <div>
            <label class="block text-sm font-medium">Destination</label>
            <SearchBar :placeholder="'Votre point de départ'" v-model="departureText" />
          </div>

          <div class="pt-4">
            <ToastProvider>
              <Button :disabled="!isPassengerInfoValid" :class="[
                'w-full font-semibold py-2 px-4 rounded-md shadow transition',
                isPassengerInfoValid
                  ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              ]" @click="isPassengerInfoValid && handleClick('personnalise')">
                Réserver
              </Button>

              <ReservationToast v-if="isPassengerInfoValid" :open="open" :eventDate="eventDateRef"
                :customCode="generateReservationCode()" :customText="prettyDate(eventDateRef)" />
              <ToastViewport class="[--viewport-padding:_25px] fixed top-4 left-1/2 transform -translate-x-1/2 
              flex flex-col p-[var(--viewport-padding)] gap-[10px] 
              w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] 
              outline-none pointer-events-none" />

            </ToastProvider>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>



<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { PassengerInfo, passengerInfo } from '@/interfaces/usePassengerInfo'
import emailjs from '@emailjs/browser'
import ReservationToast from './ReservationToast.vue'
import SearchBarDepart from '../searchbardestination/SearchBarDepart.vue'
// 🔹 External UI Components
import { ToastProvider, ToastViewport } from 'radix-vue'

// 🔹 Internal Components
import DateDepartPicker from './DateDepartPicker.vue'
import SearchBar from '../searchbar/SearchBar.vue'
import InfoPassager from './InfoPassager.vue'
import { points } from '@/interfaces/points'
import CarPickerTrigger from './CarPickerTrigger.vue'

// =============================
// 🔸 Toast State & Logic
// =============================
const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)

function oneWeekAway(): Date {
  const now = new Date()
  now.setDate(now.getDate() + 7)
  return now
}

function prettyDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

function generateReservationCode(): string {
  return 'VTC-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}




const isPassengerInfoValid = computed(() => {
  return passengerInfo.value && Object.keys(passengerInfo.value).length > 0;
});


// =============================
// 🔸 Vuex Store
// =============================
const store = useStore()

// =============================
// 🔸 Reservation Tabs
// =============================
const tripType = ref('Forfaitaire')
const departureDate = ref(null)

const tabClass =
  'w-1/2 py-2 text-center text-sm text-gray-600 hover:bg-gray-200 transition'
const activeTabClass =
  'w-1/2 py-2 text-center text-sm bg-white font-semibold border border-gray-300'


// =============================
// 🔸 Car Selection
// =============================
const selectedCar = ref(null)

// =============================
// 🔸 Forfaitaire Data
// =============================
const forfaitDeparture = ref('')
const forfaitDestination = ref('')
const destinations = [...points]
const departureText = ref('')


const handlePlaceSelected = (place: any) => {
  departureText.value = place.display_name // 👈 Set input value
}

// =============================
// 🔸 Reservation Submit Handler
// =============================

emailjs.init('walt8N3u7ba3ic9lb') // Replace with your EmailJS public key

function handleClick() {
  open.value = false
  clearTimeout(timerRef.value)

  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true

    const code = generateReservationCode()
    const type = tripType.value === 'Forfaitaire' ? 'forfait' : 'personnalise'

    const reservation = {
      type,
      code,
      car: selectedCar.value,
      ...passengerInfo.value,
      departureDate: eventDateRef.value.toISOString(),
      tripType: tripType.value,
      forfaitDeparture: forfaitDeparture.value,
      forfaitDestination: forfaitDestination.value,
    }

    store.commit('reservation/saveReservation', reservation)

    // Send email via EmailJS ,
    emailjs.send('', '', {
      to_email: passengerInfo.value.email,
      email: passengerInfo.value.email,
      name: passengerInfo.value.name,
      phone: passengerInfo.value.phone,
      passengers: passengerInfo.value.passengers,
      baggage: passengerInfo.value.baggage,
      code,
      date: prettyDate(eventDateRef.value)
    }, 'walt8N3u7ba3ic9lb')
      .then(() => {
        console.log('Email sent successfully!')
      })
      .catch((error) => {
        console.error('Email send error:', error)
      })

    console.log('Réservation:', reservation)
  }, 100)
}

// =============================
// 🔸 Event Handlers from Children
// =============================
function handleDateChange(date: string) {
  console.log('Departure date selected:', date)
}
function handleInfoUpdate(data: PassengerInfo) {
  passengerInfo.value = data
  console.log('Received from child:', data)
}
</script>


<style scoped>
/* Completely hide scrollbar */
.hide-scrollbar {
  scrollbar-width: none;
  /* Firefox */
  -ms-overflow-style: none;
  /* IE 10+ */
}

.hide-scrollbar::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Edge */
}
</style>