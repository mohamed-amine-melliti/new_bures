const mutation = {
    setLngLat(state, { lng, lat }) {
        state.userLocation = [lng, lat];
        state.isLoading = false;
    },
    setIsLoadingPlaces(state) {
        state.isLoadingPlaces = true;
    },
    setPlaces(state, places) {
        state.places = places;
        state.isLoadingPlaces = false;
    },
    // ✅ Updated to store selected external place as [lng, lat]
    setSelectedExternalPlace(state, coords) {
        state.selectedExternalPlace = coords;
    }
};
export default mutation;
//# sourceMappingURL=mutations.js.map