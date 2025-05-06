import { useStore } from 'vuex';
import { computed } from 'vue';
export const useMapStore = () => {
    const store = useStore();
    return {
        map: computed(() => store.state.map.map),
        distance: computed(() => store.state.map.distance),
        duration: computed(() => store.state.map.duration),
        pricePerKm: computed(() => store.state.map.pricePerKm),
        // Getters
        isMapReady: computed(() => store.getters['map/isMapReady']),
        // Mutations
        setMap: (map) => store.commit('map/setMap', map),
        setPlaceMarkers: (places) => store.commit('map/setPlaceMarkers', places),
        setPricePerKm: (price) => store.commit('map/setPricePerKm', price),
        // Actions
        getRouteBetweenPoints: (start, end) => store.dispatch('map/getRouteBetweenPoints', { start, end }),
    };
};
//# sourceMappingURL=useMapStore.js.map