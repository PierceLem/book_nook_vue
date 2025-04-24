import { createRouter, createWebHistory } from 'vue-router'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Discover from '../views/Discover.vue'
import BookShelf from '@/views/BookShelf.vue'
import MyProfile2 from '@/views/MyProfile2.vue'
import Chat from '../views/Chat.vue'
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
      layout: 'DefaultLayout',
    },
  },

  {
    path: '/bookshelf',
    name: 'BookShelf',
    component: BookShelf,
    meta: {
      layout: 'DefaultLayout',
    },
  },
  
  {
    path: '/my-profile',
    name: 'MyProfile',
    component: MyProfile2,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
    }
  },
  
  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
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
