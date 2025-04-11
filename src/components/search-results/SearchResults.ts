import { watch, defineComponent, ref } from 'vue'
import { usePlacesStore, useMapStore } from '@/composables'
import { Feature } from '@/interfaces/places'

export default defineComponent({
  name: 'SearchResults',

  props: {
    selectedPlace: {
      type: Object as () => Feature | null,
      default: null,
    },
  },

  emits: ['placeSelected'],

  setup(props, { emit }) {
    const {
      isLoadingPlaces,
      places,
      selectedExternalPlace,
    } = usePlacesStore()

    const {
      map,
      getRouteBetweenPoints,
    } = useMapStore()

    const activePlace = ref<string>('')

    // ✅ Watch props INSIDE setup
    watch(
      () => props.selectedPlace,
      async (newPlace) => {
        if (newPlace && selectedExternalPlace.value) {
          const [endLng, endLat] = newPlace.center
          const [startLng, startLat] = selectedExternalPlace.value

          map.value?.flyTo({ center: [endLng, endLat], zoom: 14 })

          await getRouteBetweenPoints([startLng, startLat], [endLng, endLat])

          emit('placeSelected', newPlace)
          activePlace.value = newPlace.id
        }
      },
      { immediate: true }
    )

    const onPlaceClicked = (place: Feature) => {
      activePlace.value = place.id
      const [lng, lat] = place.center
      map.value?.flyTo({ center: [lng, lat], zoom: 14 })
    }

    const onChoisirClicked = async (place: Feature) => {
      activePlace.value = place.id
      const [lng, lat] = place.center

      map.value?.flyTo({ center: [lng, lat], zoom: 14 })

      if (selectedExternalPlace.value) {
        console.log('hné',selectedExternalPlace.value)
        const start = selectedExternalPlace.value
        const end: [number, number] = [lng, lat]
        await getRouteBetweenPoints(start, end)
      }

      emit('placeSelected', place)
    }

    return {
      isLoadingPlaces,
      places,
      activePlace,
      onPlaceClicked,
      onChoisirClicked,
    }
  },
})
