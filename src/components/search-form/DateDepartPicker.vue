<template>
    <div>
      <h4 class="font-semibold text-sm mb-2">Dates</h4>
      <label class="block text-sm mb-1">Heure de départ</label>
      <input
        type="datetime-local"
        v-model="departureDate"
        class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch ,defineEmits } from 'vue'
  
  const emit = defineEmits<{
    (e: 'update:departureDate', value: string): void
  }>()
  
  const departureDate = ref('')
  
  // Emit when value changes
  watch(departureDate, (newVal) => {
    emit('update:departureDate', newVal)
  })
  </script>
  