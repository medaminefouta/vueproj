import Vue from 'vue'
import Vuex from 'vuex'
import members from './modules/members'
import teams from './modules/teams'
import authentication from './modules/authentication'
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex)

 const store = new Vuex.Store({
    state: {
    },
    getters: {    
    },
    modules: {
      members, 
      authentication, 
      teams
    },
    plugins: [
      createPersistedState(),
    ],
})

export default store;

