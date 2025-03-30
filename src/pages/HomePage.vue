<template>
  <div class="home-page">
    <!-- 1. 焦点轮播图区域 (M3 Carousel Style) -->
    <section class="carousel-section mb-8">
      <v-carousel
        cycle
        height="auto"
        hide-delimiter-background
        show-arrows="hover"
        interval="6000"
        class="rounded-lg overflow-hidden"
        progress="primary"
      >
        <v-carousel-item
          v-for="(slide, i) in carouselSlides"
          :key="i"
          :src="slide.image"
          cover
        >
          <div class="carousel-overlay d-flex align-center">
            <v-container>
              <div class="carousel-content">
                <h2 class="text-h3 mb-3 font-weight-bold">{{ slide.title }}</h2>
                <p class="text-h6 font-weight-regular mb-5">{{ slide.subtitle }}</p>
                <v-btn
                  color="primary"
                  variant="elevated"
                  :to="slide.link"
                  class="me-3"
                  size="large"
                >
                  {{ slide.buttonText }}
                </v-btn>
                <v-btn
                  variant="tonal"
                  color="white"
                  size="large"
                >
                  了解更多
                </v-btn>
              </div>
            </v-container>
          </div>
        </v-carousel-item>
      </v-carousel>
    </section>

    <!-- 2. 通知公告 (M3 Banner/Alert Style) -->
    <section class="notification-section mb-8">
      <v-alert
        v-if="notices.length > 0"
        type="info"
        variant="tonal"
        border="start"
        prominent
        class="m3-alert"
      >
        <template v-slot:prepend>
          <v-icon>$info</v-icon>
        </template>
        <div class="d-flex flex-wrap align-center">
          <div class="me-auto">
            <div class="text-h6 mb-1">重要通知</div>
            <div class="text-body-1">
              <router-link :to="notices[0].link" class="notice-link">
                {{ notices[0].title }}
              </router-link>
            </div>
          </div>
          <v-btn variant="text" color="primary" class="ms-md-4 mt-2 mt-md-0">
            查看全部
            <v-icon end>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-alert>
    </section>

    <v-row>
      <v-col cols="12" md="8">
        <!-- 3. 核心服务 (M3 Filled Tonal Card Style) -->
        <section class="core-services-section mb-8">
          <h2 class="text-h4 font-weight-medium mb-5">核心服务</h2>
          <v-row>
            <v-col
              v-for="(service, i) in coreServices"
              :key="i"
              cols="12" sm="6"
            >
              <v-card
                class="service-card h-100"
                :to="service.to"
                variant="tonal"
                color="secondary"
                hover
              >
                <v-card-item>
                  <template v-slot:prepend>
                    <v-avatar size="56" rounded="lg" color="secondary-container">
                      <v-icon :icon="service.icon" color="on-secondary-container" size="large"></v-icon>
                    </v-avatar>
                  </template>
                  <v-card-title class="text-h6">{{ service.title }}</v-card-title>
                  <v-card-subtitle>{{ service.description }}</v-card-subtitle>
                </v-card-item>
              </v-card>
            </v-col>
          </v-row>
        </section>

        <!-- 4. 新闻动态 (M3 Card List Style) -->
        <section class="news-section mb-8">
          <div class="d-flex align-center justify-space-between mb-5">
            <h2 class="text-h4 font-weight-medium">新闻动态</h2>
            <v-btn variant="text" color="primary" to="/news">更多新闻 <v-icon end>mdi-arrow-right</v-icon></v-btn>
          </div>
          <v-row>
            <v-col cols="12" v-for="(news, i) in newsItems.slice(0, 3)" :key="i">
              <v-card class="news-card" :to="news.link" variant="outlined">
                <div class="d-flex flex-no-wrap justify-space-between">
                  <div class="news-content">
                    <v-card-title class="text-h6 mb-1">{{ news.title }}</v-card-title>
                    <v-card-subtitle class="text-body-2 text-medium-emphasis mb-2">
                      发布于 {{ news.date }}
                    </v-card-subtitle>
                    <v-card-text class="text-body-1 pa-0 mb-3">
                      {{ news.summary }}
                    </v-card-text>
                    <v-chip size="small" color="primary" label>{{ news.category }}</v-chip>
                  </div>
                  <v-avatar v-if="news.image" class="ma-3" size="125" rounded="lg">
                    <v-img :src="news.image" cover></v-img>
                  </v-avatar>
                </div>
              </v-card>
            </v-col>
          </v-row>
        </section>
      </v-col>

      <v-col cols="12" md="4">
        <!-- 5. 核心原则 (M3 Side Information Style) -->
        <section class="core-principles-section mb-8">
          <h2 class="text-h5 font-weight-medium mb-5">核心原则</h2>
          <v-card variant="tonal" color="tertiary">
            <v-list lines="two" bg-color="transparent">
              <v-list-item
                v-for="(principle, i) in corePrinciples"
                :key="i"
              >
                <template v-slot:prepend>
                   <v-avatar size="40" color="tertiary-container" class="me-4">
                    <v-icon :icon="principle.icon" color="on-tertiary-container"></v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="font-weight-medium mb-1">{{ principle.title }}</v-list-item-title>
                <v-list-item-subtitle class="text-wrap">{{ principle.description }}</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </section>

        <!-- 6. 快速访问 (M3 List Style) -->
        <section class="quick-access-section">
          <h2 class="text-h5 font-weight-medium mb-5">快速访问</h2>
           <v-card variant="outlined">
             <v-list lines="two" nav>
                <v-list-item
                  v-for="(item, i) in quickLinks"
                  :key="i"
                  :title="item.title"
                  :subtitle="item.description"
                  :to="item.to"
                  :prepend-icon="item.icon"
                  rounded="xl"
                  class="quick-link-item mx-2 my-1"
                ></v-list-item>
              </v-list>
           </v-card>
        </section>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 数据定义 (保持不变，仅作示例)
