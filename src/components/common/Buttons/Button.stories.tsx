import { Story, Meta } from '@storybook/react';
import { Button, IButtonProps} from './Button';

export default {
  title: "Components/Button",
  component: Button,
} as Meta

const Template:Story<IButtonProps> = (args) => <Button {...args}>Test</Button>

export const Primary = Template.bind({})
Primary.args = {
  primary:true,
}

export const Default = () => <Button>Test</Button>

export const Secondary = () => <Button primary>Test</Button>

export const Danger = () => <Button warning>Call</Button>