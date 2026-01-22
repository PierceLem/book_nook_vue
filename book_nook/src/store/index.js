import { createStore } from 'vuex';
import ui from './modules/ui';
import auth from './modules/auth';
import threadStore from './modules/threadStore';

export default createStore({
  modules: {
    ui,
    auth,
    threadStore,
  },
})
