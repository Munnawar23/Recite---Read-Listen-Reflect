import { darkColors, lightColors, type ThemeColors } from "./colors";

export const theme = {
  light: {
    colors: lightColors,
  },
  dark: {
    colors: darkColors,
  },
};

export { darkColors, lightColors, type ThemeColors };
export type AppTheme = typeof theme;

