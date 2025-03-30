import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import WikiIndexPage from '@/pages/wiki/WikiIndexPage.vue'; // 修正了拼写

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: DefaultLayout, // 使用默认布局
    children: [
      {
        path: '', // 默认子路由 (首页)
        name: 'Home',
        component: HomePage,
        meta: { title: '首页 - 南武民主共和国' } // 添加页面标题元信息
      },
      {
        path: 'wiki', // Wiki 板块
        name: 'WikiIndex',
        component: WikiIndexPage,
        meta: { title: '百科 - 南武民主共和国' }
      },
      // --- 可以在这里为 DefaultLayout 添加更多子路由 ---
      // {
      //   path: 'about',
      //   name: 'About',
      //   component: () => import('@/pages/AboutPage.vue'), // 懒加载示例
      //   meta: { title: '关于 - 南武民主共和国' }
      // }
    ]
  },
  // --- 可以添加其他布局或无布局的路由 ---
  // {
  //   path: '/login',
  //   name: 'Login',
  //   component: () => import('@/pages/LoginPage.vue')
  // },
  // --- 404 Not Found ---
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
    name: 'NotFound',
    component: () => import('@/pages/NotFoundPage.vue') // 需要创建 NotFoundPage.vue
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // 使用 history 模式
  routes,
  // 路由切换时滚动到页面顶部
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

// 全局前置守卫 (示例：更新页面标题)
router.beforeEach((to, from, next) => {
  const title = to.meta.title as string || '南武民主共和国';
  document.title = title;
  next();
});

export default router;