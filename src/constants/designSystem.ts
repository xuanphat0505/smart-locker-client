/**
 * Design System Tokens
 * Centralized design constants for consistent styling across the app
 */
export const designSystem = {
  // Icon Sizes
  icon: {
    bottomNav: 24,
  },

  // Typography
  typography: {
    heading: {
      fontSize: "18px",
      fontWeight: 700,
    },
  },

  // Colors
  colors: {},

  // Spacing
  spacing: {},

  // Elevation (Shadows)
  elevation: {},

  // Border Radius
  borderRadius: {},

  // Font Families
  fonts: {},

  // Transitions
  transition: {},

  // Z-index Scale
  zIndex: {},
} as const;

// Type exports for TypeScript
export type DesignSystem = typeof designSystem;
export type IconSize = keyof typeof designSystem.icon;
export type ColorKey = keyof typeof designSystem.colors;
