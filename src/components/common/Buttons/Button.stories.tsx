import { Meta } from '@storybook/react/types-6-0';
import * as React from 'react';
import { Button } from './Button';
import {ReactComponent as CallIcon} from './../../../assets/call.svg'

export default {
  title: "Components/Button"
} as Meta

export const Default = () => <Button>Test</Button>

export const Secondary = () => <Button type="primary">Test</Button>

export const Danger = () => <Button type="danger"><CallIcon/> Call</Button>