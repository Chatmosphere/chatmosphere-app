import { Meta } from '@storybook/react';
import { Button} from './Button';

export default {
  title: "Components/Button",
  component: Button,
} as Meta

export const Default = ({round}) => <Button round={round} >Test</Button>