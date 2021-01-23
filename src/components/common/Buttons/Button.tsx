import React from 'react';
import styled from 'styled-components';

interface IButton {
  type?: any
  danger?: boolean
}

export const Button = styled.button<IButton>`
  font-family: ${props => props.theme.font};
  font-size: 1rem;
  display: flex;
	flex-direction: row;
	align-items: center;
  justify-content: center;
	height: 50px;
  width: 165px;
  border-radius: 5px;
  color: ${props =>
    props.type == "secondary" && "#00187C" ||
    props.type == "danger" && "#FFFCF6" ||
    props.type == "primary" && "#FFFCF6"};
  border: ${props =>
    props.type == "secondary" && "1px solid #00187C" ||
    props.type == "danger" && "2px #00187C" ||
    "#00187C"};
  background-color: ${props =>
    props.type == "secondary" && "#FFFCF6" ||
    props.type == "danger" && "#BE332F" ||
    "#093DAC"};
  font-weight: normal;
  & svg {
    margin-right: 5px;
  }
  &:hover {
    background-color: ${props =>
    props.type == "secondary" && "#D9DBEB" ||
    props.type == "danger" && "#BE332F" ||
    "#093DAC"};
  }
  &:active {
    background-color: ${props =>
    props.type == "secondary" && "#ACB2E2" ||
    props.type == "danger" && "#680303" ||
    "#00187C"};
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5);
  }
  &:focus {
    outline: none;
  }
`

