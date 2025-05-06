import { createStore } from 'vuex';
// My custom modules
import placesModule from './places';
import mapModule from './map';
export default createStore({
    modules: {
        places: placesModule,
        map: mapModule
    }
});
//# sourceMappingURL=index.js.map