import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ClothingItem } from '../types';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface ClothingItemCardProps {
  item: ClothingItem;
  onPress?: () => void;
  onFavorite?: () => void;
  compact?: boolean;
}

export const ClothingItemCard: React.FC<ClothingItemCardProps> = ({
  item,
  onPress,
  onFavorite,
  compact = false,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, compact && styles.compactCard]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image
        source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
        style={[styles.image, compact && styles.compactImage]}
        resizeMode="cover"
      />
      {!compact && (
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.category} numberOfLines={1}>
                {item.type}
              </Text>
            </View>
            <TouchableOpacity onPress={onFavorite} style={styles.favoriteButton}>
              <Text style={styles.favoriteIcon}>{item.favorited ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>
          {item.brand && <Text style={styles.brand}>{item.brand}</Text>}
          <View style={styles.colorContainer}>
            {item.color.slice(0, 3).map((color, index) => (
              <View
                key={index}
                style={[styles.colorDot, { backgroundColor: color }]}
              />
            ))}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.md,
  },
  compactCard: {
    width: 100,
  },
  image: {
    width: '100%',
    height: 200,
    backgroundColor: COLORS.gray100,
  },
  compactImage: {
    height: 100,
  },
  content: {
    padding: SPACING.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: SPACING.xs,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: 2,
  },
  category: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textTransform: 'capitalize',
  },
  brand: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xs,
  },
  favoriteButton: {
    padding: SPACING.xs,
  },
  favoriteIcon: {
    fontSize: 20,
  },
  colorContainer: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.xs,
  },
  colorDot: {
    width: 16,
    height: 16,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
});
