import { describe, it, expect, afterEach, vi, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Toast from './Toast.vue'

describe('Toast', () => {
    let wrapper: VueWrapper | null = null

    beforeEach(() => {
        // 啟用 fake timers
        vi.useFakeTimers()
    })

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
            wrapper = null
        }
        // 清理 DOM
        document.body.innerHTML = ''
        // 清理所有 timers
        vi.clearAllTimers()
        vi.useRealTimers()
    })

    // 測試情境 6: v-model綁定，使用duration預設值，等到實際時間到後，會成功觸發emit update:modelValue，並讓modelValue有對應更新，結果應該是正常關閉
    it('v-model綁定-duration到期後自動關閉', async () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast',
                duration: 3000 // 預設值 3000ms
            },
            attachTo: document.body
        })

        // 確認 Toast 已顯示
        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        // 確認初始沒有 emit 事件
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        // 模擬時間流逝 3000ms
        vi.advanceTimersByTime(3000)
        await wrapper.vm.$nextTick()

        // 確認有觸發 emit update:modelValue 且值為 false
        expect(wrapper.emitted('update:modelValue')).toBeDefined()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

        // 模擬父元件更新 props (關閉)
        await wrapper.setProps({ modelValue: false })
        await wrapper.vm.$nextTick()

        // 確認 Toast 已消失
        const toastAfterClose = document.querySelector('[role="alert"]')
        expect(toastAfterClose).toBeNull()
    })

    // 測試情境 6-2: v-model綁定，透過 setProps 開啟Toast後，應該會自動關閉（這會揭露 onMounted 只執行一次的 bug）
    it('v-model綁定-透過setProps開啟Toast後會自動關閉', async () => {
        // 先渲染一個關閉狀態的 Toast（模擬實際使用場景）
        wrapper = mount(Toast, {
            props: {
                modelValue: false,
                message: 'Test Toast',
                duration: 3000
            },
            attachTo: document.body
        })

        // 確認 Toast 未顯示
        expect(document.querySelector('[role="alert"]')).toBeNull()

        // 透過 setProps 開啟 Toast（模擬使用者點擊按鈕觸發顯示）
        await wrapper.setProps({ modelValue: true })
        await wrapper.vm.$nextTick()

        // 確認 Toast 已顯示
        expect(document.querySelector('[role="alert"]')).toBeTruthy()

        // 模擬時間流逝 3000ms，Toast 應該自動關閉
        vi.advanceTimersByTime(3000)
        await wrapper.vm.$nextTick()

        // ✅ 修正後通過！使用 watch 監聽 modelValue 變化
        expect(wrapper.emitted('update:modelValue')).toBeDefined()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    // 測試情境 1: Props，variant帶入其他值，確保Toast會去做到替換效果
    it('Props正確顯示-variant', () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                variant: 'glass-css-only'
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        const classes = toast?.getAttribute('class')
        expect(classes).toBeDefined()
        // CSS Module 會將 'glass-css-only' 轉成 camelCase 'GlassCssOnly'
        expect(classes).toContain('GlassCssOnly')
    })

    // 測試情境 2: Props，type帶入其他值，確保Toast的icon會做相對應的變化
    it('Props正確顯示-type變化對應icon', () => {
        // 測試 success icon
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                type: 'success'
            },
            attachTo: document.body
        })

        let toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        // 檢查 success icon 存在（檢查特定的 path）
        let svg = toast?.querySelector('svg')
        expect(svg).toBeTruthy()
        let path = svg?.querySelector('path[d*="L6 12L14 4"]') // success icon 的特徵路徑
        expect(path).toBeTruthy()

        // 測試 error icon
        wrapper.unmount()
        document.body.innerHTML = ''

        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                type: 'error'
            },
            attachTo: document.body
        })

        toast = document.querySelector('[role="alert"]')
        svg = toast?.querySelector('svg')
        path = svg?.querySelector('path[d*="L13 13M13 3L3 13"]') // error icon 的特徵路徑
        expect(path).toBeTruthy()

        // 測試 warning icon
        wrapper.unmount()
        document.body.innerHTML = ''

        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                type: 'warning'
            },
            attachTo: document.body
        })

        toast = document.querySelector('[role="alert"]')
        svg = toast?.querySelector('svg')
        path = svg?.querySelector('path[d*="L14 13H2L8 3Z"]') // warning icon 的特徵路徑
        expect(path).toBeTruthy()
    })

    // 測試情境 3: Props，使用預設值，確保一開始Toast不會渲染出來
    it('Props預設資料-預設不顯示Toast', () => {
        wrapper = mount(Toast, {
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeNull()
    })

    // 測試情境 4: Props，message帶入文字，確保Toast有文字內容
    it('Props正確顯示-message', () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast Message'
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()
        expect(toast?.textContent).toContain('Test Toast Message')
    })

    // 測試情境 5: v-model綁定，確保點擊close，會成功觸發emit update:modelValue，並讓modelValue有對應更新
    it('v-model-點擊關閉按鈕emit update:modelValue', async () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast'
            },
            attachTo: document.body
        })

        const closeButton = document.querySelector('button[aria-label="Close"]') as HTMLButtonElement
        expect(closeButton).toBeTruthy()

        closeButton.click()
        await wrapper.vm.$nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeDefined()
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
    })

    // 測試情境 7: 邊界情況，Props，duration帶入0，讓Toast不會自動消失
    it('邊界狀況-duration為0不自動關閉', async () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast',
                duration: 0
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        // 模擬時間流逝很久
        vi.advanceTimersByTime(10000)
        await wrapper.vm.$nextTick()

        // Toast 不應該自動關閉
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
        expect(document.querySelector('[role="alert"]')).toBeTruthy()
    })

    // 測試情境 8: Props，modalValue帶入true，讓Toast一渲染後就直接出現
    it('邊界狀況-modelValue初始為true直接顯示', () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast'
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()
        expect(toast?.textContent).toContain('Test Toast')
    })

    // 測試情境 9: 邊界情況，Props，type帶入其他值，會讓icon呈現info樣式
    it('邊界狀況-type無效值顯示info icon', () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                type: 'info' // 預設為 info
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        // 檢查 info icon 存在（circle + path 組合）
        const svg = toast?.querySelector('svg')
        expect(svg).toBeTruthy()
        const circle = svg?.querySelector('circle[cx="8"][cy="8"][r="6"]')
        expect(circle).toBeTruthy()
    })

    // 測試情境 10: Props，使用預設值，點擊close以外的地方，不會關閉Toast
    it('點擊Toast本體不關閉', async () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast'
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]') as HTMLElement
        expect(toast).toBeTruthy()

        // 點擊 Toast 本體
        toast.click()
        await wrapper.vm.$nextTick()

        // 應該沒有 emit 事件
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    // 測試情境 11: 邊界情況，未在setTimeout完成倒數前關閉，要讓Toast消失，也要確保setTimeout可以直接clear
    it('邊界狀況-手動關閉前清除timer', async () => {
        wrapper = mount(Toast, {
            props: {
                modelValue: true,
                message: 'Test Toast',
                duration: 3000
            },
            attachTo: document.body
        })

        const toast = document.querySelector('[role="alert"]')
        expect(toast).toBeTruthy()

        // 在自動關閉前（只過 1000ms），手動點擊關閉
        vi.advanceTimersByTime(1000)
        await wrapper.vm.$nextTick()

        const closeButton = document.querySelector('button[aria-label="Close"]') as HTMLButtonElement
        closeButton.click()
        await wrapper.vm.$nextTick()

        // 確認有觸發手動關閉
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

        // 記錄當前 emit 的次數
        const emitCountBeforeTimer = wrapper.emitted('update:modelValue')?.length || 0
        expect(emitCountBeforeTimer).toBe(1)

        // 模擬父元件響應關閉
        await wrapper.setProps({ modelValue: false })
        await wrapper.vm.$nextTick()

        // 繼續時間流逝，超過原本的 duration
        vi.advanceTimersByTime(3000)
        await wrapper.vm.$nextTick()

        // 不應該再次觸發 emit（因為 timer 已被清除）
        const emitCountAfterTimer = wrapper.emitted('update:modelValue')?.length || 0
        expect(emitCountAfterTimer).toBe(emitCountBeforeTimer) // 次數應該保持不變
    })
})
