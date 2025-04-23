import mapboxgl from 'mapbox-gl';

export interface MapState {
    map?: mapboxgl.Map;
    markers: mapboxgl.Marker[];
    distance?: number;
    duration?: number;
    pricePerKm?: number;
}

function state(): MapState {
    return {
        map: undefined,
        markers: [],
        distance: undefined,
        duration: undefined,
        pricePerKm: undefined, 
    }
}

export default state;