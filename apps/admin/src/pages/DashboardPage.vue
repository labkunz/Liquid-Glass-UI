<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import AdminLayout from '../components/layout/AdminLayout.vue'
import { LiquidButton } from '@liquid/ui'
import { useJobsStore } from '../stores/jobs'
import { useCandidatesStore } from '../stores/candidates'
import { candidateStatusLabels } from '../stores/candidates'

const router = useRouter()
const jobsStore = useJobsStore()
const candidatesStore = useCandidatesStore()

const stats = computed(() => [
  {
    label: '開放中職缺',
    value: jobsStore.openJobsCount,
    sub: `共 ${jobsStore.totalJobs} 個職缺`,
    color: '#60a5fa',
  },
  {
    label: '本月新增應徵',
    value: candidatesStore.thisMonthCount,
    sub: `共 ${candidatesStore.totalCandidates} 位應徵者`,
    color: '#a78bfa',
  },
  {
    label: '錄取率',
    value: `${candidatesStore.hiredRate}%`,
    sub: '已決策的應徵者中',
    color: '#34d399',
  },
  {
    label: 'Offer 發出',
    value: candidatesStore.statusDistribution['offer'] ?? 0,
    sub: '等待回覆中',
    color: '#fbbf24',
  },
])

const topDepartments = computed(() => {
  const dist = jobsStore.departmentDistribution
  return Object.entries(dist)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
})

const candidateStages = computed(() => {
  const dist = candidatesStore.statusDistribution
  const order: Array<keyof typeof candidateStatusLabels> = [
    'pending', 'interview_1', 'interview_2', 'offer', 'hired', 'rejected',
  ]
  return order
    .filter((s) => dist[s])
    .map((s) => ({
      status: s,
      label: candidateStatusLabels[s],
      count: dist[s] ?? 0,
    }))
})
</script>

<template>
  <AdminLayout>
    <div class="dashboard">
      <!-- 統計卡片 -->
      <section class="dashboard__stats">
        <div
          v-for="stat in stats"
          :key="stat.label"
          class="stat-card"
          :style="{ '--stat-color': stat.color }"
        >
          <div class="stat-card__label">{{ stat.label }}</div>
          <div class="stat-card__value" :style="{ color: stat.color }">
            {{ stat.value }}
          </div>
          <div class="stat-card__sub">{{ stat.sub }}</div>
        </div>
      </section>

      <!-- 圖表區 -->
      <div class="dashboard__charts">
        <!-- 部門分布 -->
        <div class="dashboard__chart-card stat-card">
          <h3 class="dashboard__chart-title">開放中職缺 — 部門分布</h3>
          <div class="dashboard__bar-list">
            <div
              v-for="([dept, count]) in topDepartments"
              :key="dept"
              class="dashboard__bar-item"
            >
              <div class="dashboard__bar-label">
                <span>{{ dept }}</span>
                <span class="dashboard__bar-count">{{ count }}</span>
              </div>
              <div class="dashboard__bar-track">
                <div
                  class="dashboard__bar-fill"
                  :style="{
                    width: `${(count / jobsStore.openJobsCount) * 100}%`,
                    background: '#60a5fa',
                  }"
                />
              </div>
            </div>
            <div v-if="topDepartments.length === 0" class="dashboard__empty">
              目前無開放職缺
            </div>
          </div>
        </div>

        <!-- 應徵者階段分布 -->
        <div class="dashboard__chart-card stat-card">
          <h3 class="dashboard__chart-title">應徵者審核階段分布</h3>
          <div class="dashboard__bar-list">
            <div
              v-for="stage in candidateStages"
              :key="stage.status"
              class="dashboard__bar-item"
            >
              <div class="dashboard__bar-label">
                <span>{{ stage.label }}</span>
                <span class="dashboard__bar-count">{{ stage.count }}</span>
              </div>
              <div class="dashboard__bar-track">
                <div
                  class="dashboard__bar-fill"
                  :style="{
                    width: `${(stage.count / candidatesStore.totalCandidates) * 100}%`,
                    background: '#a78bfa',
                  }"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 快速連結 -->
      <section class="dashboard__quick-actions stat-card">
        <h3 class="dashboard__chart-title">快速操作</h3>
        <div class="dashboard__action-grid">
          <LiquidButton variant="primary" @click="router.push('/jobs/create')">新增職缺</LiquidButton>
          <LiquidButton variant="ghost" @click="router.push('/candidates/create')">新增應徵者</LiquidButton>
          <LiquidButton variant="ghost" @click="router.push('/jobs')">查看所有職缺</LiquidButton>
          <LiquidButton variant="ghost" @click="router.push('/candidates')">查看所有應徵者</LiquidButton>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<style scoped>
.dashboard {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* ---- Stats ---- */
.dashboard__stats {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

/* ---- Charts ---- */
.dashboard__charts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.dashboard__chart-card {
  padding: 1.25rem;
}

.dashboard__chart-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 1.25rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* ---- Bar Chart ---- */
.dashboard__bar-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.dashboard__bar-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.dashboard__bar-label {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #94a3b8;
}

.dashboard__bar-count {
  font-weight: 600;
  color: #e2e8f0;
}

.dashboard__bar-track {
  height: 6px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 3px;
  overflow: hidden;
}

.dashboard__bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.4s ease;
}

.dashboard__empty {
  font-size: 0.875rem;
  color: #475569;
  text-align: center;
  padding: 1rem 0;
}

/* ---- Quick Actions ---- */
.dashboard__quick-actions {
  padding: 1.25rem;
}

.dashboard__action-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 0.5rem;
}

@media (max-width: 768px) {
  .dashboard__charts {
    grid-template-columns: 1fr;
  }
}
</style>
