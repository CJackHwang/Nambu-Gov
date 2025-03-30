<template>
  <div class="policies-page">
    <v-container>
      <!-- 页面标题 (已全局处理) -->
      <div class="page-header">
        <h1 class="text-h4 font-weight-medium">政策法规</h1>
        <div class="text-subtitle-1">南武民主共和国法律法规、政策文件及公告</div>
      </div>
      
      <!-- 搜索和过滤 (M3 样式) -->
      <v-card class="mb-8 filter-card" variant="outlined">
        <v-card-text>
          <v-row align="center">
            <v-col cols="12" sm="6" md="5">
              <v-text-field
                v-model="searchQuery"
                label="搜索政策文件"
                prepend-inner-icon="mdi-magnify"
                variant="filled"
                density="comfortable"
                hide-details
                clearable
                rounded="lg"
              ></v-text-field>
            </v-col>
            <v-col cols="6" sm="3" md="3">
              <v-select
                v-model="selectedCategory"
                :items="categories"
                label="文件类别"
                variant="filled"
                density="comfortable"
                hide-details
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col cols="6" sm="3" md="2">
              <v-select
                v-model="selectedYear"
                :items="years"
                label="发布年份"
                variant="filled"
                density="comfortable"
                hide-details
                rounded="lg"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2" class="text-md-right mt-2 mt-md-0">
              <v-btn 
                variant="text" 
                color="primary"
                @click="resetFilters"
              >
                <v-icon start>mdi-filter-remove-outline</v-icon>
                重置
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      
      <!-- 主要内容区域 -->
      <v-row>
        <!-- 左侧导航 (M3 风格 List) -->
        <v-col cols="12" md="3" class="sidebar">
          <v-card variant="tonal" color="primary">
            <v-list nav bg-color="transparent" density="compact">
              <v-list-subheader class="text-on-primary-container">分类导航</v-list-subheader>
              <v-list-item
                v-for="category in categoryList"
                :key="category.id"
                :value="category.id"
                @click="selectedCategory = category.id"
                rounded="xl"
                class="nav-list-item"
                :active="selectedCategory === category.id"
              >
                <template v-slot:prepend>
                  <v-icon :icon="category.icon"></v-icon>
                </template>
                <v-list-item-title class="text-body-1">{{ category.name }}</v-list-item-title>
                <template v-slot:append>
                  <v-chip size="x-small" label>{{ category.count }}</v-chip>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
          
          <v-card variant="outlined" class="mt-6">
             <v-list nav density="compact">
              <v-list-subheader>热门政策</v-list-subheader>
              <v-list-item
                v-for="(item, i) in hotPolicies"
                :key="i"
                :title="item.title"
                :subtitle="item.date"
                @click="scrollToPolicy(item.id)"
                rounded="xl"
                class="nav-list-item hot-policy-item"
              >
                <template v-slot:prepend>
                  <v-icon icon="mdi-star-outline" color="tertiary" size="small"></v-icon>
                </template>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- 右侧政策列表 (M3 Card List) -->
        <v-col cols="12" md="9">
          <div v-if="paginatedPolicies.length > 0">
            <v-card 
              v-for="policy in paginatedPolicies" 
              :key="policy.id" 
              class="mb-4 policy-card"
              variant="outlined"
              :id="`policy-${policy.id}`"
            >
              <v-card-item @click="togglePolicyDetail(policy)" class="policy-header">
                <template v-slot:prepend>
                  <v-avatar size="40" color="primary-container" class="me-4">
                    <v-icon :icon="getCategoryIcon(policy.category)" color="on-primary-container"></v-icon>
                  </v-avatar>
                </template>
                <div>
                   <div class="text-h6 font-weight-medium mb-1">{{ policy.title }}</div>
                   <div class="text-body-2 text-medium-emphasis">
                     发布日期: {{ policy.publishDate }} | 分类: {{ getCategoryName(policy.category) }}
                   </div>
                </div>
                <v-spacer></v-spacer>
                <v-chip size="small" :color="policy.status === '有效' ? 'success' : 'grey'" label>
                  {{ policy.status }}
                </v-chip>
                 <v-icon class="ms-2 toggle-icon" :icon="selectedPolicyId === policy.id ? 'mdi-chevron-up' : 'mdi-chevron-down'"></v-icon>
              </v-card-item>
              
              <!-- 展开内容 -->
              <v-expand-transition>
                <div v-show="selectedPolicyId === policy.id">
                  <v-divider></v-divider>
                  <v-card-text class="policy-details pt-4">
                    <h3 class="text-body-1 font-weight-medium mb-2">文件摘要</h3>
                    <p class="text-body-2 text-medium-emphasis mb-4">{{ policy.summary }}</p>
                    
                     <h3 class="text-body-1 font-weight-medium mb-2">主要内容</h3>
                    <p class="text-body-2 text-medium-emphasis mb-4">{{ policy.content }}</p>
                    
                    <h3 class="text-body-1 font-weight-medium mb-3">实施时间线</h3>
                    <v-timeline density="compact" side="end" truncate-line="both">
                      <v-timeline-item
                        v-for="(item, i) in policy.timeline"
                        :key="i"
                        :dot-color="getTimelineColor(item.type)"
                        size="x-small"
                        fill-dot
                      >
                        <div class="d-flex justify-space-between">
                          <strong class="me-4">{{ item.title }}</strong>
                          <div class="text-caption text-medium-emphasis">{{ item.date }}</div>
                        </div>
                        <div class="text-caption text-medium-emphasis">{{ item.description }}</div>
                      </v-timeline-item>
                    </v-timeline>
                    
                    <h3 class="text-body-1 font-weight-medium mb-2 mt-4">相关文件</h3>
                    <v-chip-group column>
                      <v-chip 
                        v-for="related in policy.relatedPolicies" 
                        :key="related.id"
                        size="small"
                        color="primary"
                        variant="outlined"
                        @click="scrollToPolicy(related.id)"
                      >
                        {{ related.title }}
                      </v-chip>
                    </v-chip-group>

                     <v-divider class="my-4"></v-divider>
                     <v-btn variant="text" color="primary" :href="policy.downloadLink" target="_blank" prepend-icon="mdi-download-outline">下载原文</v-btn>
                  </v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
            
            <!-- 分页 (M3 Pagination) -->
            <div class="text-center mt-8">
              <v-pagination
                v-model="currentPage"
                :length="totalPages"
                rounded="circle"
                active-color="primary"
                density="comfortable"
                total-visible="7"
              ></v-pagination>
            </div>
          </div>
          
          <!-- 空状态 (M3 Empty State) -->
          <v-card v-else class="pa-8 text-center" flat color="surface-variant">
            <v-icon icon="mdi-file-search-outline" size="64" color="on-surface-variant" class="mb-4"></v-icon>
            <div class="text-h6 text-on-surface-variant mb-2">未找到政策文件</div>
            <div class="text-body-2 text-medium-emphasis mb-6">请尝试调整搜索条件或分类筛选</div>
            <v-btn 
              color="primary" 
              variant="tonal"
              @click="resetFilters"
            >
              清除筛选条件
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// --- 类型定义 (假设已存在或在此定义) ---
interface Policy {
  id: string;
  title: string;
  category: string;
  publishDate: string;
  status: string; // e.g., '有效', '废止'
  summary: string;
  content: string;
  timeline: { type: string; title: string; date: string; description: string; }[];
  relatedPolicies: { id: string; title: string; }[];
  downloadLink?: string;
}

