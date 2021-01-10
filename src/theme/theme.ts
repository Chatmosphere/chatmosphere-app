// interface describes which variables need to be there 
// and what kind of things can be stored in them  
export interface Theme {
  background: string
  fontColor: string
  linkColor: string
  hoverColor: string
  radius: string
}

const theme = {
  radius: "3px"
}

export const lightTheme:Theme = {
  ...theme,
  background: "#fefefe",
  linkColor: "",
  hoverColor: "",
  fontColor: "#222222"
}

export const darkTheme:Theme = {
  ...theme,
  background: "#fefefe",
  linkColor: "",
  hoverColor: "",
  fontColor: "#222222"
}