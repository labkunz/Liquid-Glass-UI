# Vue 3 Composables 深度解析：從 useXxx 到模式

Vue 3 的 Composition API 帶來了 Composables，這是目前最強大的邏輯複用機制。但很多人用了很久，還是不清楚「什麼邏輯該抽成 composable」。

## Composable 的核心定義

Composable 是一個使用 Composition API 的函式，用來封裝和複用**有狀態的邏輯**。

關鍵字是「有狀態」——如果你的邏輯不含響應式狀態，普通的工具函式就夠了。

```typescript
// 這不是 composable，是普通工具函式（不含狀態）
function formatDate(date: Date): string {
  return date.toLocaleDateString('zh-TW')
}

// 這是 composable（含響應式狀態）
function useNow() {
  const now = ref(new Date())
  const timer = setInterval(() => {
    now.value = new Date()
  }, 1000)

  // 關鍵：清除副作用
  onUnmounted(() => clearInterval(timer))

  return { now }
}
```

## 副作用清理是必修課

Composable 最容易忘記的事：**副作用一定要清除**。

```typescript
function useEventListener<K extends keyof WindowEventMap>(
  target: EventTarget,
  type: K,
  handler: (event: WindowEventMap[K]) => void
) {
  onMounted(() => {
    target.addEventListener(type, handler as EventListener)
  })

  onUnmounted(() => {
    // ✅ 必須清除，否則元件卸載後 handler 還在記憶體裡
    target.removeEventListener(type, handler as EventListener)
  })
}
```

常見需要清除的副作用：
- `setTimeout` / `setInterval` → `clearTimeout` / `clearInterval`
- `addEventListener` → `removeEventListener`
- WebSocket 連線 → `ws.close()`
- Intersection Observer → `observer.disconnect()`

## 六個常見 Composable 模式

### 1. useXxx（狀態管理）

最基本的形式，封裝相關狀態和方法：

```typescript
function useCounter(initial = 0) {
  const count = ref(initial)
  const increment = () => count.value++
  const decrement = () => count.value--
  const reset = () => (count.value = initial)

  return { count: readonly(count), increment, decrement, reset }
}
```

`readonly()` 很重要——讓外部無法直接改狀態，只能透過 method。

### 2. useAsync（非同步狀態）

```typescript
function useAsync<T>(fn: () => Promise<T>) {
  const data = ref<T | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function execute() {
    loading.value = true
    error.value = null
    try {
      data.value = await fn()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  return { data, loading, error, execute }
}
```

### 3. useModel（雙向綁定）

在 Vue 3.4+ 中，用 `defineModel` 代替，但自訂 composable 場景：

```typescript
function useVModel<T>(
  props: { modelValue: T },
  emit: (event: 'update:modelValue', value: T) => void
) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value),
  })
}
```

### 4. 全域單例 Composable

用模組層的響應式狀態，所有呼叫共享同一個 store：

```typescript
// 模組層定義（只初始化一次）
const toastStore = reactive<{ items: Toast[] }>({ items: [] })

export function useToast() {
  // 所有呼叫共享同一個 toastStore
  function add(message: string) {
    toastStore.items.push({ id: Date.now().toString(), message })
  }
  return { toasts: readonly(toastStore.items), add }
}
```

這個模式不需要 Provide/Inject，也不需要 Pinia，適合輕量全域狀態。

### 5. 延遲初始化 Composable

```typescript
function useLazyRef<T>(factory: () => T) {
  let initialized = false
  let value: T

  return computed(() => {
    if (!initialized) {
      value = factory()
      initialized = true
    }
    return value
  })
}
```

### 6. 可配置 Composable

```typescript
interface UseLocalStorageOptions<T> {
  serializer?: (value: T) => string
  deserializer?: (value: string) => T
}

function useLocalStorage<T>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {}
) {
  const { serializer = JSON.stringify, deserializer = JSON.parse } = options

  const stored = localStorage.getItem(key)
  const state = ref<T>(stored ? deserializer(stored) : defaultValue)

  watch(state, (newValue) => {
    localStorage.setItem(key, serializer(newValue as T))
  }, { deep: true })

  return state
}
```

## 什麼時候不要用 Composable？

- **純計算邏輯**：不含響應式，用普通函式
- **元件特定邏輯**：只有一個元件用到，直接在 `<script setup>` 裡寫
- **太細碎的拆分**：`useIsTrue`、`useCount` 這種拆法反而增加複雜度

## 命名規範

- 必須以 `use` 開頭（Vue 的官方慣例）
- 名詞化：`useModal` 好過 `useOpenModal`
- 回傳 object（不是 array），方便解構時重命名

```typescript
// ✅ 好
const { isOpen, open, close } = useModal()
const { isOpen: isSettingsOpen } = useModal() // 重命名不衝突

// ❌ 差（array 解構順序固定）
const [isOpen, open, close] = useModal()
```

Composables 是 Vue 3 最值得深入的特性。掌握這些模式，你的元件程式碼會清晰十倍。
