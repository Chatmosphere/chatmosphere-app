import { Meta } from '@storybook/react';
import { User } from "./components/StageUser"
import { Stage } from './Stage';

export default {
  title: "Components/Stage",
  component: User,
} as Meta;

export const Default = () => <User selected={false} id="0" video={undefined} audio={undefined} volume="0" />


export const StagePreview = () => (
	<Stage>
		<User selected={false} id="0" video={undefined} audio={undefined} volume="0" />
		<User selected={false} id="1" video={undefined} audio={undefined} volume="0" />
		<User selected={false} id="2" video={undefined} audio={undefined} volume="0" />
		<User selected={false} id="3" video={undefined} audio={undefined} volume="0" />
		<User selected={false} id="4" video={undefined} audio={undefined} volume="0" />
	</Stage>
)