import * as React from 'react'
import styled from 'styled-components'
import {ReactComponent as ReloadIcon} from './../../assets/reloadIcon.svg'

export const ReloadHint = () => {

  const onClick = () => {
    alert("click")
  }

	return <Reload onClick={onClick}><ReloadIcon />Maybe try a reload?</Reload>
}

const Reload = styled.div`
  position: absolute;
  top: 0;
  z-index: -1;
	width: 200px;
	height: 200px;
	border-radius: 50%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background: #1774cb;
  color: white;
  font-weight: bold;
  & svg {
    margin: 5px;
  }
`
