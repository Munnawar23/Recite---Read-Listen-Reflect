import { STORAGE_KEYS, zustandStorage } from "@/lib/storage/appStorage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type FontSizeScale = "small" | "default" | "large";

interface FontState {
  fontSizeScale: FontSizeScale;
  setFontSizeScale: (scale: FontSizeScale) => void;
}

export const useFontStore = create<FontState>()(
  persist(
    (set) => ({
      fontSizeScale: "default",
      setFontSizeScale: (scale) => set({ fontSizeScale: scale }),
    }),
    {
      name: STORAGE_KEYS.FONT_SCALE,
      storage: createJSONStorage(() => zustandStorage),
    },
  ),
);
