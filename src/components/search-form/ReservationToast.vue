<template>
    <ToastRoot
      :open="internalOpen"
      @update:open="value => $emit('update:open', value)"
      class="bg-white rounded-md shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] 
             p-[15px] grid 
             [grid-template-areas:'title_action''description_action'] 
             grid-cols-[auto_max-content] gap-x-[15px] items-center 
             data-[state=open]:animate-slideIn 
             data-[state=closed]:animate-hide 
             data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] 
             data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:transition-[transform_200ms_ease-out] 
             data-[swipe=end]:animate-swipeOut"
    >
      <ToastTitle class="[grid-area:_title] mb-[5px] font-medium text-slate12 text-[15px]">
        Réservation Programmé
      </ToastTitle>
  
      <ToastDescription as-child>
        <time
          class="[grid-area:_description] m-0 text-slate11 text-[13px] leading-[1.3]"
          :dateTime="eventDate?.toISOString()"
        >
          Code Réservation : {{ customCode || '—' }}
          <br />
          {{ formatDate(eventDate) }}
        </time>
      </ToastDescription>
  
      <ToastAction class="[grid-area:_action]" as-child alt-text="Annuler">
        <button
          class="inline-flex items-center justify-center rounded font-medium text-xs px-[10px] leading-[25px] h-[25px] 
                 bg-green2 text-green11 
                 shadow-[inset_0_0_0_1px] shadow-green7 
                 hover:shadow-[inset_0_0_0_1px] hover:shadow-green8 
                 focus:shadow-[0_0_0_2px] focus:shadow-green8"
        >
          Undo
        </button>
      </ToastAction>
    </ToastRoot>
  
    <!-- Bottom-left global viewport -->
    <ToastViewport
  class="[--viewport-padding:_25px] fixed bottom-0 right-0 
         flex flex-col p-[var(--viewport-padding)] gap-[10px] 
         w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] 
         outline-none pointer-events-none"
/>

  </template>
  
  
  <script setup lang="ts">
  import { computed ,defineProps,defineEmits } from 'vue'
  import {
    ToastRoot,
    ToastTitle,
    ToastDescription,
    ToastAction,
    ToastViewport
  } from 'radix-vue'
  
  const props = defineProps<{
    open: boolean
    eventDate?: Date
    customCode?: string
  }>()
  
  const emit = defineEmits(['update:open'])
  
  const internalOpen = computed({
    get: () => props.open,
    set: (value: boolean) => emit('update:open', value),
  })
  
  function formatDate(date?: Date) {
    return date
      ? new Intl.DateTimeFormat('fr-FR', {
          dateStyle: 'full',
          timeStyle: 'short',
        }).format(date)
      : ''
  }
  </script>
  