import axios from 'axios'
import router from '../../router'

const state = {
    credentials: {
        username: null,
        password: null
    },
    userData: {

    },
    errorData: {

    }
}

const mutations = {
    setUsername: (state, payload)=> {
        state.credentials.username = payload
       },
    setPassword: (state, payload)=> {
        state.credentials.password = payload
       },
    setUserData: (state, payload)=> {
        state.userData = payload
       },
    setErrorData: (state, payload) => {
        state.errorData = payload
    }
}

const actions = {
     login ({commit, state}) {
        axios.post("http://localhost:8095/user/authenticate", state.credentials)
        .then(({data})=>{
        commit('setUserData', data);
        commit('setUsername', null);
        commit('setPassword', null);
        router.push("/");
    })
    .catch ((error) => {
        commit('setErrorData', {message: "login or password is invalid, please try again."})
        console.log(error);
    })
  },
  logout ({commit}) {
      commit('setUserData', {});
      router.push("/login");
  }
}

export default {
    namespaced: true,
  
      state, mutations, actions
  }