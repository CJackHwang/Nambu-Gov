<template>
  <div class="service-page">
    <v-container>
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="text-h4 font-weight-medium">公共服务</h1>
        <div class="text-subtitle-1">南武民主共和国政府服务平台</div>
      </div>
      
      <!-- 服务搜索和分类 -->
      <v-row class="mb-6 filter-bar" align="center">
        <v-col cols="12" md="8">
          <v-text-field
            v-model="searchQuery"
            label="搜索服务项目 (例如：身份证、社保)"
            prepend-inner-icon="mdi-magnify"
            variant="filled"
            density="comfortable"
            hide-details
            clearable
            rounded="lg"
            class="service-search"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-select
            v-model="selectedCategory"
            :items="categories"
            label="服务分类"
            variant="filled"
            density="comfortable"
            hide-details
            rounded="lg"
            class="category-select"
          ></v-select>
        </v-col>
      </v-row>
      
      <!-- 服务分类卡片 (仅在未搜索时显示) -->
      <section v-if="!searchQuery" class="category-grid mb-8">
        <v-row>
          <v-col 
            v-for="(category, i) in categoryList" 
            :key="i"
            cols="12" sm="6" md="4"
          >
            <v-card
              class="category-card h-100"
              @click="selectedCategory = category.value"
              :variant="selectedCategory === category.value ? 'tonal' : 'elevated'"
              :color="selectedCategory === category.value ? 'primary' : 'surface'"
              hover
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar size="56" :color="selectedCategory === category.value ? 'primary-container' : 'primary-container'" class="me-4">
                     <v-icon :icon="category.icon" :color="selectedCategory === category.value ? 'on-primary-container' : 'on-primary-container'" size="large"></v-icon>
                  </v-avatar>
                </template>
                <div>
                   <div class="text-h6 mb-1">{{ category.title }}</div>
                   <div class="text-body-2 text-medium-emphasis">{{ category.description }}</div>
                </div>
              </v-card-item>
              <v-card-text class="d-flex align-center justify-space-between pt-0">
                 <div class="text-body-2 font-weight-medium" :class="selectedCategory === category.value ? 'text-on-primary' : 'text-primary'">
                  {{ category.count }} 项服务
                </div>
                <v-chip-group>
                  <v-chip
                    v-for="(tag, j) in category.tags.slice(0, 2)" 
                    :key="j"
                    size="small"
                    label
                    :color="selectedCategory === category.value ? 'on-primary' : 'primary'"
                    :variant="selectedCategory === category.value ? 'flat' : 'outlined'"
                  >
                    {{ tag }}
                  </v-chip>
                </v-chip-group>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </section>
      
      <!-- 服务列表 -->
      <section class="service-list-section mt-6">
        <div class="d-flex align-center justify-space-between mb-5">
           <h2 class="text-h5 font-weight-medium">{{ getCategoryTitle(selectedCategory) }}</h2>
           <v-btn v-if="selectedCategory || searchQuery" variant="text" color="primary" @click="clearFilters">
             <v-icon start>mdi-filter-remove-outline</v-icon>
             清除筛选
           </v-btn>
        </div>
        
        <div v-if="filteredServices.length === 0" class="text-center pa-8">
          <v-card flat color="surface-variant" class="pa-8">
             <v-icon icon="mdi-information-off-outline" size="64" color="on-surface-variant" class="mb-4"></v-icon>
             <div class="text-h6 text-on-surface-variant mb-2">未找到相关服务</div>
             <div class="text-body-2 text-medium-emphasis mb-6">请尝试更换搜索关键词或选择其他分类。</div>
             <v-btn color="primary" variant="tonal" @click="clearFilters">查看全部分类</v-btn>
          </v-card>
        </div>
        
        <v-row v-else>
          <v-col 
            v-for="(service, i) in filteredServices" 
            :key="i"
            cols="12" md="6"
          >
            <v-card 
              class="service-card h-100" 
              variant="outlined"
              hover
              @click="openServiceDetail(service)"
            >
              <v-card-item>
                <template v-slot:prepend>
                  <v-avatar color="primary-container" size="48" class="me-3">
                    <v-icon :icon="service.icon" color="on-primary-container"></v-icon>
                  </v-avatar>
                </template>
                <div>
                  <div class="text-body-1 font-weight-medium">{{ service.title }}</div>
                  <div class="text-caption text-medium-emphasis">{{ service.department }}</div>
                </div>
              </v-card-item>
              
              <v-card-text class="pt-2 pb-3">
                <p class="service-description text-body-2 text-medium-emphasis">{{ service.description }}</p>
              </v-card-text>
              
              <v-divider></v-divider>
              
              <v-card-actions class="px-4 py-2">
                 <v-chip 
                  :color="getStatusColor(service.status)" 
                  size="small"
                  label
                  variant="tonal"
                 >
                  {{ service.status }}
                </v-chip>
                <v-spacer></v-spacer>
                <span class="text-caption me-2">时限: {{ service.processingTime }}</span>
                <v-icon color="primary">mdi-chevron-right</v-icon>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </section>
      
      <!-- 服务详情对话框 (M3 Dialog Style) -->
      <v-dialog v-model="dialogOpen" max-width="800px" scrollable>
        <v-card v-if="selectedService" class="service-dialog">
           <v-toolbar color="primary" density="compact">
            <v-toolbar-title class="text-body-1 font-weight-medium">
               <v-icon start>{{ selectedService.icon }}</v-icon>
               {{ selectedService.title }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="dialogOpen = false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar>

          <v-card-text class="pa-6">
            <v-row>
              <!-- Left Column: Details -->
              <v-col cols="12" md="7">
                <div class="mb-6">
                  <h3 class="dialog-section-title">服务介绍</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ selectedService.detailedDescription || selectedService.description }}</p>
                </div>
                
                <div v-if="selectedService.conditions && selectedService.conditions.length > 0" class="mb-6">
                  <h3 class="dialog-section-title">办理条件</h3>
                  <v-list density="compact" lines="one" class="pl-0">
                    <v-list-item v-for="(condition, i) in selectedService.conditions" :key="i" class="px-0">
                       <template v-slot:prepend>
                         <v-icon icon="mdi-check-circle-outline" color="success" size="small" class="me-3"></v-icon>
                       </template>
                       <v-list-item-title class="text-body-2">{{ condition }}</v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
                
                <div v-if="selectedService.documents && selectedService.documents.length > 0" class="mb-6">
                   <h3 class="dialog-section-title">所需材料</h3>
                   <v-list density="compact" lines="two" class="pl-0">
                     <v-list-item v-for="(doc, i) in selectedService.documents" :key="i" class="px-0">
                       <template v-slot:prepend>
                         <v-icon icon="mdi-file-document-outline" color="primary" size="small" class="me-3"></v-icon>
                       </template>
                       <div>
                         <div class="text-body-2 font-weight-medium">{{ doc.name }}</div>
                         <div class="text-caption text-medium-emphasis">{{ doc.description }}</div>
                       </div>
                    </v-list-item>
                  </v-list>
                </div>
                
                <div v-if="selectedService.process && selectedService.process.length > 0">
                   <h3 class="dialog-section-title">办理流程</h3>
                    <v-timeline density="compact" side="end" truncate-line="both" line-inset="8">
                      <v-timeline-item
                        v-for="(step, i) in selectedService.process"
                        :key="i"
                        :dot-color="getProcessStepColor(i)"
                        size="x-small"
                        fill-dot
                      >
                        <div class="text-body-2 font-weight-medium mb-1">{{ step.title }}</div>
                        <div class="text-caption text-medium-emphasis">{{ step.description }}</div>
                      </v-timeline-item>
                    </v-timeline>
                </div>
              </v-col>
              
              <!-- Right Column: Summary & Actions -->
              <v-col cols="12" md="5" class="dialog-sidebar">
                 <v-card variant="tonal" color="secondary" class="pa-4 mb-4">
                   <div class="d-flex align-center mb-3">
                     <v-icon icon="mdi-office-building-outline" class="me-2"></v-icon>
                     <span class="text-caption">办理部门: {{ selectedService.department }}</span>
                   </div>
                   <div class="d-flex align-center mb-3">
                     <v-icon icon="mdi-clock-fast" class="me-2"></v-icon>
                     <span class="text-caption">处理时限: {{ selectedService.processingTime }}</span>
                   </div>
                    <div class="d-flex align-center mb-3">
                     <v-icon icon="mdi-cash" class="me-2"></v-icon>
                     <span class="text-caption">服务费用: {{ selectedService.fee || '免费' }}</span>
                   </div>
                    <div v-if="selectedService.location" class="d-flex align-center">
                     <v-icon icon="mdi-map-marker-outline" class="me-2"></v-icon>
                     <span class="text-caption">办理地点: {{ selectedService.location }}</span>
                   </div>
                 </v-card>
                
                 <v-btn color="primary" block class="mb-2" prepend-icon="mdi-laptop">在线办理</v-btn>
                 <v-btn variant="outlined" color="primary" block prepend-icon="mdi-calendar-check-outline">预约办理</v-btn>
                
                 <v-divider class="my-4"></v-divider>
                 
                 <div class="text-center">
                   <div class="text-body-2 mb-2">需要帮助？</div>
                   <v-btn variant="text" color="primary" prepend-icon="mdi-phone-outline">咨询电话: 12345</v-btn>
                 </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// --- 类型定义 (与上次修改一致) ---
