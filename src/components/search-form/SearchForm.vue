<template>
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

    <div v-if="tripType === 'Forfaitaire'" class="text-center text-gray-400 italic py-8">
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
        <button @click="handleReservation('personnalise')"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition">
          Réserver
        </button>
      </div>
    </div>
    <!-- Personnalisé Content -->

    <div v-if="tripType === 'Personnalisé'" class="space-y-4">
      <!-- Departure -->
      <div>
        <label class="block text-sm font-medium">Point de départ</label>
        <input v-model="departure" placeholder="Lieu de départ" class="w-full border rounded-md p-2" />
      </div>

      <!-- Destination -->
      <div>
        <label class="block text-sm font-medium">Destination</label>
        <input v-model="destination" placeholder="Lieu de destination" class="w-full border rounded-md p-2" />
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
        <RadixDatePicker v-model="departureDate" />
      </div>

      <div class="pt-4">
        <button @click="handleReservation('personnalise')"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow transition">
          Réserver
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CarPickerDialog from './CarPickerDialog.vue'

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
