import SafeArea from "@/components/layout/SafeArea";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { verticalScale } from "react-native-size-matters";

// import EmptyState from "@/components/ui/EmptyState";
import Header from "@/components/ui/Header";
import HijriCard from "../components/HijriCard";

// import DailyVerse from "@/features/home/components/DailyVerse";
import SectionTitle from "@/components/ui/SectionTitle";
import PrayerTimes from "@/features/home/components/PrayerTimes";

const animation = (delay: number) =>
  FadeInDown.duration(500).delay(delay).springify();

export default function HomeScreen() {
  const { t } = useTranslation();
  const { colors } = useAppTheme();
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);

    try {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["hijri-date"] }),
        queryClient.invalidateQueries({ queryKey: ["prayer-times"] }),
        queryClient.invalidateQueries({ queryKey: ["daily-verse"] }),
      ]);
    } catch (error) {
      console.warn("Pull-to-refresh failed:", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <SafeArea>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
      >
        {/* Greeting */}
        <Animated.View entering={animation(100)}>
          <Header
            title={t("home.greeting.title", "السَّلامُ عَلَيْكُم")}
            subtitle={t(
              "home.greeting.subtitle",
              "May your day be full of blessings",
            )}
          />
        </Animated.View>

        {/* Hijri Date */}
        <Animated.View entering={animation(200)}>
          <HijriCard />
        </Animated.View>

        {/* Prayer Times */}
        <Animated.View entering={animation(300)}>
          <SectionTitle
            label={t("home.sectionTitles.prayerTimes", "Prayer Times")}
            icon="time-outline"
          />
          <PrayerTimes />
        </Animated.View>

        {/* Daily Verse */}
        {/* <Animated.View entering={animation(400)}>
          <SectionTitle label="Daily Verse" icon="star-outline" />
          <DailyVerse />
        </Animated.View> */}

        {/* Continue Reading */}
        {/* <Animated.View entering={animation(500)}>
          <SectionTitle label="Continue Reading" icon="book-outline" />

          <EmptyState
            icon="book-outline"
            title="Start your journey"
            subtitle="Open the Quran and your reading progress will appear here."
            buttonLabel="Open Quran"
            buttonIcon="book"
          />
        </Animated.View> */}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeArea>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(16),
  },
  bottomSpacer: {
    height: verticalScale(24),
  },
});
