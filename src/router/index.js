import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import User from '../services/user.service'


async function requireRegistering(to, from, next) {

  const userFromStore = store.getters['user/user'];

  if (!Object.keys(userFromStore).length) {
    return next({ path: '/register' }); 
  }

  const userIsActive = await User.isActive(userFromStore.id);

  if (!userIsActive) {
    // TODO Trouver une autre solution que ce StaticRegister
    return next({ name: 'StaticRegister'});
  }

  return next();

}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: requireRegistering
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'StaticRegister',
    component: Register,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    beforeEnter: (to, from, next) => {
      
      if (Object.keys(store.getters['user/user']).length) {
        return next({ path: '/' });
      }

      return next();
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: (to, from, next) => {

      if (Object.keys(store.getters['user/user']).length) {
        return next({ path: '/' });
      }

      return next();
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
