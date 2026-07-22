import { memo } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, StyleSheet, View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { verticalScale } from "react-native-size-matters";

// ── Star data ─────────────────────────────────────────────────────────────
const STARS = [
  // top area — denser near moon
  { top: 0.02, left: 0.06, size: 1.2, opacity: 0.55 },
  { top: 0.05, left: 0.28, size: 2.2, opacity: 0.65 },
  { top: 0.03, left: 0.5, size: 1.4, opacity: 0.45 },
  { top: 0.08, left: 0.38, size: 1.8, opacity: 0.55 },
  { top: 0.06, left: 0.62, size: 1.2, opacity: 0.4 },
  { top: 0.04, left: 0.82, size: 2.5, opacity: 0.6 },
  { top: 0.1, left: 0.18, size: 2, opacity: 0.5 },
  { top: 0.12, left: 0.72, size: 1.4, opacity: 0.35 },
  { top: 0.13, left: 0.9, size: 1.8, opacity: 0.5 },
  // mid spread
  { top: 0.17, left: 0.05, size: 1.4, opacity: 0.3 },
  { top: 0.18, left: 0.46, size: 1.2, opacity: 0.28 },
  { top: 0.2, left: 0.78, size: 2, opacity: 0.35 },
  { top: 0.23, left: 0.3, size: 1.5, opacity: 0.3 },
  { top: 0.25, left: 0.88, size: 1.2, opacity: 0.28 },
  { top: 0.28, left: 0.58, size: 1.8, opacity: 0.25 },
  { top: 0.3, left: 0.14, size: 2.2, opacity: 0.22 },
  { top: 0.32, left: 0.7, size: 1.2, opacity: 0.2 },
];

// ── Simple dot star ───────────────────────────────────────────────────────
const Star = memo(function Star({
  size,
  color,
  opacity,
}: {
  size: number;
  color: string;
  opacity: number;
}) {
  const s = size;
  return (
    <View
      style={{
        width: s * 7,
        height: s * 7,
        alignItems: "center",
        justifyContent: "center",
        opacity,
      }}
    >
      {/* Vertical */}
      <View
        style={{
          position: "absolute",
          width: s * 0.8,
          height: s * 7,
          borderRadius: s,
          backgroundColor: color,
        }}
      />
      {/* Horizontal */}
      <View
        style={{
          position: "absolute",
          width: s * 7,
          height: s * 0.8,
          borderRadius: s,
          backgroundColor: color,
        }}
      />
      {/* Diag 1 */}
      <View
        style={{
          position: "absolute",
          width: s * 5,
          height: s * 0.6,
          borderRadius: s,
          backgroundColor: color,
          transform: [{ rotate: "45deg" }],
        }}
      />
      {/* Diag 2 */}
      <View
        style={{
          position: "absolute",
          width: s * 5,
          height: s * 0.6,
          borderRadius: s,
          backgroundColor: color,
          transform: [{ rotate: "-45deg" }],
        }}
      />
      {/* Center dot */}
      <View
        style={{
          position: "absolute",
          width: s * 1.6,
          height: s * 1.6,
          borderRadius: s,
          backgroundColor: color,
        }}
      />
    </View>
  );
});

// ── Crescent moon ─────────────────────────────────────────────────────────
const CrescentMoon = memo(function CrescentMoon({ moonColor }: { moonColor: string }) {
  return (
    <View style={{ transform: [{ rotate: "-15deg" }] }}>
      <FontAwesome5 name="moon" solid size={34} color={moonColor} />
    </View>
  );
});

// ── Glowing dot (tiny sparkle) ────────────────────────────────────────────
const Sparkle = memo(function Sparkle({
  color,
  size,
  opacity,
}: {
  color: string;
  size: number;
  opacity: number;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        opacity,
        ...(Platform.OS === "ios"
          ? {
              shadowColor: color,
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: 0.9,
              shadowRadius: size,
            }
          : {
              elevation: 2,
            }),
      }}
    />
  );
});

// ── Geometric ring ────────────────────────────────────────────────────────
const Ring = memo(function Ring({
  radius,
  color,
  opacity,
  borderWidth = 1,
}: {
  radius: number;
  color: string;
  opacity: number;
  borderWidth?: number;
}) {
  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        borderWidth,
        borderColor: color,
        opacity,
      }}
    />
  );
});

