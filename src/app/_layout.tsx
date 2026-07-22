import { ErrorBoundary } from "@/components/common/ErrorBoundary";
import { useAppTheme } from "@/hooks/useAppTheme";
import i18n from "@/i18n";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { I18nextProvider } from "react-i18next";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

// Keep the splash screen visible while we fetch resources
void SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [queryClient] = useState(() => new QueryClient());

  const [fontsLoaded, fontError] = useFonts({
    "CormorantGaramond-Bold": require("../../assets/fonts/CormorantGaramond-Bold.ttf"),
    "Nunito-Regular": require("../../assets/fonts/Nunito-Regular.ttf"),
    "Nunito-Medium": require("../../assets/fonts/Nunito-Medium.ttf"),
    "Nunito-SemiBold": require("../../assets/fonts/Nunito-SemiBold.ttf"),
    "Amiri-Regular": require("../../assets/fonts/Amiri-Regular.ttf"),
    "Amiri-Bold": require("../../assets/fonts/Amiri-Bold.ttf"),
  });

  const { activeScheme } = useAppTheme();

  useEffect(() => {
    if (fontError) {
      console.error("Failed to load fonts:", fontError);
    }

    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ErrorBoundary>
      <I18nextProvider i18n={i18n}>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SafeAreaProvider>
            <QueryClientProvider client={queryClient}>
              <StatusBar style={activeScheme === "dark" ? "light" : "dark"} />

              <Stack
                screenOptions={{
                  headerShown: false,
                }}
              />
            </QueryClientProvider>
          </SafeAreaProvider>
        </GestureHandlerRootView>
      </I18nextProvider>
    </ErrorBoundary>
  );
}


