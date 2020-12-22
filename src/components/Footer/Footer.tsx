import React from 'react'
import styled from 'styled-components'
import { IconLink } from '../common/Buttons/IconLink'
import { MuteButton } from './MuteButton'
import { FaGithub, FaTwitterSquare, FaVideo, FaMicrophone, FaCommentDots } from 'react-icons/fa'
import {MdCallEnd} from 'react-icons/md'
import { Button } from '../common/Buttons/Button'

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
      {/* <IconLink url="">
        <FaCommentDots />
      </IconLink> */}
    </IconBox>
  </>
	)
}
