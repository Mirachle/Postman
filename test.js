import { mount } from '@vue/test-utils'
import { shallowMount } from '@vue/test-utils'
import InputRow from '@/components/Input/InputRow'
import InputUrl from '@/components/Input/InputUrl'
import { exportAllDeclaration } from '@babel/types';

describe('InputRow', () => {
  const wrapper = shallowMount(InputUrl)
  wrapper.setData({value='test'})
  const value = wrapper.find('input').element.value

  it('urlChanged validation test', () => {
    expect(value).toMatch('test')
  })

})
