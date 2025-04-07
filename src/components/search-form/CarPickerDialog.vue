<template>
  <DialogRoot>
    <DialogTrigger as-child>
      <slot name="trigger">
        <button class="px-4 py-2 rounded bg-blue-500 text-white">Choisir un véhicule</button>
      </slot>
    </DialogTrigger>

    <DialogPortal style="z-index: 999;">
      <DialogOverlay class="fixed inset-0 bg-black/40 z-40" />
      <DialogContent
        style="z-index: 999;"
        class="fixed z-50 top-1/2 left-1/2 w-[90vw] max-w-xl max-h-[80vh] overflow-y-auto -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-2xl shadow-xl"
      >
        <DialogTitle class="text-lg font-semibold mb-4">Choisir un véhicule</DialogTitle>

        <!-- 🔹 Car Cards -->
        <div class="grid gap-4">
          <div
            v-for="car in cars"
            :key="car.id"
            @click="selectCar(car)"
            class="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-3 shadow-sm hover:shadow-md hover:border-gray-300 cursor-pointer transition-all duration-200"
          >
            <!-- Car Image -->
            <div class="h-14 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
              <img
                :src="car.img || '/car-placeholder.png'"
                :alt="car.name"
                class="h-full w-full object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </div>

            <!-- Car Info -->
            <div class="flex flex-col justify-center overflow-hidden">
              <span class="text-sm font-semibold text-gray-900 truncate">{{ car.name }}</span>
              <span class="text-xs text-gray-500 truncate">{{ car.type }}</span>
            </div>
          </div>
        </div>

        <!-- Close Button -->
        <DialogClose class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl">
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

import { defineEmits, ref } from 'vue'

const emit = defineEmits(['select'])

const cars = ref([
  {
    id: '646ca7235452611fc99432b0',
    name: 'Toyota RAV 4',
    type: 'Toyota',
    img: 'https://catalogue.automobile.tn/big/2023/04/46056.png?t=1727028068',
  },
  {
    id: '638157687592b0f2c57fc08f',
    name: 'Mercedes Vito',
    type: 'Mercedes',
    img: 'https://cdn-xy.drivek.com/eyJidWNrZXQiOiJkYXRhay1jZG4teHkiLCJrZXkiOiJjb25maWd1cmF0b3ItaW1ncy9jYXJzL2ZyL29yaWdpbmFsL01FUkNFREVTL1ZJVE8vNDQwMjlfVkFOLTQtRE9PUlMvbWVyY2VkZXMtYmVuei12aXRvLXRvdXJlci1mcm9udC12aWV3LmpwZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6MTAyNCwiaGVpZ2h0IjpudWxsLCJmaXQiOiJjb3ZlciJ9fX0=',
  },
  {
    id: '6731c0d440e03449fc079914',
    name: 'Mercedes Class V',
    type: 'Mercedes',
    img: 'https://catalogue.automobile.tn/big/2024/05/47140.png?t=1715188513',
  },
  {
    id: '6731c0d20e68fb49fcfcfc43',
    name: 'Kia NERO',
    type: 'KIA',
    img: 'https://www.kia.com/content/dam/kwcms/kme/global/en/assets/vehicles/niro-sg2/discover/kia-niro-ev-sx-my23-trim.png',
  },
  {
    id: '6731c0d20e68fb49fcfcfc43',
    name: 'Lexus NX 300',
    type: 'Lexus',
    img: 'https://www.fmdt.info/vehicle/lexus/2019/nx-300-32-white.png',
  },
])

function selectCar(car) {
  emit('select', car)
}
</script>
