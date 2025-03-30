<template>
  <div class="organization-page">
    <v-container>
      <!-- 页面标题 -->
      <div class="page-header">
        <h1 class="text-h4 font-weight-medium">政府组织架构</h1>
        <div class="text-subtitle-1">南武民主共和国政府机构与职能介绍</div>
      </div>
      
      <!-- 组织结构图 -->
      <v-row class="mb-8">
        <v-col cols="12">
          <v-card variant="outlined">
            <v-card-item>
              <v-card-title class="text-h6">
                <v-icon class="me-2">mdi-sitemap-outline</v-icon>
                组织结构概览
              </v-card-title>
            </v-card-item>
            <v-card-text class="pa-0">
              <div class="org-chart-wrapper">
                <div class="org-chart">
                  <!-- 最上层 -->
                  <div class="org-level">
                    <div class="org-box org-box--primary">
                      <div class="org-title">人民议事厅</div>
                      <div class="org-subtitle">立法机关</div>
                    </div>
                  </div>
                  
                  <!-- 连接线 -->
                  <div class="connector-vertical"></div>
                  
                  <!-- 第二层 -->
                  <div class="org-level">
                    <div class="org-box org-box--secondary">
                      <div class="org-title">中央人民委员会</div>
                      <div class="org-subtitle">最高行政机关</div>
                    </div>
                  </div>
                  
                  <!-- 连接线 -->
                  <div class="connector connector--down-branches"></div>
                  
                  <!-- 第三层 -->
                  <div class="org-level level-3">
                    <div class="org-box">
                      <div class="org-title">国家计划委员会</div>
                    </div>
                    <div class="org-box">
                      <div class="org-title">国家安全委员会</div>
                    </div>
                    <div class="org-box">
                      <div class="org-title">国民福祉委员会</div>
                    </div>
                    <!-- Add more as needed -->
                  </div>
                </div>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      
      <!-- 主要内容区域 -->
      <v-row>
        <!-- 左侧导航 -->
        <v-col cols="12" md="3" class="sidebar">
          <v-card variant="tonal" color="primary">
             <v-list nav bg-color="transparent" density="compact">
               <v-list-subheader class="text-on-primary-container">主要机构</v-list-subheader>
               <v-list-item
                v-for="(org, i) in mainOrgs"
                :key="i"
                :value="org.id"
                @click="selectedOrg = org"
                rounded="xl"
                class="nav-list-item"
                :active="selectedOrg?.id === org.id"
              >
                <template v-slot:prepend>
                  <v-icon :icon="org.icon"></v-icon>
                </template>
                <v-list-item-title class="text-body-1">{{ org.name }}</v-list-item-title>
              </v-list-item>
             </v-list>
          </v-card>
          
          <v-card variant="outlined" class="mt-4">
             <v-list nav density="compact">
              <v-list-subheader>部门委员会</v-list-subheader>
              <v-list-item
                v-for="(dept, i) in departments"
                :key="i"
                :value="dept.id"
                @click="selectedOrg = dept"
                rounded="xl"
                class="nav-list-item"
                :active="selectedOrg?.id === dept.id"
              >
                <template v-slot:prepend>
                  <v-icon :icon="dept.icon"></v-icon>
                </template>
                 <v-list-item-title class="text-body-1">{{ dept.name }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- 右侧详情 -->
        <v-col cols="12" md="9">
          <v-card v-if="selectedOrg" class="org-detail-card" variant="outlined">
            <!-- Header Section -->
             <v-card-item class="org-header">
               <template v-slot:prepend>
                 <v-avatar size="64" color="primary-container" class="me-4">
                    <v-icon :icon="selectedOrg.icon" size="large" color="on-primary-container"></v-icon>
                 </v-avatar>
               </template>
                <div>
                   <div class="text-h5 font-weight-medium">{{ selectedOrg.name }}</div>
                   <div class="text-body-1 text-medium-emphasis">{{ selectedOrg.role }}</div>
                </div>
            </v-card-item>
            
            <v-divider></v-divider>

            <v-card-text>
              <!-- Stats Section -->
              <v-row class="mb-6 org-stats">
                <v-col cols="6" sm="3" v-for="(value, key) in selectedOrg.stats" :key="key">
                  <div class="text-center pa-2 rounded-lg bg-surface-variant">
                    <div class="text-h6 font-weight-bold text-on-surface-variant">{{ value }}</div>
                    <div class="text-caption text-medium-emphasis">{{ getStatLabel(key) }}</div>
                  </div>
                </v-col>
              </v-row>
              
              <!-- Description -->
              <h3 class="text-h6 font-weight-medium mb-2">机构职责</h3>
              <p class="text-body-1 text-medium-emphasis mb-6">{{ selectedOrg.description }}</p>
              
              <!-- Functions -->
              <h3 class="text-h6 font-weight-medium mb-3">主要职能</h3>
              <v-list lines="one" density="compact" class="mb-6">
                <v-list-item
                  v-for="(func, i) in selectedOrg.functions"
                  :key="i"
                  class="mb-1"
                >
                  <template v-slot:prepend>
                    <v-icon icon="mdi-check" color="primary" size="small" class="me-3"></v-icon>
                  </template>
                   <v-list-item-title class="text-body-1">{{ func }}</v-list-item-title>
                </v-list-item>
              </v-list>
              
              <!-- Leadership (if available) -->
              <div v-if="selectedOrg.leadership && selectedOrg.leadership.length > 0" class="mb-4">
                <h3 class="text-h6 font-weight-medium mb-4">领导结构</h3>
                <v-row>
                  <v-col 
                    v-for="(leader, i) in selectedOrg.leadership" 
                    :key="i"
                    cols="12" sm="6"
                  >
                    <v-card variant="tonal" color="secondary" class="h-100 leader-card">
                       <v-card-item>
                        <template v-slot:prepend>
                          <v-avatar color="secondary-container" size="48">
                            <v-icon icon="mdi-account-tie" color="on-secondary-container"></v-icon>
                          </v-avatar>
                        </template>
                        <div>
                          <div class="text-body-1 font-weight-medium">{{ leader.name }}</div>
                          <div class="text-body-2 text-medium-emphasis">{{ leader.position }}</div>
                        </div>
                      </v-card-item>
                      <v-card-text class="text-caption pt-0">
                        {{ leader.description }}
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-card-text>
            
            <v-divider></v-divider>
            
            <v-card-actions class="pa-4">
              <v-btn variant="tonal" color="primary" prepend-icon="mdi-web">官方网站</v-btn>
              <v-btn variant="text" color="primary" prepend-icon="mdi-email-outline">联系方式</v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="primary" prepend-icon="mdi-file-document-outline">相关文件</v-btn>
            </v-card-actions>
          </v-card>
          
          <!-- Placeholder -->
          <v-card v-else class="pa-8 text-center d-flex flex-column justify-center align-center" flat color="surface-variant" min-height="400">
            <v-icon icon="mdi-select-group" size="64" color="on-surface-variant" class="mb-4"></v-icon>
            <div class="text-h6 text-on-surface-variant mb-2">请选择机构</div>
            <div class="text-body-2 text-medium-emphasis">从左侧列表中选择一个政府机构以查看详细信息。</div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义组织数据的类型接口 (根据实际数据结构调整)
interface OrgStats {
  founded: string;
  employees: string;
  departments: string;
  budget: string;
}

interface OrgLeadership {
  name: string;
  position: string;
  description: string;
}

interface Organization {
  id: string;
  name: string;
  role: string;
  icon: string;
  description: string;
  functions: string[];
  stats: OrgStats;
  leadership?: OrgLeadership[]; // 领导层是可选的
  image?: string; // 图片是可选的
}

// 当前选中的组织，明确类型
const selectedOrg = ref<Organization | null>(null);

// 主要机构数据
const mainOrgs: Organization[] = [
  {
    id: 'people-assembly',
    name: '人民议事厅',
    role: '最高立法机关',
    icon: 'mdi-gavel',
    image: 'https://source.unsplash.com/random/1200x400/?government,building', // 示例图片
    description: '人民议事厅是南武民主共和国的最高国家权力机关，负责制定和修改宪法与法律，选举和罢免国家领导人，决定国家重大事务。',
    functions: [
      '制定和修改国家法律',
      '监督宪法和法律的实施',
      '选举国家主席、副主席',
      '批准国家预算和决算',
      '决定战争与和平问题'
    ],
    stats: {
      founded: '1952年',
      employees: '350+',
      departments: '12个专门委员会',
      budget: '1.5亿元'
    },
    leadership: [
      { name: '李明远', position: '议长', description: '主持议事厅全面工作' },
      { name: '王静姝', position: '副议长', description: '协助议长工作，分管法制委员会' }
    ]
  },
  {
    id: 'central-committee',
    name: '中央人民委员会',
    role: '最高行政机关',
    icon: 'mdi-account-group-outline',
    image: 'https://source.unsplash.com/random/1200x400/?meeting,official', // 示例图片
    description: '中央人民委员会是南武民主共和国的最高行政管理机关，负责领导全国各项行政工作，执行人民议事厅的决议，管理国家日常事务。',
    functions: [
      '领导各部委工作',
      '制定行政法规和政策',
      '管理国家财政和经济',
      '负责外交事务',
      '维护社会秩序'
    ],
    stats: {
      founded: '1953年',
      employees: '1200+',
      departments: '25个部委',
      budget: '保密'
    },
    leadership: [
      { name: '赵立坚', position: '委员长', description: '全面负责委员会工作' },
      { name: '陈晓东', position: '常务副委员长', description: '负责经济和财政工作' }
    ]
  }
];

// 部门委员会数据
const departments: Organization[] = [
  {
    id: 'planning-committee',
    name: '国家计划委员会',
    role: '负责国家经济与社会发展规划',
    icon: 'mdi-chart-line',
    description: '国家计划委员会负责研究和制定国家中长期发展战略和年度计划，协调重大经济政策，监测和分析宏观经济运行状况。',
    functions: [
      '制定国民经济和社会发展规划',
      '提出重大项目布局建议',
      '协调区域经济发展',
      '进行经济预测与监测'
    ],
    stats: {
      founded: '1955年',
      employees: '550+',
      departments: '10个司局',
      budget: '5.2亿元'
    },
    leadership: [
      { name: '刘建国', position: '主任', description: '全面负责委员会工作' },
      { name: '孙慧敏', position: '副主任', description: '负责区域规划和产业政策' }
    ]
  },
  {
    id: 'security-committee',
    name: '国家安全委员会',
    role: '负责国家安全事务协调',
    icon: 'mdi-shield-account-outline',
    description: '国家安全委员会负责统筹协调涉及国家安全的重大事项和重要工作，维护国家主权、安全、发展利益。',
    functions: [
      '制定国家安全战略',
      '协调跨部门安全行动',
      '分析国家安全形势',
      '指导地方安全工作'
    ],
    stats: {
      founded: '1988年',
      employees: '380+',
      departments: '8个办公室',
      budget: '机密'
    },
    leadership: [
      { name: '张卫平', position: '主席', description: '全面负责委员会工作' }
    ]
  },
  {
    id: 'economic-development',
    name: '经济发展委员会',
    role: '负责国民经济发展管理与调控',
    icon: 'mdi-currency-usd',
    description: '经济发展委员会负责宏观经济管理，制定和实施经济发展、财政、金融、产业政策，促进国民经济稳定健康发展。',
    functions: [
      '制定宏观经济调控政策',
      '推进供给侧结构性改革',
      '加强财政金融监管',
      '优化营商环境',
      '推动经济高质量发展'
    ],
    stats: {
      founded: '1958年',
      employees: '720+',
      departments: '16个',
      budget: '7.8亿元'
    },
    leadership: [
      { name: '黄志强', position: '主任', description: '全面负责委员会工作' },
      { name: '董玉梅', position: '副主任', description: '负责财税金融和产业发展政策' }
    ]
  },
  {
    id: 'social-welfare',
    name: '国民福祉委员会',
    role: '负责社会保障和民生事业',
    icon: 'mdi-heart-pulse',
    description: '国民福祉委员会负责社会保障、医疗卫生、住房保障等民生事业，制定和实施社会政策，促进社会公平正义，提高人民生活水平。',
    functions: [
      '建立健全社会保障体系',
      '推进医疗卫生事业发展',
      '完善住房保障体系',
      '实施扶贫开发工作',
      '促进基本公共服务均等化'
    ],
    stats: {
      founded: '1960年',
      employees: '680+',
      departments: '14个',
      budget: '10.5亿元'
    },
    leadership: [
      { name: '吴天成', position: '主任', description: '全面负责委员会工作' },
      { name: '张丽华', position: '副主任', description: '负责医疗卫生和社会保障工作' }
    ]
  }
];

// 方法
const getStatLabel = (key: keyof OrgStats): string => {
  const labels: Record<keyof OrgStats, string> = {
    founded: '成立年份',
    employees: '工作人员',
    departments: '内部机构',
    budget: '年度预算'
  };
  return labels[key] || key;
};

// 初始化 (默认选中第一个主要机构)
if (mainOrgs.length > 0) {
  selectedOrg.value = mainOrgs[0];
}
</script>

<style scoped>
.organization-page {
  padding-bottom: 40px;
  min-height: 100vh;
}

.page-header {
  position: relative;
}

.org-chart-wrapper {
  overflow-x: auto;
  padding: 20px 0;
}

.org-chart {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 600px;
  margin: 0 auto;
}

.org-level {
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
}

.org-box {
  width: 180px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  background-color: var(--v-theme-surface-variant);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.org-box:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.org-box.primary {
  background-color: var(--v-theme-primary);
  color: white;
}

.org-box.secondary {
  background-color: var(--v-theme-secondary);
  color: white;
}

.org-title {
  font-weight: 600;
  margin-bottom: 4px;
}

.org-subtitle {
  font-size: 0.85rem;
  opacity: 0.9;
}

.connector-vertical {
  width: 2px;
  height: 40px;
  background-color: rgba(var(--v-theme-primary), 0.7);
  margin: 4px 0;
  position: relative;
}

.connector-vertical.with-branches::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 80%;
  height: 2px;
  background-color: rgba(var(--v-theme-primary), 0.7);
  transform: translateX(-50%);
}

.org-detail-card {
  transition: all 0.3s ease;
}

.org-header-image {
  position: relative;
}

.org-header-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 20px;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.7), transparent);
  color: white;
}

/* 响应式调整 */
@media (max-width: 960px) {
  .org-chart {
    min-width: 500px;
  }
  
  .org-box {
    width: 160px;
    padding: 10px;
  }
  
  .connector-vertical {
    height: 30px;
  }
}

@media (max-width: 600px) {
  .org-chart {
    min-width: 320px;
  }
  
  .org-box {
    width: 120px;
    padding: 8px;
    font-size: 0.9rem;
  }
  
  .org-subtitle {
    font-size: 0.75rem;
  }
  
  .connector-vertical {
    height: 25px;
  }
  
  .level-3 {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
  
  .connector-vertical.with-branches::after {
    display: none;
  }
  
  .org-header-overlay {
    padding: 15px;
  }
  
  .org-header-overlay .text-h4 {
    font-size: 1.5rem !important;
  }
}
</style> 