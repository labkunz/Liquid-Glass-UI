import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { initialJobs, type Job, type JobStatus } from '../data/mock'

const STORAGE_KEY = 'liquid-ats-jobs'

function loadFromStorage(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw) as Job[]
  } catch {
    // ignore parse error
  }
  return initialJobs
}

function saveToStorage(jobs: Job[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs))
}

export const useJobsStore = defineStore('jobs', () => {
  const jobs = ref<Job[]>(loadFromStorage())

  // ---- Computed ----
  const totalJobs = computed(() => jobs.value.length)
  const openJobs = computed(() => jobs.value.filter((j) => j.status === 'open'))
  const openJobsCount = computed(() => openJobs.value.length)

  const jobById = computed(() => (id: string) =>
    jobs.value.find((j) => j.id === id)
  )

  // 部門分布
  const departmentDistribution = computed(() => {
    const map: Record<string, number> = {}
    jobs.value.filter((j) => j.status === 'open').forEach((j) => {
      map[j.department] = (map[j.department] ?? 0) + 1
    })
    return map
  })

  // 狀態分布
  const statusDistribution = computed(() => {
    const map: Record<JobStatus, number> = { draft: 0, open: 0, paused: 0, closed: 0 }
    jobs.value.forEach((j) => {
      if (j.status) map[j.status] = (map[j.status] ?? 0) + 1
    })
    return map
  })

  // ---- Actions ----
  function createJob(data: Omit<Job, 'id' | 'applicantCount' | 'createdAt'>): Job {
    const newJob: Job = {
      ...data,
      id: `job-${Date.now()}`,
      applicantCount: 0,
      createdAt: new Date().toISOString().split('T')[0],
    }
    jobs.value.push(newJob)
    saveToStorage(jobs.value)
    return newJob
  }

  function updateJob(id: string, data: Partial<Omit<Job, 'id' | 'createdAt'>>): boolean {
    const idx = jobs.value.findIndex((j) => j.id === id)
    if (idx === -1) return false
    jobs.value[idx] = { ...jobs.value[idx], ...data }
    saveToStorage(jobs.value)
    return true
  }

  function deleteJob(id: string): boolean {
    const idx = jobs.value.findIndex((j) => j.id === id)
    if (idx === -1) return false
    jobs.value.splice(idx, 1)
    saveToStorage(jobs.value)
    return true
  }

  function resetToMockData() {
    jobs.value = [...initialJobs]
    saveToStorage(jobs.value)
  }

  return {
    jobs,
    totalJobs,
    openJobs,
    openJobsCount,
    jobById,
    departmentDistribution,
    statusDistribution,
    createJob,
    updateJob,
    deleteJob,
    resetToMockData,
  }
})
