<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card elevation="2" class="mb-6">
          <v-card-item>
            <v-card-title class="text-h4">南武民主共和国百科</v-card-title>
            <v-card-subtitle class="mt-2">
              本栏目收录了关于南武民主共和国的基本知识，包括历史、政治体制、文化等内容。
            </v-card-subtitle>
          </v-card-item>
        </v-card>
        
        <v-card>
          <v-tabs
            v-model="activeTab"
            bg-color="primary"
            align-tabs="center"
            color="white"
            slider-color="accent"
          >
            <v-tab value="overview">概述</v-tab>
            <v-tab value="history">历史</v-tab>
            <v-tab value="politics">政治</v-tab>
            <v-tab value="culture">文化</v-tab>
          </v-tabs>
          
          <v-window v-model="activeTab">
            <!-- 概述标签页 -->
            <v-window-item value="overview">
              <v-card-text>
                <v-row>
                  <v-col cols="12">
                    <p class="text-body-1">
                      南武民主共和国是一个基于联合主义和远视主义社会主义理念建立的国家，致力于民主、公平与可持续发展。
                    </p>
                    <v-divider class="my-4"></v-divider>
                    <p class="text-body-1">
                      本Wiki正在持续完善中，您可以通过导航栏访问更完整的外部Wiki资源。
                    </p>
                  </v-col>
                </v-row>
                
                <v-row class="mt-4">
                  <v-col cols="12">
                    <v-card variant="outlined" class="bg-surface-variant">
                      <v-card-item>
                        <v-card-title>关键信息</v-card-title>
                      </v-card-item>
                      <v-card-text>
                        <v-list density="compact">
                          <v-list-item>
                            <v-list-item-title>国家全称：联合主义南武民主共和国</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>政体：联合主义民主共和制</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>官方语言：汉语</v-list-item-title>
                          </v-list-item>
                          <v-list-item>
                            <v-list-item-title>主要意识形态：远视主义社会主义</v-list-item-title>
                          </v-list-item>
                        </v-list>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-window-item>
            
            <!-- 历史标签页 -->
            <v-window-item value="history">
              <v-card-text>
                <p class="text-body-1">南武民主共和国的历史内容正在编写中...</p>
                <v-btn
                  variant="tonal"
                  color="primary"
                  class="mt-4"
                  :to="'/external-wiki'"
                >
                  查看完整历史
                </v-btn>
              </v-card-text>
            </v-window-item>
            
            <!-- 政治标签页 -->
            <v-window-item value="politics">
              <v-card-text>
                <p class="text-body-1">南武民主共和国的政治制度内容正在编写中...</p>
                <v-btn
                  variant="tonal"
                  color="primary"
                  class="mt-4"
                  :to="'/external-wiki'"
                >
                  查看完整政治制度
                </v-btn>
              </v-card-text>
            </v-window-item>
            
            <!-- 文化标签页 -->
            <v-window-item value="culture">
              <v-card-text>
                <p class="text-body-1">南武民主共和国的文化内容正在编写中...</p>
                <v-btn
                  variant="tonal"
                  color="primary"
                  class="mt-4"
                  :to="'/external-wiki'"
                >
                  查看完整文化内容
                </v-btn>
              </v-card-text>
            </v-window-item>
          </v-window>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const activeTab = ref('overview');
</script>

<style scoped lang="scss">
@use 'sass:color';
@use '@/assets/styles/utils/variables' as vars;

h1 {
  color: vars.$color-primary;
  margin-bottom: 1rem;
}
.placeholder {
  margin-top: 2rem;
  padding: 2rem;
  border: 1px dashed vars.$color-secondary;
  background-color: color.adjust(vars.$color-secondary, $lightness: 15%);
  text-align: center;
  color: vars.$color-text-muted;
}
</style>