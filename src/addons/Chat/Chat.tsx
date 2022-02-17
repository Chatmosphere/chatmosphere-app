import { useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { useConferenceStore } from "../../store/ConferenceStore"
import ChatIcon from "../../assets/icons/ChatIcon"
import { Menu } from "../../components/common/Menu/Menu"

const SendButton = styled.button``
const Input = styled.div`
  position: absolute;
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
  margin-bottom: 15px;
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
const MessageText = styled.span`
  color: #272a35;
  font-size: 1em;
  line-height: 1.2em;
  margin: 0;
  padding: 0;
`
const Button = styled.button`
  border: none;
  height: 50px;
  width: 50px;
  font-size: 1.4rem;
  line-height: 1.4rem;
  border-radius: 50px;
  background: none;
  :hover {
    background-color: #fefefe;
  }
  :active {
    background-color: #efefef;
  }
`

const Label = styled.span`
  border: 0;
  clip: rect(1px, 1px, 1px, 1px);
  clip-path: inset(50%);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
  word-wrap: normal !important;
`

const replaceLinks = (txt:string) => {
	const URL_REG = /(https?:\/\/[^\s]+)/g ;
	// eslint-disable-next-line react/jsx-no-target-blank
	const newTxt = txt.split(" ").map(part => URL_REG.test(part) ? <a href={part} target='_blank' >{part} </a> : part + " ")
	return newTxt
}

const Message = ({name, content}) => {
	const replacedText = replaceLinks(content)
  return (
    <ChatElement>
      <UserName>{name}</UserName>
      <MessageText>{replacedText}</MessageText>
    </ChatElement>
  )
}

const Modal = ({ callback }) => {
  const conference = useConferenceStore((store) => store.conferenceObject)
  const users = useConferenceStore(
    (store) => store.users,
    (oldState, newState) =>
      Object.keys(oldState).length === Object.keys(newState).length,
  )
  const messages = useConferenceStore((store) => store.messages)
  const chatParentRef = useRef<HTMLDivElement>(null)

  const sendMessage = useCallback(
    (msg) => {
      const el = document.querySelector<HTMLInputElement>("#chatInput")
      const txt = el?.value
      if (txt) {
        el.value = ""
        conference?.sendTextMessage(txt)
      }
      // document.querySelector<HTMLInputElement>('#chatInput').value = ''
    },
    [conference],
  )

  useEffect(() => {
    //Scroll to top on new Message
    const domNode = chatParentRef.current
    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  return (
    <Menu title="Chat" onClose={callback}>
      <ContentArea ref={chatParentRef}>
        {messages.map((message, key) => {
          if (users[message.id]) return <Message key={key} name={users?.[message.id].user._displayName} content={message.text}/>
          return <Message key={key} name="You" content={message.text} />
        })}
      </ContentArea>

      <Input>
        <StyledTextarea id="chatInput" />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </Input>
    </Menu>
  )
}

const Chat = () => {
  const [show, toggleShow] = useState(false)

  return (
    <>
      <Button onClick={() => toggleShow(!show)}>
        <ChatIcon /> <Label>Chat</Label>
      </Button>
      {show && <Modal callback={() => toggleShow(!show)} />}
    </>
  )
}

export default Chat
