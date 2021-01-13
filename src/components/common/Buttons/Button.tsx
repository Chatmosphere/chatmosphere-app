import React from 'react';
import styled from 'styled-components';

interface IButton {
  readonly danger?:boolean
}

export const Button = styled.button<IButton>`
  font-size: 1rem;
  display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: center;
	height: 50px;
  width: 190px;
  border-radius: 5px;
  color: ${props => props.danger ? "#FFF" : "#333" };
  border: none;
  box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.25);
  background-color: ${props => props.danger ? "#d34545" : "#F4F4F4"};
  font-weight: normal;
  & svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${props => props.danger ? "#be3e3e" : "#e3e3e3"};
  }
  &:active {
    background-color: ${props => props.danger ? "#9e3434" : "#cbcbcb"};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;
  }
`

