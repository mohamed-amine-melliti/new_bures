<template>
  <MapView/>
  <MyLocationBtn/>

  <SearchForm/>

  <TripDetails/>
</template>

<script lang="ts">
import MapView from '@/components/mapview/MapView.vue';
//import SearchBar from '@/components/searchbar/SearchBar.vue';
import MyLocationBtn from '@/components/my-location-btn/MyLocationBtn.vue';
import TripDetails from '@/components/trip-details/TripDetails.vue';
import { usePlacesStore } from '@/composables';
import { defineComponent } from 'vue';
import SearchForm from '../components/search-form/SearchForm.vue';

export default defineComponent({
  name: 'HomeVue',


  components: {SearchForm, MapView, MyLocationBtn, TripDetails },
  setup(){
    usePlacesStore()
  }
});
</script>
