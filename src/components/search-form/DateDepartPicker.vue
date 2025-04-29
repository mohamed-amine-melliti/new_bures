<template>
  <div>
    <h4 class="font-semibold text-sm mb-2">Dates</h4>
    <label class="block text-sm mb-1">Heure de départ</label>
    <input
      type="datetime-local"
      v-model="departureDate"
      :min="minDateTime"
      class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed, defineEmits } from 'vue'

const emit = defineEmits<{
  (e: 'update:departureDate', value: string): void
}>()

const departureDate = ref('')

// Compute current datetime in proper format for input
const minDateTime = computed(() => {
  const now = new Date()
  now.setSeconds(0, 0) // Optional: remove seconds and milliseconds for consistency
  return now.toISOString().slice(0, 16) // format: 'YYYY-MM-DDTHH:MM'
})

// Emit when value changes
watch(departureDate, (newVal) => {
  console.log('addrese départ', newVal)
  emit('update:departureDate', newVal)
})
</script>
