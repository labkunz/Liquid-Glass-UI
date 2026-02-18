// ============================================================
// Admin ATS — 初始 Mock Data
// ============================================================

export type JobStatus = 'draft' | 'open' | 'paused' | 'closed'
export type JobType = 'full-time' | 'part-time' | 'contract'
export type WorkMode = 'remote' | 'onsite' | 'hybrid'
export type Department = 'Engineering' | 'Product' | 'Design' | 'Marketing' | 'Sales' | 'HR'

export interface Job {
  id: string
  title: string
  department: Department
  jobType: JobType
  workMode: WorkMode
  status: JobStatus
  location?: string
  salaryMin?: number
  salaryMax?: number
  hourlyMin?: number
  hourlyMax?: number
  deadline?: string
  description: string
  applicantCount: number
  createdAt: string
}

export type CandidateStatus =
  | 'pending'
  | 'interview_1'
  | 'interview_2'
  | 'offer'
  | 'hired'
  | 'rejected'

export type CandidateSource = 'LinkedIn' | '人力銀行' | '員工推薦' | '官網'

export interface Candidate {
  id: string
  name: string
  email: string
  phone?: string
  jobId: string
  status: CandidateStatus
  source: CandidateSource
  resumeUrl?: string
  notes?: string
  appliedAt: string
}

// ---- 初始職缺資料 ----
export const initialJobs: Job[] = [
  {
    id: 'job-001',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    jobType: 'full-time',
    workMode: 'hybrid',
    status: 'open',
    location: '台北市',
    salaryMin: 80000,
    salaryMax: 120000,
    description: '負責開發高品質的前端應用，技術棧包含 Vue 3、TypeScript、Vite。',
    applicantCount: 12,
    createdAt: '2025-01-15',
  },
  {
    id: 'job-002',
    title: 'Product Manager',
    department: 'Product',
    jobType: 'full-time',
    workMode: 'onsite',
    status: 'open',
    location: '台北市',
    salaryMin: 70000,
    salaryMax: 100000,
    description: '負責產品規劃與需求分析，與設計、工程團隊協作推動產品迭代。',
    applicantCount: 8,
    createdAt: '2025-01-20',
  },
  {
    id: 'job-003',
    title: 'UI/UX Designer',
    department: 'Design',
    jobType: 'full-time',
    workMode: 'hybrid',
    status: 'open',
    location: '台北市',
    salaryMin: 60000,
    salaryMax: 90000,
    description: '負責使用者介面設計與使用者研究，打造直覺且美觀的產品體驗。',
    applicantCount: 15,
    createdAt: '2025-01-22',
  },
  {
    id: 'job-004',
    title: 'Backend Engineer',
    department: 'Engineering',
    jobType: 'full-time',
    workMode: 'remote',
    status: 'open',
    salaryMin: 75000,
    salaryMax: 110000,
    description: '負責後端 API 開發與系統架構設計，主要使用 Node.js 和 PostgreSQL。',
    applicantCount: 7,
    createdAt: '2025-01-25',
  },
  {
    id: 'job-005',
    title: 'Marketing Specialist',
    department: 'Marketing',
    jobType: 'full-time',
    workMode: 'onsite',
    status: 'paused',
    location: '台中市',
    salaryMin: 45000,
    salaryMax: 65000,
    description: '負責數位行銷策略規劃與執行，包含 SEO、社群媒體和內容行銷。',
    applicantCount: 5,
    createdAt: '2025-01-28',
  },
  {
    id: 'job-006',
    title: 'Sales Representative',
    department: 'Sales',
    jobType: 'full-time',
    workMode: 'hybrid',
    status: 'open',
    location: '台北市',
    salaryMin: 40000,
    salaryMax: 70000,
    description: '開發新客戶，維護現有客戶關係，達成季度銷售目標。',
    applicantCount: 20,
    createdAt: '2025-02-01',
  },
  {
    id: 'job-007',
    title: 'HR Business Partner',
    department: 'HR',
    jobType: 'full-time',
    workMode: 'hybrid',
    status: 'open',
    location: '台北市',
    salaryMin: 55000,
    salaryMax: 80000,
    description: '負責人才招募、員工關係管理與組織發展，推動公司文化建設。',
    applicantCount: 4,
    createdAt: '2025-02-05',
  },
  {
    id: 'job-008',
    title: 'DevOps Engineer',
    department: 'Engineering',
    jobType: 'full-time',
    workMode: 'remote',
    status: 'open',
    salaryMin: 80000,
    salaryMax: 115000,
    description: '負責 CI/CD pipeline 建置、Kubernetes 叢集管理和基礎架構自動化。',
    applicantCount: 3,
    createdAt: '2025-02-08',
  },
  {
    id: 'job-009',
    title: 'Data Analyst (Contract)',
    department: 'Product',
    jobType: 'contract',
    workMode: 'remote',
    hourlyMin: 800,
    hourlyMax: 1200,
    description: '分析產品數據，提供數據驅動的商業洞察，合約期 6 個月。',
    applicantCount: 9,
    createdAt: '2025-02-10',
  },
  {
    id: 'job-010',
    title: 'Junior Frontend Engineer',
    department: 'Engineering',
    jobType: 'full-time',
    workMode: 'onsite',
    status: 'draft',
    location: '台北市',
    salaryMin: 45000,
    salaryMax: 65000,
    description: '適合 1-2 年工作經驗的前端工程師，將在 Senior 工程師指導下成長。',
    applicantCount: 0,
    createdAt: '2025-02-12',
  },
]

