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
  border-radius: 25px;
  color: ${props => props.theme.base['1']};
  border: none;
  background-color: ${props => props.theme.base['7']};
  font-weight: normal;
  
  & svg {
    margin-right: 5px;
    stroke: ${props => props.theme.base['4']};
  }

  ${props => props.type === "primary" && css`
    color: ${props => props.theme.base['7']};
    border: 1px solid ${props => props.theme.color['5']};
    background-color: ${props => props.theme.color['5']};
  `}

  ${props => props.type === "danger" && css`
    color: ${props => props.theme.base['7']};
    border: 2px ${props => props.theme.color['7']};
    background-color: ${props => props.theme.color['7']};
    & svg {
      stroke: ${props => props.theme.base['7']};
    }
  `}

  ${props => props.type === "small" && css`
    & label {
      display:none;
    }
  `}


  &:hover {
    background-color: ${props => props.theme.base['6']};

    ${props => props.type === "primary" && css`
    background-color: ${props => props.theme.base['6']};
    `}

    ${props => props.type === "danger" && css`
      background-color: ${props => props.theme.base['6']};
      border: inset 2px ${props => props.theme.color['7']};
    `}
  
  }
  &:active {
      background-color: ${props => props.theme.base['4']};

    ${props => props.type === "primary" && css`
      background-color: ${props => props.theme.base['1']};
    `}

    ${props => props.type === "danger" && css`
      background-color: ${props => props.theme.base['1']};
    `}
  }
  
  &:focus {
    outline: none;
  }
`

