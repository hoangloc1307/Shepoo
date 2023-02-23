import { ComponentStory, ComponentMeta } from '@storybook/react'
import path from 'src/constants/path'
import RegisterLayout from 'src/layouts/RegisterLayout'
import Login from './Login'

export default {
  title: 'Pages/Login',
  component: Login,
} as ComponentMeta<typeof Login>

const Template: ComponentStory<typeof Login> = () => <Login />

export const Primary = Template.bind({})

Primary.story = {
  parameters: {
    reactRouter: {
      routePath: path.login,
    },
  },
}

export const LoginPage: ComponentStory<typeof Login> = () => (
  <RegisterLayout>
    <Login />
  </RegisterLayout>
)
LoginPage.story = {
  parameters: {
    reactRouter: {
      routePath: path.login,
    },
  },
}
