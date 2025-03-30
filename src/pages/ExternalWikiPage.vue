<template>
  <div class="external-wiki-page">
    <!-- Wiki 主体区域 -->
    <v-card class="wiki-wrapper" elevation="1">
      <!-- 顶部工具栏 (M3 Small Top App Bar) -->
      <v-app-bar 
        color="surface-variant" 
        density="compact"
        flat
        class="wiki-app-bar"
      >
        <v-toolbar-title class="text-body-1 font-weight-medium text-on-surface-variant">
          <v-icon icon="mdi-book-open-variant-outline" class="me-2"></v-icon>
          南武民主共和国知识百科
        </v-toolbar-title>
        
        <v-spacer></v-spacer>
        
        <v-tooltip text="在新窗口打开" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" @click="openFullWindow" variant="text">
              <v-icon color="on-surface-variant">mdi-open-in-new</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
        
        <v-tooltip text="刷新" location="bottom">
          <template v-slot:activator="{ props }">
            <v-btn icon v-bind="props" @click="reloadFrame" variant="text" :disabled="loading">
              <v-icon color="on-surface-variant">mdi-refresh</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </v-app-bar>
      
      <!-- 加载指示器 (M3 Circular Progress) -->
      <v-overlay
        v-model="loading"
        contained
        persistent
        class="align-center justify-center wiki-loader"
      >
         <v-progress-circular
          color="primary"
          indeterminate
          size="64"
          :width="6"
        ></v-progress-circular>
      </v-overlay>
      
      <!-- Iframe -->
      <iframe 
        ref="wikiFrame"
        :src="wikiUrl" 
        @load="onIframeLoad"
        class="wiki-iframe"
        title="南武民主共和国百科"
        name="wiki-frame"
      ></iframe>
      
      <!-- 底部提示 (M3 Banner Style - 可选) -->
      <v-banner
        v-if="showFooter"
        lines="one"
        icon="$info"
        color="primary-container"
        class="wiki-footer"
        sticky
      >
        <v-banner-text class="text-on-primary-container text-body-2">
          您正在浏览官方知识百科，内容由官方编辑团队维护。
        </v-banner-text>
        <template v-slot:actions>
          <v-btn @click="showFooter = false" color="on-primary-container">知道了</v-btn>
        </template>
      </v-banner>
    </v-card>
    
    <!-- 相关链接 (M3 Card Grid) -->
    <section class="related-links-section mt-8 mb-4">
       <h2 class="text-h5 font-weight-medium mb-5">相关资源</h2>
       <v-row>
        <v-col cols="12" sm="6" md="3" v-for="(item, i) in relatedLinks" :key="i">
          <v-card
            :to="item.to"
            variant="outlined"
            class="h-100 related-link-card"
            hover
          >
            <v-card-item class="py-4">
              <template v-slot:prepend>
                <v-avatar size="48" color="primary-container" class="me-4">
                   <v-icon :icon="item.icon" color="on-primary-container"></v-icon>
                </v-avatar>
              </template>
              <div>
                <div class="text-body-1 font-weight-medium mb-1">{{ item.title }}</div>
                <div class="text-body-2 text-medium-emphasis">{{ item.description }}</div>
              </div>
            </v-card-item>
          </v-card>
        </v-col>
      </v-row>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, inject, watch } from 'vue';
import { ThemeSymbol } from '../symbols';

const wikiUrl = 'https://wiki.cjack.cfd';
const wikiFrame = ref<HTMLIFrameElement | null>(null);
const loading = ref(true);
const showFooter = ref(true);

const themeContext = inject(ThemeSymbol);
const isDark = themeContext?.isDark;

const relatedLinks = [
  { title: '政策法规', description: '了解国家最新政策与法规', icon: 'mdi-gavel', to: '/policies' },
  { title: '历史档案', description: '南武民主共和国历史文件', icon: 'mdi-archive-outline', to: '/archives' }, // 假设有
  { title: '组织架构', description: '政府机构与组织结构', icon: 'mdi-domain', to: '/organization' },
  { title: '国家象征', description: '国旗、国徽与象征符号', icon: 'mdi-flag-variant-outline', to: '/symbols' }, // 假设有
];

const onIframeLoad = () => {
  loading.value = false;
  applyThemeToIframe();
};

const openFullWindow = () => {
  window.open(wikiUrl, '_blank');
};

