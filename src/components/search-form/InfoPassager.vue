<template>
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
  </template>
  
  <script setup lang="ts">
  import { ref, watch,defineEmits } from 'vue'
  
  // Emits
  const emit = defineEmits<{
    (e: 'update:info', value: { passengers: string; baggage: string }): void
  }>()
  
  // Refs
  const passengers = ref('')
  const baggage = ref('')
  const baggageOptions = ['Aucun', '1', '2', '3', '4+']
  
  // Emit changes to parent
  watch([passengers, baggage], () => {
    emit('update:info', {
      passengers: passengers.value,
      baggage: baggage.value
    })
  })
  </script>
  