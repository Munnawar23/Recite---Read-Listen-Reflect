import { ReactNode } from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";

interface SafeAreaProps {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  withSafeArea?: boolean;
  scrollable?: boolean;
}

export function SafeArea({
  children,
  style,
  contentContainerStyle,
  withSafeArea = true,
  scrollable = true,
}: SafeAreaProps) {
  const insets = useSafeAreaInsets();

  const safePaddingTop = withSafeArea ? insets.top + verticalScale(1) : 0;

  if (scrollable) {
    return (
      <View style={[styles.container, style]}>
        <ScrollView
          style={styles.content}
          contentContainerStyle={[
            contentContainerStyle,
            {
              paddingTop: safePaddingTop,
              paddingBottom: insets.bottom + verticalScale(16),
            },
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.content,
          contentContainerStyle,
          withSafeArea && { paddingTop: safePaddingTop },
        ]}
      >
        {children}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
  },
});

export default SafeArea;
