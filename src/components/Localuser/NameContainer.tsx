import React, { useCallback, useEffect } from "react";
import { useConferenceStore } from "../../Store/ConferenceStore";
import { NameTag } from "../NameTag/NameTag";
import {InputField} from './../common/Input/InputField'

export const NameContainer = () => {

  const [name, setName] = React.useState("Fellow Person");
  const [isActive, setActive] = React.useState(false);
  const setDisplayName = useConferenceStore(store => store.setDisplayName)
  const onClick = useCallback(() => {
    setActive(true);
  },[]);
  const onChange = (e) => {
    setName(e.target.value);
  };
  const onFocusLost = () => {
    setActive(false);
    setDisplayName(name)
  };

  if (isActive) {
    return (
      <InputContainer
        autoFocus
        onChange={onChange}
        close={onFocusLost}
        placeholder={name}
      />
    );
  } else {
    return <NameTag onClick={onClick}>{name}</NameTag>;
  }
};

const InputContainer = (props) => {
  const handleClose = useCallback(() => {
    props?.close();
  },[props]);

  useEffect(() => {
    document.addEventListener("keyup", (e) => {
      if (e.key === "Escape" || e.key === "Enter") {
        handleClose();
      }
    });
    return document.removeEventListener("keyup", (e) => {
      if (e.key === "Escape" || e.key === "Enter") handleClose();
    });
  }, [handleClose]);

  return <InputField {...props} onBlur={handleClose} />;
};
