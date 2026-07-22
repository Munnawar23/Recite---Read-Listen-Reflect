import { darkColors, lightColors, type ThemeColors } from "./colors";
import { fontFamily, fontSize, type ThemeFontSize } from "./typography";

export const theme = {
  light: {
    colors: lightColors,
  },
  dark: {
    colors: darkColors,
  },
  fontFamily,
  fontSize,
};

export { darkColors, fontFamily, fontSize, lightColors, type ThemeColors, type ThemeFontSize };
export type AppTheme = typeof theme;
