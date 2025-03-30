import { type ThemeDefinition } from 'vuetify';

// 定义符合 M3 的亮色主题
export const lightTheme: ThemeDefinition = {
  dark: false,
  colors: {
    // M3 核心颜色角色 (调整后)
    'primary': '#c62828',         // 主色 (政府红 - 保持)
    'on-primary': '#FFFFFF',      // 主色上的文本/图标颜色
    'primary-container': '#FFDAD6', // 主色容器
    'on-primary-container': '#410002', // 主色容器上的文本/图标颜色

    'secondary': '#605D62',       // 次要色 (中性灰 - 调整)
    'on-secondary': '#FFFFFF',    // 次要色上的文本/图标颜色
    'secondary-container': '#E6E1E9', // 次要色容器 (浅灰 - 调整)
    'on-secondary-container': '#1D1B1F', // 次要色容器上的文本/图标颜色 (深灰 - 调整)

    'tertiary': '#7D5700',        // 第三色 (金色 - 调整)
    'on-tertiary': '#FFFFFF',     // 第三色上的文本/图标颜色
    'tertiary-container': '#FFDEAD', // 第三色容器 (浅金 - 调整)
    'on-tertiary-container': '#271A00', // 第三色容器上的文本/图标颜色 (深金 - 调整)

    'error': '#BA1A1A',           // 错误色
    'on-error': '#FFFFFF',        // 错误色上的文本/图标颜色
    'error-container': '#FFDAD6',   // 错误色容器
    'on-error-container': '#410002', // 错误色容器上的文本/图标颜色

    'background': '#FAFBFD',      // 应用背景色 (米白 - 调整)
    'on-background': '#1F1A1A',   // 背景色上的文本/图标颜色 (深灰红 - 调整)

    'surface': '#FAFBFD',        // 组件表面色 (米白 - 调整)
    'on-surface': '#1F1A1A',     // 表面色上的文本/图标颜色 (深灰红 - 调整)

    'surface-variant': '#F5DDDA',  // 表面变体色 (浅粉灰 - 保持)
    'on-surface-variant': '#534341', // 表面变体色上的文本/图标颜色 (棕灰 - 保持)

    'outline': '#857371',         // 轮廓色 (中棕灰 - 保持)
    'outline-variant': '#D8C2BF', // 轮廓变体色 (浅粉灰 - 保持)

    'shadow': '#000000',         // 阴影色
    'scrim': '#000000',          // 遮罩层颜色

    // -- 旧版 Vuetify 颜色兼容 (尽量使用上面的 M3 角色) --
    'info': '#2196F3',
    'success': '#4CAF50',
    'warning': '#FB8C00',

    // -- 自定义颜色 (可选) --
    'official-red': '#c62828', 
    'official-gold': '#FFD700', 
  },
  variables: {
    // -- M3 风格的圆角 --
    'border-radius-xs': '4px',
    'border-radius-sm': '8px',
    'border-radius-md': '12px',
    'border-radius-lg': '16px',
    'border-radius-xl': '28px',

    // -- M3 风格的阴影 (Vuetify 的 elevation 会映射这些) --
    'shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.2)',
    'shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.14)',
    'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.12)',
  }
};

// 定义符合 M3 的暗色主题
export const darkTheme: ThemeDefinition = {
  dark: true,
  colors: {
    'primary': '#ffb4ab',         // 主色 (暗)
    'on-primary': '#690005',      // 主色上的文本/图标颜色 (暗)
    'primary-container': '#93000a', // 主色容器 (暗)
    'on-primary-container': '#FFDAD6', // 主色容器上的文本/图标颜色 (暗)

    'secondary': '#e7bdb8',       // 次要色 (暗)
    'on-secondary': '#442926',    // 次要色上的文本/图标颜色 (暗)
    'secondary-container': '#5d3f3c', // 次要色容器 (暗)
    'on-secondary-container': '#FFDAD6', // 次要色容器上的文本/图标颜色 (暗)

    'tertiary': '#e0c38c',        // 第三色 (暗)
    'on-tertiary': '#3f2e04',     // 第三色上的文本/图标颜色 (暗)
    'tertiary-container': '#584419', // 第三色容器 (暗)
    'on-tertiary-container': '#FCDFA6', // 第三色容器上的文本/图标颜色 (暗)

    'error': '#FFB4AB',           // 错误色 (暗)
    'on-error': '#690005',        // 错误色上的文本/图标颜色 (暗)
    'error-container': '#93000a',   // 错误色容器 (暗)
    'on-error-container': '#FFDAD6', // 错误色容器上的文本/图标颜色 (暗)

    'background': '#201A19',      // 应用背景色 (暗)
    'on-background': '#EDE0DD',   // 背景色上的文本/图标颜色 (暗)

    'surface': '#201A19',        // 组件表面色 (暗)
    'on-surface': '#EDE0DD',     // 表面色上的文本/图标颜色 (暗)

    'surface-variant': '#534341',  // 表面变体色 (暗)
    'on-surface-variant': '#D8C2BF', // 表面变体色上的文本/图标颜色 (暗)

    'outline': '#A08C8A',         // 轮廓色 (暗)
    'outline-variant': '#534341', // 轮廓变体色 (暗)

    'shadow': '#000000',         // 阴影色
    'scrim': '#000000',          // 遮罩层颜色

    // -- 旧版 Vuetify 颜色兼容 --
    'info': '#64B5F6',
    'success': '#81C784',
    'warning': '#FFB74D',

    // -- 自定义颜色 (可选) --
    'official-red': '#ffb4ab',
    'official-gold': '#e0c38c',
  },
  variables: {
    // -- M3 风格的圆角 (与亮色主题一致) --
    'border-radius-xs': '4px',
    'border-radius-sm': '8px',
    'border-radius-md': '12px',
    'border-radius-lg': '16px',
    'border-radius-xl': '28px',

    // -- M3 风格的阴影 (暗色模式阴影通常更柔和) --
    'shadow-key-umbra-opacity': 'rgba(0, 0, 0, 0.4)',
    'shadow-key-penumbra-opacity': 'rgba(0, 0, 0, 0.28)',
    'shadow-key-ambient-opacity': 'rgba(0, 0, 0, 0.24)',
  }
}; 