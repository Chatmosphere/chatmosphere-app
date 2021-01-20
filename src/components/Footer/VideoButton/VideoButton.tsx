import * as React from 'react'
import { FaVideo } from 'react-icons/fa'
import { Button } from '../../common/Buttons/Button'

export const VideoButton = ({callback}) => (
	<Button onClick={callback}>
		<FaVideo />Video
	</Button>
)
