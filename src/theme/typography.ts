import { moderateScale } from "react-native-size-matters";

export const fontFamily = {
  heading: "CormorantGaramond-Bold",
  body: "Nunito-Regular",
  "body-medium": "Nunito-Medium",
  "body-semibold": "Nunito-SemiBold",
  quran: "Amiri-Regular",
  "quran-bold": "Amiri-Bold",
};

// ─── Semantic Font Sizes (pre-scaled) ────────────────────────────────────
export const fontSize = {
  badge: moderateScale(11), // tiny labels, badges, pill text
  caption: moderateScale(11), // secondary info, sub-greetings, prayer times
  body: moderateScale(12), // standard body text, prayer names, button labels
  bodyMd: moderateScale(13), // medium body, card subtitles, year labels
  bodyLg: moderateScale(14), // large body, translations, section titles
  title: moderateScale(15), // card/section titles, empty state headings
  subtitle: moderateScale(16), // sub-headings
  heading: moderateScale(19), // screen-level greetings, large labels
  cardTitle: moderateScale(19), // card-level titles (e.g. Hijri month name)
  arabic: moderateScale(23), // arabic verse text
  display: moderateScale(61), // large display numbers (e.g. Hijri day number)
  splashTitle: moderateScale(29), // splash screen title
  splashSubtitle: moderateScale(14), // splash screen subtitle
};

export type ThemeFontSize = typeof fontSize;
