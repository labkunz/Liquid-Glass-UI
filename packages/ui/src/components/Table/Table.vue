<script setup lang="ts">
import { computed, useCssModule } from 'vue';

export interface TableColumn {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

export interface TableProps {
  variant?: 'default' | 'glass-css-only' | 'glass-highlight-layered';
  columns: TableColumn[];
  rows: Record<string, unknown>[];
  striped?: boolean;
  hoverable?: boolean;
}

const props = withDefaults(defineProps<TableProps>(), {
  variant: 'default',
  columns: () => [],
  rows: () => [],
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

const thClass = (col: TableColumn) => [
  style[toCamelCase('liquid-table-th')],
  col.align ? style[toCamelCase(`liquid-table-th--${col.align}`)] : '',
];

const tdClass = (col: TableColumn) => [
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
          v-for="(row, i) in rows"
          :key="i"
          :class="style[toCamelCase('liquid-table-tr')]"
        >
          <td
            v-for="col in columns"
            :key="col.key"
            :class="tdClass(col)"
          >
            {{ row[col.key] }}
          </td>
        </tr>
        <tr v-if="rows.length === 0" :class="style[toCamelCase('liquid-table-tr')]">
          <td :colspan="columns.length" :class="style[toCamelCase('liquid-table-empty')]">
            無資料
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style src="./Table.module.css" module></style>
