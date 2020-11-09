import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase/app';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'empty' },
      component: () => import('../views/Login.vue')
    },
    {
      path: '/registration',
      name: 'registration',
      meta: { layout: 'empty' },
      component: () => import('../views/Registration.vue')
    },
    {
      path: '/history',
      name: 'history',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/History.vue')
    },
    {
      path: '/',
      name: 'bankAccount',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/BankAccount.vue')
    },
    {
      path: '/newEntry',
      name: 'newEntry',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/NewEntry.vue')
    },
    {
      path: '/planning',
      name: 'planning',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Planning.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      meta: { layout: 'main', auth: true },
      component: () => import('../views/Profile.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requireAuth = to.matched.some(({ meta }) => meta.auth);

  if(requireAuth && !currentUser) {
    next('/login')
  } else {
    next()
  }
});

export default router;
