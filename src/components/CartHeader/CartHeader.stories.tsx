import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
import CartHeader from './CartHeader'

export default {
  title: 'Components/CartHeader',
  component: CartHeader,
} as ComponentMeta<typeof CartHeader>

const Template: ComponentStory<typeof CartHeader> = args => <CartHeader />

export const Primary = Template.bind({})
