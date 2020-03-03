
import Vue from 'vue'
import { expect } from 'chai'
import counter from '../../components/counter.vue'
import {mount} from 'vue-test-utils'

describe('counter.vue', () => {
  const wrapper = mount(counter);
  it('使用Vue-test-Utils: 正确渲染h3的文字为Counter.vue', () => {
    expect(wrapper.find('h3').text()).to.equal('Counter.vue');

  }),
   it('has a button', () => {
        expect(wrapper.contains('button')).to.equal(true);
      })
})