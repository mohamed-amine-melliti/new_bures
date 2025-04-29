<template>
  <!-- Info -->
  <div>
    <h4 class="font-semibold text-sm mb-2">Informations</h4>
    <div class="space-y-2">
      <!-- Name -->
      <div>
        <label class="block text-sm">Nom</label>
        <input v-model="name" type="text" class="w-full border rounded-md p-2" placeholder="Votre nom" />
      </div>

      <!-- Email -->
      <div>
        <label class="block text-sm">Email</label>
        <input v-model="email" type="email" class="w-full border rounded-md p-2" placeholder="Votre email" />
      </div>

      <!-- Phone -->
      <div>
        <label class="block text-sm">Téléphone</label>
        <input v-model="phone" type="tel" class="w-full border rounded-md p-2" placeholder="Votre téléphone" />
      </div>

      <!-- Passengers -->
      <div>
        <label class="block text-sm">Passagers</label>
        <select v-model="passengers" class="w-full border rounded-md p-2">
          <option disabled value="">Select</option>
          <option v-for="p in 8" :key="p">{{ p }}</option>
        </select>
      </div>

      <!-- Baggage -->
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
import { ref, watch, defineEmits } from 'vue'

// Emit setup
const emit = defineEmits<{
  (e: 'update:info', value: {
    name: string;
    email: string;
    phone: string;
    passengers: string;
    baggage: string;
  } | null): void
}>()

// Reactive fields
const name = ref('')
const email = ref('')
const phone = ref('')
const passengers = ref('')
const baggage = ref('')
const baggageOptions = ['Aucun', '1', '2', '3', '4','5','6','7','8 ( Cabine )',' 8( Cabine ) + 1 ( En soute )']

// Watch and emit only when form is fully filled
watch([name, email, phone, passengers, baggage], () => {
  if (
    name.value.trim() &&
    email.value.trim() &&
    phone.value.trim() &&
    passengers.value &&
    baggage.value
  ) {
    emit('update:info', {
      name: name.value,
      email: email.value,
      phone: phone.value,
      passengers: passengers.value,
      baggage: baggage.value
    })
  } else {
    emit('update:info', null)
  }
})
</script>


<style scoped>

</style>