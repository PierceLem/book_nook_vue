import { createStore } from 'vuex';
import ui from './modules/ui';
import auth from './modules/auth';
import threadStore from './modules/threadStore';
import social from './modules/social';

export default createStore({
  modules: {
    ui,
    auth,
    threadStore,
    social,
  },
})
