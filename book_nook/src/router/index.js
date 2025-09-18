import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Discover from '../views/Discover.vue'
import BookShelf from '@/views/BookShelf.vue'
import MyProfile from '@/views/MyProfile.vue'
import Threads from '../views/Threads.vue'
import WorkShop from '../layouts/WorkShop.vue'

import store from '../store'

const routes = [
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp,
    meta: {
      layout: 'AuthLayout',
    },
  },

  {
    path: '/login',
    name: 'LogIn',
    component: LogIn,
    meta: {
      layout: 'AuthLayout',
    },
  },

  {
    path: '/',
    name: 'Discover',
    component: Discover,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
    },
  },

  {
    path: '/bookshelf',
    name: 'BookShelf',
    component: BookShelf,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
    },
  },
  
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
    }
  },
  
  {
    path: '/threads',
    name: 'Threads',
    component: Threads,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
    }
  },

  {
    path: "/workshop",
    name: 'WorkShop',
    component: WorkShop,
    meta: {
      requireLogin: true,
      layout: 'WorkShop',
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.auth.isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})

export default router
