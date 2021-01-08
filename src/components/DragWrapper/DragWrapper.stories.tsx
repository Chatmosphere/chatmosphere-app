import { Meta } from '@storybook/react/types-6-0'
import React from 'react'
import styled from 'styled-components'
import { DragWrapper } from './DragWrapper'


const Content = styled.div`
  width: 100px;
  height: 100px;
  background-color: lightblue;
`

export default {
  title: "Utils/DragWrapper",
  component: DragWrapper
} as Meta

export const Default = () => (
  <DragWrapper>
    <Content>Test</Content>
  </DragWrapper>
)