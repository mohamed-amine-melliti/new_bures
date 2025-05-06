import { ref, watch } from 'vue';
import { usePlacesStore, useMapStore } from '@/composables';
export function useSearchResults(props, emit) {
    const { isLoadingPlaces, places, selectedExternalPlace } = usePlacesStore();
    const { map, getRouteBetweenPoints } = useMapStore();
    const activePlace = ref('');
    // ✅ Watch for selected place changes
    watch(() => props.selectedPlace, async (newPlace) => {
        if (newPlace && selectedExternalPlace.value) {
            const [endLng, endLat] = newPlace.center;
            const [startLng, startLat] = selectedExternalPlace.value;
            map.value?.flyTo({ center: [endLng, endLat], zoom: 14 });
            await getRouteBetweenPoints([startLng, startLat], [endLng, endLat]);
            emit('placeSelected', newPlace);
            activePlace.value = newPlace.id;
        }
    }, { immediate: true });
    const onPlaceClicked = (place) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        map.value?.flyTo({ center: [lng, lat], zoom: 14 });
    };
    const onChoisirClicked = async (place) => {
        activePlace.value = place.id;
        const [lng, lat] = place.center;
        map.value?.flyTo({ center: [lng, lat], zoom: 14 });
        if (selectedExternalPlace.value) {
            const start = selectedExternalPlace.value;
            const end = [lng, lat];
            await getRouteBetweenPoints(start, end);
        }
        emit('placeSelected', place);
    };
    // async function calculateRouteBetweenSelectedPlaces() {
    //   if (!departurePlace.value || !destinationPlace.value) return
    //   const start: [number, number] = [
    //     Number(departurePlace.value.lon),
    //     Number(departurePlace.value.lat)
    //   ]
    //   const end: [number, number] = [
    //     Number(destinationPlace.value.lon),
    //     Number(destinationPlace.value.lat)
    //   ]
    //   // Move camera to destination
    //   map.value?.flyTo({ center: end, zoom: 14 })
    //   // Calculate distance
    //   routeDistance.value = haversineDistance(start, end)
    //   console.log(`Distance: ${routeDistance.value.toFixed(2)} km`)
    //   // Show route
    //   await getRouteBetweenPoints(start, end)
    // }
    return {
        isLoadingPlaces,
        places,
        activePlace,
        onPlaceClicked,
        onChoisirClicked,
        // onChoisirClickedFromReverse
    };
}
//# sourceMappingURL=useSearchResults.js.map