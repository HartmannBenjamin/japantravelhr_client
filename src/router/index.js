import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth,
    props: { isRegisterPage: false },
    meta: {
      auth: false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: Auth,
    props: { isRegisterPage: true },
    meta: {
      auth: false
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
