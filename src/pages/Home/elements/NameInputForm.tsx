import * as React from 'react'
import styled from 'styled-components'

const Form = styled.form`
  font: ${props => props.theme.bodyCopy};
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
  font: ${props => props.theme.smallCopy};
  color: ${props => props.theme.colors.darkGray};
`

const InputField = styled.input`
	height: 50px;
	background: #eff0f2;
  color: ${props => props.theme.colors.primary.dark};
  font: ${props => props.theme.bodyCopy};
	border: 1px solid #093dac;
	box-sizing: border-box;
	border-radius: 5px 0 0 5px;
  padding-left: 20px;
  width: 100%;
    &:focus {
      outline: none;
    }
`

const JoinButton = styled.input`
  height: 50px;
  background: #093DAC;
  border-radius: 0 5px 5px 0;
  width: 111px;
  color: white;
  font-weight: bold;
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
