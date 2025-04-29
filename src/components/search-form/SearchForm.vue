<template>
  <!-- ✅ Mobile Toggle Button -->
  <div class="fixed top-4 left-4 z-50 lg:hidden">
    <button @click="showForm = !showForm" class="bg-white shadow-md rounded-full p-2 border border-gray-300"
      aria-label="Toggle reservation form">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>

  <!-- ✅ Form Container (Toggled on Mobile, Always visible on Desktop) -->
  <div
    :class="[
      'fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh] rounded-xl z-40 p-4 flex flex-col',
      'lg:block',
      showForm ? 'block' : 'hidden'
    ]"
  >
    <!-- ✅ Scrollable wrapper -->
    <div class="flex flex-col h-full overflow-hidden">
      <div class="flex-1 overflow-y-auto pr-2 hide-scrollbar max-h-[calc(90vh-3rem)]">
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

            <div class="pt-4">
              <ToastProvider>
                <Button :disabled="!isFormValid" :class="[
                  'w-full font-semibold py-2 px-4 rounded-md shadow transition',
                  isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                ]" @click="isFormValid && handleClick('forfaitaire')">
                  Réserver
                </Button>

                <ReservationToast v-if="isFormValid" v-model:open="open" :eventDate="eventDateRef"
                  :customCode="generateReservationCode()" />
                <ToastViewport class="[--viewport-padding:_25px] fixed top-4 left-1/2 transform -translate-x-1/2 
                  flex flex-col p-[var(--viewport-padding)] gap-[10px] 
                  w-[390px] max-w-[100vw] z-[2147483647] 
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
              <SearchBar :placeholder="'Votre point de départ'" :car="selectedCar" v-model="departureText" />
            </div>

            <div class="pt-4">
              <ToastProvider>
                <Button :disabled="!isFormValid" :class="[
                  'w-full font-semibold py-2 px-4 rounded-md shadow transition',
                  isFormValid
                    ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer'
                    : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                ]" @click="isFormValid && handleClick('personnalise')">
                  Réserver
                </Button>

                <ReservationToast v-if="isFormValid" :open="open" :eventDate="eventDateRef"
                  :customCode="generateReservationCode()" :customText="prettyDate(eventDateRef)" />
                <ToastViewport class="[--viewport-padding:_25px] fixed top-4 left-1/2 transform -translate-x-1/2 
                  flex flex-col p-[var(--viewport-padding)] gap-[10px] 
                  w-[390px] max-w-[100vw] z-[2147483647] 
                  outline-none pointer-events-none" />
              </ToastProvider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>






<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { useStore } from 'vuex'
import { PassengerInfo, passengerInfo } from '@/interfaces/usePassengerInfo'
import emailjs from '@emailjs/browser'
import ReservationToast from './ReservationToast.vue'
import SearchBarDepart from '../searchbardestination/SearchBarDepart.vue'
import { ToastProvider, ToastViewport } from 'radix-vue'
import DateDepartPicker from './DateDepartPicker.vue'
import SearchBar from '../searchbar/SearchBar.vue'
import InfoPassager from './InfoPassager.vue'
import { points } from '@/interfaces/points'
import CarPickerTrigger from './CarPickerTrigger.vue'

// ✅ UI tab classes
const tabClass =
  'w-1/2 py-2 text-center text-sm text-gray-600 hover:bg-gray-200 transition'
const activeTabClass =
  'w-1/2 py-2 text-center text-sm bg-white font-semibold border border-gray-300'

// ✅ Reactive state
const showForm = ref(false)
const selectedCar = ref(null)
const forfaitDeparture = ref('')
const forfaitDestination = ref('')
const destinations = [...points] // ✅ This was missing
const eventDateRef = ref(new Date())
const tripType = ref('Forfaitaire')
const departureText = ref('')
const selectedPlace = ref(null)

// ✅ Form validation: only show button when all fields are filled
const isFormValid = computed(() => {
  return (
    selectedCar.value &&
    forfaitDeparture.value &&
    forfaitDestination.value &&
    Object.keys(passengerInfo.value || {}).length > 0
  )
})

// ✅ Toast & Reservation logic
const isProcessing = ref(false)
const open = ref(false)
const timerRef = ref(0)

function generateReservationCode(): string {
  return 'VTC-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

function prettyDate(date: Date): string {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

// ✅ Vuex store and submission
const store = useStore()
emailjs.init('walt8N3u7ba3ic9lb')

const handleClick = () => {
  if (isProcessing.value) return
  isProcessing.value = true

  open.value = false
  clearTimeout(timerRef.value as number)
  timerRef.value = setTimeout(async () => {
    eventDateRef.value = new Date()
    eventDateRef.value.setDate(eventDateRef.value.getDate() + 7)

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
      location: selectedPlace.value,
    }

    try {
      await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservation),
      })

      store.commit('reservation/saveReservation', reservation)

      await emailjs.send('', '', {
        to_email: passengerInfo.value.email,
        email: passengerInfo.value.email,
        name: passengerInfo.value.name,
        phone: passengerInfo.value.phone,
        passengers: passengerInfo.value.passengers,
        baggage: passengerInfo.value.baggage,
        code,
        date: prettyDate(eventDateRef.value),
      })

      console.log('Email sent and reservation saved!')
      window.location.replace(window.location.origin + '/#/success')
    } catch (error) {
      console.error('Error during reservation:', error)
    } finally {
      isProcessing.value = false
    }
  }, 100)
}


// ✅ Event handlers
function handlePlaceSelected(place: any) {
  departureText.value = place.display_name
  selectedPlace.value = place
}

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