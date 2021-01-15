// interface describes which variables need to be there 
// and what kind of things can be stored in them  
export interface Theme {
  background: string
  dimmedBackground: string
  fontColor: string
  font: string
  linkColor: string
  hoverColor: string
  radius: string
  colors?: {}
}

const generalTheme = {
  radius: "3px",
  font: 'Roboto',
}

export const warm:Theme = {
  ...generalTheme,
  background: "#FFFCF6",
  dimmedBackground: "#efefef",
  linkColor: "",
  hoverColor: "",
  fontColor: "#222222"
}

export const darkTheme:Theme = {
  ...generalTheme,
  background: "#fefefe",
  dimmedBackground: "#FFFCF6",
  linkColor: "",
  hoverColor: "",
  fontColor: "#222222"
}