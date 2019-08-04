import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [{
      path: '/',
      name: 'home',
      redirect: 'skilltree'
    }, {
      path: '/skilltree',
      name: 'skilltree',
      component: () => import('./views/skilltree.vue'),

      children: [{
          path: ':char',
          name: 'character',
          component: () => import('./views/skilltree/index.vue'),

          children: [{
            path: ':id',
            name: 'node'
          }]
        }
      ]
    }
  ]
});
