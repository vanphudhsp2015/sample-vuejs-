import Vue from 'vue';
import Router from 'vue-router';

import About from '../pages/About';
import Contact from '../pages/Contact';

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'About',
      component: About
    },
    {
      path: '/contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: About
    }
  ]
})
