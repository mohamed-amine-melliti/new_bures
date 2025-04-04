import { watch, defineComponent, onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import { usePlacesStore, useMapStore } from '@/composables';

export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref<HTMLDivElement>();
        const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();
        const { setMap } = useMapStore();

        // Define France's boundaries
        const FRANCE_BOUNDS = {
            minLng: -5.0, // Western border
            maxLng: 9.7,  // Eastern border
            minLat: 41.0, // Southern border
            maxLat: 51.2  // Northern border
        };

        // Function to check if a location is within France
        const isLocationInFrance = (lng: number, lat: number): boolean => {
            return (
                lng >= FRANCE_BOUNDS.minLng &&
                lng <= FRANCE_BOUNDS.maxLng &&
                lat >= FRANCE_BOUNDS.minLat &&
                lat <= FRANCE_BOUNDS.maxLat
            );
        };
        

        const initMap = async () => {
            if (!mapElement.value) throw new Error("Div element does not exist");

            await Promise.resolve();

            const map = new mapboxgl.Map({
                container: mapElement.value, // Container ID
                style: 'mapbox://styles/mapbox/streets-v12', // Style URL
                center: [2.2137, 46.6034], // Centered on France
                zoom: 5, // Suitable zoom to show all of France
            });

            // Example of locations (replace with real data)
            const locations = [
                { lng: 2.3522, lat: 48.8566, name: "Paris" },
                { lng: 4.8357, lat: 45.7640, name: "Lyon" },
                { lng: -1.5536, lat: 47.2184, name: "Nantes" },
            ];

            // Filter locations to only include those inside France
            const filteredLocations = locations.filter(({ lng, lat }) => isLocationInFrance(lng, lat));

            // Add markers for valid locations
            filteredLocations.forEach(({ lng, lat, name }) => {
                new mapboxgl.Marker()
                    .setLngLat([lng, lat])
                    .setPopup(new mapboxgl.Popup().setText(name))
                    .addTo(map);
            });

            setMap(map);
        };

        onMounted(() => {
            if (isUserLocationReady.value) 
                return initMap();
        });

        watch(isUserLocationReady, (newVal) => {
            if (newVal) initMap();
        });

        return {
            isLoading,
            isUserLocationReady,
            mapElement
        };
    }
});
