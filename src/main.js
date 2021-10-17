import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import vuetify from './config/ui-framework.config';
new Vue({
    vuetify,
    router,
    store,
    render: h => h(App),
}).$mount('#app');


Vue.config.productionTip = false


