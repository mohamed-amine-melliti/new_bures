import { watch, defineComponent, ref } from 'vue'
import { usePlacesStore, useMapStore } from '@/composables'
import { Feature } from '@/interfaces/places'

export default defineComponent({
  name: 'SearchResults',

  // ✅ Declare the emitted event this way in options API
  emits: ['placeSelected'],

  setup(_, { emit }) {
    const { isLoadingPlaces, places, userLocation } = usePlacesStore()
    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore()
    const activePlace = ref<string>('')

    watch(places, (newPlaces) => {
      activePlace.value = ''
      setPlaceMarkers(newPlaces)
    })

    const onPlaceClicked = (place: Feature) => {
      activePlace.value = place.id
      const [lng, lat] = place.center

      map.value?.flyTo({
        center: [lng, lat],
        zoom: 14
      })
    }

    const onChoisirClicked = (place: Feature) => {
      activePlace.value = place.id

      const [lng, lat] = place.center
      map.value?.flyTo({
        center: [lng, lat],
        zoom: 14
      })

      if (userLocation.value) {
        const start: [number, number] = userLocation.value
        const end: [number, number] = [lng, lat]
        getRouteBetweenPoints(start, end)
      }

      // ✅ Proper emit usage here
      emit('placeSelected', place)
    }

    return {
      isLoadingPlaces,
      places,
      activePlace,
      onPlaceClicked,
      onChoisirClicked
    }
  }
})