function Background() {
  const { width, height } = useWindowDimensions();
  const { activeScheme } = useAppTheme();
  const isDark = activeScheme === "dark";
  const insets = useSafeAreaInsets();

  // We add verticalScale(70) so that all decorative elements start below the Header component
  const top = insets.top + verticalScale(70);

  const starColor = isDark ? "#C8D8CE" : "#3A7D56";
  const moonColor = isDark ? "#E8B84B" : "#B8823D";
  const accentGlow = isDark ? "#4DBF8A" : "#3A7D56";

  const gradientColors: [string, string, string] = isDark
    ? ["#0A1C11", "#102218", "#0E2016"]
    : ["#E8F2EA", "#F2E9DD", "#EDE4D4"];

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {/* ── Base gradient ── */}
      <LinearGradient
        colors={gradientColors}
        start={{ x: 0.1, y: 0 }}
        end={{ x: 0.9, y: 1 }}
        style={StyleSheet.absoluteFill}
      />

      {/* Top accent gradient removed */}

      {/* ── Large glow orb top-right (behind moon) ── */}
      <View
        style={{
          position: "absolute",
          top: insets.top - height * 0.01,
          right: -width * 0.15,
          width: width * 0.55,
          height: width * 0.55,
          borderRadius: width * 0.275,
          backgroundColor: moonColor,
          opacity: isDark ? 0.04 : 0.06,
        }}
      />

      {/* ── Crescent moon ── */}
      <View
        style={{
          position: "absolute",
          top: insets.top + height * 0.03,
          right: width * 0.08,
        }}
      >
        <CrescentMoon moonColor={moonColor} />
      </View>

      {/* ── 8-pointed star near moon ── */}
      <View
        style={{
          position: "absolute",
          top: top + height * 0.035,
          right: width * 0.26,
        }}
      >
        <Star size={2.2} color={starColor} opacity={0.7} />
      </View>

      {/* ── Stars scattered ── */}
      {STARS.map((s, i) => (
        <View
          key={`star-${s.top}-${s.left}-${i}`}
          style={{
            position: "absolute",
            top: top + s.top * height,
            left: s.left * width,
          }}
        >
          <Star size={s.size} color={starColor} opacity={s.opacity} />
        </View>
      ))}

      {/* ── Sparkle dots (tiny glowing points) ── */}
      <View
        style={{
          position: "absolute",
          top: top + height * 0.025,
          left: width * 0.42,
        }}
      >
        <Sparkle color={moonColor} size={4} opacity={0.6} />
      </View>
      <View
        style={{
          position: "absolute",
          top: top + height * 0.07,
          left: width * 0.6,
        }}
      >
        <Sparkle color={starColor} size={3} opacity={0.5} />
      </View>
      <View
        style={{
          position: "absolute",
          top: top + height * 0.13,
          left: width * 0.88,
        }}
      >
        <Sparkle color={moonColor} size={3} opacity={0.45} />
      </View>
      <View
        style={{
          position: "absolute",
          top: top + height * 0.2,
          left: width * 0.07,
        }}
      >
        <Sparkle color={starColor} size={3} opacity={0.35} />
      </View>
      <View
        style={{
          position: "absolute",
          top: top + height * 0.25,
          left: width * 0.5,
        }}
      >
        <Sparkle color={moonColor} size={2.5} opacity={0.3} />
      </View>

      {/* ── Concentric rings (top-right Islamic geometry) ── */}
      <View
        style={{
          position: "absolute",
          top: top - height * 0.01,
          right: -width * 0.08,
        }}
      >
        <Ring
          radius={width * 0.28}
          color={starColor}
          opacity={0.05}
          borderWidth={1}
        />
      </View>
      <View
        style={{
          position: "absolute",
          top: top - height * 0.01 + width * 0.1,
          right: -width * 0.18,
        }}
      >
        <Ring
          radius={width * 0.28}
          color={starColor}
          opacity={0.04}
          borderWidth={1}
        />
      </View>

      {/* ── Bottom-left decorative ring ── */}
      <View
        style={{
          position: "absolute",
          top: top + height * 0.28,
          left: -width * 0.25,
        }}
      >
        <Ring
          radius={width * 0.38}
          color={accentGlow}
          opacity={0.04}
          borderWidth={1.5}
        />
      </View>
    </View>
  );
}

export default memo(Background);

