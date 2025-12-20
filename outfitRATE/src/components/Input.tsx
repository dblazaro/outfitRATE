import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextInputProps,
} from 'react-native';
import { COLORS, FONTS, SPACING, BORDER_RADIUS } from '../constants/theme';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: ViewStyle;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  containerStyle,
  style,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View
        style={[
          styles.inputContainer,
          isFocused && styles.inputContainerFocused,
          error && styles.inputContainerError,
        ]}
      >
        {leftIcon && <View style={styles.icon}>{leftIcon}</View>}
        <TextInput
          style={[styles.input, style]}
          placeholderTextColor={COLORS.textMuted}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...textInputProps}
        />
        {rightIcon && <View style={styles.icon}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
      {helperText && !error && <Text style={styles.helperText}>{helperText}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.gray100,
    borderRadius: BORDER_RADIUS.lg,
    borderWidth: 2,
    borderColor: 'transparent',
    paddingHorizontal: SPACING.md,
  },
  inputContainerFocused: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.secondary,
  },
  inputContainerError: {
    borderColor: COLORS.error,
  },
  input: {
    flex: 1,
    fontSize: FONTS.size.base,
    color: COLORS.text,
    paddingVertical: SPACING.md,
  },
  icon: {
    marginHorizontal: SPACING.xs,
  },
  errorText: {
    fontSize: FONTS.size.xs,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
  helperText: {
    fontSize: FONTS.size.xs,
    color: COLORS.textMuted,
    marginTop: SPACING.xs,
  },
});
