import { directionsApi } from '@/apis';
const actions = {
    async getRouteBetweenPoints({ commit }, { start, end }) {
        const resp = await directionsApi.get(`${start.join(',')}; ${end.join(',')}`); // 123123, 123123; 123123, 123123
        // console.log(resp.data.routes[0].geometry.coordinates)
        commit('setRoutePolyline', resp.data.routes[0].geometry.coordinates);
        commit('setDistanceDuration', {
            distance: resp.data.routes[0].distance,
            duration: resp.data.routes[0].duration
        });
    }
};
export default actions;
//# sourceMappingURL=actions.js.map