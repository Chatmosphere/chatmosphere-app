import { ThemeProvider } from "styled-components";
import {warm} from './../src/theme/theme'


export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={warm}>
      <Story />
    </ThemeProvider>
  ),
];