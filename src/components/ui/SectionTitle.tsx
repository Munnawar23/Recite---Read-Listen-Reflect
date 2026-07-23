import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

import { useAppTheme } from "@/hooks/useAppTheme";

interface Props {
  label: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function SectionTitle({ label, icon }: Props) {
  const { colors, fontFamily, fontSize, spacing } = useAppTheme();
  const S = createStyles(colors, fontFamily, fontSize, spacing);

  return (
    <View style={S.row}>
      {icon && (
        <View style={S.iconWrap}>
          <Ionicons name={icon} size={fontSize.title} color={colors.primary} />
        </View>
      )}

      <Text style={S.text}>{label}</Text>
    </View>
  );
}

const createStyles = (colors: any, fontFamily: any, fontSize: any, spacing: any) =>
  StyleSheet.create({
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: spacing.sectionHeaderTop,
      marginBottom: spacing.sectionHeaderBottom,
      paddingHorizontal: spacing.screenPadding,
      gap: spacing.sm,
    },

    iconWrap: {
      width: scale(26),
      height: scale(26),
      borderRadius: scale(8),
      backgroundColor: colors.primary + "18",
      alignItems: "center",
      justifyContent: "center",
    },

    text: {
      fontSize: fontSize.title,
      fontFamily: fontFamily.title,
      color: colors.accent,
      letterSpacing: 0.4,
    },
  });
