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
  color: #FFFCF6;
  border: 1px solid #00187C;
  background-color: #093DAC;
  font-weight: normal;

  ${props => props.type === "secondary" && css`
    color: #00187C;
    border: 1px solid #00187C;
    background-color: #FFFCF6;
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
    background-color: #093DAC;

    ${props => props.type === "secondary" && css`
      background-color: #D9DBEB;
    `}

    ${props => props.type === "danger" && css`
      background-color: #BE332F;
    `}
  
  }
  &:active {
    background-color: #093DAC;

    ${props => props.type === "secondary" && css`
      background-color: #D9DBEB;
    `}

    ${props => props.type === "danger" && css`
      background-color: #BE332F;
    `}
  }
  
  &:focus {
    outline: none;
  }
`

