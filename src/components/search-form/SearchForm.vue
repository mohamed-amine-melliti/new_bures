<template>

  <div class="fixed top-6 left-4 w-[95vw] max-w-xl max-h-[90vh]  rounded-xl z-50 p-4 flex flex-col overflow-hidden">
    <div class="overflow-y-auto h-full space-y-4 pr-2 hide-scrollbar">
      <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4">
        <!-- Header with Car Picker Trigger -->
        <div class="p-6">
          <CarPickerDialog @select="selectedCar = $event">
            <template #trigger>
              <div class="z-10 shrink-0 bg-gradient-to-b from-subdued to-body shadow-down-sm">
                <div class="px-4 pt-4">
                  <button
                    class="relative flex w-full cursor-pointer items-center justify-between gap-x-3 rounded-xl border-2 border-transparent bg-white px-3 py-2.5 shadow-md hover:border-gray-300 hover:bg-gray-50 transition">
                    <div class="flex h-12 w-[84px] items-center">
                      <img class="block w-full object-contain" :src="selectedCar?.img || '/car-placeholder.png'"
                        :alt="selectedCar?.name || 'Sélectionner un véhicule'" />
                    </div>
                    <div class="flex-1 truncate text-start">
                      <div class="truncate text-sm font-medium text-gray-900">
                        {{ selectedCar?.name || 'Choisir un véhicule' }}
                      </div>
                      <div class="truncate text-sm text-gray-500">
                        {{ selectedCar?.type || '' }}
                      </div>
                    </div>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"
                      class="shrink-0 text-gray-400">
                      <path fill-rule="evenodd" clip-rule="evenodd"
                        d="M3.47 5.97a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06L5.81 7.25H16a.75.75 0 0 0 0-1.5H5.81l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Zm10.06 4 3 3a.75.75 0 0 1 0 1.06l-3 3a.75.75 0 1 1-1.06-1.06l1.72-1.72H4a.75.75 0 0 1 0-1.5h10.19l-1.72-1.72a.75.75 0 1 1 1.06-1.06Z"
                        fill="currentColor" />
                    </svg>
                  </button>
                </div>
                <div class="pb-4"></div>
              </div>
            </template>
          </CarPickerDialog>
        </div>
        
          <!-- Info -->
          <div>
            <h4 class="font-semibold text-sm mb-2">Informations</h4>
            <div class="space-y-2">
              <div>
                <label class="block text-sm">Passagers</label>
                <select v-model="passengers" class="w-full border rounded-md p-2">
                  <option disabled value="">Select</option>
                  <option v-for="p in 7" :key="p">{{ p }}</option>
                </select>
              </div>
              <div>
                <label class="block text-sm">Bagages</label>
                <select v-model="baggage" class="w-full border rounded-md p-2">
                  <option disabled value="">Select</option>
                  <option v-for="b in baggageOptions" :key="b">{{ b }}</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Date Picker -->
          <div>
            <h4 class="font-semibold text-sm mb-2">Dates</h4>
            <label class="block text-sm mb-1">Heure de départ</label>
            <input type="datetime-local" id="birthdaytime" name="birthdaytime"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>

          
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
              <button
                class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition"
                @click="handleClick">
                Réserver
              </button>

              <ToastRoot v-model:open="open"
                class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] p-[15px] grid [grid-template-areas:_'title_action'_'description_action'] grid-cols-[auto_max-content] gap-x-[15px] items-center data-[state=open]:animate-slideIn data-[state=closed]:animate-hide data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] data-[swipe=end]:animate-swipeOut">
                <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
                  Scheduled: Catch up
                </ToastTitle>
                <ToastDescription as-child>
                  <time class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
                    :dateTime="eventDateRef.toISOString()">
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
        <!-- Personnalisé Content -->
        <div v-if="tripType === 'Personnalisé'" class="space-y-4">
          <!-- Departure -->
          <div>
            <label class="block text-sm font-medium">Point de départ</label>
            <!-- <input v-model="departure" placeholder="Lieu de départ" class="w-full border rounded-md p-2" /> -->
            <SearchBar />
          </div>

          <!-- Destination -->
          <div>
            <label class="block text-sm font-medium">Destination</label>
            <!-- <input v-model="destination" placeholder="Lieu de destination" class="w-full border rounded-md p-2" /> -->
            <SearchBar :placeholder="'Votre destination'" />
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
import { ref } from 'vue'
import { ToastAction, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'radix-vue'
const open = ref(false)
const eventDateRef = ref(new Date())
const timerRef = ref(0)



function oneWeekAway() {
  const now = new Date()
  now.setDate(now.getDate() + 7)
  return now
}

function prettyDate(date: Date) {
  return new Intl.DateTimeFormat('fr-FR', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

function generateReservationCode(): string {
  return 'VTC-' + Math.random().toString(36).substring(2, 8).toUpperCase()
}

function handleClick(type: 'forfait' | 'personnalise') {
  open.value = false
  clearTimeout(timerRef.value)

  timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true
    window.clearTimeout(timerRef.value)
 
    const code = generateReservationCode()
    timerRef.value = window.setTimeout(() => {
    eventDateRef.value = oneWeekAway()
    open.value = true
  }, 100)

    console.log('Type de réservation:', type)
    console.log('Code:', code)
    console.log('Date estimée:', prettyDate(eventDateRef.value!))
  }, 100)
}


import CarPickerDialog from './CarPickerDialog.vue'
import SearchBar from '../searchbar/SearchBar.vue'

// Car Selection
const selectedCar = ref(null)

// Tabs
const tripType = ref('Forfaitaire')

// Personnalisé values
const departure = ref('')
const destination = ref('')
const passengers = ref('')
const baggage = ref('')
const departureDate = ref(null)

// Forfaitaire select values
const forfaitDeparture = ref('')
const forfaitDestination = ref('')

// Options
const points = [
  { value: 'paris', label: 'Paris' },
  { value: 'orly', label: 'Orly' },
  { value: 'roissy_bourget', label: 'Roissy Bourget' },
  { value: 'cdg', label: 'Charles de Gaulle (CDG)' },
  { value: 'la_defense', label: 'La Défense' },
  { value: 'beauvais', label: 'Beauvais' },
  { value: 'disney', label: 'Disney' }
]

const destinations = [...points]

const baggageOptions = ['Aucun', '1', '2', '3', '4+']

// Tab styling
const tabClass =
  'w-1/2 py-2 text-center text-sm text-gray-600 hover:bg-gray-200 transition'
const activeTabClass =
  'w-1/2 py-2 text-center text-sm bg-white font-semibold border border-gray-300'
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