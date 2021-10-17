import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TestMembersTable from '../components/management-members/TestMembersTable.vue'
import TestTeamsTable from '../components/management-teams/TestTeamsTable.vue'
import Login from '../components/login/Login.vue'
import store from '../store/store'

import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: Login,

    beforeEnter(to, from, next) {
      if (store.state?.authentication?.userData.token) {
        router.push('/');
      } else next(); 

    },
  },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/teams',
    component: TestTeamsTable
  },
  {
    path: '/teams/:id',
    component: TestMembersTable
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
