import styled from 'styled-components'

const Box = styled.div`
	position: fixed;
	width: 270px;
	padding:15px;
  top: 15px;
  right: 15px;
	bottom: 80px;
	z-index:10001;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
`

const Header = styled.div`
	margin: 16px 16px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
`
const Title = styled.span`

`
const Close = styled.button`

`

export const Card = ({title, children}) => {

	return (
	<Box>
		<Header>
			<Title>{title}</Title>
			<Close>Close</Close>
		</Header>
		{children}
	</Box>
	)
}

export default Card;