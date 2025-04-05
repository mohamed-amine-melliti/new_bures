<!-- CarPickerDialog.vue -->
<template >
    <DialogRoot >
      <DialogTrigger as-child>
        <slot name="trigger">
          <button class="px-4 py-2 rounded bg-blue-500 text-white">Choisir un véhicule</button>
        </slot>
      </DialogTrigger>
  
      <DialogPortal style="z-index: 999;">
        <DialogOverlay class="fixed inset-0 bg-black/40 z-40" />
        <DialogContent style="z-index: 999;"
          class="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-xl max-h-[80vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl"
        >
          <DialogTitle class="text-lg font-semibold mb-4">Choisir un véhicule</DialogTitle>
  
          <div class="space-y-4">
            <div
              v-for="car in cars"
              :key="car.id"
              @click="selectCar(car)"
              class="flex items-center space-x-4 p-3 rounded-lg border hover:bg-gray-100 cursor-pointer transition"
            >
              <img :src="car.image" :alt="car.name" class="w-16 h-12 object-cover rounded" />
              <div>
                <h3 class="text-base font-semibold">{{ car.name }}</h3>
                <p class="text-sm text-gray-500">{{ car.type }}</p>
              </div>
            </div>
          </div>
  
          <DialogClose class="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
            ×
          </DialogClose>
        </DialogContent>
      </DialogPortal>
    </DialogRoot>
  </template>
  
  <script setup>
  import {
    DialogRoot,
    DialogTrigger,
    DialogPortal,
    DialogOverlay,
    DialogContent,
    DialogTitle,
    DialogClose,
  } from 'radix-vue'
  
  import { defineEmits } from 'vue'
  
  const emit = defineEmits(['select'])
  
  const cars = [
    {
      id: 1,
      name: 'Mercedes Classe V',
      type: 'Convertible',
      image: '/car-image.png',
    },
    {
      id: 2,
      name: 'Tesla Model S',
      type: 'Électrique',
      image: '/tesla.jpg',
    },
    {
      id: 3,
      name: 'BMW X5',
      type: 'SUV',
      image: '/bmw.jpg',
    },
  ]
  
  function selectCar(car) {
    emit('select', car)
  }
  </script>
  