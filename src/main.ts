import Vue from 'vue';
import { Route } from 'vue-router';
import App from './App.vue';
import Router from './router';
import Store from '@/store';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faPlusCircle, faMinusCircle, faStopCircle } from '@fortawesome/free-solid-svg-icons';
library.add(faPlusCircle, faMinusCircle, faStopCircle);

Vue.config.productionTip = false;

Router.afterEach((to: Route, from: Route) => {
  if (to.path.startsWith('/skilltree')) {
    Store.dispatch('SkillTree/ROUTE_CHANGED', to);
  }
});

new Vue({
  'router': Router,
  'store': Store,
  render: (h) => h(App),
}).$mount('#app');
