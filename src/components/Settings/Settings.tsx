import React, { useState } from 'react';
import styled from 'styled-components';
import { useConnectionStore } from './../../store/ConnectionStore';

const SettingsButton: HTMLButtonElement | any = styled.button``;

const SettingsContainer = styled.div`
	position: fixed;
	right: 20px;
	bottom: 20px;
`;
const Close: HTMLButtonElement|any = styled.button`
	position: absolute;
	right: 10px;
	top: 10px;
`;

const ModalBox = styled.div`
  padding: 20px;
	border-radius: 10px;
  background-color: #efefef;
`;


export const Settings = () => {
  const [ open, setOpen ] = useState(false);
  const serverName = useConnectionStore(store=>store.serverUrl)
	const [inputValue, setInputValue] = useState(serverName)

  const handleInput = (e) => {
    const tmpInput = e.target.value //Sanitize here
    setInputValue(tmpInput)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    
  }


	return (
		<SettingsContainer>
			{open === false && <SettingsButton onClick={() => setOpen(true)}>Settings</SettingsButton>}
			{open && (
				<ModalBox>
					<h3>Settings</h3>
					<Close onClick={() => setOpen(false)}>close</Close>
					<form onSubmit={handleSubmit}>
						<label>
							Server:
							<input type="text" name="serverName" onChange={handleInput} value={inputValue}/>
						</label>
						<input type="submit" value="Save" />
					</form>
				</ModalBox>
			)}
		</SettingsContainer>
	);
};
