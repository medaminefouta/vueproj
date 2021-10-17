import axios from 'axios'
import store from '../store/store'

export default () => {
    return axios.create({
      baseURL: process.env.VUE_APP_BASE_URL || 'http://localhost:8095/api/',
      headers: {
        Authorization: `Bearer ${store.state.authentication.userData.token}`,
      },
    });
  };