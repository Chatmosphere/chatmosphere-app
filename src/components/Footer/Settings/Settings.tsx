// import Button from "./Button"
import { useState } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IconButton } from '../../common/Buttons/Button'
import { Menu } from '../../common/Menu/Menu'


export const Settings = () => {
	const [open, setOpen] = useState(false)
	return (
		<>
			{open && <SettingsMenu title="Settings" onClose={() => setOpen(false)} />}
			<IconButton IconStart={<MdMoreVert />} onClick={()=>setOpen(!open)}>Settings</IconButton>
		</>
	)
}


const SettingsMenu = ({title, onClose}) => {

	return (
	<Menu title={title} onClose={onClose}>
		<Select name="whut">test</Select>
	</Menu>
	)
}


const Select = ({name, callback=()=>null, children}:{name:string, callback?:()=>void, children:React.ReactNode}) => {
	return (
		<span>
			<input type="checkbox" name={name} />
			<label htmlFor={name}>{children}</label>
		</span>
	)
}