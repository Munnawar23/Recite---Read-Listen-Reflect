import SafeArea from "@/components/layout/SafeArea";
import Background from "@/components/ui/Background";
import Button from "@/components/ui/Button";
import { useAppTheme } from "@/hooks/useAppTheme";
import "@/i18n";
import { Ionicons } from "@expo/vector-icons";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { scale, verticalScale } from "react-native-size-matters";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ error, errorInfo });
    console.error("[ErrorBoundary caught an error]:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <ErrorFallbackView
          error={this.state.error}
          errorInfo={this.state.errorInfo}
          onReset={this.handleReset}
        />
      );
    }

    return this.props.children;
  }
}

function ErrorFallbackView({
  error,
  errorInfo,
  onReset,
}: {
  error: Error | null;
  errorInfo: ErrorInfo | null;
  onReset: () => void;
}) {
  const { t } = useTranslation();
  const { colors, fontFamily, fontSize } = useAppTheme();

  return (
    <View style={styles.outerContainer}>
      <Background />
      <SafeArea scrollable={false} contentContainerStyle={styles.contentContainer}>
        {/* Header Icon */}
        <View style={[styles.iconContainer, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Ionicons name="warning-outline" size={scale(40)} color={colors.accent} />
        </View>

        {/* Title & Message */}
        <Text style={[styles.title, { color: colors.text, fontFamily: fontFamily.heading, fontSize: fontSize.splashTitle }]}>
          {t("errorBoundary.title", "Something Went Wrong")}
        </Text>

        <Text style={[styles.subtitle, { color: colors.subtext, fontFamily: fontFamily.body, fontSize: fontSize.bodyLg }]}>
          {t("errorBoundary.subtitle", "An unexpected error occurred in the application. You can try restarting or resetting the current view.")}
        </Text>

        {/* Try Again Button */}
        <Button
          tx="common.tryAgain"
          icon="refresh-outline"
          onPress={onReset}
          variant="primary"
        />
      </SafeArea>
    </View>
  );
}

export const ErrorBoundary = ErrorBoundaryClass;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    width: scale(68),
    height: scale(68),
    borderRadius: scale(34),
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: verticalScale(14),
  },
  title: {
    textAlign: "center",
    marginBottom: verticalScale(6),
  },
  subtitle: {
    textAlign: "center",
    marginBottom: verticalScale(14),
  },
});

