<template>
    <CarPickerDialog @select="updateSelectedCar">
      <template #trigger>
        <div class="z-10 shrink-0 bg-gradient-to-b from-subdued to-body shadow-down-sm">
          <div class="px-4 pt-4">
            <button
              class="relative flex w-full cursor-pointer items-center justify-between gap-x-3 rounded-xl border-2 border-transparent bg-white px-3 py-2.5 shadow-md hover:border-gray-300 hover:bg-gray-50 transition">
              <div class="flex h-12 w-[84px] items-center">
                <img class="flex h-12  w-[84px] w-full object-contain" :src="modelValue?.img || 'https://cdn-icons-png.freepik.com/512/75/75816.png'"
                  :alt="modelValue?.name || 'Sélectionner un véhicule'" />
              </div>
              <div class="flex-1 truncate text-start">
                <div class="truncate text-sm font-medium text-gray-900">
                  {{ modelValue?.name || 'Choisir un véhicule' }}
                </div>
                <div class="truncate text-sm text-gray-500">
                  {{ modelValue?.type || '' }}
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
  </template>
  
  <script setup lang="ts">
  import { defineProps, defineEmits } from 'vue'
  import CarPickerDialog from './CarPickerDialog.vue'
  
  const props = defineProps({
    modelValue: Object
  })
  const emit = defineEmits(['update:modelValue'])
  
  function updateSelectedCar(car: any) {
    emit('update:modelValue', car)
  }
  </script>
  