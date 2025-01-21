import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/discover/Discover.vue'
import MyAccount from '../views/discover/MyAccount.vue'
import WorkShop from '../layouts/WorkShop.vue'
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'
import Chat from '../views/Chat.vue'

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
    path: '/my-account',
    name: 'MyAccount',
    component: MyAccount,
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

  {
    path: '/chat',
    name: 'Chat',
    component: Chat,
    meta: {
      requireLogin: true,
      layout: 'DefaultLayout',
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
