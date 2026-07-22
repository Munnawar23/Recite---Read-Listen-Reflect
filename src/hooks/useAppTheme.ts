import { useThemeStore } from "@/store/themeStore";
import { theme } from "@/theme/theme";
import { useColorScheme } from "react-native";

export function useAppTheme() {
  const { themeMode } = useThemeStore();
  const systemColorScheme = useColorScheme();

  const activeScheme: "light" | "dark" =
    themeMode === "system"
      ? systemColorScheme === "dark"
        ? "dark"
        : "light"
      : themeMode;

  const colors = theme[activeScheme].colors;

  return {
    themeMode,
    activeScheme,
    colors,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize,
  };
}
