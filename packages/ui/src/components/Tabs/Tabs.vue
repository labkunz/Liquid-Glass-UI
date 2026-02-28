<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface TabItem {
  key: string;
  label: string;
}

export interface TabsProps {
  /**
   * 分頁樣式變體
   */
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';

  /**
   * 分頁項目清單
   */
  tabs: TabItem[];

  /**
   * 目前啟用的 tab key（v-model）
   */
  modelValue?: string;
}

const props = withDefaults(defineProps<TabsProps>(), {
  variant: 'default',
  modelValue: '',
});

const emit = defineEmits<{
  'update:modelValue': [key: string];
}>();

const activeKey = computed(() =>
  props.modelValue || (props.tabs[0]?.key ?? '')
);

const handleTabClick = (key: string) => {
  emit('update:modelValue', key);
};

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const wrapperClasses = computed(() => [
  style[toCamelCase('liquid-tabs')],
  style[toCamelCase(`liquid-tabs--${props.variant}`)],
]);

const navClasses = computed(() => [
  style[toCamelCase('liquid-tabs-nav')],
]);

const tabClasses = (key: string) => [
  style[toCamelCase('liquid-tabs-tab')],
  activeKey.value === key ? style[toCamelCase('liquid-tabs-tab--active')] : '',
];

const panelClasses = computed(() => [
  style[toCamelCase('liquid-tabs-panel')],
]);
</script>

<template>
  <div :class="wrapperClasses">
    <!-- Tab 標籤列 -->
    <div
      :class="navClasses"
      role="tablist"
    >
      <button
        v-for="tab in tabs"
        :key="tab.key"
        :class="tabClasses(tab.key)"
        role="tab"
        :aria-selected="activeKey === tab.key"
        @click="handleTabClick(tab.key)"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab 內容區 -->
    <div
      :class="panelClasses"
      role="tabpanel"
    >
      <slot :name="activeKey">
        <slot />
      </slot>
    </div>
  </div>
</template>

<style src="./Tabs.module.css" module></style>
