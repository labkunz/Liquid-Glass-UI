<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AdminLayout from '../../components/layout/AdminLayout.vue'
import { FormEngine } from '@liquid/logic'
import type { FieldSchema } from '@liquid/logic'
import { LiquidButton, LiquidCard } from '@liquid/ui'
import { useCandidatesStore } from '../../stores/candidates'
import { useToast } from '@liquid/logic'

const route = useRoute()
const router = useRouter()
const candidatesStore = useCandidatesStore()
const { success, error } = useToast()

// ---- Mode detection ----------------------------------------
const isEdit = computed(() => !!route.params.id)
const candidateId = computed(() => route.params.id as string | undefined)

const existingCandidate = computed(() =>
  candidateId.value ? candidatesStore.candidateById(candidateId.value) : undefined
)

// ---- Form data ---------------------------------------------
const formData = ref<Record<string, unknown>>(
  existingCandidate.value
    ? { ...existingCandidate.value }
    : {
        name: '',
        email: '',
        phone: '',
        jobId: '',
        status: 'pending',
        source: 'LinkedIn',
        notes: '',
      }
)

// ---- Schema (reactive for dynamic jobId options) -----------
const schema = computed<FieldSchema[]>(() => [
  {
    key: 'name',
    type: 'input',
    label: '姓名',
    placeholder: '例：陳怡婷',
    required: true,
  },
  {
    key: 'email',
    type: 'input',
    label: 'Email',
    placeholder: 'example@email.com',
    required: true,
    rules: [{ email: true }],
  },
  {
    key: 'phone',
    type: 'input',
    label: '電話',
    placeholder: '0912-345-678',
  },
  {
    key: 'jobId',
    type: 'select',
    label: '應徵職位',
    required: true,
    options: candidatesStore.jobOptions.length > 0
      ? candidatesStore.jobOptions
      : [{ label: '（目前無開放中職缺）', value: '', disabled: true }],
  },
  {
    key: 'status',
    type: 'select',
    label: '審核階段',
    required: true,
    options: [
      { label: '待審核', value: 'pending' },
      { label: '一面', value: 'interview_1' },
      { label: '二面', value: 'interview_2' },
      { label: 'Offer', value: 'offer' },
      { label: '錄取', value: 'hired' },
      { label: '拒絕', value: 'rejected' },
    ],
  },
  {
    key: 'source',
    type: 'select',
    label: '應徵來源',
    required: true,
    options: [
      { label: 'LinkedIn', value: 'LinkedIn' },
      { label: '人力銀行', value: '人力銀行' },
      { label: '員工推薦', value: '員工推薦' },
      { label: '官網', value: '官網' },
    ],
  },
  {
    key: 'resumeUrl',
    type: 'input',
    label: '履歷連結（選填）',
    placeholder: 'https://...',
  },
  {
    key: 'notes',
    type: 'textarea',
    label: '備註',
    placeholder: '面試評估、特殊說明等...',
  },
])

// ---- Submit ------------------------------------------------
function handleSubmit(data: Record<string, unknown>) {
  if (isEdit.value && candidateId.value) {
    const ok = candidatesStore.updateCandidate(
      candidateId.value,
      data as Parameters<typeof candidatesStore.updateCandidate>[1]
    )
    if (ok) {
      success('應徵者資料已更新')
      router.push('/candidates')
    } else {
      error('更新失敗，請稍後再試')
    }
  } else {
    candidatesStore.createCandidate(data as Parameters<typeof candidatesStore.createCandidate>[0])
    success('應徵者已新增')
    router.push('/candidates')
  }
}

function handleCancel() {
  router.push('/candidates')
}
</script>

<template>
  <AdminLayout>
    <div class="form-page">
      <div class="form-page__header">
        <button
          class="form-page__back"
          @click="handleCancel"
        >
          ← 返回列表
        </button>
        <h2 class="form-page__title">
          {{ isEdit ? '編輯應徵者' : '新增應徵者' }}
        </h2>
      </div>

      <LiquidCard
        variant="glass-css-only"
        padding="none"
        overflow="visible"
        class="form-page__card"
      >
        <FormEngine
          v-model="formData"
          :schema="schema"
          :show-submit="false"
          @submit="handleSubmit"
        >
          <template #actions>
            <div class="form-page__actions">
              <LiquidButton
                variant="ghost"
                @click="handleCancel"
              >
                取消
              </LiquidButton>
              <LiquidButton
                type="submit"
                variant="primary"
              >
                {{ isEdit ? '儲存變更' : '新增應徵者' }}
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
