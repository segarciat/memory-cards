import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoryCard from '../MemoryCard.vue'

describe('MemoryCard', () => {
  const commonProps = {
    backCard: { name: 'back of card', href: './card_back.png' },
    frontCard: { name: 'ace of spades', href: './card_spades_A.png' },
    isRevealed: false,
    isMatched: false,
    isMismatched: false,
  }

  it('can be clicked by default', () => {
    const wrapper = mount(MemoryCard, {
      props: {
        ...commonProps,
      },
      attachTo: document.body,
    })

    wrapper.get('button').trigger('click')

    expect(wrapper.emitted()).toHaveProperty('click')
  })

  it('cannot be clicked when already matched', () => {
    const wrapper = mount(MemoryCard, {
      props: {
        ...commonProps,
        isMatched: true,
      },
      attachTo: document.body,
    })

    wrapper.get('button').trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('click')
  })

  it('cannot be clicked when revealed', () => {
    const wrapper = mount(MemoryCard, {
      props: {
        ...commonProps,
        isRevealed: true,
      },
      attachTo: document.body,
    })

    wrapper.get('button').trigger('click')

    expect(wrapper.emitted()).not.toHaveProperty('click')
  })
})