interface Category { title: string; value: string; icon: string; description: string; count: number; tags: string[]; }
interface ServiceDocument { name: string; description: string; }
interface ProcessStep { title: string; description: string; }
interface Service { id: string; title: string; icon: string; department: string; description: string; category: string; processingTime: string; requiredDocs: string; status: string; detailedDescription?: string; conditions?: string[]; documents?: ServiceDocument[]; process?: ProcessStep[]; fee?: string; location?: string; }

// --- 响应式状态 (与上次修改一致) ---
const searchQuery = ref('');
const selectedCategory = ref<string>('');
const dialogOpen = ref<boolean>(false);
const selectedService = ref<Service | null>(null);

// --- 数据定义 (与上次修改一致，仅更新图标) ---
const categoryList: Category[] = [
  { title: '户籍民生', value: 'civil', icon: 'mdi-account-multiple-outline', description: '户籍、身份证、婚姻等', count: 18, tags: ['户籍', '婚姻', '生育'] },
  { title: '教育服务', value: 'education', icon: 'mdi-school-outline', description: '入学、考试、资助等', count: 12, tags: ['入学', '考试', '资助'] },
  { title: '医疗健康', value: 'health', icon: 'mdi-heart-pulse', description: '医保、公共卫生、预防等', count: 15, tags: ['医保', '接种', '档案'] },
  { title: '社会保障', value: 'social', icon: 'mdi-shield-account-outline', description: '社保、福利救助、养老等', count: 16, tags: ['社保', '养老', '救助'] },
  { title: '住房服务', value: 'housing', icon: 'mdi-home-city-outline', description: '住房保障、不动产登记等', count: 10, tags: ['保障房', '产权', '公积金'] },
  { title: '交通出行', value: 'transportation', icon: 'mdi-bus-school', description: '交通运输、车辆管理等', count: 14, tags: ['驾驶证', '车辆', '公交'] }
];
const categories = [{ title: '全部分类', value: '' }, ...categoryList.map(item => ({ title: item.title, value: item.value }))];
const allServices: Service[] = [
  { id: 'svc001', title: '居民身份证首次申领', icon: 'mdi-card-account-details-outline', /*...*/ category: 'civil', status: '可全程网办', location: '户籍所在地公安派出所', /*...*/ },
  { id: 'svc002', title: '普通护照首次申领', icon: 'mdi-passport', /*...*/ category: 'civil', status: '可在线预审', location: '市/县公安局出入境管理大厅', /*...*/ },
  { id: 'svc003', title: '义务教育阶段入学申请', icon: 'mdi-account-school-outline', /*...*/ category: 'education', status: '可在线预约', location: '学区所属教育行政部门或指定平台', /*...*/ },
  // ... 添加更多服务数据...
];

