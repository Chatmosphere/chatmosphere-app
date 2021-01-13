import React from 'react'
import styled from 'styled-components'
import { IconLink } from '../common/Buttons/IconLink'
import { MuteButton } from './MuteButton'
import { FaGithub, FaTwitterSquare, FaVideo, FaMicrophone, FaCommentDots } from 'react-icons/fa'

const FooterContainer = styled.div`
	position: fixed;
	bottom: 20px;
	left: 50%;
  transform: translateX(-50%);
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

export const Footer = () => {
	return (
  <>
		<FooterContainer>
			<MuteButton></MuteButton>
      {/* <Button danger><MdCallEnd/>End Call</Button> */}
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
