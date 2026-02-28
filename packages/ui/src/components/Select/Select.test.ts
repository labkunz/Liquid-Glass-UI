import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Select from './Select.vue'
import type { SelectOption } from './types'

describe('Select', () => {
  const mockOptions: SelectOption[] = [
    { value: 'option1', label: '選項 1' },
    { value: 'option2', label: '選項 2' },
    { value: 'option3', label: '選項 3' },
  ]

  const mockOptionsWithDisabled: SelectOption[] = [
    { value: 'option1', label: '選項 1' },
    { value: 'option2', label: '選項 2', disabled: true },
    { value: 'option3', label: '選項 3' },
  ]

  it('Placeholder-預設顯示正常', () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: '請選擇選項',
        options: mockOptions,
      },
    })

    const trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('請選擇選項')
  })

  it('Placeholder-選取值後消失，替換為選取值', async () => {
    const wrapper = mount(Select, {
      props: {
        placeholder: '請選擇選項',
        options: mockOptions,
        modelValue: null,
      },
    })

    // 驗證初始狀態顯示 placeholder
    let trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('請選擇選項')

    // 模擬選擇一個選項
    await wrapper.setProps({ modelValue: 'option1' })

    // 驗證顯示選取的選項 label
    trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('選項 1')
    expect(trigger.text()).not.toContain('請選擇選項')
  })

  it('Disabled-有發揮功效', async () => {
    const wrapper = mount(Select, {
      props: {
        disabled: true,
        options: mockOptions,
      },
    })

    const trigger = wrapper.find('button[type="button"]')

    // 驗證 button 有 disabled 屬性
    expect(trigger.attributes('disabled')).toBeDefined()

    // 嘗試點擊，應該不會開啟下拉選單
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 驗證沒有選項按鈕出現（下拉選單未開啟）
    const optionButtons = wrapper.findAll('button[type="button"]')
    // 只有觸發按鈕，沒有選項按鈕
    expect(optionButtons.length).toBe(1)
  })

  it('Options-確認有props傳入的資料並正常渲染', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
    })

    // 點擊開啟下拉選單
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 獲取所有按鈕（包含觸發按鈕和選項按鈕）
    const allButtons = wrapper.findAll('button[type="button"]')
    // 第一個是觸發按鈕，後面是選項按鈕
    const optionButtons = allButtons.slice(1)

    // 驗證選項數量
    expect(optionButtons.length).toBe(mockOptions.length)

    // 驗證每個選項的文字內容
    optionButtons.forEach((button, index) => {
      expect(button.text()).toBe(mockOptions[index].label)
    })
  })

  it('點擊Select-確保option會出現', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
    })

    // 初始狀態：下拉選單未開啟
    let allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1) // 只有觸發按鈕

    // 點擊觸發按鈕
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 驗證下拉選單已開啟
    allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1 + mockOptions.length) // 觸發按鈕 + 選項按鈕
  })

  it('Option出現後-點擊外部確保option關閉', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
      attachTo: document.body, // 必須掛載到 document 才能測試外部點擊
    })

    // 開啟下拉選單
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 驗證下拉選單已開啟
    let allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1 + mockOptions.length)

    // 模擬點擊外部（點擊 document.body）
    const clickEvent = new MouseEvent('click', { bubbles: true })
    document.body.dispatchEvent(clickEvent)
    await wrapper.vm.$nextTick()

    // 驗證下拉選單已關閉
    allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1) // 只剩觸發按鈕

    wrapper.unmount()
  })

  it('Option出現後-點擊Esc鍵確保option關閉', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
      },
    })

    // 開啟下拉選單
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 驗證下拉選單已開啟
    let allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1 + mockOptions.length)

    // 模擬按下 Esc 鍵
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape', bubbles: true })
    document.dispatchEvent(escEvent)
    await wrapper.vm.$nextTick()

    // 驗證下拉選單已關閉
    allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1) // 只剩觸發按鈕
  })

  it('v-model連動測試-確保父元件有抓到值', async () => {
    // 1️⃣ mount 元件，設定初始值
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
        modelValue: null,
      },
    })

    // 2️⃣ 驗證初始狀態（父 → 子）
    let trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('請選擇...')

    // 3️⃣ 開啟下拉選單並選擇選項（子 → 父）
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    const allButtons = wrapper.findAll('button[type="button"]')
    const firstOption = allButtons[1] // 第一個選項按鈕
    await firstOption.trigger('click')
    await wrapper.vm.$nextTick()

    // 4️⃣ 驗證有 emit 事件
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])

    // 5️⃣ 模擬父元件接收到 emit 後更新 props
    await wrapper.setProps({ modelValue: 'option1' })

    // 6️⃣ 驗證 UI 已同步（完整的雙向綁定流程）
    trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('選項 1')
  })

  it('Option為空陣列-選單不會有任何選項', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [],
      },
    })

    // 點擊開啟下拉選單
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 驗證只有觸發按鈕，沒有選項按鈕
    const allButtons = wrapper.findAll('button[type="button"]')
    expect(allButtons.length).toBe(1)
  })

  it('已選擇一個值後-再選擇另一個值可以正常更替', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptions,
        modelValue: 'option1',
      },
    })

    // 1️⃣ 驗證初始選中第一個選項
    let trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('選項 1')

    // 2️⃣ 開啟下拉選單
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 3️⃣ 選擇第二個選項
    const allButtons = wrapper.findAll('button[type="button"]')
    const secondOption = allButtons[2] // 第二個選項按鈕
    await secondOption.trigger('click')
    await wrapper.vm.$nextTick()

    // 4️⃣ 驗證有 emit 新的值
    const emitted = wrapper.emitted('update:modelValue')
    expect(emitted?.[0]).toEqual(['option2'])

    // 5️⃣ 模擬父元件更新 props
    await wrapper.setProps({ modelValue: 'option2' })

    // 6️⃣ 驗證 UI 已更新為第二個選項
    trigger = wrapper.find('button[type="button"]')
    expect(trigger.text()).toContain('選項 2')
    expect(trigger.text()).not.toContain('選項 1')
  })

  it('個別選項Disabled-無法被選取', async () => {
    const wrapper = mount(Select, {
      props: {
        options: mockOptionsWithDisabled,
        modelValue: null,
      },
    })

    // 1️⃣ 開啟下拉選單
    const trigger = wrapper.find('button[type="button"]')
    await trigger.trigger('click')
    await wrapper.vm.$nextTick()

    // 2️⃣ 獲取所有選項按鈕
    const allButtons = wrapper.findAll('button[type="button"]')
    const disabledOption = allButtons[2] // 第二個選項（option2，disabled: true）

    // 3️⃣ 驗證該選項有 disabled 屬性
    expect(disabledOption.attributes('disabled')).toBeDefined()

    // 4️⃣ 嘗試點擊 disabled 選項
    await disabledOption.trigger('click')
    await wrapper.vm.$nextTick()

    // 5️⃣ 驗證沒有觸發 update:modelValue
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    // 6️⃣ 驗證選單仍然保持開啟（因為選取失敗）
    const allButtonsAfterClick = wrapper.findAll('button[type="button"]')
    expect(allButtonsAfterClick.length).toBe(1 + mockOptionsWithDisabled.length) // 選單仍開啟

    // 7️⃣ 驗證可以選取非 disabled 的選項
    const enabledOption = allButtons[1] // 第一個選項（option1，沒有 disabled）
    await enabledOption.trigger('click')
    await wrapper.vm.$nextTick()

    // 8️⃣ 驗證這次有成功 emit
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['option1'])
  })
})