const carouselSlides = [
  { title: '推进民主建设', subtitle: '建设更高水平的民主政治', image: 'https://source.unsplash.com/random/1600x600/?government,democracy', link: '/policies', buttonText: '了解政策' },
  { title: '深化改革开放', subtitle: '以创新驱动高质量发展', image: 'https://source.unsplash.com/random/1600x600/?city,future', link: '/about', buttonText: '关于南武' },
  { title: '服务改善民生', subtitle: '不断实现人民对美好生活的向往', image: 'https://source.unsplash.com/random/1600x600/?people,community', link: '/services', buttonText: '公共服务' },
];

const notices = [
  { title: '关于调整部分公共服务时间的通知', link: '/notices/1' },
  // ... more notices
];

const coreServices = [
  { title: '在线办事大厅', description: '一站式在线政务服务平台', icon: 'mdi-laptop-account', to: '/services' },
  { title: '政策法规查询', description: '最新法律法规及政策文件', icon: 'mdi-scale-balance', to: '/policies' },
  { title: '政府信息公开', description: '透明公开，接受社会监督', icon: 'mdi-bullhorn-outline', to: '/public-info' },
  { title: '互动交流平台', description: '建言献策，共商国是', icon: 'mdi-comment-account-outline', to: '/contact' },
];

const corePrinciples = [
  { title: '人民至上', description: '坚持以人民为中心的发展思想', icon: 'mdi-account-heart-outline' },
  { title: '依法治国', description: '全面推进依法治国，建设法治政府', icon: 'mdi-gavel' },
  { title: '改革创新', description: '坚持改革开放，激发社会活力', icon: 'mdi-lightbulb-on-outline' },
  { title: '共同富裕', description: '扎实推动共同富裕，共享发展成果', icon: 'mdi-finance' },
];

const newsItems = [
  { title: '南武一号卫星成功发射', date: '2024-07-15', summary: '我国自主研发的南武一号通信卫星在西昌卫星发射中心成功发射升空，标志着我国航天事业取得新进展...', image: 'https://source.unsplash.com/random/300x200/?satellite,space', link: '/news/1', category: '科技' },
  { title: '全国教育工作会议在首都召开', date: '2024-07-14', summary: '会议强调要全面贯彻党的教育方针，落实立德树人根本任务，培养德智体美劳全面发展的社会主义建设者和接班人...', link: '/news/2', category: '教育' },
  { title: '《南武民主共和国数据安全法》正式施行', date: '2024-07-12', summary: '该法旨在规范数据处理活动，保障数据安全，保护公民、组织的合法权益，维护国家主权、安全和发展利益...', image: 'https://source.unsplash.com/random/300x200/?data,security', link: '/news/3', category: '法治' },
  // ... more news
];

const quickLinks = [
  { title: '个人证件办理', description: '身份证、护照等', icon: 'mdi-card-account-details-outline', to: '/services/id' },
  { title: '社保查询与办理', description: '养老、医疗保险等', icon: 'mdi-shield-account-outline', to: '/services/social-security' },
  { title: '交通违法查询', description: '车辆违法信息处理', icon: 'mdi-traffic-light-outline', to: '/services/traffic' },
  { title: '投诉建议渠道', description: '反映问题，提出建议', icon: 'mdi-message-alert-outline', to: '/services/feedback' },
];
</script>

<style scoped>
.home-page {
  /* 可选：为主页添加额外的内边距 */
}

/* 1. 轮播图 */
.carousel-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to right, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 60%, transparent 100%);
}

.carousel-content {
  max-width: 650px;
  color: white;
}

/* 2. 通知公告 */
.m3-alert {
  border-radius: var(--border-radius-xl) !important;
}

.notice-link {
  color: inherit;
  font-weight: 500;
  text-decoration: none;
  transition: color 0.2s ease;
}

.notice-link:hover {
  color: var(--v-theme-primary);
  text-decoration: underline;
}

/* 3. 核心服务 */
.service-card {
  /* Tonal card 默认已有M3样式，这里可微调 */
}

/* 4. 新闻动态 */
.news-card {
  transition: box-shadow 0.3s var(--m3-motion-easing-standard);
}

.news-card:hover {
   box-shadow: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3) !important; /* M3 Level 3 */
}

.news-content {
  padding: 16px;
  flex-grow: 1;
}

/* 5. 核心原则 */
.core-principles-section .v-list-item {
  padding-left: 16px !important;
  padding-right: 16px !important;
}

.core-principles-section .v-list-item-subtitle {
  color: var(--v-theme-on-tertiary-container);
  opacity: 0.9;
}

/* 6. 快速访问 */
.quick-access-section .v-list-item--active {
   background-color: var(--v-theme-primary-container) !important;
   color: var(--v-theme-on-primary-container) !important;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .carousel-content .text-h3 {
    font-size: 1.8rem !important;
  }
  .carousel-content .text-h6 {
    font-size: 1rem !important;
    margin-bottom: 1.5rem !important;
  }
  .carousel-content .v-btn {
    size: default !important;
  }

  .notification-section .text-h6 {
     font-size: 1.1rem !important;
  }
   .notification-section .text-body-1 {
     font-size: 0.9rem !important;
  }

  .news-card {
    flex-direction: column;
  }
  .news-card .v-avatar {
     width: 100% !important;
     height: 150px !important;
     margin: 0 !important;
     border-radius: 12px 12px 0 0 !important;
   }
  .news-content {
     padding: 12px;
   }
}
</style>