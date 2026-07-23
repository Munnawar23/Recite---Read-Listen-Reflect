import { useAppTheme } from "@/hooks/useAppTheme";
import { Haptics } from "@/lib/haptics";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface HeaderProps {
  title: string;
  subtitle?: string;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
}

export default function Header({
  title,
  subtitle,
  rightIcon,
  onRightIconPress,
}: HeaderProps) {
  const { colors, fontFamily, fontSize, spacing } = useAppTheme();
  const S = createStyles(colors, fontFamily, fontSize, spacing);

  const handlePress = () => {
    Haptics.medium();
    onRightIconPress?.();
  };

  return (
    <View style={S.headerRow}>
      <View style={S.topRow}>
        <Text style={S.titleText}>{title}</Text>

        {rightIcon && (
          <TouchableOpacity
            style={S.iconButton}
            onPress={handlePress}
            activeOpacity={0.7}
          >
            <Ionicons
              name={rightIcon}
              size={fontSize.heading}
              color={colors.primary}
            />
          </TouchableOpacity>
        )}
      </View>

      {subtitle && <Text style={S.subtitleText}>{subtitle}</Text>}
    </View>
  );
}

const createStyles = (colors: any, fontFamily: any, fontSize: any, spacing: any) =>
  StyleSheet.create({
    headerRow: {
      paddingHorizontal: spacing.screenPadding,
      paddingTop: verticalScale(12),
      paddingBottom: verticalScale(3),
    },

    topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },

    titleText: {
      flex: 1,
      fontSize: fontSize.heading,
      fontFamily: fontFamily.heading,
      color: colors.text,
      letterSpacing: 0.5,
    },

    iconButton: {
      width: scale(36),
      height: scale(36),
      borderRadius: scale(18),
      backgroundColor: colors.primary + "12",
      alignItems: "center",
      justifyContent: "center",
      marginLeft: scale(8),
    },

    subtitleText: {
      marginTop: verticalScale(2),
      fontSize: fontSize.body,
      fontFamily: fontFamily.text,
      color: colors.subtext,
    },
  });
