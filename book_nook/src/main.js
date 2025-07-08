import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

loadFonts()

axios.defaults.baseURL = 'http://127.0.0.1:8000';

store.dispatch('auth/initializeStore');

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .mount('#app')
