import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';
const store = createStore({
    state: {
        portalUrl: '',
    },
    mutations: {
        SET_PORTALURL: (state: any, url: string) => {
            state.portalUrl = url;
        },
    },
    actions: {
        
    },
    modules: {
       
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
            key: 'myData',
            paths: [],
        }),
    ],
});
export default store;
