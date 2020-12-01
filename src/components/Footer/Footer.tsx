import React from 'react';
import styled from 'styled-components';
import { MuteButton } from './MuteButton';

const FooterContainer = styled.div`
  position: fixed;
  bottom:20px;
  left: 50%;
`

export const Footer = () => {
  return (
    <FooterContainer>
      <MuteButton></MuteButton>
    </FooterContainer>
  )
}