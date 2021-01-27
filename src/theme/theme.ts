// this interface describes which variables need to be there 
// and what kind of things can be stored in them  

export interface ITheme {
  fontSize: {
    h1: string
    h2: string
    h3: string
    strong: string
    body: string
    small: string
  }
  base: {
    1:string
    2:string
    3:string
    4:string
    5:string
    6:string
  }
  primary: {
    1:string
    2:string
    3:string
    4:string
    5:string
  }
  secondary: {
    1:string
    2:string
    3:string
    4:string
    5:string
    6:string
    7:string
  }
}

const theme = {
  fontSize: {
    h1: "2.5rem",
    h2: "1.75rem",
    h3: "1.5rem",
    strong: "1rem",
    body: "1rem",
    small: "0.875rem"
  }
}

// Theme ------

export const warm:ITheme = {
  ...theme,
  base: {
    1:"#0E0E0E",
    2:"#525252",
    3:"#E5E5E5",
    4:"#F2F2F2",
    5:"#FFFCF6",
    6:"#FCFCFC",
  },
  primary: {
    1:"#00187C",
    2:"#093DAC",
    3:"#5767DF",
    4:"#ACB2E2",
    5:"#D9DBEB",
  },
  secondary: {
    1:"#680303",
    2:"#F76659",
    3:"#BE332F",
    4:"#FF9886",
    5:"#FFC938",
    6:"#F4AA41",
    7:"#E27022",
  }
}

export const darkTheme:ITheme = {
  ...theme,
  base: {
    1:"#0E0E0E",
    2:"#525252",
    3:"#E5E5E5",
    4:"#F2F2F2",
    5:"#FFFCF6",
    6:"#FCFCFC",
  },
  primary: {
    1:"#00187C",
    2:"#093DAC",
    3:"#5767DF",
    4:"#ACB2E2",
    5:"#D9DBEB",
  },
  secondary: {
    1:"#680303",
    2:"#F76659",
    3:"#BE332F",
    4:"#FF9886",
    5:"#FFC938",
    6:"#F4AA41",
    7:"#E27022",
  }
}