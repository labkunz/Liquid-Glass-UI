import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Input from './Input.vue'

describe('Input', () => {
    it('Props正確顯示-placeholder', () => {
        const wrapper = mount(Input, {
            props: { placeholder: 'Display placeholder' }
        })
        // 所以要改成先找到元素後直接確認value
        const input = wrapper.find('input')
        expect(input.attributes('placeholder')).toBe('Display placeholder')
        // // 這邊文字內容我猜指的是inner.HTML，而placeholder是屬於HTML屬性，這樣寫沒辦法測
        // expect(wrapper.text()).toContain('Display placeholder')
    })

    it('Props正確顯示-modelValue', () => {
        const wrapper = mount(Input, {
            props: { modelValue: 'Display modelValue' }
        })
        const input = wrapper.find('input')

        const value = (input.element as HTMLInputElement).value

        expect(value).toBe('Display modelValue')
    })

    it('v-model-emit事件', async () => {
        const wrapper = mount(Input)

        await wrapper.find('input').setValue('hello')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
        // // 從emitted這邊取到的會是陣列，而不會是字串
        // expect(wrapper.emitted('update:modelValue')).toEqual('hello')
    })

    it('v-model-通知父元件', async () => {
        // 1️⃣ mount 元件，設定初始值
        const wrapper = mount(Input, {
            props: { modelValue: 'initial' }
        })
        
        const input = wrapper.find('input')
        
        // 2️⃣ 驗證初始狀態（父 → 子）
        expect((input.element as HTMLInputElement).value).toBe('initial')
        
        // 3️⃣ 使用者輸入新值（子 → 父）
        await input.setValue('hello')
        
        // 4️⃣ 驗證有 emit 事件
        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
        
        // 5️⃣ 模擬父元件接收到 emit 後更新 props
        await wrapper.setProps({ modelValue: 'hello' })
        
        // 6️⃣ 驗證 UI 已同步（完整的雙向綁定流程）
        expect((input.element as HTMLInputElement).value).toBe('hello')
    })

    it('表單狀態-disabled狀態', async () => {
        const wrapper = mount(Input, {
            props: { disabled: true }
        })

        const input = wrapper.find('input')

        // 第一次驗證
        expect(input.attributes('disabled')).toBeDefined()

        await input.setValue('hello')

        // 第二次驗證
        expect(wrapper.emitted('update:modelValue')).toBeUndefined()

        // // 而且需要double確認是否先有設定好disabled狀態
        // await wrapper.find('input').setValue('hello')
        // // 這邊不能使用input，而是要改成update:modelValue
        // expect(wrapper.emitted('input')).toBeUndefined()
        // expect(wrapper.attributes('disabled'))
    })

    it('表單狀態-不同狀態設定，focus email', () => {
        const wrapper = mount(Input, {
            props: { type: 'email' }
        })
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('email')
        // // 所以這邊應該要先找input元素
        // expect(wrapper.attributes('type')).toBe('email')
    })

    it('表單狀態-不同狀態設定，focus text', () => {
        const wrapper = mount(Input, {
            props: { type: 'text' }
        })
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('text')
        // expect(wrapper.attributes('type')).toBe('text')
    })

    it('表單狀態-不同狀態設定，focus password', () => {
        const wrapper = mount(Input, {
            props: { type: 'password' }
        })
        const input = wrapper.find('input')
        expect(input.attributes('type')).toBe('password')
        // expect(wrapper.attributes('type')).toBe('password')
    })

    it('邊界情況-傳入空字串', async () => {
        const wrapper = mount(Input, {
            props: { 
                modelValue: '',
                placeholder: 'Please input text'
            }
        })
        const input = wrapper.find('input')
        const value = (input.element as HTMLInputElement).value

        expect(value).toBe('')
        expect(input.attributes('placeholder')).toBe('Please input text')

        await input.setValue('w')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['w'])
    })

    it('邊界情況-有值更改成空值，emit的狀態', async () => {
        const wrapper = mount(Input, {
            props: { modelValue: 'initial value' }
        })
        const input = wrapper.find('input')

        await input.setValue('')

        expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
    })
})