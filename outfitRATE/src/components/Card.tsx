import React from 'react';
import { View, StyleSheet, ViewStyle, Platform } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, SHADOWS } from '../constants/theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'glass';
  padding?: keyof typeof SPACING;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = 'md',
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'elevated':
        return {
          backgroundColor: COLORS.card,
          ...SHADOWS.md,
        };
      case 'outlined':
        return {
          backgroundColor: COLORS.card,
          borderWidth: 1,
          borderColor: COLORS.gray200,
        };
      case 'glass':
        return {
          backgroundColor: COLORS.glass,
          borderWidth: 1,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          ...(Platform.OS === 'ios' && {
            backdropFilter: 'blur(10px)',
          }),
        };
      default:
        return {};
    }
  };

  return (
    <View
      style={[
        styles.card,
        getVariantStyles(),
        { padding: SPACING[padding] },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
  },
});
