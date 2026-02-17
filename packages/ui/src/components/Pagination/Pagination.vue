<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface PaginationProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  size?: 'sm' | 'md' | 'lg';
  currentPage: number;
  totalPages: number;
  showPrevNext?: boolean;
}

const props = withDefaults(defineProps<PaginationProps>(), {
  variant: 'default',
  size: 'md',
  showPrevNext: true,
});

const emit = defineEmits<{
  'update:currentPage': [page: number];
}>();

const goTo = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:currentPage', page);
  }
};

// Generate page numbers with ellipsis logic
const pages = computed(() => {
  const total = props.totalPages;
  const current = props.currentPage;
  const result: (number | '...')[] = [];

  if (total <= 7) {
    for (let i = 1; i <= total; i++) result.push(i);
    return result;
  }

  result.push(1);
  if (current > 3) result.push('...');
  for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
    result.push(i);
  }
  if (current < total - 2) result.push('...');
  result.push(total);

  return result;
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const classes = computed(() => [
  style[toCamelCase('liquid-pagination')],
  style[toCamelCase(`liquid-pagination--${props.variant}`)],
  style[toCamelCase(`liquid-pagination--${props.size}`)],
]);

const btnClass = (page: number | '...') => [
  style[toCamelCase('liquid-pagination-btn')],
  page === props.currentPage ? style[toCamelCase('liquid-pagination-btn--active')] : '',
  page === '...' ? style[toCamelCase('liquid-pagination-btn--ellipsis')] : '',
];

const navBtnClass = (disabled: boolean) => [
  style[toCamelCase('liquid-pagination-nav')],
  disabled ? style[toCamelCase('liquid-pagination-nav--disabled')] : '',
];
</script>

<template>
  <nav :class="classes" aria-label="pagination">
    <button
      v-if="showPrevNext"
      :class="navBtnClass(currentPage <= 1)"
      :disabled="currentPage <= 1"
      @click="goTo(currentPage - 1)"
    >
      ‹
    </button>

    <button
      v-for="(page, i) in pages"
      :key="i"
      :class="btnClass(page)"
      :disabled="page === '...'"
      @click="page !== '...' && goTo(page)"
    >
      {{ page }}
    </button>

    <button
      v-if="showPrevNext"
      :class="navBtnClass(currentPage >= totalPages)"
      :disabled="currentPage >= totalPages"
      @click="goTo(currentPage + 1)"
    >
      ›
    </button>
  </nav>
</template>

<style src="./Pagination.module.css" module></style>
