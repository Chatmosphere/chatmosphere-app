import React from 'react'
import styled from 'styled-components'
import { IconLink } from '../common/Buttons/IconLink'
import { MuteButton } from './MuteButton'
import {FaPhone, FaGithub, FaTwitterSquare, FaVideo, FaMicrophone, FaCommentDots } from 'react-icons/fa'
import {MdCallEnd} from 'react-icons/md'
import { Button } from '../common/Buttons/Button'
import { useConferenceStore } from '../../Store/ConferenceStore'
import { useConnectionStore } from '../../Store/ConnectionStore'
import {useHistory} from 'react-router-dom'


const FooterContainer = styled.div`
	position: fixed;
	bottom: 20px;
	left: 50%;
`

const IconBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;
	padding: 2px;
  position:absolute;
  right: 30px;
  bottom:20px;
`

const FeedbackLink = styled.a`
  font-weight: bold;
  font-size: .9rem;
  padding: 3px 8px;
  margin-left: 2px;
  color: #333;
  &:hover {
    color: #8823ee;
  }
`

interface IFooter{
  mute?:boolean,
  endCall?:boolean
}

export const Footer:React.FC<IFooter> = ({mute,endCall}) => {
  const leave = useConferenceStore(state => state.leave)
  const disconnectServer = useConnectionStore(state => state.disconnectServer)
  const history = useHistory()

  const endCallClick = ()=>{
    leave()
    disconnectServer()
    history.push(`/enter`)
  }

	return (
  <>
		<FooterContainer>
			<MuteButton></MuteButton>
      <Button danger onClick={endCallClick}><MdCallEnd/>End Call</Button>
      {/* <Button><FaVideo/>Video</Button> */}
		</FooterContainer>
    <IconBox>
      <IconLink target="_blank" url="https://github.com/Chatmosphere/react-app">
        <FaGithub />
      </IconLink>
      <IconLink target="_blank" url="https://twitter.com/chatmosphereCC">
        <FaTwitterSquare />
      </IconLink>
      <FeedbackLink target="_blank" href="https://chatmosphere.cc/feedback">
        Feedback
      </FeedbackLink>
    </IconBox>
  </>
	)
}