// ---- 初始應徵者資料 ----
export const initialCandidates: Candidate[] = [
  {
    id: 'cand-001',
    name: '陳怡婷',
    email: 'yiting.chen@example.com',
    phone: '0912-345-678',
    jobId: 'job-001',
    status: 'interview_2',
    source: 'LinkedIn',
    resumeUrl: 'https://example.com/resume/yiting',
    appliedAt: '2025-01-18',
  },
  {
    id: 'cand-002',
    name: '林建宏',
    email: 'chien.lin@example.com',
    jobId: 'job-001',
    status: 'interview_1',
    source: '人力銀行',
    appliedAt: '2025-01-20',
  },
  {
    id: 'cand-003',
    name: '王雅琳',
    email: 'yalin.wang@example.com',
    phone: '0987-654-321',
    jobId: 'job-002',
    status: 'offer',
    source: '員工推薦',
    notes: '前同事推薦，表現優秀',
    appliedAt: '2025-01-22',
  },
  {
    id: 'cand-004',
    name: '黃志偉',
    email: 'chihwei.huang@example.com',
    jobId: 'job-003',
    status: 'hired',
    source: 'LinkedIn',
    appliedAt: '2025-01-23',
  },
  {
    id: 'cand-005',
    name: '張美玲',
    email: 'meiling.zhang@example.com',
    jobId: 'job-003',
    status: 'rejected',
    source: '官網',
    notes: '作品集未符合期待',
    appliedAt: '2025-01-24',
  },
  {
    id: 'cand-006',
    name: '李宗翰',
    email: 'zonghan.li@example.com',
    jobId: 'job-004',
    status: 'interview_1',
    source: '人力銀行',
    appliedAt: '2025-01-27',
  },
  {
    id: 'cand-007',
    name: '吳佳穎',
    email: 'chiaying.wu@example.com',
    jobId: 'job-001',
    status: 'pending',
    source: '官網',
    appliedAt: '2025-02-01',
  },
  {
    id: 'cand-008',
    name: '蔡承翰',
    email: 'chenhan.tsai@example.com',
    jobId: 'job-006',
    status: 'interview_2',
    source: 'LinkedIn',
    appliedAt: '2025-02-03',
  },
  {
    id: 'cand-009',
    name: '許庭萱',
    email: 'tingxuan.hsu@example.com',
    phone: '0900-111-222',
    jobId: 'job-007',
    status: 'offer',
    source: '員工推薦',
    appliedAt: '2025-02-05',
  },
  {
    id: 'cand-010',
    name: '劉冠廷',
    email: 'guanting.liu@example.com',
    jobId: 'job-008',
    status: 'interview_1',
    source: 'LinkedIn',
    appliedAt: '2025-02-08',
  },
  {
    id: 'cand-011',
    name: '鄭育萍',
    email: 'yuping.zheng@example.com',
    jobId: 'job-004',
    status: 'pending',
    source: '人力銀行',
    appliedAt: '2025-02-10',
  },
  {
    id: 'cand-012',
    name: '方嘉玲',
    email: 'chialing.fang@example.com',
    jobId: 'job-002',
    status: 'rejected',
    source: '官網',
    appliedAt: '2025-02-11',
  },
  {
    id: 'cand-013',
    name: '曾威豪',
    email: 'weihao.tseng@example.com',
    jobId: 'job-009',
    status: 'interview_2',
    source: 'LinkedIn',
    appliedAt: '2025-02-12',
  },
  {
    id: 'cand-014',
    name: '洪珮君',
    email: 'peijun.hong@example.com',
    jobId: 'job-006',
    status: 'hired',
    source: '員工推薦',
    appliedAt: '2025-02-13',
  },
  {
    id: 'cand-015',
    name: '謝明哲',
    email: 'mingzhe.hsieh@example.com',
    jobId: 'job-001',
    status: 'pending',
    source: '人力銀行',
    appliedAt: '2025-02-14',
  },
]
