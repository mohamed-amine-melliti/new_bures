// Generated by https://quicktype.io

export interface PlacesResponse {
    type:        string;
    query:       string[];
    features:    Feature[];
    attribution: string;
}

export interface Feature {
    id:                   string;
    type:                 string;
    place_type:           string[];
    relevance:            number;
    properties:           Properties;
    text_es:              string;
    language_es:          Language;
    place_name_es:        string;
    text:                 string;
    language:             Language;
    place_name:           string;
    bbox?:                number[];
    center:               number[];
    geometry:             Geometry;
    context:              Context[];
    matching_text?:       string;
    matching_place_name?: string;
}

export interface Context {
    id:           string;
    short_code?:  string;
    wikidata?:    string;
    mapbox_id:    string;
    text_es:      string;
    language_es?: Language;
    text:         string;
    language?:    Language;
}

export enum Language {
    Es = "Fr",
}

export interface Geometry {
    type:        string;
    coordinates: number[];
}

export interface Properties {
    wikidata:    string;
    mapbox_id?:  string;
    short_code?: string;
    foursquare?: string;
    address?:    string;
    landmark?:   boolean;
    category?:   string;
    maki?:       string;
}


export interface ReverseSearchResult {
    place_id: number
    licence: string
    osm_type: string
    osm_id: number
    lat: number
    lon: number
    class: string
    type: string
    place_rank: number
    importance: number
    addresstype: string
    display_name: string
    boundingbox: [number, number, number, number]
    name: string
    address: {
      road?: string
      isolated_dwelling?: string
      village?: string
      town?: string
      county?: string
      state?: string
      country?: string
      postcode?: string
      country_code?: string
    }
  }
  