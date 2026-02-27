<script setup lang="ts">
import { computed, useCssModule } from 'vue';
import type { TableProps } from './types';

const props = withDefaults(defineProps<TableProps<Record<string, unknown>>>(), {
  variant: 'default',
  columns: () => [],
  data: () => [],
  striped: false,
  hoverable: true,
});

const style = useCssModule();

const toCamelCase = (str: string) =>
  str.replace(/[-]+([a-z])/g, (_, letter) => letter.toUpperCase());

const wrapperClasses = computed(() => [
  style[toCamelCase('liquid-table-wrapper')],
  style[toCamelCase(`liquid-table-wrapper--${props.variant}`)],
]);

const tableClasses = computed(() => [
  style[toCamelCase('liquid-table')],
  props.striped ? style[toCamelCase('liquid-table--striped')] : '',
  props.hoverable ? style[toCamelCase('liquid-table--hoverable')] : '',
]);

const thClass = (col: typeof props.columns[number]) => [
  style[toCamelCase('liquid-table-th')],
  col.align ? style[toCamelCase(`liquid-table-th--${col.align}`)] : '',
];

const tdClass = (col: typeof props.columns[number]) => [
  style[toCamelCase('liquid-table-td')],
  col.align ? style[toCamelCase(`liquid-table-td--${col.align}`)] : '',
];
</script>

<template>
  <div :class="wrapperClasses">
    <table :class="tableClasses">
      <thead :class="style[toCamelCase('liquid-table-thead')]">
        <tr :class="style[toCamelCase('liquid-table-tr')]">
          <th
            v-for="col in columns"
            :key="col.key"
            :class="thClass(col)"
            :style="col.width ? { width: col.width } : {}"
          >
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody :class="style[toCamelCase('liquid-table-tbody')]">
        <tr
          v-for="(row, i) in data"
          :key="i"
          :class="style[toCamelCase('liquid-table-tr')]"
        >
          <td
            v-for="col in columns"
            :key="String(col.key)"
            :class="tdClass(col)"
          >
            {{ col.render ? col.render(row[col.key], row) : row[col.key] }}
          </td>
        </tr>
        <tr v-if="data.length === 0" :class="style[toCamelCase('liquid-table-tr')]">
          <td :colspan="columns.length" :class="style[toCamelCase('liquid-table-empty')]">
            無資料
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="./Table.module.css" module></style>
