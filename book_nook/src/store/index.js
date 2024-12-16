import { createStore } from 'vuex';
import ui from './modules/ui';
import auth from './modules/auth';

export default createStore({
  modules: {
    ui,
    auth,
  },
})
