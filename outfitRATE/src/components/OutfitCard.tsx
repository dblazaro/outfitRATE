import React from 'react';
import { View, Image, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Outfit } from '../types';
import { COLORS, FONTS, SPACING, BORDER_RADIUS, SHADOWS } from '../constants/theme';

interface OutfitCardProps {
  outfit: Outfit;
  onPress?: () => void;
  onLike?: () => void;
  showRating?: boolean;
}

export const OutfitCard: React.FC<OutfitCardProps> = ({
  outfit,
  onPress,
  onLike,
  showRating = true,
}) => {
  const isLiked = false; // TODO: Check if current user liked

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: outfit.imageUrl || 'https://via.placeholder.com/400' }}
        style={styles.image}
        resizeMode="cover"
      />

      {showRating && outfit.rating && (
        <View style={styles.ratingBadge}>
          <Text style={styles.ratingScore}>{outfit.rating.score.toFixed(1)}</Text>
          <Text style={styles.ratingLabel}>/ 10</Text>
        </View>
      )}

      <View style={styles.content}>
        {outfit.name && (
          <Text style={styles.name} numberOfLines={1}>
            {outfit.name}
          </Text>
        )}

        <View style={styles.footer}>
          <View style={styles.stats}>
            <TouchableOpacity onPress={onLike} style={styles.statItem}>
              <Text style={styles.statIcon}>{isLiked ? '❤️' : '🤍'}</Text>
              <Text style={styles.statText}>{outfit.likes.length}</Text>
            </TouchableOpacity>

            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💬</Text>
              <Text style={styles.statText}>{outfit.comments.length}</Text>
            </View>
          </View>

          {outfit.temperature && (
            <View style={styles.tempBadge}>
              <Text style={styles.tempText}>{Math.round(outfit.temperature)}°C</Text>
            </View>
          )}
        </View>

        {outfit.tags && outfit.tags.length > 0 && (
          <View style={styles.tags}>
            {outfit.tags.slice(0, 3).map((tag, index) => (
              <View key={index} style={styles.tag}>
                <Text style={styles.tagText}>#{tag}</Text>
              </View>
            ))}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.card,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    ...SHADOWS.lg,
    marginBottom: SPACING.lg,
  },
  image: {
    width: '100%',
    height: 400,
    backgroundColor: COLORS.gray100,
  },
  ratingBadge: {
    position: 'absolute',
    top: SPACING.md,
    right: SPACING.md,
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    flexDirection: 'row',
    alignItems: 'baseline',
    ...SHADOWS.lg,
  },
  ratingScore: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.textLight,
  },
  ratingLabel: {
    fontSize: FONTS.size.sm,
    color: COLORS.textLight,
    marginLeft: 2,
  },
  content: {
    padding: SPACING.md,
  },
  name: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statIcon: {
    fontSize: 18,
  },
  statText: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weight.semibold,
  },
  tempBadge: {
    backgroundColor: COLORS.accentBlue,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  tempText: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.bold,
    color: COLORS.textLight,
  },
  tags: {
    flexDirection: 'row',
    gap: SPACING.xs,
    marginTop: SPACING.sm,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: BORDER_RADIUS.md,
  },
  tagText: {
    fontSize: FONTS.size.xs,
    color: COLORS.textSecondary,
    fontWeight: FONTS.weight.medium,
  },
});
