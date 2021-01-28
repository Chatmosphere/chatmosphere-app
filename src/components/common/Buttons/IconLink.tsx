import * as React from 'react'
import styled from 'styled-components'

const Link = styled.a`
	font-size: 1.4rem;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 10px;
  color: ${props => props.theme.base['1']};
  &:hover {
		color:${props => props.theme.primary['3']};
  }
`

export const IconLink = (props) => {
	return <Link target="_blank" href={props.url}>{props.children}</Link>
}
