import { computed, onMounted } from "vue";
import { useStore } from "vuex";
export const usePlacesStore = () => {
    const store = useStore();
    onMounted(() => {
        if (!store.getters['places/isUserLocationReady']) {
            store.dispatch('places/getInitialLocation');
        }
    });
    return {
        // State
        isLoading: computed(() => store.state.places.isLoading),
        userLocation: computed(() => store.state.places.userLocation),
        places: computed(() => store.state.places.places),
        isLoadingPlaces: computed(() => store.state.places.isLoadingPlaces),
        selectedExternalPlace: computed(() => store.state.places.selectedExternalPlace),
        // Getters
        isUserLocationReady: computed(() => store.getters['places/isUserLocationReady']),
        // Actions
        searchPlacesByTerm: (query) => store.dispatch('places/searchPlacesByTerm', query),
        // Mutations
        setSelectedInputPlace: (location) => store.commit('places/setSelectedExternalPlace', location),
    };
};
//# sourceMappingURL=usePlacesStore.js.map