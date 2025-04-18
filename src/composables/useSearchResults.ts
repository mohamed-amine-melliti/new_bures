import { ref, watch } from 'vue'
import { usePlacesStore, useMapStore } from '@/composables'
import { Feature } from '@/interfaces/places'
import type { ReverseSearchResult } from '@/interfaces/places'

export function useSearchResults(props: { selectedPlace: Feature | null }, emit: (event: string, ...args: any[]) => void) {
  const { isLoadingPlaces, places, selectedExternalPlace } = usePlacesStore()
  const { map, getRouteBetweenPoints } = useMapStore()

  const activePlace = ref<string>('')

  // ✅ Watch for selected place changes
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
      const start = selectedExternalPlace.value
      const end: [number, number] = [lng, lat]
      await getRouteBetweenPoints(start, end)
    }

    emit('placeSelected', place)
  }



  const onChoisirClickedFromReverse = async (place: ReverseSearchResult) => {
    const lng = place.lon
    const lat = place.lat

    map.value?.flyTo({ center: [lng, lat], zoom: 14 })

    if (selectedExternalPlace.value) {
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
}
