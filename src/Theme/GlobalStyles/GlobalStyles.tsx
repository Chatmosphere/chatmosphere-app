import { createGlobalStyle } from "styled-components"
import { Theme } from './../theme'

export const GlobalStyles = createGlobalStyle<{theme:Theme}>`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    cursor: default;
  }

  .react-transform-component{
    width: 100vw  !important;
    height: 100vh !important;
    background-color: #efefef;
  }
  .react-transform-element{
    background-color: ${(props) => props.theme.background};
    cursor:grab;
  }
  .react-transform-element:active{
    cursor:grabbing;
  }
`
