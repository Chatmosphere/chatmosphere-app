import { ThemeProvider } from "styled-components";
import { withThemesProvider } from "themeprovider-storybook";
import {lightTheme, darkTheme} from './../src/theme/theme'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

// export const decorators = [
//   (Story, context) => (
//     <ThemeProvider theme={lightTheme}>
//       <Story {...context} />
//     </ThemeProvider>
//   ),
// ];

export const decorators = [withThemesProvider([lightTheme, darkTheme])]