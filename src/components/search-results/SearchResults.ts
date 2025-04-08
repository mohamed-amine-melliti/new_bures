import { watch, defineComponent, ref } from 'vue'
import { usePlacesStore, useMapStore } from '@/composables'
import { Feature } from '@/interfaces/places'

export default defineComponent({
  name: 'SearchResults',

  props: {
    selectedPlace: {
      type: Object as () => Feature | null,
      default: null
    }
  },

  emits: ['placeSelected'],

  setup(props, { emit }) {
    const { isLoadingPlaces, places, userLocation } = usePlacesStore()
    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore()
    const activePlace = ref<string>('')

    // 🔁 If a place is selected from outside (like SearchBarDepart), calculate route from userLocation
    watch(() => props.selectedPlace, (newPlace) => {
      if (newPlace && userLocation.value) {
        const [lng, lat] = newPlace.center
        const [startLng, startLat] = userLocation.value

        // 1. Center the map
        map.value?.flyTo({ center: [lng, lat], zoom: 14 })

        // 2. Calculate route
        const start: [number, number] = [startLng, startLat]
        const end: [number, number] = [lng, lat]
        getRouteBetweenPoints(start, end)

        // 3. Optionally, emit the selected place
        emit('placeSelected', newPlace)

        // 4. Set it as active
        activePlace.value = newPlace.id
      }
    }, { immediate: true })

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
