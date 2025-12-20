import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  fullWidth = false,
  style,
  textStyle,
  icon,
}) => {
  const getVariantStyles = (): ViewStyle => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: COLORS.primary,
          borderWidth: 0,
        };
      case 'secondary':
        return {
          backgroundColor: COLORS.accent,
          borderWidth: 0,
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderColor: COLORS.primary,
        };
      case 'ghost':
        return {
          backgroundColor: 'transparent',
          borderWidth: 0,
        };
      default:
        return {};
    }
  };

  const getSizeStyles = (): ViewStyle => {
    switch (size) {
      case 'sm':
        return {
          paddingVertical: SPACING.sm,
          paddingHorizontal: SPACING.md,
          height: 40,
        };
      case 'md':
        return {
          paddingVertical: SPACING.md,
          paddingHorizontal: SPACING.lg,
          height: 48,
        };
      case 'lg':
        return {
          paddingVertical: SPACING.lg,
          paddingHorizontal: SPACING.xl,
          height: 56,
        };
      default:
        return {};
    }
  };

  const getTextStyles = (): TextStyle => {
    const baseStyles: TextStyle = {
      fontWeight: FONTS.weight.bold,
    };

    switch (variant) {
      case 'primary':
        baseStyles.color = COLORS.textLight;
        break;
      case 'secondary':
        baseStyles.color = COLORS.textLight;
        break;
      case 'outline':
      case 'ghost':
        baseStyles.color = COLORS.text;
        break;
    }

    switch (size) {
      case 'sm':
        baseStyles.fontSize = FONTS.size.sm;
        break;
      case 'md':
        baseStyles.fontSize = FONTS.size.base;
        break;
      case 'lg':
        baseStyles.fontSize = FONTS.size.lg;
        break;
    }

    return baseStyles;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        getVariantStyles(),
        getSizeStyles(),
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' || variant === 'secondary' ? COLORS.textLight : COLORS.text}
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyles(), textStyle]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BORDER_RADIUS.lg,
    gap: SPACING.sm,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});
