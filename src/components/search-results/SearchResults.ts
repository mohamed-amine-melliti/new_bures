import { watch, defineComponent, onMounted, ref, defineEmits } from 'vue';
import { usePlacesStore, useMapStore } from '@/composables';
import { Feature } from '@/interfaces/places';

export default defineComponent({
    name: 'SearchResults',
    setup() {
        const { isLoadingPlaces, places, userLocation } = usePlacesStore();
        const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();
        const activePlace = ref<string>('');

        // Define emit function for event handling
        const emit = defineEmits(["placeSelected"]);

        // Watch for changes in places and update markers on the map
        watch(places, (newPlaces) => {
            activePlace.value = ''; // Clear active place when places change
            setPlaceMarkers(newPlaces); // Update map with new markers
        });

        // Function to handle clicking on a place and fly to its location
        const onPlaceClicked = (place: Feature) => {
            activePlace.value = place.id; // Set the active place
            const [lng, lat] = place.center; // Extract coordinates from place

            // Fly the map to the selected place
            map.value?.flyTo({
                center: [lng, lat],
                zoom: 14
            });
        };

        // Function to get directions from the user's location to the selected place
        const getRouteDirections = (place: Feature) => {
            if (!userLocation.value) return; // Return early if no user location

            activePlace.value = place.id; // Set the active place
            const [lng, lat] = place.center; // Extract coordinates from place
            const [startLng, startLat] = userLocation.value; // Extract user's location

            // Define start and end points for the route
            const start: [number, number] = [startLng, startLat];
            const end: [number, number] = [lng, lat];

            // Get route between user location and selected place
            getRouteBetweenPoints(start, end);

            // Emit event to inform the parent component
            emit("placeSelected", place);
        };

        // Return all reactive variables and methods to the template
        return {
            isLoadingPlaces,
            places,
            activePlace,
            onPlaceClicked,
            getRouteDirections
        };
    }
});
