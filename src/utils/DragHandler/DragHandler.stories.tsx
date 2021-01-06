import React from 'react'
import DragHandler, { DragProps } from './DragHandler'
import {Story, Meta} from '@storybook/react/types-6-0';
import styled from 'styled-components';


const TestUser = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 100px;
  background-color: blue;
`
const DragFrame = styled.div`
  width: 600px;
  height: 600px;
  position: relative;
`

export default {
  title: "Example/DragHandler",
  component: DragHandler,
} as Meta
const Template: Story<DragProps> = (args) => <DragFrame id="dragFrame"><DragHandler {...args}><TestUser/></DragHandler></DragFrame>

export const Default = Template.bind({})

Default.args = {
  initPos: {
    x:0,y:0
  }
}
