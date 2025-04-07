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
              <img :src="car.img" :alt="car.name" class="w-20 h-16 object-cover rounded" />
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
  
  import { defineEmits , ref } from 'vue'
  
  const emit = defineEmits(['select'])
// Sample vehicle data
const cars = ref([
    {
        id: '646ca7235452611fc99432b0',
        name: 'Toyota RAV 4',
        type: 'Toyota',
        img: 'https://catalogue.automobile.tn/big/2023/04/46056.png?t=1727028068',
        selected: true,
        expanded: false
    },
    {
        id: '638157687592b0f2c57fc08f',
        name: 'Mercedes Vito',
        type: 'Mercedes',
        img: 'https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL01FUkNFREVTL1ZJVE8vNDQwMjlfVkFOLTQtRE9PUlMvbWVyY2VkZXMtYmVuei12aXRvLXRvdXJlci1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d440e03449fc079914',
        name: 'Mercedes Class V',
        type: 'Mercedes',
        img: 'https://catalogue.automobile.tn/big/2024/05/47140.png?t=1715188513',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d20e68fb49fcfcfc43',
        name: 'Kia NERO',
        type: 'KIA',
        img: 'https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/niro-sg2/discover/kia-niro-ev-sx-my23-trim.png',
        selected: false,
        expanded: false
    },
    {
        id: '6731c0d20e68fb49fcfcfc43',
        name: 'Lexus NX 300',
        type: 'Lexus',
        img: 'https://www.fmdt.info/vehicle/lexus/2019/nx-300-32-white.png',
        selected: false,
        expanded: false
    }
]);

  function selectCar(car) {
    emit('select', car)
  }
  </script>
  