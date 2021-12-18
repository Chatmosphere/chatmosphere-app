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
  color: ${props => props.theme.primary['1']};
  border: 1px solid ${props => props.theme.primary['1']};
  background-color: ${props => props.theme.base['5']};
  font-weight: normal;

  ${props => props.type === "primary" && css`
    color: ${props => props.theme.base['5']};
    border: 1px solid ${props => props.theme.primary['2']};
    background-color: ${props => props.theme.primary['2']};
  `}

  ${props => props.type === "danger" && css`
    color: ${props => props.theme.base['5']};
    border: 2px ${props => props.theme.primary['1']};
    background-color: ${props => props.theme.secondary['3']};
    & svg {
      fill: ${props => props.theme.base['5']};
    }
  `}

  & svg {
    margin-right: 5px;
  }

  &:hover {
    background-color: ${props => props.theme.base['4']};

    ${props => props.type === "primary" && css`
    border: 1px solid ${props => props.theme.primary['1']};
    background-color: ${props => props.theme.primary['3']};
    `}

    ${props => props.type === "danger" && css`
      border: 1px solid ${props => props.theme.secondary['2']};
      background-color: ${props => props.theme.secondary['2']};
    `}
  
  }
  &:active {
      background-color: ${props => props.theme.primary['4']};

    ${props => props.type === "primary" && css`
      background-color: ${props => props.theme.primary['1']};
    `}

    ${props => props.type === "danger" && css`
      background-color: ${props => props.theme.secondary['1']};
    `}
  }
  
  &:focus {
    outline: none;
  }
`