// --- 响应式状态 ---
const searchQuery = ref('');
const selectedCategory = ref<string>('');
const selectedYear = ref<string>('');
const currentPage = ref(1);
const selectedPolicyId = ref<string | null>(null); // 只存储ID
const itemsPerPage = 5; // 减少每页显示数量

// --- 数据 ---
const categoryList = [
  { id: 'law', name: '法律法规', count: 24, icon: 'mdi-gavel' },
  { id: 'regulation', name: '行政法规', count: 18, icon: 'mdi-book-open-variant-outline' },
  { id: 'rule', name: '部门规章', count: 36, icon: 'mdi-file-document-outline' },
  { id: 'notice', name: '通知公告', count: 42, icon: 'mdi-bullhorn-outline' },
  { id: 'guide', name: '办事指南', count: 15, icon: 'mdi-compass-outline' },
  { id: 'standard', name: '标准规范', count: 29, icon: 'mdi-ruler-square' }
];

const hotPolicies = [
  { id: 'policy001', title: '《数据安全法》解读', date: '2024-07-12' },
  { id: 'policy005', title: '新能源汽车补贴政策', date: '2024-06-28' },
  { id: 'policy008', title: '优化营商环境条例', date: '2024-06-15' },
];

const years = ['', '2024', '2023', '2022', '2021']; // 添加空值选项
const categories = [{ title: '全部分类', value: '' }, ...categoryList.map(c => ({ title: c.name, value: c.id }))];

