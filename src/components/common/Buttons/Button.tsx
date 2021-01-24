import React from 'react';
import styled, { css } from 'styled-components';

interface IButton {
  type?: any
  danger?: boolean
}

export const Button = styled.button<IButton>`
  font-size: 1rem;
  display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: center;
	height: 50px;
  width: 165px;
  border-radius: 5px;
  color: #00187C;
  border: 1px solid #00187C;
  background-color: #FFFCF6;
  font-weight: normal;

  ${props => props.type === "primary" && css`
    color: #FFFCF6;
    border: 1px solid #093DAC;
    background-color: #093DAC;
  `}

  ${props => props.type === "danger" && css`
    color: #FFFCF6;
    border: 2px #00187C;
    background-color: #BE332F;
  `}

  & svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: #D9DBEB;

    ${props => props.type === "primary" && css`
    border: 1px solid #00187C;
    background-color: #5767DF;
    `}

    ${props => props.type === "danger" && css`
    border: 1px solid #680303;
    background-color: #F76659;
    `}
  
  }
  &:active {
      background-color: #ACB2E2;

    ${props => props.type === "primary" && css`
      background-color: #00187C;
    `}

    ${props => props.type === "danger" && css`
      background-color: #680303;
    `}
  }
  
  &:focus {
    outline: none;
  }
`

