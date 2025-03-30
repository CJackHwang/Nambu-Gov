<template>
  <div class="about-page">
    <v-container>
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="text-h4 font-weight-medium">关于南武</h1>
        <div class="text-subtitle-1">了解南武民主共和国的历史与现状</div>
      </div>
      
      <!-- 国家概况 -->
      <section class="overview-section mb-8">
        <v-row align="center">
          <v-col cols="12" md="7">
            <h2 class="text-h5 font-weight-medium mb-4">国家概览</h2>
            <p class="text-body-1 text-medium-emphasis mb-4">
              南武民主共和国位于亚洲东部，成立于1952年。以先进的民主制度、完善的法治体系和远视主义社会主义经济模式著称，致力于建设繁荣、公平、可持续发展的现代化国家。
            </p>
            <p class="text-body-1 text-medium-emphasis mb-6">
              国家实行人民代表制度，政府架构包括人民议事厅（立法）、中央人民委员会（行政）及各专业委员会。经济以高科技、文化创意、先进制造和可持续农业为主导。
            </p>
            
            <v-row dense>
              <v-col cols="6" sm="4">
                <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-map-marker-outline</v-icon>
                  </template>
                  <v-list-item-title><strong>首都：</strong>南武城</v-list-item-title>
                </v-list-item>
              </v-col>
              <v-col cols="6" sm="4">
                 <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-translate</v-icon>
                  </template>
                  <v-list-item-title><strong>语言：</strong>汉语</v-list-item-title>
                </v-list-item>
              </v-col>
               <v-col cols="6" sm="4">
                 <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-account-group-outline</v-icon>
                  </template>
                  <v-list-item-title><strong>人口：</strong>约2500万</v-list-item-title>
                </v-list-item>
              </v-col>
              <v-col cols="6" sm="4">
                 <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-texture-box</v-icon>
                  </template>
                  <v-list-item-title><strong>面积：</strong>12万 km²</v-list-item-title>
                </v-list-item>
              </v-col>
              <v-col cols="6" sm="4">
                 <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-cash</v-icon>
                  </template>
                  <v-list-item-title><strong>货币：</strong>南武元 (NWY)</v-list-item-title>
                </v-list-item>
              </v-col>
               <v-col cols="6" sm="4">
                 <v-list-item density="compact" class="px-0">
                  <template v-slot:prepend>
                    <v-icon color="primary" class="me-2">mdi-clock-time-four-outline</v-icon>
                  </template>
                  <v-list-item-title><strong>时区：</strong>GMT+8</v-list-item-title>
                </v-list-item>
              </v-col>
            </v-row>
          </v-col>
          
          <v-col cols="12" md="5">
            <v-img
              src="https://source.unsplash.com/random/800x600/?landscape,modern"
              aspect-ratio="16/9"
              cover
              class="rounded-lg mb-4 elevation-2"
            ></v-img>
             <v-row dense>
                <v-col cols="6">
                  <v-card class="national-symbol" variant="outlined">
                    <v-card-text class="text-center">
                      <div class="flag-placeholder mb-2"></div>
                      <div class="text-body-2 font-weight-medium">国旗</div>
                    </v-card-text>
                  </v-card>
                </v-col>
                 <v-col cols="6">
                  <v-card class="national-symbol" variant="outlined">
                     <v-card-text class="text-center">
                      <img src="/national-emblem.svg" height="60" alt="国徽" class="mb-2" />
                      <div class="text-body-2 font-weight-medium">国徽</div>
                    </v-card-text>
                  </v-card>
                </v-col>
             </v-row>
          </v-col>
        </v-row>
      </section>
      
      <!-- 详细信息 Tabs (M3 Tabs) -->
      <section class="details-section mb-8">
        <v-card variant="flat" color="surface-variant">
           <v-tabs
            v-model="activeTab"
            bg-color="transparent"
            color="primary"
            align-tabs="center"
            grow
          >
            <v-tab value="history" prepend-icon="mdi-history">历史沿革</v-tab>
            <v-tab value="culture" prepend-icon="mdi-palette-outline">文化特色</v-tab>
            <v-tab value="economy" prepend-icon="mdi-finance">经济发展</v-tab>
            <v-tab value="geography" prepend-icon="mdi-map-outline">地理环境</v-tab>
          </v-tabs>

          <v-window v-model="activeTab" class="pa-5 tab-content-window">
            <!-- 历史 -->
            <v-window-item value="history">
              <h3 class="tab-section-title">南武的足迹</h3>
              <v-timeline density="compact" side="end" truncate-line="both" line-inset="8">
                <v-timeline-item dot-color="primary" size="x-small">
                  <strong>1952年:</strong> 南武民主共和国成立，开启新纪元。
                </v-timeline-item>
                 <v-timeline-item dot-color="secondary" size="x-small">
                  <strong>1978年:</strong> 实行改革开放政策，经济开始腾飞。
                </v-timeline-item>
                <v-timeline-item dot-color="primary" size="x-small">
                  <strong>1995年:</strong> 加入世界贸易组织，深度融入全球化。
                </v-timeline-item>
                 <v-timeline-item dot-color="secondary" size="x-small">
                  <strong>2010年:</strong> 举办首届南武国际文化节，展示多元文化魅力。
                </v-timeline-item>
                 <v-timeline-item dot-color="primary" size="x-small">
                  <strong>2024年:</strong> 持续推进远视主义社会主义现代化建设。
                </v-timeline-item>
              </v-timeline>
            </v-window-item>
            
            <!-- 文化 -->
            <v-window-item value="culture">
               <h3 class="tab-section-title">多元融合的文化</h3>
               <p class="text-body-2 text-medium-emphasis mb-4">南武文化以开放、创新、包容为特点，融合传统东方美学与现代思潮。重视文化传承与创新，艺术形式蓬勃发展，居民崇尚简约和谐的生活方式。</p>
               <v-row>
                  <v-col cols="12" md="4"><v-card variant="tonal" color="tertiary"><v-card-text><strong>艺术:</strong> 现代与传统结合</v-card-text></v-card></v-col>
                  <v-col cols="12" md="4"><v-card variant="tonal" color="tertiary"><v-card-text><strong>文学:</strong> 现实与哲理并重</v-card-text></v-card></v-col>
                  <v-col cols="12" md="4"><v-card variant="tonal" color="tertiary"><v-card-text><strong>饮食:</strong> 健康、平衡、创新</v-card-text></v-card></v-col>
               </v-row>
            </v-window-item>
            
            <!-- 经济 -->
            <v-window-item value="economy">
                <h3 class="tab-section-title">创新驱动的经济</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">实行远视主义社会主义市场经济，以创新驱动、内外协调、绿色低碳为理念。GDP全球排名前列，人均GDP达发达水平。支柱产业包括信息技术、先进制造、新能源等。</p>
                 <v-row dense>
                    <v-col cols="6"><v-sheet rounded class="pa-3 bg-surface"><div class="text-caption">GDP总量</div><div class="text-body-1 font-weight-medium">1.2万亿美元</div></v-sheet></v-col>
                    <v-col cols="6"><v-sheet rounded class="pa-3 bg-surface"><div class="text-caption">人均GDP</div><div class="text-body-1 font-weight-medium">48,000美元</div></v-sheet></v-col>
                     <v-col cols="6"><v-sheet rounded class="pa-3 bg-surface"><div class="text-caption">研发投入占比</div><div class="text-body-1 font-weight-medium">4.8%</div></v-sheet></v-col>
                     <v-col cols="6"><v-sheet rounded class="pa-3 bg-surface"><div class="text-caption">对外贸易额</div><div class="text-body-1 font-weight-medium">9800亿美元</div></v-sheet></v-col>
                  </v-row>
            </v-window-item>
            
            <!-- 地理 -->
            <v-window-item value="geography">
               <h3 class="tab-section-title">壮丽的自然风光</h3>
                <p class="text-body-2 text-medium-emphasis mb-4">地处亚洲东部沿海，地形多样，气候温和湿润。拥有丰富的自然资源和优美的生态环境。主要城市分布在沿海和平原地区。</p>
                 <v-list density="compact" class="bg-transparent">
                   <v-list-item prepend-icon="mdi-star-outline" title="南武城 (首都)"></v-list-item>
                   <v-list-item prepend-icon="mdi-pine-tree" title="青龙山脉 (世界自然遗产)"></v-list-item>
                   <v-list-item prepend-icon="mdi-waves" title="明珠湖 (最大淡水湖)"></v-list-item>
                   <v-list-item prepend-icon="mdi-beach" title="东海海岸 (著名风景区)"></v-list-item>
                 </v-list>
            </v-window-item>
          </v-window>
        </v-card>
      </section>
      
      <!-- 国际关系 -->
      <section class="relations-section mb-8">
        <h2 class="text-h5 font-weight-medium mb-4">国际关系</h2>
         <p class="text-body-1 text-medium-emphasis mb-5">
            奉行独立自主的和平外交政策，致力于维护世界和平、促进共同发展。积极参与国际事务，与各国保持友好合作关系。
          </p>
        <v-card variant="outlined">
          <v-card-text>
            <v-row>
              <v-col cols="12" md="4">
                <div class="d-flex align-center">
                  <v-avatar color="primary-container" size="56" class="me-4">
                    <v-icon color="on-primary-container" size="large">mdi-handshake-outline</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-body-1 font-weight-medium">外交理念</div>
                    <div class="text-caption text-medium-emphasis">和平共处，互利共赢</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                 <div class="d-flex align-center">
                  <v-avatar color="secondary-container" size="56" class="me-4">
                    <v-icon color="on-secondary-container" size="large">mdi-briefcase-outline</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-body-1 font-weight-medium">经贸合作</div>
                    <div class="text-caption text-medium-emphasis">签署36+自由贸易协定</div>
                  </div>
                </div>
              </v-col>
              <v-col cols="12" md="4">
                 <div class="d-flex align-center">
                  <v-avatar color="tertiary-container" size="56" class="me-4">
                    <v-icon color="on-tertiary-container" size="large">mdi-school-outline</v-icon>
                  </v-avatar>
                  <div>
                    <div class="text-body-1 font-weight-medium">教育交流</div>
                    <div class="text-caption text-medium-emphasis">每年接收5000+留学生</div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </section>

      <!-- 联系信息 -->
       <section class="contact-section">
        <h2 class="text-h5 font-weight-medium mb-4">联系我们</h2>
         <v-card variant="tonal" color="primary">
            <v-card-text class="text-on-primary-container">
              <v-row>
                <v-col cols="12" md="6">
                  <div class="d-flex align-start mb-3">
                    <v-icon class="me-3 mt-1">mdi-map-marker-outline</v-icon>
                    <div>
                      <div class="text-body-1 font-weight-medium">政府总部地址</div>
                      <div class="text-body-2">南武城中央大道1号</div>
                    </div>
                  </div>
                  <div class="d-flex align-start">
                    <v-icon class="me-3 mt-1">mdi-phone-outline</v-icon>
                    <div>
                      <div class="text-body-1 font-weight-medium">政府服务热线</div>
                      <div class="text-body-2">12345（全国统一）</div>
                    </div>
                  </div>
                </v-col>
                <v-col cols="12" md="6">
                   <div class="d-flex align-start mb-3">
                    <v-icon class="me-3 mt-1">mdi-email-outline</v-icon>
                    <div>
                      <div class="text-body-1 font-weight-medium">官方邮箱</div>
                      <div class="text-body-2">info@nambu-gov.org</div>
                    </div>
                  </div>
                   <div class="d-flex align-start">
                    <v-icon class="me-3 mt-1">mdi-web</v-icon>
                    <div>
                      <div class="text-body-1 font-weight-medium">官方网站</div>
                      <div class="text-body-2">www.nambu-gov.org</div>
                    </div>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
       </section>

    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('history');
