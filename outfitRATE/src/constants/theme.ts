// Theme constants for outfitRATE app
// Minimalist streetwear design with bold accents

export const COLORS = {
  // Primary colors - Streetwear minimalist palette
  primary: '#000000',
  secondary: '#FFFFFF',
  accent: '#FF6B6B', // Vibrant accent color
  accentBlue: '#4ECDC4',
  accentYellow: '#FFE66D',

  // Grays
  gray900: '#1A1A1A',
  gray800: '#2D2D2D',
  gray700: '#404040',
  gray600: '#525252',
  gray500: '#737373',
  gray400: '#A3A3A3',
  gray300: '#D4D4D4',
  gray200: '#E5E5E5',
  gray100: '#F5F5F5',

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',

  // Background
  background: '#FFFFFF',
  backgroundDark: '#0A0A0A',
  card: '#FFFFFF',
  cardDark: '#1A1A1A',

  // Text
  text: '#000000',
  textSecondary: '#737373',
  textLight: '#FFFFFF',
  textMuted: '#A3A3A3',

  // Glassmorphism
  glass: 'rgba(255, 255, 255, 0.1)',
  glassDark: 'rgba(0, 0, 0, 0.1)',

  // Overlay
  overlay: 'rgba(0, 0, 0, 0.5)',
  overlayLight: 'rgba(0, 0, 0, 0.3)',
};

export const FONTS = {
  // Font families
  regular: 'System',
  medium: 'System',
  bold: 'System',
  black: 'System',

  // Font sizes
  size: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
  },

  // Font weights
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    black: '900' as const,
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const BORDER_RADIUS = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999,
};

export const SHADOWS = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  xl: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const SCREEN_PADDING = SPACING.lg;

export default {
  COLORS,
  FONTS,
  SPACING,
  BORDER_RADIUS,
  SHADOWS,
  SCREEN_PADDING,
};
