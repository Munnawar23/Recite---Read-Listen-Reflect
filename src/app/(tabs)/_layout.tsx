import Background from "@/components/ui/Background";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Haptics } from "@/lib/haptics";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { moderateScale } from "react-native-size-matters";

export default function TabLayout() {
  const { t } = useTranslation();
  const { colors, fontFamily } = useAppTheme();
  const insets = useSafeAreaInsets();

  const handleTabPress = () => {
    Haptics.medium();
  };

  return (
    <View style={{ flex: 1 }}>
      <Background />
      <Tabs
        screenOptions={{
          sceneStyle: {
            backgroundColor: "transparent",
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.subtext,
          tabBarStyle: {
            backgroundColor: colors.card,
            borderTopColor: colors.border,
            elevation: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            height: 70 + (insets.bottom > 0 ? insets.bottom - 10 : 10),
            paddingBottom: insets.bottom > 0 ? insets.bottom : 10,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontFamily: fontFamily["body-medium"],
            fontSize: moderateScale(11),
          },
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: t("tabs.home", "Home"),
            tabBarLabel: t("tabs.home", "Home"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={22}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="quran"
          options={{
            title: t("tabs.quran", "Noble Quran"),
            tabBarLabel: t("common.quran", "Quran"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "book" : "book-outline"}
                size={22}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="qibla"
          options={{
            title: t("tabs.qibla", "Qibla"),
            tabBarLabel: t("common.qibla", "Qibla"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "compass" : "compass-outline"}
                size={22}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: t("tabs.library", "Library"),
            tabBarLabel: t("common.library", "Library"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "library" : "library-outline"}
                size={22}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: t("tabs.settings", "Settings"),
            tabBarLabel: t("common.settings", "Settings"),
            tabBarIcon: ({ color, focused }) => (
              <Ionicons
                name={focused ? "settings" : "settings-outline"}
                size={22}
                color={color}
              />
            ),
          }}
          listeners={{
            tabPress: handleTabPress,
          }}
        />
      </Tabs>
    </View>
  );
}

