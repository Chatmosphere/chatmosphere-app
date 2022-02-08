// import Button from "./Button"
import { useState } from "react"
import { MdMoreVert } from "react-icons/md"
import styled from "styled-components"
import { IconButton } from "../../common/Buttons/Button"
import { Menu } from "../../common/Menu/Menu"
import { useSettingsStore } from "./SettingsStore"

export const Settings = () => {
  const [open, setOpen] = useState(false)
  const elements = useSettingsStore((store) => store.elements)

  return (
    <>
      {open && (
        <SettingsMenu
          title="Settings"
          children={elements}
          onClose={() => setOpen(false)}
        />
      )}
      <IconButton
        IconStart={<MdMoreVert />}
        label="Settings"
        round
				ghost
        onClick={() => setOpen(!open)}
      />
    </>
  )
}

const SettingsMenu = ({ title, onClose, children = [] as React.ReactNode }) => {
  return (
    <Menu title={title} onClose={onClose}>
      <StyledContentBox>
        {children}
        {/* <Select name="whut">
          Lorem ipsum dolor sit amet, consectetur adip Sit amet dklsjf fjf
          jfdksa
        </Select>
        <Select name="whut">test</Select> */}
      </StyledContentBox>
    </Menu>
  )
}

const Select = ({
  name,
  callback = () => null,
  children,
}: {
  name: string
  callback?: () => void
  children: React.ReactNode
}) => {
  return (
    <StyledSelect>
      <input type="checkbox" name={name} />
      <StyledLabel htmlFor={name}>{children}</StyledLabel>
    </StyledSelect>
  )
}

const StyledSelect = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 5px 0;
  text-align: left;
  border-bottom: 1px solid ${(props) => props.theme.line.light};
`

const StyledLabel = styled.label`
  font-size: ${(props) => props.theme.fontSize.strong};
`

const StyledContentBox = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: scroll;
`
