# TypeScript 進階型別技巧：工具型別的實戰應用

`Partial<T>`、`Pick<K>`、`Omit<K>` 大家都會，但 TypeScript 的型別系統遠不止於此。這篇文章介紹在實際開發中真正有用的進階型別技巧。

## Conditional Types（條件型別）

條件型別讓型別有了「if-else」能力：

```typescript
type IsArray<T> = T extends any[] ? true : false

type A = IsArray<string[]>  // true
type B = IsArray<string>    // false
```

### 實際應用：根據泛型決定回傳型別

```typescript
// 如果是陣列就 Flatten，否則維持原型別
type Flatten<T> = T extends Array<infer Item> ? Item : T

type Str = Flatten<string[]>    // string
type Num = Flatten<number>      // number
type Obj = Flatten<{ a: 1 }[]>  // { a: 1 }
```

## Infer：從型別中提取

`infer` 只能在 `extends` 條件中使用，用來「推斷並命名」型別中的某個部分：

```typescript
// 提取 Promise 的解析型別
type Awaited<T> = T extends Promise<infer U> ? Awaited<U> : T

type A = Awaited<Promise<string>>         // string
type B = Awaited<Promise<Promise<number>>> // number

// 提取函式的回傳型別（這就是內建的 ReturnType<T>）
type MyReturnType<T> = T extends (...args: any[]) => infer R ? R : never

type Fn = (x: number) => string
type R = MyReturnType<Fn>  // string
```

## Template Literal Types

TypeScript 4.1 加入的強大功能，讓字串型別可以有「結構」：

```typescript
type EventName = 'click' | 'focus' | 'blur'
type HandlerName = `on${Capitalize<EventName>}`
// 'onClick' | 'onFocus' | 'onBlur'

// 實際應用：自動產生 CSS 變數名稱
type ColorName = 'primary' | 'secondary' | 'danger'
type CSSVar = `--liquid-color-${ColorName}`
// '--liquid-color-primary' | '--liquid-color-secondary' | '--liquid-color-danger'
```

## Mapped Types + Template Literal Types 組合技

```typescript
// 把物件所有 value 型別改為 getter
type Getters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K]
}

interface Store {
  count: number
  name: string
}

type StoreGetters = Getters<Store>
// {
//   getCount: () => number
//   getName: () => string
// }
```

## DeepPartial（深度可選）

內建的 `Partial<T>` 只淺層處理，對嵌套物件無效：

```typescript
type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K]
}

interface Config {
  server: {
    host: string
    port: number
  }
  database: {
    url: string
  }
}

type PartialConfig = DeepPartial<Config>
// server.host 變成可選
// server 本身也變成可選
```

## Discriminated Unions（標籤聯合）

這是 TypeScript 最實用的模式之一：

```typescript
type ApiResult<T> =
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }
  | { status: 'loading' }

function processResult<T>(result: ApiResult<T>) {
  // TypeScript 在 switch 中自動 narrow 型別
  switch (result.status) {
    case 'success':
      console.log(result.data)  // TypeScript 知道 data 存在
      break
    case 'error':
      console.log(result.error) // TypeScript 知道 error 存在
      break
    case 'loading':
      // TypeScript 知道這裡只有 status
      break
  }
}
```

## Utility Types 組合應用

真實世界的型別往往需要多個工具型別組合：

```typescript
interface User {
  id: number
  name: string
  email: string
  password: string
  createdAt: Date
}

// 建立 User 時不包含系統產生的欄位
type CreateUserInput = Omit<User, 'id' | 'createdAt'>

// 更新 User 時所有欄位都是可選的（但 id 必填）
type UpdateUserInput = Pick<User, 'id'> & Partial<Omit<User, 'id' | 'createdAt'>>

// API 回應中隱藏密碼
type PublicUser = Omit<User, 'password'>
```

## 型別守衛（Type Guard）

```typescript
function isString(value: unknown): value is string {
  return typeof value === 'string'
}

function isUser(value: unknown): value is User {
  return (
    typeof value === 'object' &&
    value !== null &&
    'id' in value &&
    'name' in value
  )
}

// 使用：
const input: unknown = fetchUser()
if (isUser(input)) {
  console.log(input.name) // TypeScript 知道是 User
}
```

## 小結

TypeScript 型別系統的進階功能讓你可以：
1. 用 **Conditional Types** 寫型別層面的邏輯
2. 用 **Infer** 從已知型別提取資訊
3. 用 **Template Literal Types** 自動衍生字串型別
4. 用 **Discriminated Unions** 安全處理多種狀態

掌握這些技巧，你寫的型別會從「能過編譯」進化到「真正保護程式碼」。
