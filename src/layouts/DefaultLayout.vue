<template>
  <div class="government-layout">
    <!-- 移动端搜索栏展开区域 -->
    <div v-if="showMobileSearch" class="mobile-search-bar d-md-none">
      <v-container class="py-2">
        <v-text-field
          density="compact"
          hide-details
          prepend-inner-icon="mdi-magnify"
          placeholder="搜索政府信息..."
          variant="outlined"
          rounded="pill"
          class="search-field"
          autofocus
          @blur="showMobileSearch = false"
        >
          <template v-slot:append>
            <v-btn icon variant="text" size="small" @click="showMobileSearch = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-text-field>
      </v-container>
    </div>

    <!-- 统一的顶部导航栏 -->
    <v-app-bar 
      color="surface"  
      elevation="2"  
      height="auto"  
      class="app-nav-bar"
      app
    >
      <v-container class="pa-0"> 
        <!-- 第一行：Logo, 标题, 桌面工具 -->
        <div class="d-flex align-center px-4 py-2 top-bar-row" style="min-height: 64px;">
          <div class="d-flex align-center me-4">
            <v-app-bar-nav-icon class="d-md-none me-2" @click="drawer = !drawer"></v-app-bar-nav-icon>
            <v-avatar color="primary-container" size="48" class="me-3"> 
              <v-icon icon="mdi-flag-variant" size="large" color="on-primary-container"></v-icon>
            </v-avatar>
            <div class="site-title d-none d-sm-block"> 
              <h1 class="text-h6 font-weight-bold mb-0">南武民主共和国</h1>
              <div class="text-caption text-medium-emphasis">THE DEMOCRATIC REPUBLIC OF NAMBU</div>
            </div>
          </div>
          
          <v-spacer></v-spacer>
          
          <!-- 桌面端工具栏 -->
          <div class="d-none d-md-flex align-center">
            <v-text-field
              density="compact"
              hide-details
              prepend-inner-icon="mdi-magnify"
              placeholder="搜索..."
              variant="outlined"
              rounded="pill"
              class="search-field me-3"
              style="max-width: 280px;"
            ></v-text-field>
            <v-btn variant="text" density="comfortable" class="text-none mx-1">简体中文</v-btn>
            <v-btn variant="text" density="comfortable" class="text-none mx-1">
              <v-icon size="small" class="me-1">mdi-access-point</v-icon>无障碍
            </v-btn>
            <v-btn icon @click="toggleTheme" variant="text" class="ml-2">
              <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
              <v-tooltip activator="parent" location="bottom">{{ isDark ? '切换亮色' : '切换暗色' }}</v-tooltip>
            </v-btn>
          </div>
          
          <!-- 移动端菜单和搜索触发器 -->
          <div class="d-flex d-md-none align-center">
             <v-btn icon variant="text" @click="showMobileSearch = !showMobileSearch" class="ms-1">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
          </div>
        </div>

        <!-- 分割线 -->
        <v-divider></v-divider> 

        <!-- 第二行：主导航菜单 -->
        <div class="d-none d-md-flex align-center px-4 main-nav-row" style="height: 56px;"> 
          <!-- 桌面菜单 -->
          <div class="nav-links">
            <v-btn 
              v-for="item in menuItems" 
              :key="item.title" 
              :to="item.to" 
              variant="text" 
              class="nav-btn mx-1 text-none" 
              :class="{ 'active-nav': $route.path === item.to }"
              rounded="pill" 
            >
              <v-icon size="small" class="me-1 d-none d-lg-inline-block">{{ item.icon }}</v-icon>
              {{ item.title }}
            </v-btn>
          </div>
          <v-spacer></v-spacer> 
        </div>
      </v-container>
    </v-app-bar>

    <!-- 侧边导航抽屉 (M3 Modal Navigation Drawer) -->
    <v-navigation-drawer
      v-model="drawer"
      temporary
      location="start"
      width="300"
      class="drawer-nav"
      elevation="1"
    >
      <v-list density="compact" nav>
        <v-list-item 
          prepend-avatar="/images/emblem.svg"
          title="南武民主共和国"
          subtitle="官方门户网站"
          class="py-3 mb-2"
        ></v-list-item>

        <v-divider></v-divider>

        <v-list-item
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.to"
          :prepend-icon="item.icon"
          :title="item.title"
          :active="$route.path === item.to"
          @click="drawer = false"
          rounded="xl"
          class="my-1 mx-2"
        ></v-list-item>
        
        <v-divider class="my-2"></v-divider>
        
        <v-list-item>
          <v-list-item-title class="d-flex align-center">
            <span class="me-2 text-body-2">暗色模式</span>
            <v-spacer></v-spacer>
            <v-switch
              v-model="isDarkLocal"
              color="primary"
              hide-details
              inset
              density="compact"
              @change="toggleTheme"
              :true-value="true"
              :false-value="false"
            ></v-switch>
          </v-list-item-title>
        </v-list-item>
        
        <v-list-item prepend-icon="mdi-translate" title="简体中文" subtitle="Language" class="d-sm-none"></v-list-item>
        <v-list-item prepend-icon="mdi-access-point" title="无障碍模式" subtitle="Accessibility" class="d-sm-none"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- 主要内容区域 -->
    <v-main class="main-content">
      <v-container class="py-6 content-container">
        <slot></slot>
      </v-container>
    </v-main>

    <!-- 页脚 (M3 Footer Style) -->
    <v-footer class="footer-section py-8 px-4" color="surface-variant">
      <v-container>
        <v-row>
          <v-col cols="12" md="4" class="mb-6 mb-md-0">
            <div class="text-h6 mb-4 font-weight-medium text-on-surface-variant">南武民主共和国</div>
            <p class="text-body-2 text-medium-emphasis mb-4">
              遵循远视主义社会主义原则，致力于建设繁荣、民主、和谐的现代化国家。
            </p>
            <div class="d-flex">
              <v-btn icon variant="text" href="#" class="me-2">
                <v-icon color="on-surface-variant">mdi-facebook</v-icon>
              </v-btn>
              <v-btn icon variant="text" href="#" class="me-2">
                <v-icon color="on-surface-variant">mdi-twitter</v-icon>
              </v-btn>
              <v-btn icon variant="text" href="#">
                <v-icon color="on-surface-variant">mdi-youtube</v-icon>
              </v-btn>
            </div>
          </v-col>
          
          <v-col cols="6" sm="4" md="2">
            <div class="text-body-1 font-weight-medium mb-3 text-on-surface-variant">快速链接</div>
            <div v-for="item in footerLinks1" :key="item.title" class="mb-2">
              <router-link :to="item.to" class="footer-link">{{ item.title }}</router-link>
            </div>
          </v-col>
          
          <v-col cols="6" sm="4" md="3">
            <div class="text-body-1 font-weight-medium mb-3 text-on-surface-variant">政府信息</div>
            <div v-for="item in footerLinks2" :key="item.title" class="mb-2">
              <router-link :to="item.to" class="footer-link">{{ item.title }}</router-link>
            </div>
          </v-col>
          
          <v-col cols="12" sm="4" md="3">
            <div class="text-body-1 font-weight-medium mb-3 text-on-surface-variant">联系方式</div>
            <div class="mb-2 text-body-2 text-medium-emphasis">
              <v-icon size="small" class="me-1">mdi-map-marker</v-icon>南武城中央大道1号
            </div>
            <div class="mb-2 text-body-2 text-medium-emphasis">
              <v-icon size="small" class="me-1">mdi-email</v-icon>info@nambu-gov.org
            </div>
            <div class="mb-2 text-body-2 text-medium-emphasis">
              <v-icon size="small" class="me-1">mdi-phone</v-icon>12345 (服务热线)
            </div>
          </v-col>
        </v-row>
        
        <v-divider class="my-6 border-opacity-25"></v-divider>
        
        <div class="text-center text-body-2 text-medium-emphasis">
          &copy; {{ currentYear }} 南武民主共和国政府 版权所有 | 网站地图 | 隐私政策 | 版权声明
        </div>
      </v-container>
    </v-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, inject } from 'vue';
