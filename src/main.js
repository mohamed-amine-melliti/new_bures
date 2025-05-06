import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import mapboxgl from 'mapbox-gl';
import { createPinia } from 'pinia';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGF2aWRyYW1pMTIiLCJhIjoiY2xlcmowN25oMGM4YjN4cWo1d2VjdWtlbiJ9._i-alLPw_HV5Oaln2pNYtQ';
const pinia = createPinia();
if (!navigator.geolocation) {
    alert("Your browser does not support GeoLocation");
    throw new Error("Your browser does not support GeoLocation");
}
createApp(App).use(store).use(pinia).use(router).mount('#app');
//# sourceMappingURL=main.js.map