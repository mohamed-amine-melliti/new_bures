<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'
import axios from 'axios'
import { usePlacesStore } from '@/composables'
import { toRaw } from 'vue';

// Props
const props = defineProps<{
  placeholder: string
}>()

// Emit
const emit = defineEmits<{
  (e: 'placeSelected', place: any): void
}>()

// ✅ Pull from store
const { setSelectedInputPlace } = usePlacesStore()

const searchTerm = ref('')
const suggestions = ref<any[]>([])
const justSelected = ref(false)

// Watch for typing
watch(searchTerm, async (query) => {
  if (justSelected.value) {
    justSelected.value = false
    return
  }

  if (query.length < 3) {
    suggestions.value = []
    return
  }

  try {
    const { data } = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 5,
      },
      headers: {
        'Accept-Language': 'fr',
      }
    })

    suggestions.value = data
  } catch (err) {
    console.error('Geocoding error:', err)
    suggestions.value = []
  }
})

// ✅ Selection logic
const selectSuggestion = (place: any) => {
  justSelected.value = true
  searchTerm.value = place.display_name
  suggestions.value = []

  let newplace = toRaw(place)

  const lon = parseFloat(newplace.lon)
  const lat = parseFloat(newplace.lat)

  console.log('Selected place object:', newplace)
  console.log('[lon, lat]', [lon, lat])

  // ✅ Store the coords in Vuex
  setSelectedInputPlace([lon, lat])

  // ✅ Emit for parent use
  emit('placeSelected', place)
}
</script>


<template>
  <div class="relative">
    <input
      type="text"
      :placeholder="placeholder"
      v-model="searchTerm"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />

    <ul v-if="suggestions.length" class="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 overflow-hidden">
      <li
        v-for="(place, index) in suggestions"
        :key="index"
        @click="selectSuggestion(place)"
        class="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
      >
        {{ place.display_name }}
      </li>
    </ul>
  </div>
</template>
