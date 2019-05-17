import { mount } from '@vue/test-utils'
import InputRow from '../src/components/Input/InputRow.vue'

describe('InputRow', () => {
    // Now mount the component and you have the wrapper
    const wrapper = mount(InputRow)
    //wrapper.setData({value: 'sajt'})
    //const value = wrapper.find('input').element.value
    it('alap adat', () => {
      expect(wrapper.vm.color).toBe("")
      expect(wrapper.vm.disable).toBe(true)
    })
    it('rossz url', () => {
      wrapper.vm.urlChanged("rossz")
      expect(wrapper.vm.color).toBe("red-color")
      expect(wrapper.vm.disable).toBe(true)
    })
    it('jó url', () => {
      wrapper.vm.urlChanged('https://jsonplaceholder.typicode.com/posts')
      expect(wrapper.vm.color).toBe("")
      expect(wrapper.vm.disable).toBe(false)
    })
})
