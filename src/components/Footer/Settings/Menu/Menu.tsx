import styled from 'styled-components'
import Card from '../../../common/Card'




export const Menu = () => {

	return (
	<Card title="Settings">
		<Select name="whut">test</Select>
	</Card>
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

