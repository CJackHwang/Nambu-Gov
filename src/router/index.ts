import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import { h } from 'vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import HomePage from '@/pages/HomePage.vue';
import WikiIndexPage from '@/pages/wiki/WikiIndexPage.vue'; // 修正了拼写
import TestPage from '@/pages/TestPage.vue'; // 引入测试页面
import DirectTestPage from '@/pages/DirectTestPage.vue'; // 引入无布局测试页面
import ExternalWikiPage from '@/pages/ExternalWikiPage.vue'; // 引入外部Wiki页面
import PoliciesPage from '@/pages/PoliciesPage.vue'; // 引入政策法规页面
import OrganizationPage from '@/pages/OrganizationPage.vue'; // 引入组织架构页面
import ServicePage from '@/pages/ServicePage.vue'; // 引入公共服务页面
import AboutPage from '@/pages/AboutPage.vue'; // 引入关于南武页面
import NotFoundPage from '@/pages/NotFoundPage.vue'; // 引入404页面

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => {
      return h(DefaultLayout, () => h(HomePage));
    },
    meta: { title: '首页 - 南武民主共和国' }
  },
  {
    path: '/wiki',
    name: 'WikiIndex',
    component: () => {
      return h(DefaultLayout, () => h(WikiIndexPage));
    },
    meta: { title: '百科 - 南武民主共和国' }
  },
  {
    path: '/test',
    name: 'Test',
    component: () => {
      return h(DefaultLayout, () => h(TestPage));
    },
    meta: { title: '测试页面 - 南武民主共和国' }
  },
  {
    path: '/external-wiki',
    name: 'ExternalWiki',
    component: () => {
      return h(DefaultLayout, () => h(ExternalWikiPage));
    },
    meta: { title: '外部Wiki - 南武民主共和国' }
  },
  {
    path: '/policies',
    name: 'Policies',
    component: () => {
      return h(DefaultLayout, () => h(PoliciesPage));
    },
    meta: { title: '政策法规 - 南武民主共和国' }
  },
  {
    path: '/organization',
    name: 'Organization',
    component: () => {
      return h(DefaultLayout, () => h(OrganizationPage));
    },
    meta: { title: '政府组织架构 - 南武民主共和国' }
  },
  {
    path: '/services',
    name: 'Services',
    component: () => {
      return h(DefaultLayout, () => h(ServicePage));
    },
    meta: { title: '公共服务 - 南武民主共和国' }
  },
  {
    path: '/about',
    name: 'About',
    component: () => {
      return h(DefaultLayout, () => h(AboutPage));
    },
    meta: { title: '关于南武 - 南武民主共和国' }
  },
  // 无布局测试页面
  {
    path: '/direct-test',
    name: 'DirectTest',
    component: DirectTestPage,
    meta: { title: '无布局测试 - 南武民主共和国' }
  },
  // --- 404 Not Found ---
  {
    path: '/:pathMatch(.*)*', // 捕获所有未匹配的路由
    name: 'NotFound',
    component: NotFoundPage
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