const reloadFrame = () => {
  loading.value = true;
  if (wikiFrame.value) {
    wikiFrame.value.src = wikiUrl; // 重置src会触发重新加载
  }
};

// 向iframe注入主题样式 (保持不变，基于M3颜色)
const applyThemeToIframe = () => {
  try {
    if (wikiFrame.value && wikiFrame.value.contentWindow) {
      const iframeDoc = wikiFrame.value.contentWindow.document;
      let styleEl = iframeDoc.getElementById('external-theme');
      if (!styleEl) {
        styleEl = iframeDoc.createElement('style');
        styleEl.id = 'external-theme';
        iframeDoc.head.appendChild(styleEl);
      }
      
      // 获取 CSS 变量的值来注入
      const styles = getComputedStyle(document.documentElement);
      const bgColor = styles.getPropertyValue(isDark?.value ? '--dark-background' : '--light-background').trim();
      const textColor = styles.getPropertyValue(isDark?.value ? '--dark-on-background' : '--light-on-background').trim();
      const linkColor = styles.getPropertyValue(isDark?.value ? '--dark-primary' : '--light-primary').trim();
      const surfaceColor = styles.getPropertyValue(isDark?.value ? '--dark-surface-variant' : '--light-surface-variant').trim();
      const outlineColor = styles.getPropertyValue(isDark?.value ? '--dark-outline-variant' : '--light-outline-variant').trim();

      styleEl.textContent = `
        body, .mw-body { 
          background-color: ${bgColor} !important;
          color: ${textColor} !important;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        a, .mw-body a:not(.external) { color: ${linkColor} !important; }
        h1, h2, h3, h4, h5, h6 { color: ${textColor} !important; border-bottom-color: ${outlineColor} !important;}
        .mw-body { border: 1px solid ${outlineColor} !important; }
        #mw-head, #mw-panel, #p-personal ul {
          background-color: ${surfaceColor} !important;
          border-color: ${outlineColor} !important;
        }
        #mw-head *, #mw-panel * { color: ${textColor} !important; }
        #p-navigation, #p-interaction, #p-tb, #p-lang {
          border-color: ${outlineColor} !important;
        }
        .vector-menu-content { background-color: ${surfaceColor} !important; }
        /* Add more specific styles as needed */
      `;
    }
  } catch (err) {
    console.warn('无法向iframe应用主题:', err);
  }
};

// 监听主题变化，并重新应用样式到iframe
if (isDark) {
  watch(isDark, applyThemeToIframe);
}

// 挂载和清理 (保持不变)
onMounted(() => {
  // 初始加载时不需要特别做什么，onload会处理
});

onBeforeUnmount(() => {
  // 清理监听器（如果添加了其他事件监听）
});
</script>

<style scoped>
.external-wiki-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.wiki-wrapper {
  flex-grow: 1; 
  min-height: 500px; 
  display: flex;
  flex-direction: column;
  overflow: hidden; 
  /* 添加 aspect-ratio，例如 16/9，可以根据需要调整 */
  aspect-ratio: 16 / 9; 
  /* 或者，如果不需要固定比例，确保容器有明确的高度限制 */
  /* max-height: calc(100vh - 200px); /* 减去大致的 Header 和 Footer 高度 */ 
}

.wiki-app-bar {
  border-bottom: 1px solid var(--v-theme-outline-variant);
}

.wiki-loader {
  background-color: rgba(var(--v-theme-surface), 0.8);
}

.wiki-iframe {
  width: 100%;
  /* height: 100%; */ /* 移除 height: 100% */
  border: none;
  flex-grow: 1; /* 保持 flex-grow */
  background-color: rgb(var(--v-theme-surface)); /* 使用 rgb() */
  transition: opacity 0.3s ease;
}

.wiki-footer {
  border-top: 1px solid var(--v-theme-outline-variant);
  border-radius: 0 !important; /* Banner 不需要圆角 */
}

.related-links-section {
  /* 响应式间距 */
}

.related-link-card {
  /* Outlined card M3 样式已在 App.vue 全局应用 */
}

.related-link-card .v-card-item {
  display: flex;
  align-items: center;
}

/* 响应式调整 (保持不变或微调) */
@media (max-width: 600px) {
  .wiki-wrapper {
    min-height: 400px;
  }
  .related-link-card {
    margin-bottom: 16px;
  }
}
</style> 