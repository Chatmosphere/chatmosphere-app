// this interface describes which variables need to be there 
// and what kind of things can be stored in them  

// Definitions ------------------
export interface ITheme {
  fontSizes : {
    hero?:string
    h1?: string
    h2?: string
    h3?: string
    h4?: string
    strong?: string
    subline?:  string
    body?: string
    small?: string
    tiny?:string
  },
  fontWeights: {[key:string]: string},
  lineHeights: {[key:string]: string},
  radius: {[key:string]: string},
  base: {[key:string]: string},
  color: {[key:string]: string}
}

interface IColors {
  base110:string
  base100:string
  base80:string
  base50:string
  base20:string
  base5:string
  base0:string
  orange100:string
  orange50:string
  orange20:string
  orange10:string
  blue100:string
  pink100:string
  red100:string
}

const colors:IColors = {
  base110:"#000000",
  base100:"#272625",
  base80:"#434241",
  base50:"#9C9B9A",
  base20:"#D5D4D3",
  base5:"#F5F4F3",
  base0:"#FFFFFF",
  orange100:"#E27022",
  orange50:"#F4AA41",
  orange20:"#F8CD90",
  orange10:"#F9E8D1",
  blue100:"#5770EB",
  pink100:"#e67a94",
  red100:"#E15D4C",
}

// Theme ------------------------------

const defaultTheme = {
  fontSizes : {
    hero:"3rem",
    h1: "1.5rem",
    h2: "1.25rem",
    h3: "1.125rem",
    h4: "1rem",
    strong: "1rem",
    subline:  "1.25rem",
    body: "1rem",
    small: "0.875rem",
    tiny:"0.75rem",
  },
  fontWeights: {},
  lineHeights: {},
  radius: {
    small: "5px",
  }
}

const warm = {
  base: { 
    1:colors.base110,
    2:colors.base100,
    3:colors.base80,
    4:colors.base50,
    5:colors.base20,
    6:colors.base5,
    7:colors.base0,
  },
  color: {
    1:colors.orange100,
    2:colors.orange50,
    3:colors.orange20,
    4:colors.orange10,
    5:colors.blue100,
    6:colors.pink100,
    7:colors.red100,
  }
}

const dark = {
  base: { 
    1:"#0E0E0E",
    2:"#525252",
    3:"#E5E5E5",
    4:"#F2F2F2",
    5:"#FFFCF6",
    6:"#FCFCFC",
    7:"#FCFCFC",
  },
  color: {
    1:"#00187C",
    2:"#093DAC",
    3:"#5767DF",
    4:"#ACB2E2",
    5:"#D9DBEB",
    6:"#D9DBEB",
    7:"#D9DBEB",
  }
}

export const lightTheme:ITheme = {...defaultTheme, ...warm}
export const darkTheme:ITheme = {...defaultTheme, ...dark}