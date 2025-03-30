<template>
  <div class="not-found-page d-flex align-center justify-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <v-card class="pa-6 pa-md-10 text-center not-found-card" flat>
             <!-- M3 大数字和标题 -->
            <div class="error-code mb-n2">404</div>
            <h1 class="text-h4 font-weight-medium text-primary mb-3">页面未找到</h1>
            <p class="text-body-1 text-medium-emphasis mb-8">
              抱歉，您要访问的页面不存在或已被移动。
            </p>

            <!-- 操作按钮 (M3 Filled & Outlined) -->
            <div class="d-flex flex-wrap justify-center mb-8">
              <v-btn 
                color="primary"
                variant="elevated"
                class="mx-2 mb-2 nav-button"
                to="/"
                prepend-icon="mdi-home-outline"
              >
                返回首页
              </v-btn>
              <v-btn 
                variant="outlined"
                color="primary"
                class="mx-2 mb-2 nav-button"
                @click="goBack"
                prepend-icon="mdi-arrow-left"
              >
                返回上一页
              </v-btn>
            </div>

            <!-- 建议链接 (M3 Card List Style) -->
            <div class="suggested-pages mb-8">
              <h3 class="text-h6 font-weight-medium mb-4">您可能要找：</h3>
              <v-row dense>
                <v-col 
                  cols="12" sm="6" 
                  v-for="(link, index) in suggestedLinks" 
                  :key="index"
                  class="mb-2"
                >
                    <v-card
                      :to="link.to"
                      variant="outlined"
                      class="suggested-link-card text-left"
                      hover
                    >
                      <v-card-item>
                         <template v-slot:prepend>
                           <v-avatar size="40" color="primary-container" class="me-3">
                            <v-icon :icon="link.icon" color="on-primary-container"></v-icon>
                          </v-avatar>
                         </template>
                         <div>
                           <div class="text-body-1 font-weight-medium">{{ link.title }}</div>
                           <div class="text-caption text-medium-emphasis">{{ link.subtitle }}</div>
                         </div>
                          <v-spacer></v-spacer>
                          <v-icon>mdi-chevron-right</v-icon>
                      </v-card-item>
                    </v-card>
                </v-col>
              </v-row>
            </div>
            
            <!-- 联系支持 (M3 Alert Style) -->
            <v-alert
              type="info"
              variant="tonal"
              border="start"
              class="contact-support text-left"
              icon="mdi-help-circle-outline"
            >
               <template v-slot:title>
                 <div class="text-body-1 font-weight-medium">需要帮助？</div>
               </template>
              <p class="text-body-2 mb-2">
                如果您认为这是一个错误，请联系我们的技术支持。
              </p>
              <div class="text-body-2">
                 <a href="mailto:support@nambu-gov.org" class="text-decoration-none me-4">
                   <v-icon size="small" start>mdi-email-outline</v-icon>support@nambu-gov.org
                 </a>
                 <a href="tel:12345" class="text-decoration-none">
                   <v-icon size="small" start>mdi-phone-outline</v-icon>服务热线：12345
                 </a>
              </div>
            </v-alert>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const suggestedLinks = [
  { title: '网站首页', subtitle: '返回门户主页', to: '/', icon: 'mdi-home-outline' },
  { title: '政策法规', subtitle: '查找最新政策', to: '/policies', icon: 'mdi-gavel' },
  { title: '政府机构', subtitle: '了解组织架构', to: '/organization', icon: 'mdi-domain' },
  { title: '公共服务', subtitle: '在线办理业务', to: '/services', icon: 'mdi-account-check-outline' }
];

const goBack = () => {
  router.go(-1);
};

onMounted(() => {
  console.log('404 Error: Page not found at', window.location.pathname);
  // 这里可以添加发送到分析服务的代码
});
</script>

<style scoped>
.not-found-page {
  min-height: calc(100vh - 64px - 73px); /* 减去header和app-bar的高度，根据实际调整 */
  background-color: var(--v-theme-surface-variant);
}

.not-found-card {
  background-color: transparent !important; /* 使卡片背景透明 */
  box-shadow: none !important;
}

.error-code {
  font-size: clamp(5rem, 20vw, 9rem); /* 响应式字体大小 */
  font-weight: 800;
  line-height: 1;
  background: linear-gradient(45deg, var(--v-theme-primary) 30%, var(--v-theme-secondary) 70%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
}

.nav-button {
  min-width: 150px;
  margin-top: 8px; /* 添加一点顶部间距 */
}

.suggested-link-card {
  transition: all 0.2s ease-out;
}

.suggested-link-card:hover {
   border-color: var(--v-theme-primary);
   background-color: rgba(var(--v-theme-primary), 0.04);
}

.contact-support a {
  color: var(--v-theme-primary);
}

.contact-support a:hover {
  text-decoration: underline;
}

/* 响应式 */
@media (max-width: 600px) {
  .not-found-page {
     min-height: calc(100vh - 56px - 57px); /* 移动端高度 */
     padding: 16px 0;
   }
   .not-found-card {
     padding: 1.5rem !important;
   }
  .error-code {
     margin-bottom: 0 !important;
   }
   .text-h4 {
     font-size: 1.5rem !important;
     margin-bottom: 0.5rem !important;
   }
   .text-body-1 {
     font-size: 0.9rem !important;
     margin-bottom: 1.5rem !important;
   }
   .nav-button {
     min-width: 130px;
     font-size: 0.8rem !important;
   }
   .text-h6 {
     font-size: 1.1rem !important;
   }
  .suggested-pages .v-col {
     padding: 0 4px !important;
     margin-bottom: 8px !important;
   }
}
</style>