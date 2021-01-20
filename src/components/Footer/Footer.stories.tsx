import { Meta } from '@storybook/react/types-6-0'
import * as React from 'react'
import { Footer } from './Footer'
import { VideoButton } from './VideoButton/VideoButton'
import { Button } from '../common/Buttons/Button'
import { MdCallEnd } from 'react-icons/md'
import { FaMicrophoneSlash } from 'react-icons/fa'

export default {
	title: 'Components/Footer',
	component: Footer,
} as Meta

export const CallControls = () => (
	<Footer>
		<Button danger onClick={()=>null}><FaMicrophoneSlash/> Unmute</Button>
		<Button danger onClick={()=>null}><MdCallEnd />End Call</Button>
		<VideoButton callback={() => null} />
	</Footer>
)
