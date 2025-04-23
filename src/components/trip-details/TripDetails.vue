<template>
    <div v-if="distance" class="trip-container column">
        <div class="col">Distance: <strong>{{ distance }} Kms</strong></div>
        <div class="col">Durée: <strong>{{ duration }} Hours</strong></div>
        <div class="col">Prix: <strong>{{ pricePerKm  }} Euro</strong></div>

    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useMapStore } from '../../composables/useMapStore';

export default defineComponent({
    name: 'TripDetails',
    setup(){

        const {distance, duration , pricePerKm} = useMapStore()

        return{
            distance,
            duration,
            pricePerKm
        }
    }
})

</script>

<style scoped>
.trip-container {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  max-width: 400px;
  padding: 12px 20px;
  border-radius: 12px;
  background-color: white;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.25);
  font-size: 16px;
  text-align: center;
  z-index: 9999;
}

strong {
  color: #42b983;
}



</style>