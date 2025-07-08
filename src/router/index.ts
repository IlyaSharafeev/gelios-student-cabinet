import { createRouter, createWebHistory } from 'vue-router';
import GamesPage from '@/pages/GamesPage.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'mainPage',
      component: () => import('@/layout/MainLayout.vue'),
      children: [
        {
          path: '',
          redirect: { name: 'dashboard' },
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('@/pages/DashboardPage.vue'),
        },
        {
          path: 'schedule',
          name: 'schedule',
          component: () => import('@/pages/SchedulePage.vue'),
        },
        {
          path: 'homework/:tab?', // Modified line
          name: 'homework',
          component: () => import('@/pages/HomeworkPage.vue'),
        },
        {
          path: 'games',
          name: 'games-grid',
          component: GamesPage,
          children: [
            {
              path: ':trainerSlug',
              name: 'game-view',
              component: GamesPage,
            }
          ]
        },
        {
          path: 'add-homework',
          name: 'add-homework',
          component: () => import('@/pages/AddHomeworkPage.vue'),
        },
        {
          path: 'students',
          name: 'students',
          component: () => import('@/pages/StudentsPage.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/pages/SettingsPage.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/');
        } else {
          next();
        }
      },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/pages/RegisterPage.vue'),
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: () => import('@/pages/LoginPage.vue'),
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          next('/');
        } else if (!to.query.token) {
          next('/login');
        } else {
          next();
        }
      },
    },
    {
      path: '/:catchAll(.*)',
      redirect: { name: 'login' },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.token;

  if (to.meta.requiresAuth) {
    if (!token) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;