import * as React from 'react'
import styled from 'styled-components'
import {ReactComponent as ReloadIcon} from '../../../../assets/reloadIcon.svg'

export const ReloadHint = ({children=null,callback=()=>null}) => {

	return <Reload onClick={callback}><ReloadIcon />{children}</Reload>
}


const BaseBackdrop = styled.div`
	position: absolute;
  top: 0;
  z-index: 0;
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

const Reload = styled(BaseBackdrop)`
	background: #1774cb;
  color: white;
`

const OnStage = styled(BaseBackdrop)`
	background: ${(props) => props.theme.bg.inset};
  color: white;
`

export const UserBackdrop = ({children, ...props}) => {
	return <>{props.onStage ? <OnStage {...props}>{children}</OnStage> : <Reload {...props}>{children}</Reload>}</>
}

