import { createRouter, createWebHistory } from 'vue-router'
import Discover from '../views/discover/Discover.vue'
import MyAccount from '../views/discover/MyAccount.vue'
import AuthLayout from "../layouts/AuthLayout.vue";
import DefaultLayout from "../layouts/DefaultLayout.vue";
import WorkShop from "../layouts/WorkShop.vue";
import SignUp from '../views/SignUp.vue'
import LogIn from '../views/LogIn.vue'

import store from '../store'

const routes = [
  {
    path: "/auth",
    component: AuthLayout,
    children: [
      {
        path: 'signup',
        name: 'SignUp',
        component: SignUp,
      },
      {
        path: 'login',
        name: 'LogIn',
        component: LogIn
      },
    ],
  },
  {
    path: "/",
    component: DefaultLayout,
    children: [
      {
        path: '',
        name: 'Discover',
        component: Discover,
      },
      {
        path: 'my-account',
        name: 'MyAccount',
        component: MyAccount,
        meta: {
          requireLogin: true
        }
      },
    ],
  },
  {
    path: "/workshop",
    name: 'WorkShop',
    component: WorkShop,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireLogin) && !store.state.isAuthenticated) {
    next('/log-in')
  } else {
    next()
  }
})

export default router
