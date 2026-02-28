import { describe, it, expect, afterEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import Modal from './Modal.vue'

describe('Modal', () => {
    let wrapper: VueWrapper | null = null

    afterEach(() => {
        if (wrapper) {
            wrapper.unmount()
            wrapper = null
        }
        // 清理 DOM
        document.body.innerHTML = ''
    })

    // 測試 1: Props，title資料帶入後，可以在Modal裡面看到該文字
    it('Props正確顯示-title', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test Modal Title'
            },
            attachTo: document.body
        })

        const titleElement = document.querySelector('h3')
        expect(titleElement).toBeTruthy()
        expect(titleElement?.textContent).toBe('Test Modal Title')
    })

    // 測試 2: Props，variant資料帶入後，可以確保Modal的Class有正常替換
    it('Props正確顯示-variant', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                variant: 'glass-css-only'
            },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        expect(modal).toBeTruthy()

        const classes = modal?.getAttribute('class')
        expect(classes).toBeDefined()
        // CSS Module 會將 'glass-css-only' 轉成 camelCase 'GlassCssOnly'
        expect(classes).toContain('GlassCssOnly')
    })

    // 測試 3: Props，title帶入空字串，showClose帶入false，渲染後會沒有header區段
    it('Props-title空字串且showClose為false，無header區段', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: '',
                showClose: false
            },
            attachTo: document.body
        })

        const titleElement = document.querySelector('h3')
        const closeButton = document.querySelector('button[aria-label="Close"]')

        expect(titleElement).toBeNull()
        expect(closeButton).toBeNull()
    })

    // 測試 4: Props，title帶入空字串，showClose使用預設值，渲染後不會有Title區段
    it('Props-title空字串且showClose預設值，有header但無title', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: ''
            },
            attachTo: document.body
        })

        const closeButton = document.querySelector('button[aria-label="Close"]')
        const titleElement = document.querySelector('h3')

        expect(closeButton).toBeTruthy()
        expect(titleElement).toBeNull()
    })

    // 測試 5: Props，title帶入測試文字，showClose帶入false，渲染後不會有close button
    it('Props-title有值且showClose為false，無close button', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test Title',
                showClose: false
            },
            attachTo: document.body
        })

        const closeButton = document.querySelector('button[aria-label="Close"]')
        const titleElement = document.querySelector('h3')

        expect(titleElement).toBeTruthy()
        expect(titleElement?.textContent).toBe('Test Title')
        expect(closeButton).toBeNull()
    })

    // 測試 6: Props使用預設資料，預設渲染後，當沒有執行動作時看不到Modal元件
    it('Props預設資料-預設不顯示Modal', () => {
        wrapper = mount(Modal, {
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        expect(modal).toBeNull()
    })

    // 測試 7: Props使用預設資料，使用slot機制帶入content內容
    it('Slot-預設slot顯示內容', () => {
        wrapper = mount(Modal, {
            props: { modelValue: true },
            slots: {
                default: '<p>Test Content</p>'
            },
            attachTo: document.body
        })

        const content = document.querySelector('p')
        expect(content).toBeTruthy()
        expect(content?.textContent).toBe('Test Content')
    })

    // 測試 8: Props使用預設資料，使用slot機制，並加上slot name=footer，要顯示出footer區段
    it('Slot-footer slot顯示footer區段', () => {
        wrapper = mount(Modal, {
            props: { modelValue: true },
            slots: {
                default: '<p>Body Content</p>',
                footer: '<button>Confirm</button>'
            },
            attachTo: document.body
        })

        const bodyContent = document.querySelector('p')
        const buttons = document.querySelectorAll('button')

        expect(bodyContent?.textContent).toBe('Body Content')
        // 應該有 2 個按鈕：close button 和 footer 的 Confirm button
        expect(buttons.length).toBeGreaterThanOrEqual(1)

        const confirmButton = Array.from(buttons).find(btn => btn.textContent === 'Confirm')
        expect(confirmButton).toBeTruthy()
    })

    // 測試 9: Props使用預設資料，使用slot機制，並加上slot name=header，不會影響到Modal的渲染區段
    it('Slot-不存在的header slot不影響渲染', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test Title'
            },
            slots: {
                default: '<p>Content</p>',
                header: '<div>Custom Header</div>'
            },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        const content = document.querySelector('p')
        const title = document.querySelector('h3')

        expect(modal).toBeTruthy()
        expect(content?.textContent).toBe('Content')
        expect(title?.textContent).toBe('Test Title')
        expect(document.body.innerHTML).not.toContain('Custom Header')
    })

    // 測試 10: v-model綁定測試：渲染後點擊關閉按鈕，確保有讓emit update:modelValue接收變化
    it('v-model-點擊關閉按鈕emit update:modelValue', async () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                showClose: true
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

    // 測試 11: handleOverlayClick測試：點擊外面的Overlay，要可以正確的觸發close行為
    it('handleOverlayClick-點擊overlay關閉Modal', async () => {
        wrapper = mount(Modal, {
            props: { modelValue: true },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        expect(modal).toBeTruthy()

        // 找到 overlay (modal 的父元素)
        const overlay = modal?.parentElement
        expect(overlay).toBeTruthy()

        // 模擬點擊 overlay
        if (overlay) {
            const clickEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window
            })

            // 設置 target 和 currentTarget 為同一個元素（模擬點擊 overlay 本身）
            Object.defineProperty(clickEvent, 'target', { value: overlay, enumerable: true })
            Object.defineProperty(clickEvent, 'currentTarget', { value: overlay, enumerable: true })

            overlay.dispatchEvent(clickEvent)
            await wrapper.vm.$nextTick()

            expect(wrapper.emitted('update:modelValue')).toBeDefined()
            expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
        }
    })

    // 測試 12: handleOverlayClick測試：點擊Modal內部的內容，除了close button以外都不會關閉Modal
    it('handleOverlayClick-點擊Modal內部不關閉', async () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test'
            },
            slots: {
                default: '<p>Content</p>'
            },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]') as HTMLElement
        expect(modal).toBeTruthy()

        // 點擊 modal 內部
        modal.click()
        await wrapper.vm.$nextTick()

        // 應該沒有 emit 事件
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()
    })

    // 測試 13: 邊界狀況-如果沒有使用slot，渲染出來後應該是沒有內容的Modal
    it('邊界狀況-無slot內容', () => {
        wrapper = mount(Modal, {
            props: { modelValue: true },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        expect(modal).toBeTruthy()
    })

    // 測試 14: 邊界狀況-如果Props，modelValue設定true，渲染後會直接彈出Modal
    it('邊界狀況-modelValue初始為true直接顯示', () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                title: 'Test Modal'
            },
            attachTo: document.body
        })

        const modal = document.querySelector('[role="dialog"]')
        const title = document.querySelector('h3')

        expect(modal).toBeTruthy()
        expect(title?.textContent).toBe('Test Modal')
    })

    // 測試 15: 邊界狀況-渲染Modal後，先點擊close，再點擊開啟的button，要可以看到Modal
    it('邊界狀況-關閉後重新開啟', async () => {
        wrapper = mount(Modal, {
            props: {
                modelValue: true,
                showClose: true
            },
            attachTo: document.body
        })

        // 確認初始狀態：Modal 顯示
        expect(document.querySelector('[role="dialog"]')).toBeTruthy()

        // 點擊關閉按鈕
        const closeButton = document.querySelector('button[aria-label="Close"]') as HTMLButtonElement
        closeButton.click()
        await wrapper.vm.$nextTick()

        // 確認有 emit 關閉事件
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])

        // 模擬父元件更新 props (關閉)
        await wrapper.setProps({ modelValue: false })
        await wrapper.vm.$nextTick()
        expect(document.querySelector('[role="dialog"]')).toBeNull()

        // 模擬父元件更新 props (重新開啟)
        await wrapper.setProps({ modelValue: true })
        await wrapper.vm.$nextTick()
        expect(document.querySelector('[role="dialog"]')).toBeTruthy()
    })
})
