import * as React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  width: 340px;
  margin: auto;
  text-align: left;
`
const Fieldset = styled.fieldset`
  border: none;
  padding: 0;
  margin: 10px 0 0 0;
  display: flex;
  flex-direction: row;
`

const Label = styled.label`
  font-size: ${props => props.theme.fontSize.small};
  color: ${props => props.theme.base['2']};
`

const InputField = styled.input`
	height: 50px;
	background: ${props => props.theme.base['4']};
  color: ${props => props.theme.primary['1']};
	border: 1px solid ${props => props.theme.primary['1']};
  font-size: 1rem;
	box-sizing: border-box;
	border-radius: 5px 0 0 5px;
  padding-left: 20px;
  width: 100%;
  &:focus {
    outline: none;
    font-size:1rem;
  }
  &::placeholder {
    font-size: 1rem;
  }
`

const JoinButton = styled.input`
  height: 50px;
  background: ${props => props.theme.primary['2']};
  border-radius: 0 5px 5px 0;
  width: 111px;
  color: ${props => props.theme.base['6']};
  font-size: 1rem;
  border: none;
`

export const NameInputForm = ({ defaultSessionName, onSubmit, handleChange }) => {
	return (
		<Form onSubmit={onSubmit}>
			<Label htmlFor="sessionName">Set Session Name</Label>
			<Fieldset>
				<InputField
					name="sessionName"
					type="text"
          placeholder={defaultSessionName}
					onChange={handleChange}
					id="sessionName"
				/>
				<JoinButton name="joinButton" type="submit" value="Join" />
			</Fieldset>
		</Form>
	)
}
