<template>
  <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-xl p-4 space-y-4">
    <!-- Header with Car Picker Trigger -->
    <div class="p-6">
      <CarPickerDialog @select="selectedCar = $event">
        <template #trigger>
          <!-- Same custom trigger as before -->
          <!-- ... -->
        </template>
      </CarPickerDialog>
    </div>

    <!-- Tabs -->
    <div class="flex bg-gray-100 rounded-md overflow-hidden w-full">
      <button
        :class="tripType === 'Forfaitaire' ? activeTabClass : tabClass"
        @click="tripType = 'Forfaitaire'"
      >
        Forfaitaire
      </button>
      <button
        :class="tripType === 'Personnalisé' ? activeTabClass : tabClass"
        @click="tripType = 'Personnalisé'"
      >
        Personnalisé
      </button>
    </div>

    <!-- Forfaitaire Content -->
    <div v-if="tripType === 'Forfaitaire'" class="space-y-4">
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
    </div>

    <!-- Tab Contents -->
    <div v-if="tripType === 'Forfaitaire'" class="text-center text-gray-400 italic py-8">
      Aucun contenu pour le moment dans l’onglet <strong>Forfaitaire</strong>.
    </div>

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