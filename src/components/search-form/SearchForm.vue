<template>
  <div class="fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh] rounded-xl z-50 p-4 flex flex-col overflow-hidden">
    <div class="overflow-y-auto h-full space-y-4 pr-2 hide-scrollbar">
      <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4">
        <!-- Header with Car Picker Trigger -->
        <CarPickerTrigger v-model="selectedCar" />
        
        <!-- Info -->
        <InfoPassager @update:info="handleInfoUpdate" />
        
        <!-- Date Picker -->
        <DateDepartPicker @update:departureDate="handleDateChange" />
        
        <!-- Tabs -->
        <div class="flex bg-gray-100 rounded-md overflow-hidden w-full">
          <button :class="tripType === 'Forfaitaire' ? activeTabClass : tabClass" @click="tripType = 'Forfaitaire'">Forfaitaire</button>
          <button :class="tripType === 'Personnalisé' ? activeTabClass : tabClass" @click="tripType = 'Personnalisé'">Personnalisé</button>
        </div>

        <!-- Forfaitaire Content -->
        <div v-if="tripType === 'Forfaitaire'" class="text-center text-black-400 italic py-8 space-y-4">
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <select v-model="forfaitDeparture" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez un point</option>
              <option v-for="point in points" :key="point.value" :value="point.value">{{ point.label }}</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium">Destination</label>
            <select v-model="forfaitDestination" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez une destination</option>
              <option v-for="destination in destinations" :key="destination.value" :value="destination.value">{{ destination.label }}</option>
            </select>
          </div>

          <div class="pt-4">
            <ToastProvider>
              <Button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isForfaitValid"
                @click="handleClick"
              >
                Réserver
              </Button>

              <!-- Toast Code Unchanged -->
              <ToastRoot v-model:open="open" class="...">...</ToastRoot>
              <ToastViewport class="..." />
            </ToastProvider>
          </div>
        </div>

        <!-- Personnalisé Content -->
        <div v-if="tripType === 'Personnalisé'" class="space-y-4">
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <SearchBar :placeholder="'Votre point de départ'" />
          </div>

          <div>
            <label class="block text-sm font-medium">Destination</label>
            <SearchBarDesination />
          </div>

          <div class="pt-4">
            <ToastProvider>
              <Button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!isPersonnaliseValid"
                @click="handleClick"
              >
                Réserver
              </Button>

              <!-- Toast Code Unchanged -->
              <ToastRoot v-model:open="open" class="...">...</ToastRoot>
              <ToastViewport class="..." />
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

// 🔹 External UI Components
import { ToastProvider, ToastRoot, ToastViewport } from 'radix-vue'

// 🔹 Internal Components
import DateDepartPicker from './DateDepartPicker.vue'
import SearchBar from '../searchbar/SearchBar.vue'
import InfoPassager from './InfoPassager.vue'
import { points } from '@/interfaces/points'
import SearchBarDesination from '../searchbardestination/SearchBarDesination.vue'
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
// 🔸 Passenger Info
// =============================
interface PassengerInfo {
  passengers: string
  baggage: string
}

const passengerInfo = ref<PassengerInfo>({
  passengers: '',
  baggage: ''
})

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

// =============================
// 🔸 Validation
// =============================
const isForfaitValid = computed(() => {
  return (
    selectedCar.value &&
    forfaitDeparture.value &&
    forfaitDestination.value &&
    passengerInfo.value.passengers &&
    passengerInfo.value.baggage
  )
})

const isPersonnaliseValid = computed(() => {
  return (
    selectedCar.value &&
    passengerInfo.value.passengers &&
    passengerInfo.value.baggage
    // ✅ Add extra checks here when using custom SearchBar/SearchBarDesination refs
  )
})

// =============================
// 🔸 Reservation Submit Handler
// =============================
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
      passengers: passengerInfo.value.passengers,
      baggage: passengerInfo.value.baggage,
      departureDate: eventDateRef.value.toISOString(),
      tripType: tripType.value,
      forfaitDeparture: forfaitDeparture.value,
      forfaitDestination: forfaitDestination.value,
    }

    store.commit('reservation/saveReservation', reservation)

    console.log('Type de réservation:', type)
    console.log('Code:', code)
    console.log('Date estimée:', prettyDate(eventDateRef.value))
    console.log('Réservation:', reservation)
  }, 100)
}

// =============================
// 🔸 Event Handlers from Children
// =============================
function handleDateChange(date: string) {
  console.log('Departure date selected:', date)
}

function handleInfoUpdate(data: { passengers: string; baggage: string }) {
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