import { ThemeSymbol } from '../symbols';
import { useRoute } from 'vue-router';
import { useDisplay } from 'vuetify';

const route = useRoute();
const $vuetify = useDisplay();
const drawer = ref(false);
const showMobileSearch = ref(false);
const currentYear = new Date().getFullYear();

const themeContext = inject(ThemeSymbol);
const isDark = themeContext?.isDark || ref(false);
const toggleTheme = themeContext?.toggleTheme || (() => {});

const isDarkLocal = computed({
  get: () => isDark.value,
  set: (val) => {
    if (val !== isDark.value) {
      toggleTheme();
    }
  }
});

const menuItems = [
  { title: '首页', icon: 'mdi-home-outline', to: '/' },
  { title: '知识百科', icon: 'mdi-book-open-variant-outline', to: '/external-wiki' },
  { title: '政策法规', icon: 'mdi-gavel', to: '/policies' },
  { title: '政府机构', icon: 'mdi-domain', to: '/organization' },
  { title: '公共服务', icon: 'mdi-account-group-outline', to: '/services' },
  { title: '关于南武', icon: 'mdi-information-outline', to: '/about' },
];

const footerLinks1 = [
  { title: '首页', to: '/' },
  { title: '公共服务', to: '/services' },
  { title: '政策法规', to: '/policies' },
  { title: '关于南武', to: '/about' },
];