</script>

<style scoped>
/* 国旗占位符 */
.flag-placeholder {
  width: 100%;
  height: 60px;
  background-color: var(--v-theme-error); /* 使用错误色模拟红色 */
  position: relative;
  border-radius: var(--border-radius-xs);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 黄色五角星 */
.flag-placeholder::before {
  content: '';
  width: 18px;
  height: 18px;
  background-color: var(--v-theme-warning); /* 使用警告色模拟黄色 */
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
}

.national-symbol {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.national-symbol .v-card-text {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Tab 内容区域 */
.tab-content-window {
   background-color: var(--v-theme-surface);
   border-radius: 0 0 var(--border-radius-lg) var(--border-radius-lg);
}

.tab-section-title {
  font-size: 1.1rem; /* 18px */
  font-weight: 500;
  margin-bottom: 1rem;
  color: var(--v-theme-primary);
}

/* 时间线 */
.v-timeline--vertical.v-timeline {
  grid-row-gap: 1rem;
}

/* 国际关系卡片 */
.relations-section .v-avatar {
  border-radius: var(--border-radius-lg);
}

/* 联系信息卡片 */
.contact-section .v-icon {
  color: var(--v-theme-on-primary-container);
  opacity: 0.8;
}

/* 响应式 */
@media (max-width: 600px) {
  .overview-section .v-col[cols="6"] {
     padding-top: 4px;
     padding-bottom: 4px;
  }
  .details-section .v-tab {
    font-size: 0.8rem;
    padding: 0 8px;
  }
  .tab-content-window {
    padding: 1rem;
  }
   .relations-section .v-col[cols="12"] {
     margin-bottom: 1rem;
   }
}
</style> 