const allPolicies: Policy[] = [
  // 示例数据 (需要大量填充)
  {
    id: 'policy001', title: '《南武民主共和国数据安全法》', category: 'law', publishDate: '2024-07-12', status: '有效', 
    summary: '规范数据处理活动，保障数据安全，促进数据依法合理有效利用...', 
    content: '第一条 为了规范数据处理活动，保障数据安全，保护公民、组织的合法权益，维护国家主权、安全和发展利益，制定本法。...',
    timeline: [
      { type: 'draft', title: '草案提交审议', date: '2023-10-20', description: '历经多次修改完善' },
      { type: 'approval', title: '人民议事厅通过', date: '2024-05-15', description: '经表决高票通过' },
      { type: 'active', title: '正式施行', date: '2024-07-12', description: '自发布之日起施行' },
    ],
    relatedPolicies: [{id: 'policy002', title:'网络安全法'}, {id: 'policy003', title:'个人信息保护法'}],
    downloadLink: '#'
  },
  // ... 更多政策数据
   {
    id: 'policy005', title: '关于促进新能源汽车产业高质量发展的若干政策', category: 'regulation', publishDate: '2024-06-28', status: '有效', 
    summary: '为加快新能源汽车推广应用，推动产业高质量发展，制定本政策...', 
    content: '一、加大关键技术研发支持力度... 二、优化充电基础设施布局... 三、完善财税支持政策...',
    timeline: [
      { type: 'review', title: '公开征求意见', date: '2024-03-10', description: '广泛听取社会各界意见' },
      { type: 'approval', title: '中央人民委员会批准', date: '2024-06-20', description: '经会议审议通过' },
      { type: 'active', title: '发布施行', date: '2024-06-28', description: '即日生效' },
    ],
    relatedPolicies: [],
    downloadLink: '#'
  },
   {
    id: 'policy008', title: '南武民主共和国优化营商环境条例', category: 'law', publishDate: '2024-06-15', status: '有效', 
    summary: '为持续优化营商环境，激发市场主体活力，推动经济高质量发展，制定本条例。',
    content: '总则... 第一章 市场主体保护... 第二章 市场环境... 第三章 政务服务... 第四章 监管执法... 第五章 法治保障... 附则...',
    timeline: [
      { type: 'draft', title: '起草和调研', date: '2023-08-01', description: '深入企业和基层调研' },
      { type: 'review', title: '专家论证', date: '2024-01-25', description: '邀请法律和经济专家进行论证' },
       { type: 'approval', title: '人民议事厅通过', date: '2024-05-30', description: '审议通过' },
      { type: 'active', title: '公布施行', date: '2024-06-15', description: '正式施行' },
    ],
    relatedPolicies: [],
    downloadLink: '#'
  },
];

// --- 计算属性 ---
const filteredPolicies = computed(() => {
  return allPolicies.filter(policy => {
    const matchesSearch = searchQuery.value === '' || 
      policy.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
      policy.summary.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || policy.category === selectedCategory.value;
    const matchesYear = selectedYear.value === '' || policy.publishDate.startsWith(selectedYear.value);
    return matchesSearch && matchesCategory && matchesYear;
  });
});

const totalPages = computed(() => {
  return Math.ceil(filteredPolicies.value.length / itemsPerPage);
});

const paginatedPolicies = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return filteredPolicies.value.slice(start, end);
});

// --- 方法 ---
const resetFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
  selectedYear.value = '';
  currentPage.value = 1;
};

const togglePolicyDetail = (policy: Policy) => {
  if (selectedPolicyId.value === policy.id) {
    selectedPolicyId.value = null; // 关闭
  } else {
    selectedPolicyId.value = policy.id; // 打开
  }
};

const getCategoryIcon = (categoryId: string): string => {
  const category = categoryList.find(c => c.id === categoryId);
  return category ? category.icon : 'mdi-file-document-outline';
};

const getCategoryName = (categoryId: string): string => {
  const category = categoryList.find(c => c.id === categoryId);
  return category ? category.name : '未知分类';
};

const getTimelineColor = (type: string): string => {
  switch (type) {
    case 'draft': return 'grey';
    case 'review': return 'info';
    case 'approval': return 'success';
    case 'active': return 'primary';
    default: return 'secondary';
  }
};

// 平滑滚动到指定政策卡片
const scrollToPolicy = (policyId: string) => {
  const element = document.getElementById(`policy-${policyId}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // 稍微延迟后打开详情
    setTimeout(() => {
      if (selectedPolicyId.value !== policyId) {
        selectedPolicyId.value = policyId;
      }
    }, 300);
  }
};

</script>

<style scoped>
.policies-page {
  /* 页面整体内边距等可在全局或布局层控制 */
}

.filter-card {
  /* Outlined card M3 样式已在 App.vue 全局应用 */
  margin-bottom: 2rem; /* 增加筛选卡片下边距 */
}

.sidebar .v-list-item {
  margin: 4px 8px;
}

.sidebar .v-list-item--active {
  background-color: var(--v-theme-primary-container);
  color: var(--v-theme-on-primary-container);
}

.sidebar .v-list-subheader {
   font-weight: 500;
   margin-bottom: 4px;
}

.hot-policy-item:hover {
   background-color: rgba(var(--v-theme-tertiary), 0.08);
}

.policy-card {
  transition: box-shadow 0.3s var(--m3-motion-easing-standard);
}

.policy-header {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.policy-header:hover {
  background-color: rgba(var(--v-theme-primary), 0.04);
}

.toggle-icon {
  transition: transform 0.3s var(--m3-motion-easing-standard);
}

.policy-details {
  /* 详情区域样式 */
}

.policy-details .v-timeline {
   grid-row-gap: 8px;
}

.policy-details .v-chip {
   cursor: pointer;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .sidebar {
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 600px) {
  .filter-card .v-col {
    padding-top: 6px;
    padding-bottom: 6px;
  }
}
</style> 