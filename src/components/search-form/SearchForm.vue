<template>
  <div class="fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh]  rounded-xl z-50 p-4 flex flex-col overflow-hidden">
    <div class="overflow-y-auto h-full space-y-4 pr-2 hide-scrollbar">
      <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4">
        <!-- Header with Car Picker Trigger -->
        <CarPickerTrigger v-model="selectedCar" />
        <!-- Info -->
        <InfoPassager @update:info="handleInfoUpdate"></InfoPassager>
        <!-- Date Picker -->
        <DateDepartPicker @update:departureDate="handleDateChange"></DateDepartPicker>
        <!-- Tabs -->
        <div class="flex bg-gray-100 rounded-md overflow-hidden w-full">
          <button :class="tripType === 'Forfaitaire' ? activeTabClass : tabClass" @click="tripType = 'Forfaitaire'">
            Forfaitaire
          </button>
          <button :class="tripType === 'Personnalisé' ? activeTabClass : tabClass" @click="tripType = 'Personnalisé'">
            Personnalisé
          </button>
        </div>
        <!-- Forfaitaire Content -->
        <div v-if="tripType === 'Forfaitaire'" class="text-center text-black-400 italic py-8">
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <select v-model="forfaitDeparture" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez un point</option>
              <option v-for="point in points" :key="point.value" :value="point.value">
                {{ point.label }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium">Destination</label>
            <select v-model="forfaitDestination" class="w-full border rounded-md p-2">
              <option disabled value="">Choisissez une destination</option>
              <option v-for="destination in destinations" :key="destination.value" :value="destination.value">
                {{ destination.label }}
              </option>
            </select>
          </div>


          <div class="pt-4">
            <ToastProvider>
              <Button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
                @click="handleClick">
                Réserver
              </Button>

              <ToastRoot v-model:open="open"
                class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
                <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                  Scheduled: Catch up
                </ToastTitle>
                <ToastDescription as-child>
                  <time class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                    :dateTime="eventDateRef.toISOString()">
                  </time>
                </ToastDescription>
                <ToastAction class="[grid-area:_action]" as-child alt-text="Goto schedule to undo">
                  <button
                    class="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                    Undo
                  </button>
                </ToastAction>
              </ToastRoot>
              <ToastViewport
                class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
            </ToastProvider>
          </div>
        </div>
        <!-- Personnalisé Content -->
        <div v-if="tripType === 'Personnalisé'" class="space-y-4">
          <!-- Departure -->
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <!-- <input v-model="departure" placeholder="Lieu de départ" class="w-full border rounded-md p-2" /> -->
            <SearchBar :placeholder="'Votre point de départ'" />
          </div>

          <!-- Destination -->
          <div>
            <label class="block text-sm font-medium">Destination</label>
            <!-- <input v-model="destination" placeholder="Lieu de destination" class="w-full border rounded-md p-2" /> -->
            <SearchBarDesination></SearchBarDesination>
          </div>
          <div class="pt-4">
            <ToastProvider>
              <Button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
                @click="handleClick">
                Réserver
              </Button>

              <ToastRoot v-model:open="open"
                class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
                <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                  Réservation Programmé
                </ToastTitle>
                <ToastDescription as-child>
                  <time class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                    :dateTime="eventDateRef.toISOString()">

                    Code Réservation : {{ generateReservationCode() }}
                    <br>
                    {{ prettyDate(eventDateRef) }}
                  </time>
                </ToastDescription>
                <ToastAction class="[grid-area:_action]" as-child alt-text="Goto schedule to undo">
                  <button
                    class="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] bg-green2 text-green11 shadow-[inset_0_0_0_1px] shadow-green7 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 focus:shadow-[0_0_0_2px] focus:shadow-green8">
                    Undo
                  </button>
                </ToastAction>
              </ToastRoot>
              <ToastViewport
                class="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
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
import { ToastProvider, ToastRoot, ToastViewport, ToastDescription, ToastTitle, ToastAction } from 'radix-vue'

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
import emailjs from '@emailjs/browser'
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
      passengers: passengerInfo.value.passengers,
      baggage: passengerInfo.value.baggage,
      departureDate: eventDateRef.value.toISOString(),
      tripType: tripType.value,
      forfaitDeparture: forfaitDeparture.value,
      forfaitDestination: forfaitDestination.value,
    }

    store.commit('reservation/saveReservation', reservation)

    // Send email via EmailJS
    emailjs.send('service_zdhsvy8', 'template_xz5xbon', {
      to_email: 'mohamedamine.melliti@outlook.com',
      email: "mohamedamine.melliti@outlook.com",
      // other template variables
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