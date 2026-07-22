import { FontSizeScale } from "@/store/fontStore";


export const FONT_SCALE_MULTIPLIER: Record<FontSizeScale, number> = {
  small: 0.94,
  default: 1,
  large: 1.15,
} as const;


