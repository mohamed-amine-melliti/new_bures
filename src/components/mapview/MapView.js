import { watch, defineComponent, onMounted, ref } from 'vue';
import mapboxgl from 'mapbox-gl';
import { usePlacesStore, useMapStore } from '@/composables';
export default defineComponent({
    name: 'MapView',
    setup() {
        const mapElement = ref();
        const { isLoading, userLocation, isUserLocationReady } = usePlacesStore();
        const { setMap } = useMapStore();
        const DEFAULT_LOCATION = [2.3522, 48.8566]; // Paris [lng, lat]
        const initMap = async () => {
            if (!mapElement.value)
                throw new Error('Div element does not exist');
            await Promise.resolve();
            const center = userLocation.value ?? DEFAULT_LOCATION;
            const map = new mapboxgl.Map({
                container: mapElement.value,
                style: 'mapbox://styles/mapbox/streets-v12',
                center,
                zoom: 5.5,
                maxBounds: [
                    [-5.5, 41.0],
                    [9.5, 51.5], // Northeast corner of France
                ],
            });
            if (userLocation.value) {
                const myLocationPopup = new mapboxgl.Popup({ offset: [0, -25] })
                    .setLngLat(userLocation.value)
                    .setHTML(`<h4>Vous êtes ici !</h4>`);
                new mapboxgl.Marker()
                    .setPopup(myLocationPopup)
                    .setLngLat(userLocation.value)
                    .addTo(map);
            }
            setMap(map);
        };
        onMounted(() => {
            initMap();
        });
        watch(isUserLocationReady, (newVal) => {
            if (newVal && userLocation.value) {
                initMap(); // Optional: re-center if userLocation becomes available later
            }
        });
        return {
            isLoading,
            userLocation,
            isUserLocationReady,
            mapElement,
        };
    },
});
//# sourceMappingURL=MapView.js.map