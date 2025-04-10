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
    const {
      isLoadingPlaces,
      places,
      selectedExternalPlace, // 👈 Start point [lng, lat] from input
    } = usePlacesStore()

    const {
      map,
      setPlaceMarkers,
      getRouteBetweenPoints
    } = useMapStore()

    const activePlace = ref<string>('')

    // 🔁 Watch for external destination selection
    watch(() => props.selectedPlace, (newPlace) => {
      if (newPlace && selectedExternalPlace.value) {
        const [endLng, endLat] = newPlace.center
        const [startLng, startLat] = selectedExternalPlace.value

        // 1. Center the map on the destination
        map.value?.flyTo({ center: [endLng, endLat], zoom: 14 })

        // 2. Calculate route
        const start: [number, number] = [startLng, startLat]
        const end: [number, number] = [endLng, endLat]
        getRouteBetweenPoints(start, end)

        // 3. Emit and mark active
        emit('placeSelected', newPlace)
        activePlace.value = newPlace.id
      }
    }, { immediate: true })

    const onPlaceClicked = (place: Feature) => {
      activePlace.value = place.id
      const [lng, lat] = place.center
      map.value?.flyTo({ center: [lng, lat], zoom: 14 })
    }

    const onChoisirClicked = (place: Feature) => {
      activePlace.value = place.id
      const [lng, lat] = place.center
      map.value?.flyTo({ center: [lng, lat], zoom: 14 })

      if (selectedExternalPlace.value) {
        const start = selectedExternalPlace.value
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
