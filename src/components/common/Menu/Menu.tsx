import styled from 'styled-components'
import Card from '../Card/Card'


const StyledCard = styled(Card)`
	width: 270px;
	padding:15px;
	top: 15px;
	right: 15px;
	bottom: 80px;
`

export const Menu = ({title, onClose, children}) => {

	return (
	<StyledCard title={title} callback={onClose} className="">
		{children}
	</StyledCard>
	)
}


// const Select = ({name, callback=()=>null, children}:{name:string, callback?:()=>void, children:React.ReactNode}) => {
// 	return (
// 		<span>
// 			<input type="checkbox" name={name} />
// 			<label htmlFor={name}>{children}</label>
// 		</span>
// 	)
// }

