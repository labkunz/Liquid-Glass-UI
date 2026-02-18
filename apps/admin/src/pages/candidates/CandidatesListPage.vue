<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import DeleteModal from '../../components/shared/DeleteModal.vue'
import { TableEngine } from '@liquid/logic'
import type { ColumnSchema } from '@liquid/logic'
import { LiquidBadge } from '@liquid/ui'
import { useCandidatesStore, candidateStatusLabels, candidateStatusColors } from '../../stores/candidates'
import { useToast } from '@liquid/logic'

const router = useRouter()
const candidatesStore = useCandidatesStore()
const { success, error } = useToast()

const deleteId = ref<string | null>(null)
const deleteLoading = ref(false)

const showDeleteModal = computed({
  get: () => deleteId.value !== null,
  set: (v) => { if (!v) deleteId.value = null },
})

const sourceLabels: Record<string, string> = {
  LinkedIn: 'LinkedIn',
  '人力銀行': '人力銀行',
  '員工推薦': '員工推薦',
  '官網': '官網',
}

const columns: ColumnSchema[] = [
  { key: 'name', label: '姓名', width: '120px' },
  { key: 'email', label: 'Email', width: '200px' },
  { key: 'jobTitle', label: '應徵職位', filterable: true, width: '200px' },
  { key: 'status', label: '審核階段', filterable: true, width: '110px' },
  {
    key: 'source',
    label: '來源',
    width: '100px',
    formatter: (val) => sourceLabels[val as string] ?? String(val),
  },
  { key: 'appliedAt', label: '應徵日期', sortable: true, width: '110px' },
  { key: '_id', label: '操作', align: 'center', width: '140px' },
]

const rows = computed(() =>
  candidatesStore.candidates.map((c) => ({
    ...c,
    jobTitle: candidatesStore.getJobTitle(c.jobId),
    _id: c.id,
  }))
)

function handleEdit(id: string) {
  router.push(`/candidates/${id}/edit`)
}

function handleDelete(id: string) {
  deleteId.value = id
}

async function confirmDelete() {
  if (!deleteId.value) return
  deleteLoading.value = true
  const ok = candidatesStore.deleteCandidate(deleteId.value)
  deleteLoading.value = false
  deleteId.value = null
  if (ok) success('應徵者已刪除')
  else error('刪除失敗，請稍後再試')
}
</script>

<template>
  <AdminLayout>
    <div class="list-page">
      <!-- Header -->
      <div class="list-page__header">
        <div>
          <h2 class="list-page__title">應徵者管理</h2>
          <p class="list-page__subtitle">
            共 {{ candidatesStore.totalCandidates }} 位應徵者，
            本月新增 {{ candidatesStore.thisMonthCount }} 位
          </p>
        </div>
        <RouterLink to="/candidates/create" class="btn btn--primary">+ 新增應徵者</RouterLink>
      </div>

      <!-- Table -->
      <div class="glass-panel list-page__table">
        <TableEngine
          :columns="columns"
          :rows="rows"
          :page-size="10"
          hoverable
        >
          <!-- Status badge -->
          <template #cell-status="{ value }">
            <LiquidBadge
              :color="candidateStatusColors[value as string] ?? 'default'"
              variant="glass-css-only"
              size="sm"
            >
              {{ candidateStatusLabels[value as string] ?? value }}
            </LiquidBadge>
          </template>

          <!-- Actions -->
          <template #cell-_id="{ value }">
            <div class="list-page__row-actions">
              <button class="btn btn--ghost btn--sm" @click="handleEdit(value as string)">
                編輯
              </button>
              <button class="btn btn--danger btn--sm" @click="handleDelete(value as string)">
                刪除
              </button>
            </div>
          </template>
        </TableEngine>
      </div>
    </div>

    <!-- Delete Modal -->
    <DeleteModal
      v-model="showDeleteModal"
      :loading="deleteLoading"
      title="確認刪除應徵者"
      message="刪除後無法復原，確定要刪除此應徵者的所有記錄嗎？"
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

/* Dark mode overrides for TableEngine */
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
