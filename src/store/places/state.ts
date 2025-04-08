import { Feature } from '../../interfaces/places'

export interface PlacesState {
  isLoading: boolean
  userLocation?: [number, number] // longitude, latitude
  places: Feature[]
  isLoadingPlaces: boolean

  // ✅ Add this line
  selectedExternalPlace: Feature | null
}

function state(): PlacesState {
  return {
    isLoading: true,
    userLocation: undefined,
    places: [],
    isLoadingPlaces: false,

    // ✅ Add this line
    selectedExternalPlace: null
  }
}

export default state
