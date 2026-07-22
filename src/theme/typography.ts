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
  badge: moderateScale(10), // tiny labels, badges, pill text
  caption: moderateScale(10), // secondary info, sub-greetings, prayer times
  body: moderateScale(11), // standard body text, prayer names, button labels
  bodyMd: moderateScale(12), // medium body, card subtitles, year labels
  bodyLg: moderateScale(13), // large body, translations, section titles
  title: moderateScale(14), // card/section titles, empty state headings
  subtitle: moderateScale(15), // sub-headings
  heading: moderateScale(18), // screen-level greetings, large labels
  cardTitle: moderateScale(18), // card-level titles (e.g. Hijri month name)
  arabic: moderateScale(22), // arabic verse text
  display: moderateScale(60), // large display numbers (e.g. Hijri day number)
  splashTitle: moderateScale(28), // splash screen title
  splashSubtitle: moderateScale(13), // splash screen subtitle
};

export type ThemeFontSize = typeof fontSize;
