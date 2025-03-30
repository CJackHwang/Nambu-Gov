import { createApp } from 'vue';
import { createPinia } from 'pinia';

// Vuetify
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { md3 } from 'vuetify/blueprints';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

// 导入自定义主题
import { lightTheme, darkTheme } from './themes';

// 然后引入应用组件和路由
import App from './App.vue';
import router from './router';

// 创建 Pinia 存储
const pinia = createPinia();

// 配置Vuetify
const vuetify = createVuetify({
  blueprint: md3,
  components,
  directives,
  theme: {
    defaultTheme: 'lightTheme',
    themes: {
      lightTheme,
      darkTheme
    }
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  }
});

// 创建应用实例
const app = createApp(App);

// 使用插件
app.use(pinia);
app.use(router);
app.use(vuetify);

// 挂载应用
app.mount('#app');