// --- 计算属性 (与上次修改一致) ---
const filteredServices = computed(() => {
  // ... (过滤逻辑不变)
   return allServices.filter(service => {
    const matchesSearch = searchQuery.value === '' ||
      service.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesCategory = selectedCategory.value === '' || service.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// --- 方法 (与上次修改一致) ---
const getCategoryTitle = (value: string): string => {
  const category = categoryList.find(cat => cat.value === value);
  return category ? category.title : '全部服务';
};
const getStatusColor = (status: string): string => {
  switch (status) {
    case '可全程网办': return 'success';
    case '可在线预审': return 'info';
    case '可在线预约': return 'primary';
    case '季节性办理': return 'warning';
    default: return 'secondary'; // 使用 secondary 作为默认
  }
};
const getProcessStepColor = (index: number): string => {
  const colors = ['primary', 'primary', 'primary', 'primary', 'success'];
  return colors[index] || 'primary';
};
const clearFilters = () => {
  searchQuery.value = '';
  selectedCategory.value = '';
};
const openServiceDetail = (service: Service) => {
  selectedService.value = service;
  dialogOpen.value = true;
};

</script>

<style scoped>
/* 搜索/过滤栏 */
.filter-bar .v-text-field,
.filter-bar .v-select {
  background-color: var(--v-theme-surface-variant);
}

/* 分类卡片 */
.category-card {
  transition: all 0.3s var(--m3-motion-easing-standard);
}
.category-card:hover {
   transform: translateY(-4px);
   box-shadow: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3) !important; /* M3 Level 3 */
}

/* 服务列表卡片 */
.service-card {
  transition: all 0.3s var(--m3-motion-easing-standard);
}
.service-card:hover {
   border-color: var(--v-theme-primary);
   background-color: rgba(var(--v-theme-primary), 0.04);
}

.service-description {
  height: 3.6em; /* 限制描述高度为大约2行 */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* 对话框样式 */
.service-dialog .v-toolbar {
   border-bottom: 1px solid var(--v-theme-outline-variant);
}

.dialog-section-title {
  font-size: 1rem; /* 16px */
  font-weight: 500;
  margin-bottom: 0.75rem; /* 12px */
  color: var(--v-theme-primary);
  padding-bottom: 4px;
  border-bottom: 1px solid var(--v-theme-outline-variant);
}

.dialog-sidebar {
  position: sticky;
  top: 0; /* 使其在滚动时固定 */
}

.dialog-sidebar .v-card {
  background-color: var(--v-theme-secondary-container);
  color: var(--v-theme-on-secondary-container);
}

.dialog-sidebar .v-icon {
  color: var(--v-theme-on-secondary-container);
  opacity: 0.8;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .dialog-sidebar {
    position: static; /* 在中屏及以下取消固定 */
    margin-top: 1.5rem;
  }
}

@media (max-width: 600px) {
  .filter-bar .v-col {
    padding-top: 6px;
    padding-bottom: 6px;
  }
  .category-card {
     margin-bottom: 16px;
   }
  .service-card {
     margin-bottom: 16px;
   }
}
</style> 