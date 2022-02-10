// import Button from "./Button"
import { MdMoreVert } from 'react-icons/md'
import styled from 'styled-components'
import { Menu } from './Menu/Menu'

const Button = styled.button`
	border: none;
	height: 50px;
	width: 50px;
	font-size: 1.4rem;
	line-height: 1.4rem;
	border-radius:50px;
	background: none;
	:hover {
		background-color:#fefefe;
	}
	:active {
		background-color:#efefef;
	}
`

const Label = styled.span`
	border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
`


const Settings = () => {

	return (
		<>
			<Menu />
			<Button><MdMoreVert /> <Label>Settings</Label></Button>
		</>
	)
}

export default Settings