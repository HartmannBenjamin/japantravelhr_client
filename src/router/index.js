import Vue from 'vue';
import VueRouter from 'vue-router';
import Requests from '../views/Requests.vue';
import Request from '../views/Request.vue';
import Profile from '../views/Profile.vue';
import Project from '../views/Project.vue';
import Auth from '../views/Auth.vue';
import PageNotFound from '../views/PageNotFound.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    redirect: '/requests',
  },
  {
    path: '/login',
    name: 'Login',
    component: Auth,
    props: {
      isRegisterPage: false,
    },
    meta: {
      auth: false,
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Auth,
    props: {
      isRegisterPage: true,
    },
    meta: {
      auth: false,
    },
  },
  {
    path: '/requests',
    name: 'Requests',
    component: Requests,
    meta: {
      auth: true,
    },
  },
  {
    path: '/request/:id',
    name: 'Request',
    component: Request,
    meta: {
      auth: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      auth: true,
    },
  },
  {
    path: '/project',
    name: 'Project',
    component: Project,
    meta: {
      auth: true,
    },
  },
  {
    path: '*',
    name: 'Page Not Found',
    component: PageNotFound,
    meta: {
      auth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name;
  next();
});

export default router;
