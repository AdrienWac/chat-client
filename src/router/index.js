import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'


function requireRegistering(to, from, next) {
  
  if (!Object.keys(store.getters['user/user']).length) {
    return next({ path: '/register' }); 
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
