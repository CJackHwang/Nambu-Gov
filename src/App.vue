<template>
  <v-app>
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </v-app>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue';
import { useTheme } from 'vuetify';
import { ThemeSymbol } from './symbols';

// 主题控制
const theme = useTheme();
const isDark = ref(localStorage.getItem('darkMode') === 'true');

const toggleTheme = () => {
  isDark.value = !isDark.value;
  theme.global.name.value = isDark.value ? 'darkTheme' : 'lightTheme';
  localStorage.setItem('darkMode', isDark.value.toString());
};

// 初始化主题
theme.global.name.value = isDark.value ? 'darkTheme' : 'lightTheme';

// 提供主题控制给子组件
provide(ThemeSymbol, {
  isDark,
  toggleTheme
});

// 监听主题变化，并更新根元素属性以用于CSS变量
watch(isDark, (newVal) => {
  document.documentElement.setAttribute('data-theme', newVal ? 'dark' : 'light');
}, { immediate: true });
</script>

<style>
/* 1. 字体导入 - 移到最顶部 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700&display=swap');

/* 2. 全局变量和基础样式 */
:root {
  /* M3 风格圆角 */
  --border-radius-xs: 4px;
  --border-radius-sm: 8px;
  --border-radius-md: 12px;
  --border-radius-lg: 16px;
  --border-radius-xl: 28px;

  /* M3 动画曲线 */
  --m3-motion-easing-standard: cubic-bezier(0.4, 0.0, 0.2, 1);
  --m3-motion-easing-emphasized: cubic-bezier(0.2, 0.0, 0, 1);
  --m3-motion-duration-short4: 250ms;
  --m3-motion-duration-medium4: 400ms;
}

/* 统一使用 Vuetify 生成的 CSS 变量 */
body {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 400; /* 设定基础字重 */
  background-color: rgb(var(--v-theme-background)); /* 使用 Vuetify 变量 */
  color: rgb(var(--v-theme-on-background)); /* 使用 Vuetify 变量 */
  transition: background-color var(--m3-motion-duration-short4) var(--m3-motion-easing-standard),
              color var(--m3-motion-duration-short4) var(--m3-motion-easing-standard);
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  padding: 0;
  line-height: 1.6;
}

/* 3. 全局元素样式 */
* {
  box-sizing: border-box;
}

::selection {
  background-color: rgba(var(--v-theme-primary), 0.2);
}

::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: rgba(var(--v-theme-on-surface), 0.2);
  border-radius: var(--border-radius-lg);
  border: 2px solid transparent;
  background-clip: content-box;
}

::-webkit-scrollbar-thumb:hover {
  background-color: rgba(var(--v-theme-on-surface), 0.3);
}

/* 4. Vuetify 组件覆盖和增强 */
.v-application {
  /* 移除默认背景，使用body的 */
  background: transparent !important;
}

.v-container {
  max-width: 1280px !important;
}

.v-card {
  /* M3 卡片样式 */
  border-radius: var(--border-radius-lg) !important;
  border: 1px solid transparent;
  transition: box-shadow var(--m3-motion-duration-short4) var(--m3-motion-easing-standard),
              border-color var(--m3-motion-duration-short4) var(--m3-motion-easing-standard) !important;
  background-color: var(--v-theme-surface) !important;
  color: var(--v-theme-on-surface) !important;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05) !important; /* M3 Level 1 */
}

.v-card--variant-outlined {
  border-color: var(--v-theme-outline-variant) !important;
  box-shadow: none !important;
}

.v-card--hover:hover {
  box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.15) !important; /* M3 Level 2 */
}

.v-btn {
  /* M3 按钮样式 */
  border-radius: var(--border-radius-xl) !important; /* M3 全圆角 */
  text-transform: none !important;
  letter-spacing: 0.1px !important;
  font-weight: 500 !important;
  transition: background-color var(--m3-motion-duration-short4) var(--m3-motion-easing-standard),
              box-shadow var(--m3-motion-duration-short4) var(--m3-motion-easing-standard) !important;
}

/* Filled button (elevated) */
.v-btn--variant-elevated {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15) !important; /* M3 Level 1 elevation */
}
.v-btn--variant-elevated:hover {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(0, 0, 0, 0.15) !important; /* M3 Level 2 elevation */
}

/* Filled Tonal button */
.v-btn--variant-tonal {
  background-color: var(--v-theme-secondary-container) !important;
  color: var(--v-theme-on-secondary-container) !important;
}
.v-btn--variant-tonal:hover {
  background-color: rgba(var(--v-theme-on-secondary-container), 0.08) !important;
}

/* Outlined button */
.v-btn--variant-outlined {
  border: 1px solid var(--v-theme-outline) !important;
}
.v-btn--variant-outlined:hover {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
}

/* Text button */
.v-btn--variant-text:hover {
  background-color: rgba(var(--v-theme-primary), 0.08) !important;
}

.v-divider {
  border-color: var(--v-theme-outline-variant) !important;
  opacity: 1 !important;
}

.v-list-item {
  border-radius: var(--border-radius-xl) !important; /* M3 形状 */
}

.v-list-item--active {
  background-color: var(--v-theme-secondary-container) !important;
  color: var(--v-theme-on-secondary-container) !important;
}

.v-text-field--outlined .v-field__outline {
  --v-field-border-width: 1px;
  color: var(--v-theme-outline) !important;
}

.v-text-field--outlined.v-field--focused .v-field__outline {
  --v-field-border-width: 2px;
  color: var(--v-theme-primary) !important;
}

/* 5. 全局辅助类 */
.page-header {
  margin-bottom: 2.5rem; /* 增加页头下边距 */
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--v-theme-outline-variant);
}

.page-header .text-h4 {
  color: var(--v-theme-primary);
  margin-bottom: 0.5rem;
}

.page-header .text-subtitle-1 {
  color: var(--v-theme-on-surface-variant);
}

/* 6. 动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity var(--m3-motion-duration-short4) var(--m3-motion-easing-standard);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>