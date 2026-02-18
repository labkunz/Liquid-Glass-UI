<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { FormEngine } from '@liquid/logic'
import type { FieldSchema } from '@liquid/logic'
import { LiquidButton, LiquidCard } from '@liquid/ui'
import { useJobsStore } from '../../stores/jobs'
import { useToast } from '@liquid/logic'

const route = useRoute()
const router = useRouter()
const jobsStore = useJobsStore()
const { success, error } = useToast()

// ---- Mode detection ----------------------------------------
const isEdit = computed(() => !!route.params.id)
const jobId = computed(() => route.params.id as string | undefined)

const existingJob = computed(() =>
  jobId.value ? jobsStore.jobById(jobId.value) : undefined
)

// ---- Form data ---------------------------------------------
const formData = ref<Record<string, unknown>>(
  existingJob.value
    ? { ...existingJob.value }
    : {
        title: '',
        department: 'Engineering',
        jobType: 'full-time',
        workMode: 'hybrid',
        status: 'draft',
        location: '',
        salaryMin: '',
        salaryMax: '',
        hourlyMin: '',
        hourlyMax: '',
        deadline: '',
        description: '',
      }
)

// ---- Schema ------------------------------------------------
const schema = computed<FieldSchema[]>(() => [
  {
    key: 'title',
    type: 'input',
    label: '職位名稱',
    placeholder: '例：Senior Frontend Engineer',
    required: true,
  },
  {
    key: 'department',
    type: 'select',
    label: '部門',
    required: true,
    options: [
      { label: 'Engineering', value: 'Engineering' },
      { label: 'Product', value: 'Product' },
      { label: 'Design', value: 'Design' },
      { label: 'Marketing', value: 'Marketing' },
      { label: 'Sales', value: 'Sales' },
      { label: 'HR', value: 'HR' },
    ],
  },
  {
    key: 'jobType',
    type: 'select',
    label: '職位類型',
    required: true,
    options: [
      { label: '全職', value: 'full-time' },
      { label: '兼職', value: 'part-time' },
      { label: '合約', value: 'contract' },
    ],
  },
  {
    key: 'workMode',
    type: 'select',
    label: '工作方式',
    required: true,
    options: [
      { label: '遠端', value: 'remote' },
      { label: '到場', value: 'onsite' },
      { label: '混合', value: 'hybrid' },
    ],
  },
  {
    key: 'location',
    type: 'input',
    label: '工作地點',
    placeholder: '例：台北市信義區',
    condition: { field: 'workMode', operator: 'eq', value: 'onsite' },
  },
  {
    key: 'status',
    type: 'select',
    label: '職缺狀態',
    required: true,
    options: [
      { label: '草稿', value: 'draft' },
      { label: '開放中', value: 'open' },
      { label: '暫停', value: 'paused' },
      { label: '已關閉', value: 'closed' },
    ],
  },
  // 月薪（非合約）
  {
    key: 'salaryMin',
    type: 'input',
    label: '月薪下限（元）',
    placeholder: '例：60000',
    condition: { field: 'jobType', operator: 'neq', value: 'contract' },
  },
  {
    key: 'salaryMax',
    type: 'input',
    label: '月薪上限（元）',
    placeholder: '例：100000',
    condition: { field: 'jobType', operator: 'neq', value: 'contract' },
  },
  // 時薪（合約）
  {
    key: 'hourlyMin',
    type: 'input',
    label: '時薪下限（元）',
    placeholder: '例：600',
    condition: { field: 'jobType', operator: 'eq', value: 'contract' },
  },
  {
    key: 'hourlyMax',
    type: 'input',
    label: '時薪上限（元）',
    placeholder: '例：1200',
    condition: { field: 'jobType', operator: 'eq', value: 'contract' },
  },
  {
    key: 'deadline',
    type: 'date',
    label: '截止日期',
  },
  {
    key: 'description',
    type: 'textarea',
    label: '職位描述',
    placeholder: '描述職位職責、要求技能、福利待遇等...',
    required: true,
  },
])

// ---- Submit ------------------------------------------------
function handleSubmit(data: Record<string, unknown>) {
  if (isEdit.value && jobId.value) {
    const ok = jobsStore.updateJob(jobId.value, data as Parameters<typeof jobsStore.updateJob>[1])
    if (ok) {
      success('職缺已更新')
      router.push('/jobs')
    } else {
      error('更新失敗，請稍後再試')
    }
  } else {
    jobsStore.createJob(data as Parameters<typeof jobsStore.createJob>[0])
    success('職缺已新增')
    router.push('/jobs')
  }
}

function handleCancel() {
  router.push('/jobs')
}
</script>

<template>
  <AdminLayout>
    <div class="form-page">
      <div class="form-page__header">
        <button class="form-page__back" @click="handleCancel">← 返回列表</button>
        <h2 class="form-page__title">{{ isEdit ? '編輯職缺' : '新增職缺' }}</h2>
      </div>

      <LiquidCard variant="glass-css-only" padding="none" overflow="visible" class="form-page__card">
        <FormEngine
          v-model="formData"
          :schema="schema"
          :show-submit="false"
          @submit="handleSubmit"
        >
          <template #actions>
            <div class="form-page__actions">
              <LiquidButton variant="ghost" @click="handleCancel">
                取消
              </LiquidButton>
              <LiquidButton type="submit" variant="primary">
                {{ isEdit ? '儲存變更' : '新增職缺' }}
              </LiquidButton>
            </div>
          </template>
        </FormEngine>
      </LiquidCard>
    </div>
  </AdminLayout>
</template>

<style scoped>
.form-page {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-page__header {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-page__back {
  background: none;
  border: none;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  padding: 0;
  text-align: left;
  width: fit-content;
  transition: color 0.15s;
}

.form-page__back:hover {
  color: #94a3b8;
}

.form-page__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #e2e8f0;
}

.form-page__card {
  padding: 1.75rem;
}

.form-page__actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  padding-top: 0.5rem;
}

/* Dark mode overrides for FormEngine internals */
.form-page__card :deep(.form-field__label) {
  color: #94a3b8;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.375rem;
  display: block;
}

.form-page__card :deep(.form-field__required) {
  color: #f87171;
  margin-left: 0.2rem;
}

.form-page__card :deep(.form-field__error) {
  color: #f87171;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.form-page__card :deep(.form-engine) {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
</style>
