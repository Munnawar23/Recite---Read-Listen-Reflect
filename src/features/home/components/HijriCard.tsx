import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { useAppTheme } from "@/hooks/useAppTheme";
import { getHijriDate } from "@/utils/dateUtils";

export default function HijriCard() {
  const { t, i18n } = useTranslation();
  const { colors, fontFamily, fontSize, spacing, activeScheme } = useAppTheme();
  const S = createStyles(
    colors,
    fontFamily,
    fontSize,
    spacing,
    activeScheme === "dark",
  );

  const hijriDate = getHijriDate(i18n.language);

  return (
    <View style={S.wrapper}>
      <LinearGradient
        colors={colors.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={S.gradient}
      >
        {/* Decorative Elements */}
        <View style={S.decoCircleLarge} />
        <View style={S.decoCircleSmall} />
        <View style={S.decoLine} />

        {/* Top Row */}
        <View style={S.topRow}>
          <View style={S.badge}>
            <Ionicons name="moon" size={fontSize.caption} color="#FFD98E" />
            <Text style={S.badgeText}>
              {t("home.hijriCard.badge", "Islamic Date")}
            </Text>
          </View>

          <Text style={S.gregorian}>{hijriDate.gregorian}</Text>
        </View>

        <View style={S.divider} />

        {/* Date */}
        <View style={S.dateRow}>
          <View style={S.dayContainer}>
            <Text style={S.day}>{hijriDate.day}</Text>
          </View>

          <View style={S.verticalSep} />

          <View style={S.dateInfo}>
            <Text style={S.month}>{hijriDate.month}</Text>

            <Text style={S.year}>
              {hijriDate.year} {t("home.hijriCard.yearSuffix", "AH")}
            </Text>

            <View style={S.weekdayRow}>
              <View style={S.weekdayDot} />

              <Text style={S.weekday}>{hijriDate.weekday}</Text>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
}

const createStyles = (
  colors: any,
  fontFamily: any,
  fontSize: any,
  spacing: any,
  isDark: boolean,
) =>
  StyleSheet.create({
    wrapper: {
      marginHorizontal: spacing.screenPadding,
      marginTop: spacing.cardMarginTop,
      borderRadius: scale(24),
      overflow: "hidden",

      shadowColor: isDark ? "#000" : "#2B5E40",
      shadowOffset: {
        width: 0,
        height: verticalScale(10),
      },
      shadowOpacity: isDark ? 0.5 : 0.25,
      shadowRadius: scale(20),
      elevation: 12,
    },

    gradient: {
      paddingHorizontal: scale(22),
      paddingTop: verticalScale(18),
      paddingBottom: verticalScale(22),
      position: "relative",
      overflow: "hidden",
    },

    /* Decorative */

    decoCircleLarge: {
      position: "absolute",
      top: -scale(30),
      right: -scale(30),
      width: scale(120),
      height: scale(120),
      borderRadius: scale(60),
      borderWidth: 1.5,
      borderColor: "rgba(255,255,255,0.08)",
    },

    decoCircleSmall: {
      position: "absolute",
      top: scale(10),
      right: scale(10),
      width: scale(70),
      height: scale(70),
      borderRadius: scale(35),
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.06)",
    },

    decoLine: {
      position: "absolute",
      bottom: verticalScale(12),
      right: scale(22),
      width: scale(40),
      height: 1,
      backgroundColor: "rgba(255,255,255,0.12)",
    },

    /* Top */

    topRow: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: verticalScale(10),
    },

    badge: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(5),
      backgroundColor: "rgba(255,255,255,0.12)",
      paddingHorizontal: scale(12),
      paddingVertical: verticalScale(5),
      borderRadius: scale(30),
      borderWidth: 1,
      borderColor: "rgba(255,255,255,0.08)",
    },

    badgeText: {
      fontSize: fontSize.caption,
      fontFamily: fontFamily.title,
      color: "rgba(255,255,255,0.9)",
      letterSpacing: 0.8,
      textTransform: "uppercase",
    },

    gregorian: {
      fontSize: fontSize.caption,
      fontFamily: fontFamily.text,
      color: "rgba(255,255,255,0.6)",
    },

    divider: {
      height: 1,
      backgroundColor: "rgba(255,255,255,0.1)",
      marginBottom: verticalScale(14),
    },

    /* Date */

    dateRow: {
      flexDirection: "row",
      alignItems: "center",
    },

    dayContainer: {
      width: scale(80),
      alignItems: "center",
      justifyContent: "center",
    },

    day: {
      fontSize: fontSize.splashTitle,
      fontFamily: fontFamily.heading,
      color: "#fff",
      lineHeight: fontSize.splashTitle * 1.1,
      includeFontPadding: false,
      textShadowColor: "rgba(0,0,0,0.2)",
      textShadowOffset: {
        width: 0,
        height: 2,
      },
      textShadowRadius: 6,
    },

    verticalSep: {
      width: 1.5,
      height: verticalScale(50),
      backgroundColor: "rgba(255,255,255,0.15)",
      marginHorizontal: scale(16),
      borderRadius: 1,
    },

    dateInfo: {
      flex: 1,
      gap: verticalScale(3),
    },

    month: {
      fontSize: fontSize.title,
      fontFamily: fontFamily.heading,
      color: "#fff",
      letterSpacing: 0.3,
    },

    year: {
      fontSize: fontSize.body,
      fontFamily: fontFamily.text,
      color: "rgba(255,255,255,0.65)",
      letterSpacing: 0.5,
    },

    weekdayRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: scale(6),
      marginTop: verticalScale(4),
    },

    weekdayDot: {
      width: scale(6),
      height: scale(6),
      borderRadius: scale(3),
      backgroundColor: "#FFD98E",

      shadowColor: "#FFD98E",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 0.6,
      shadowRadius: 4,
      elevation: 3,
    },

    weekday: {
      fontSize: fontSize.body,
      fontFamily: fontFamily.title,
      color: "rgba(255,255,255,0.85)",
      letterSpacing: 0.5,
    },
  });
