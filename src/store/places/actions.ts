import { ActionTree } from 'vuex'
import { PlacesState } from './state'
import { StateInterface } from '../index'
import { searchApi } from '@/apis'
import { PlacesResponse, Feature } from '@/interfaces/places'

const actions: ActionTree<PlacesState, StateInterface> = {

    async getInitialLocation({ commit }) {
        commit('setIsLoadingLocation', true)

        try {
            const position: GeolocationPosition = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                })
            })

            const { latitude, longitude } = position.coords
            commit('setLngLat', { lat: latitude, lng: longitude })

        } catch (error) {
            console.error('Erreur géolocalisation :', error)
        } finally {
            commit('setIsLoadingLocation', false)
        }
    },

    async searchPlacesByTerm({ commit, state }, query: string): Promise<Feature[]> {
        if (query.length === 0) {
            commit('setPlaces', [])
            return []
        }

        if (!state.userLocation) {
            throw new Error('User location is not set.')
        }

        commit('setIsLoadingPlaces', true)

        try {
            const resp = await searchApi.get<PlacesResponse>(`/${query}.json`, {
                params: {
                    proximity: state.userLocation.join(','),
                },
            })

            commit('setPlaces', resp.data.features)
            return resp.data.features

        } catch (error) {
            console.error('Error searching places:', error)
            return []
        } finally {
            commit('setIsLoadingPlaces', false)
        }
    },

    // ✅ New action to store selected external place
    setExternalSelectedPlace({ commit }, place: any) {
        console.log('place',place)
        commit('setSelectedExternalPlace', place)

    }

}

export default actions
