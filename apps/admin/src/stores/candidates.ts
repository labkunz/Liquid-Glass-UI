import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialCandidates, type Candidate, type CandidateStatus } from '../data/mock'
import { useJobsStore } from './jobs'

const STORAGE_KEY = 'liquid-ats-candidates'

function loadFromStorage(): Candidate[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Candidate[]
  } catch {
    // ignore parse error
  }
  return initialCandidates
}

function saveToStorage(candidates: Candidate[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(candidates))
}

// Badge 顯示文字
export const candidateStatusLabels: Record<CandidateStatus, string> = {
  pending: '待審核',
  interview_1: '一面',
  interview_2: '二面',
  offer: 'Offer',
  hired: '錄取',
  rejected: '拒絕',
}

// Badge 顏色
export const candidateStatusColors: Record<
  CandidateStatus,
  'default' | 'primary' | 'info' | 'warning' | 'success' | 'danger'
> = {
  pending: 'default',
  interview_1: 'primary',
  interview_2: 'info',
  offer: 'warning',
  hired: 'success',
  rejected: 'danger',
}

export const useCandidatesStore = defineStore('candidates', () => {
  const candidates = ref<Candidate[]>(loadFromStorage())
  const jobsStore = useJobsStore()

  // ---- Computed ----
  const totalCandidates = computed(() => candidates.value.length)

  // 本月新增應徵數
  const thisMonthCount = computed(() => {
    const now = new Date()
    const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`
    return candidates.value.filter((c) => c.appliedAt.startsWith(thisMonth)).length
  })

  // 審核階段分布
  const statusDistribution = computed(() => {
    const map: Partial<Record<CandidateStatus, number>> = {}
    candidates.value.forEach((c) => {
      map[c.status] = (map[c.status] ?? 0) + 1
    })
    return map
  })

  // 錄取率（hired / 非 pending 總數）
  const hiredRate = computed(() => {
    const decided = candidates.value.filter((c) => c.status !== 'pending').length
    if (decided === 0) return 0
    const hired = candidates.value.filter((c) => c.status === 'hired').length
    return Math.round((hired / decided) * 100)
  })

  // 應徵職位選項（從 jobsStore 讀取 open jobs）
  const jobOptions = computed(() =>
    jobsStore.jobs
      .filter((j) => j.status === 'open')
      .map((j) => ({ label: j.title, value: j.id }))
  )

  const candidateById = computed(() => (id: string) =>
    candidates.value.find((c) => c.id === id)
  )

  // 取得職位名稱
  function getJobTitle(jobId: string): string {
    return jobsStore.jobById(jobId)?.title ?? '未知職位'
  }

  // ---- Actions ----
  function createCandidate(data: Omit<Candidate, 'id' | 'appliedAt'>): Candidate {
    const newCandidate: Candidate = {
      ...data,
      id: `cand-${Date.now()}`,
      appliedAt: new Date().toISOString().split('T')[0],
    }
    candidates.value.push(newCandidate)
    // 更新對應 job 的應徵人數
    jobsStore.updateJob(data.jobId, {
      applicantCount: (jobsStore.jobById(data.jobId)?.applicantCount ?? 0) + 1,
    })
    saveToStorage(candidates.value)
    return newCandidate
  }

  function updateCandidate(id: string, data: Partial<Omit<Candidate, 'id' | 'appliedAt'>>): boolean {
    const idx = candidates.value.findIndex((c) => c.id === id)
    if (idx === -1) return false
    candidates.value[idx] = { ...candidates.value[idx], ...data }
    saveToStorage(candidates.value)
    return true
  }

  function deleteCandidate(id: string): boolean {
    const idx = candidates.value.findIndex((c) => c.id === id)
    if (idx === -1) return false
    candidates.value.splice(idx, 1)
    saveToStorage(candidates.value)
    return true
  }

  function resetToMockData() {
    candidates.value = [...initialCandidates]
    saveToStorage(candidates.value)
  }

  return {
    candidates,
    totalCandidates,
    thisMonthCount,
    statusDistribution,
    hiredRate,
    jobOptions,
    candidateById,
    getJobTitle,
    createCandidate,
    updateCandidate,
    deleteCandidate,
    resetToMockData,
  }
})
