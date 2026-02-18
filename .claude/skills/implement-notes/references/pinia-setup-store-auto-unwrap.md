# Pinia Setup Store 的自動 Unwrap 行為

Pinia Setup Store 回傳的 computed ref 會被自動 unwrap，從外部存取時不需要加 `.value`。

---

## 核心概念

在 Vue 3 中，`computed()` 回傳的是一個 `ComputedRef`，通常需要透過 `.value` 才能取得內部值。

但在 **Pinia Setup Store** 中，當你把 computed 放進 `return {}` 暴露出去後，Pinia 會對整個 store 物件套用 `reactive()`，這會讓所有 ref 和 computed **自動 unwrap**。

因此從外部呼叫 `useXxxStore()` 取得的 store 實例，computed 的值已經是 unwrap 後的狀態。

---

## 常見錯誤示範

### 情境：computed 回傳一個函式（factory pattern）

```typescript
// jobs.ts（Store 定義）
const jobById = computed(() => (id: string) =>
  jobs.value.find((j) => j.id === id)
)
```

`jobById` 的型別是 `ComputedRef<(id: string) => Job | undefined>`。

### 錯誤用法

```typescript
// candidates.ts（另一個 Store 內）
const jobsStore = useJobsStore()

// ❌ 錯誤：誤以為需要手動 .value 才能取得內部函式
jobsStore.jobById.value(jobId)
// → TypeError: jobsStore.jobById.value is not a function
```

**原因**：`jobsStore.jobById` 已經是 unwrap 後的函式本身，`.value` 在函式物件上不存在，結果是 `undefined`，呼叫 `undefined()` 就會爆錯。

### 正確用法

```typescript
// ✅ 正確：直接呼叫，不需要 .value
jobsStore.jobById(jobId)
```

---

## 實際修正案例

在 `apps/admin/src/stores/candidates.ts` 中：

```typescript
// 修正前（錯誤）
function getJobTitle(jobId: string): string {
  return jobsStore.jobById.value(jobId)?.title ?? '未知職位'
}

function createCandidate(data) {
  jobsStore.updateJob(data.jobId, {
    applicantCount: (jobsStore.jobById.value(data.jobId)?.applicantCount ?? 0) + 1,
  })
}

// 修正後（正確）
function getJobTitle(jobId: string): string {
  return jobsStore.jobById(jobId)?.title ?? '未知職位'
}

function createCandidate(data) {
  jobsStore.updateJob(data.jobId, {
    applicantCount: (jobsStore.jobById(data.jobId)?.applicantCount ?? 0) + 1,
  })
}
```

---

## 規則總結

| 使用位置 | 是否需要 `.value` |
|---------|-----------------|
| Store 內部（setup function 裡面）| 需要（正常 Vue ref 行為） |
| 從 `useXxxStore()` 取得的 store 外部呼叫 | **不需要**（Pinia 自動 unwrap） |
| `storeToRefs()` 解構出來的 ref | 需要（解構後變回純 `Ref`） |

---

## 補充：`storeToRefs()` 的差異

如果用 `storeToRefs()` 解構 store，拿到的是原始的 ref 物件，此時**需要** `.value`：

```typescript
import { storeToRefs } from 'pinia'

const jobsStore = useJobsStore()
const { jobById } = storeToRefs(jobsStore)

// storeToRefs 解構後，jobById 是 ComputedRef，需要 .value
jobById.value(id)
```

直接從 store 存取則不需要：

```typescript
// 直接從 store 存取，Pinia 已 unwrap
jobsStore.jobById(id)
```
