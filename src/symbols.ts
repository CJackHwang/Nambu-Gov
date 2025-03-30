import { InjectionKey, Ref } from 'vue';

// 主题接口
export interface ThemeContext {
  isDark: Ref<boolean>;
  toggleTheme: () => void;
}

// 主题共享符号
export const ThemeSymbol: InjectionKey<ThemeContext> = Symbol('theme'); 