const footerLinks2 = [
  { title: '政府机构', to: '/organization' },
  { title: '信息公开', to: '/public-info' }, // 假设有此页面
  { title: '联系我们', to: '/contact' },   // 假设有此页面
  { title: '知识百科', to: '/external-wiki' },
];
</script>

<style scoped>
.government-layout {
  background-color: rgb(var(--v-theme-background));
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-nav-bar {
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

/* 调整 AppBar 内边距和行高 */
.top-bar-row, .main-nav-row {
  width: 100%;
}

.site-title h1 {
  color: rgb(var(--v-theme-on-surface));
}
.site-title div {
   color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
}

.nav-links .nav-btn {
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), var(--v-medium-emphasis-opacity));
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;
}

.nav-links .nav-btn:hover {
  background-color: rgba(var(--v-theme-primary), 0.08);
  color: rgb(var(--v-theme-primary));
}

.nav-links .active-nav {
  color: rgb(var(--v-theme-primary));
  font-weight: 700;
  background-color: rgba(var(--v-theme-primary), 0.12); 
}

.main-content {
  flex-grow: 1;
  padding-top: 121px !important;
}

@media (max-width: 959.98px) { /* Vuetify md 断点下界 */
  .app-nav-bar .main-nav-row {
     display: none !important; /* 强制隐藏导航行 */
  }
  .main-content {
    padding-top: 64px !important;
  }
}

.mobile-search-bar {
  position: sticky; 
  top: 0; 
  z-index: 1005; 
  background-color: rgb(var(--v-theme-surface));
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  border-bottom: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
  /* 当顶部栏 collapse 时，确保移动搜索栏仍在可见区域 */
  /* 这个可能需要根据 collapse 后的实际高度动态调整，暂时保持 */
}

.drawer-nav {
  border-right: none !important; /* M3 风格 */
}

.footer-section {
  border-top: 1px solid rgba(var(--v-border-color), var(--v-border-opacity));
}

.footer-link {
  color: rgba(var(--v-theme-on-surface-variant), var(--v-medium-emphasis-opacity));
  text-decoration: none;
  transition: color 0.2s ease-in-out;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
  text-decoration: underline;
}

.search-field {
  transition: max-width 0.3s ease-in-out;
}
.search-field:focus-within {
  max-width: 400px !important;
}
</style>