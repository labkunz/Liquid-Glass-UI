<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import DeleteModal from '../../components/shared/DeleteModal.vue'
import { TableEngine } from '@liquid/logic'
import type { ColumnSchema } from '@liquid/logic'
import { LiquidBadge, LiquidButton, LiquidCard } from '@liquid/ui'
import { useJobsStore } from '../../stores/jobs'
import { useToast } from '@liquid/logic'

const router = useRouter()
const jobsStore = useJobsStore()
const { success, error } = useToast()

const deleteId = ref<string | null>(null)
const deleteLoading = ref(false)

const showDeleteModal = computed({
  get: () => deleteId.value !== null,
  set: (v) => { if (!v) deleteId.value = null },
})

const jobStatusLabels: Record<string, string> = {
  draft: '草稿',
  open: '開放中',
  paused: '暫停',
  closed: '已關閉',
}

const jobStatusColors: Record<string, 'default' | 'primary' | 'success' | 'warning' | 'danger'> = {
  draft: 'default',
  open: 'success',
  paused: 'warning',
  closed: 'danger',
}

const jobTypeLabels: Record<string, string> = {
  'full-time': '全職',
  'part-time': '兼職',
  contract: '合約',
}

const workModeLabels: Record<string, string> = {
  remote: '遠端',
  onsite: '到場',
  hybrid: '混合',
}

const columns: ColumnSchema[] = [
  { key: 'title', label: '職位名稱', width: '220px' },
  { key: 'department', label: '部門', filterable: true, width: '120px' },
  {
    key: 'jobType',
    label: '類型',
    width: '90px',
    formatter: (val) => jobTypeLabels[val as string] ?? String(val),
  },
  {
    key: 'workMode',
    label: '工作方式',
    width: '100px',
    formatter: (val) => workModeLabels[val as string] ?? String(val),
  },
  { key: 'status', label: '狀態', filterable: true, width: '100px' },
  { key: 'applicantCount', label: '應徵數', sortable: true, align: 'center', width: '80px' },
  { key: 'createdAt', label: '建立日期', sortable: true, width: '110px' },
  { key: '_id', label: '操作', align: 'center', width: '140px' },
]

const rows = computed(() =>
  jobsStore.jobs.map((j) => ({
    ...j,
    _id: j.id,
  }))
)

function handleEdit(id: string) {
  router.push(`/jobs/${id}/edit`)
}

function handleDelete(id: string) {
  deleteId.value = id
}

async function confirmDelete() {
  if (!deleteId.value) return
  deleteLoading.value = true
  const ok = jobsStore.deleteJob(deleteId.value)
  deleteLoading.value = false
  deleteId.value = null
  if (ok) success('職缺已刪除')
  else error('刪除失敗，請稍後再試')
}
</script>

<template>
  <AdminLayout>
    <div class="list-page">
      <!-- Header -->
      <div class="list-page__header">
        <div>
          <h2 class="list-page__title">職缺管理</h2>
          <p class="list-page__subtitle">共 {{ jobsStore.totalJobs }} 個職缺，{{ jobsStore.openJobsCount }} 個開放中</p>
        </div>
        <LiquidButton variant="primary" @click="router.push('/jobs/create')">+ 新增職缺</LiquidButton>
      </div>

      <!-- Table -->
      <LiquidCard variant="glass-css-only" padding="none" overflow="visible" class="list-page__table">
        <TableEngine
          :columns="columns"
          :rows="rows"
          :page-size="10"
          hoverable
        >
          <!-- Status badge -->
          <template #cell-status="{ value }">
            <LiquidBadge
              :color="jobStatusColors[value as string] ?? 'default'"
              variant="glass-css-only"
              size="sm"
            >
              {{ jobStatusLabels[value as string] ?? value }}
            </LiquidBadge>
          </template>

          <!-- Actions -->
          <template #cell-_id="{ value }">
            <div class="list-page__row-actions">
              <LiquidButton variant="ghost" size="sm" @click="handleEdit(value as string)">
                編輯
              </LiquidButton>
              <LiquidButton variant="danger" size="sm" @click="handleDelete(value as string)">
                刪除
              </LiquidButton>
            </div>
          </template>
        </TableEngine>
      </LiquidCard>
    </div>

    <!-- Delete Modal -->
    <DeleteModal
      v-model="showDeleteModal"
      :loading="deleteLoading"
      title="確認刪除職缺"
      message="刪除後無法復原，相關應徵者記錄將保留但職缺資訊消失，確定要刪除嗎？"
      @confirm="confirmDelete"
    />
  </AdminLayout>
</template>

<style scoped>
.list-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.list-page__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 1rem;
}

.list-page__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
  margin-bottom: 0.25rem;
}

.list-page__subtitle {
  font-size: 0.8rem;
  color: #64748b;
}

.list-page__table {
  padding: 1rem;
}

.list-page__row-actions {
  display: flex;
  gap: 0.5rem;
  justify-content: center;
}

/* Dark mode overrides for TableEngine internals */
.list-page__table :deep(.table-engine__th) {
  color: #94a3b8;
  border-bottom-color: rgba(255, 255, 255, 0.08);
  background: transparent;
}

.list-page__table :deep(.table-engine__th--sortable:hover) {
  background: rgba(255, 255, 255, 0.04);
}

.list-page__table :deep(.table-engine__tr) {
  border-bottom-color: rgba(255, 255, 255, 0.04);
}

.list-page__table :deep(.table-engine__tr:hover) {
  background: rgba(255, 255, 255, 0.04);
}

.list-page__table :deep(.table-engine__td) {
  color: #cbd5e1;
}

.list-page__table :deep(.table-engine__empty) {
  color: #475569;
}

.list-page__table :deep(.table-engine__total) {
  color: #64748b;
}

.list-page__table :deep(.table-engine__filter-label) {
  color: #94a3b8;
}

.list-page__table :deep(.table-engine__filter-input) {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
}

.list-page__table :deep(.table-engine__filter-input:focus) {
  border-color: rgba(99, 102, 241, 0.6);
}

.list-page__table :deep(.table-engine__filter-input::placeholder) {
  color: #475569;
}
</style>
