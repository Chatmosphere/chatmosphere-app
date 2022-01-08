import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Card from "../../components/common/Card"
import { useConferenceStore } from '../../store/ConferenceStore'
import { useConnectionStore } from '../../store/ConnectionStore'
import shallow from 'zustand/shallow'

const SendButton = styled.button`

`
const Input = styled.div`
	position:absolute;
	bottom: 10px;
	right: 10px;
	left: 10px;
	display: flex;
	border-radius: 4px;
	height: 48px;
	flex-direction: row;
	background: rgba(255, 255, 255, 1);
  border: 1px solid rgba(220, 222, 225, 1);
	justify-content: space-between;
`
const StyledTextarea = styled.textarea`
	display: table-cell; 
	vertical-align: middle;
	resize: none;
	margin: 5px;
	flex-grow: 3;
	border: none;
	outline: none;
`

const ContentArea = styled.div`
	position: absolute;
	right: 15px;
	left: 15px;
	top: 80px;
	bottom: 80px;
	overflow: scroll;
`

const ChatElement = styled.div`
	margin-bottom:15px;
	width: 100%;
	text-align: left;
`


const UserName = styled.div`
	color: #79809a;
  font-size: 1em;
  line-height: 1.2em;
	padding: 0 0 3px 0;
	font-weight: bolder;
	`
const MessageText = styled.p`
		color: #272a35;
		font-size: 1em;
		line-height: 1.2em;
		margin: 0;
		padding: 0;
	`

type IMessage = {
	id:string,
	text:string,
	nr:number
}


const Modal = () => {

	const conference = useConferenceStore(store => store.conferenceObject)
	const jsMeet = useConnectionStore(store => store.jsMeet)
	const users = useConferenceStore(store => store.users, (oldState, newState) => Object.keys(oldState).length === Object.keys(newState).length)
	const [messages, addMessage] = useState<Array<IMessage>>([])
	const [textValue, setText] = useState("")
	// const userRef = useRef(useConferenceStore.getState().users)

	const sendMessage = useCallback((msg) => {
		const el = document.querySelector<HTMLInputElement>('#chatInput')
		const txt = el?.value
		if(txt)	{
			el.value = ""
			conference?.sendTextMessage(txt)
		}
		// document.querySelector<HTMLInputElement>('#chatInput').value = ''
	},[conference])

	const onMessageReceived = useCallback((id,text:string,nr) => {
		console.log(messages)
		messages.push({id:id, text:text, nr:nr})
		addMessage([...messages])
		// addMessage(messages.push(text))
	},[messages])

	const handleChange = (e) => {
		setText(e.target.value)
	}

	useEffect(() => {
		conference?.on(
			jsMeet?.events.conference.MESSAGE_RECEIVED, 
			onMessageReceived
		)
		return(() => {
			conference?.off(
				jsMeet?.events.conference.MESSAGE_RECEIVED,
				onMessageReceived
			)
		})
	},[conference, jsMeet, onMessageReceived])

	// console.log("users ", users?.["7170a85c"]?.user)

	return (
		<Card title="Chat">
			<ContentArea>
				{
					messages.map((message, key) => {
						if(users[message.id]) {
							return (
								<ChatElement key={key}>
									<UserName>
										{users?.[message.id].user._displayName}
									</UserName>
									<MessageText>
										{message.text}
									</MessageText>
								</ChatElement>
							)
						}
						return (<ChatElement key={key}>
							<UserName>
								You
							</UserName>
							<MessageText>
								{message.text}
							</MessageText>
						</ChatElement>)
					})
				}
			</ContentArea>

			<Input>
				<StyledTextarea id="chatInput"/>
				<SendButton onClick={sendMessage}>Send</SendButton>
			</Input>
		</Card>
	)
}


const Chat = () => {

	return (
		<Modal />
	)
}

export default Chat