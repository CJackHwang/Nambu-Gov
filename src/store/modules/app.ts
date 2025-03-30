import { defineStore } from 'pinia';

interface AppState {
  appName: string;
  theme: 'light' | 'dark'; // 示例主题状态
  isLoading: boolean; // 示例全局加载状态
}

export const useAppStore = defineStore('app', {
  state: (): AppState => ({
    appName: '(联合主义)南武民主共和国门户',
    theme: 'light',
    isLoading: false,
  }),
  getters: {
    // 示例 getter
    fullAppName: (state) => `官方网站 - ${state.appName}`,
  },
  actions: {
    // 示例 action
    setLoading(loading: boolean) {
      this.isLoading = loading;
    },
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light';
      // 这里可以添加切换主题的实际逻辑，比如修改 body class
      document.body.classList.toggle('dark-theme', this.theme === 'dark');
    },
  },
});