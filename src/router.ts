import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue')
    }, {
      path: '/skilltree',
      name: 'skilltree',
      component: () => import('./views/skilltree.vue'),

      children: [{
          path: ':char',
          name: 'character',
          component: () => import('./components/skilltree.vue')
        }
      ]
    }
  ]
});
