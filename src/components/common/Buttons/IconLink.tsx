import * as React from 'react'
import styled from 'styled-components'

const Link = styled.a`
	font-size: 1.4rem;
	display: flex;
	flex-direction: row;
	align-items: flex-start;
	padding: 10px;
  color: #333;
  &:hover {
		color:#8823ee
  }
`

export const IconLink = (props) => {
	return <Link href={props.url}>{props.children}</Link>
}
