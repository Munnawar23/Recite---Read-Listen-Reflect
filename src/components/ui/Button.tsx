import { useAppTheme } from "@/hooks/useAppTheme";
import { Haptics } from "@/lib/haptics";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

export type ButtonVariant = "primary" | "secondary" | "danger" | "outline";
export type ButtonSize = "small" | "medium" | "large";

export interface ButtonProps {
  title?: string;
  tx?: string;
  txOptions?: Record<string, unknown>;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  fullWidth?: boolean;
}

export function Button({
  title,
  tx,
  txOptions,
  onPress,
  variant = "primary",
  size = "medium",
  icon,
  rightIcon,
  children,
  disabled = false,
  loading = false,
  style,
  fullWidth = true,
}: ButtonProps) {
  const { t } = useTranslation();
  const { colors, fontFamily, fontSize } = useAppTheme();
  const buttonTitle = tx ? t(tx, txOptions) : title;

  const handlePress = () => {
    Haptics.medium();
    onPress();
  };

  // ── Variant Styles ─────────────────────────────────────────────────────────
  let backgroundColor = colors.accent;
  let textColor = colors.card;
  let borderColor = "transparent";
  let borderWidth = 0;

  if (variant === "secondary") {
    backgroundColor = colors.card;
    textColor = colors.text;
    borderColor = colors.border;
    borderWidth = 1;
  } else if (variant === "danger") {
    backgroundColor = "#E53E3E";
    textColor = "#FFFFFF";
  } else if (variant === "outline") {
    backgroundColor = "transparent";
    textColor = colors.accent;
    borderColor = colors.accent;
    borderWidth = 1;
  }

  // ── Size Styles ────────────────────────────────────────────────────────────
  let verticalPadding = verticalScale(12);
  let horizontalPadding = scale(20);
  let iconSize = scale(18);
  let textFontSize = fontSize.bodyMd;

  if (size === "small") {
    verticalPadding = verticalScale(8);
    horizontalPadding = scale(14);
    iconSize = scale(14);
    textFontSize = fontSize.body;
  } else if (size === "large") {
    verticalPadding = verticalScale(14);
    horizontalPadding = scale(24);
    iconSize = scale(20);
    textFontSize = fontSize.bodyLg;
  }

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor,
          borderColor,
          borderWidth,
          paddingVertical: verticalPadding,
          paddingHorizontal: horizontalPadding,
          opacity: disabled ? 0.6 : pressed ? 0.8 : 1,
        },
        fullWidth && styles.fullWidth,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <>
          {icon && (
            <Ionicons name={icon} size={iconSize} color={textColor} />
          )}
          {buttonTitle ? (
            <Text
              style={[
                styles.text,
                {
                  color: textColor,
                  fontFamily: fontFamily["body-semibold"],
                  fontSize: textFontSize,
                },
              ]}
            >
              {buttonTitle}
            </Text>
          ) : null}
          {children}
          {rightIcon && (
            <Ionicons name={rightIcon} size={iconSize} color={textColor} />
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: scale(12),
    gap: scale(8),
  },
  fullWidth: {
    width: "100%",
  },
  text: {},
});

export default Button;
