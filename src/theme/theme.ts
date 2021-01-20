// interface describes which variables need to be there 
// and what kind of things can be stored in them  
export interface Theme {
  background: string
  dimmedBackground: string
  fontColor: string
  font: string
  bodyCopy: string
  smallCopy: string
  linkColor: string
  hoverColor: string
  radius: string
  colors?: {
    primary?: {
      dark?: string
      light?:string
      default?:string
      shade?:string
      lighter?:string
    },
    grey?: {
      nearWhite?:string
      dark?:string
      light?:string
      medium?:string
    }
    accent: {
      dark?:string
      light?:string
      default?:string
      shade?:string
    }
  }
}

const generalTheme = {
  radius: "3px",
  font: 'Roboto',
  bodyCopy: "1rem 'Roboto'",
  smallCopy: ".9rem 'Roboto'",
}

export const warm:Theme = {
  ...generalTheme,
  background: "#FFFCF6",
  dimmedBackground: "#efefef",
  linkColor: "",
  hoverColor: "",
  
  fontColor: "#222222",
  colors: {
    primary: {
      dark: "#00187C"
    },
    grey: {
      dark: "#525252",
    },
    accent: {

    },
  }
}

export const darkTheme:Theme = {
  ...generalTheme,
  background: "#fefefe",
  dimmedBackground: "#FFFCF6",
  linkColor: "",
  hoverColor: "",
  fontColor: "#222222",
  colors: {
    primary: {
      dark: "#00187C"
    },
    grey: {
      dark: "#525252",
    },
    accent: {

    },
  }
}