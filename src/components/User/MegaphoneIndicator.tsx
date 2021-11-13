import styled from 'styled-components'
import {ReactComponent as MicIcon} from './../../assets/mic.svg'

const MegaContainer = styled.div`
	position:absolute;
  top: 170px;
  left: 50%;
  transform: translateX(-50%);
	background-color: orange;
	border-radius: 40px;
	display: block;
	width: 30px;
	height: 30px;
	padding: 10px;
  /* font-size: 2.5rem; */
`


export const MegaphoneIndicator = () => {
	return (
		<MegaContainer>
			<MicIcon />
		</MegaContainer>
	)
}