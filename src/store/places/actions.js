import { searchApi } from '@/apis';
const actions = {
    async getInitialLocation({ commit }) {
        commit('setIsLoadingLocation', true);
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                });
            });
            const { latitude, longitude } = position.coords;
            commit('setLngLat', { lat: latitude, lng: longitude });
        }
        catch (error) {
            console.error('Erreur géolocalisation :', error);
        }
        finally {
            commit('setIsLoadingLocation', false);
        }
    },
    async searchPlacesByTerm({ commit, state }, query) {
        if (query.length === 0) {
            commit('setPlaces', []);
            return [];
        }
        if (!state.userLocation) {
            throw new Error('User location is not set.');
        }
        commit('setIsLoadingPlaces', true);
        try {
            const resp = await searchApi.get(`/${query}.json`, {
                params: {
                    proximity: state.userLocation.join(','),
                },
            });
            commit('setPlaces', resp.data.features);
            return resp.data.features;
        }
        catch (error) {
            console.error('Error searching places:', error);
            return [];
        }
        finally {
            commit('setIsLoadingPlaces', false);
        }
    },
    // ✅ New action to store selected external place
    setExternalSelectedPlace({ commit }, place) {
        console.log('place', place);
        commit('setSelectedExternalPlace', place);
    }
};
export default actions;
//# sourceMappingURL=actions.js.map