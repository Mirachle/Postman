import { mount } from '@vue/test-utils'
import InputUrl from '../src/components/Input/InputUrl.vue'

describe('InputUrl', () => {
    // Now mount the component and you have the wrapper
    const wrapper = mount(InputUrl)
    wrapper.setData({value: 'sajt'})
    const value = wrapper.find('input').element.value
    it('Szoveg egyezes', () => {
        expect(value).toMatch('sajt')
    })
})