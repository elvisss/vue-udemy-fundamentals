import { shallowMount } from '@vue/test-utils'
import Counter from '@/components/Counter'

describe('Counter', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(Counter)
    expect(wrapper.html()).toMatchSnapshot()
  })

  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Counter)
  })

  it('h2 should render "Counter"', () => {
    const h2 = wrapper.find('h2')
    expect(h2.exists()).toBeTruthy()
    expect(h2.text()).toBe('Counter')
  })

  it('p should render 100', () => {
    const p = wrapper.find('p')
    expect(p.exists()).toBeTruthy()
    expect(p.text()).toContain('100')
  })

  it('should increase by 1', async () => {
    const btnIncrease = wrapper.find('button')
    await btnIncrease.trigger('click')
    const p = wrapper.find('p')
    expect(p.exists()).toBeTruthy()
    expect(p.text()).toContain('101')
  })

  it('should decrease by 2', async () => {
    const btnDecrease = wrapper.findAll('button')[1]
    await btnDecrease.trigger('click')
    await btnDecrease.trigger('click')
    const p = wrapper.find('p')
    expect(p.exists()).toBeTruthy()
    expect(p.text()).toContain('98')
  })

  it('should set default value', () => {
    const { start } = wrapper.props()
    const p = wrapper.find('p')
    expect(p.exists()).toBeTruthy()
    expect(p.text()).toContain(String(start))
  })
})
