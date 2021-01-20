import { createGlobalStyle } from "styled-components"
import { Theme } from './../theme'

import RobotoWoff_400 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-regular.woff'
import RobotoWoff2_400 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-regular.woff2'
import RobotoTTF_400 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-regular.ttf'

import RobotoWoff_500 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-500.woff'
import RobotoWoff2_500 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-500.woff2'
import RobotoTTF_500 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-500.ttf'

import RobotoWoff_700 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-700.woff'
import RobotoWoff2_700 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-700.woff2'
import RobotoTTF_700 from './../../assets/fonts/roboto-v20-latin/roboto-v20-latin-700.ttf'


export const GlobalStyles = createGlobalStyle<{theme:Theme}>`

  /* roboto-regular - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: local(''),
        url(${RobotoWoff_400}) format('woff2'), /* Super Modern Browsers */
        url(${RobotoWoff2_400}) format('woff'), /* Modern Browsers */
        url(${RobotoTTF_400}) format('truetype'), /* Safari, Android, iOS */
  }
  /* roboto-500 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: local(''),
        url(${RobotoWoff_500}) format('woff2'), /* Super Modern Browsers */
        url(${RobotoWoff2_500}) format('woff'), /* Modern Browsers */
        url(${RobotoTTF_500}) format('truetype'), /* Safari, Android, iOS */
  }
  /* roboto-700 - latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 700;
    src: local(''),
        url(${RobotoWoff_700}) format('woff2'), /* Super Modern Browsers */
        url(${RobotoWoff2_700}) format('woff'), /* Modern Browsers */
        url(${RobotoTTF_700}) format('truetype'), /* Safari, Android, iOS */
  }



  html, body {
    margin: 0;
    font-family: ${props => props.theme.font},
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: ${props => props.theme.background};
  }

  a {
    cursor: default;
  }

  .react-transform-component{
    width: 100vw  !important;
    height: 100vh !important;
    background-color:${props=>props.theme.dimmedBackground};
  }
  .react-transform-element{
    background-color: ${(props) => props.theme.background};
    cursor:grab;
    display:inline-flex;
  }
  .react-transform-element:active{
    cursor:grabbing;
  }
`
