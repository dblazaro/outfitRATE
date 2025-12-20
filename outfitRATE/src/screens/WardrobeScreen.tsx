import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useWardrobe } from '../contexts/WardrobeContext';
import { ClothingItemCard } from '../components/ClothingItemCard';
import { Button } from '../components/Button';
import { ClothingCategory } from '../types';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const WardrobeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { clothingItems, toggleFavorite } = useWardrobe();
  const [selectedCategory, setSelectedCategory] = useState<ClothingCategory | 'all'>('all');

  const categories = [
    { key: 'all', label: 'Todos', icon: '👔' },
    { key: ClothingCategory.TOP, label: 'Tops', icon: '👕' },
    { key: ClothingCategory.BOTTOM, label: 'Bottoms', icon: '👖' },
    { key: ClothingCategory.SHOES, label: 'Calçados', icon: '👟' },
    { key: ClothingCategory.OUTERWEAR, label: 'Casacos', icon: '🧥' },
    { key: ClothingCategory.ACCESSORIES, label: 'Acessórios', icon: '🎒' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? clothingItems
    : clothingItems.filter(item => item.category === selectedCategory);

  const favoriteItems = clothingItems.filter(item => item.favorited);

  return (
    <View style={styles.container}>
      {/* Categories */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.key}
            style={[
              styles.categoryChip,
              selectedCategory === category.key && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.key as ClothingCategory | 'all')}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryLabel,
                selectedCategory === category.key && styles.categoryLabelActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Stats */}
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{clothingItems.length}</Text>
          <Text style={styles.statLabel}>Peças</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{favoriteItems.length}</Text>
          <Text style={styles.statLabel}>Favoritas</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statValue}>{filteredItems.length}</Text>
          <Text style={styles.statLabel}>Filtradas</Text>
        </View>
      </View>

      {/* Items Grid */}
      {filteredItems.length > 0 ? (
        <FlatList
          data={filteredItems}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ClothingItemCard
                item={item}
                onPress={() =>
                  navigation.navigate('ClothingItemDetail' as never, { itemId: item.id } as never)
                }
                onFavorite={() => toggleFavorite(item.id)}
              />
            </View>
          )}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.grid}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>
            {selectedCategory === 'all' ? '👕' : categories.find(c => c.key === selectedCategory)?.icon}
          </Text>
          <Text style={styles.emptyStateTitle}>
            {selectedCategory === 'all' ? 'Guarda-roupa vazio' : 'Nenhuma peça nesta categoria'}
          </Text>
          <Text style={styles.emptyStateText}>
            Adicione suas peças favoritas para receber sugestões personalizadas
          </Text>
          <Button
            title="Adicionar Peça"
            onPress={() => navigation.navigate('AddClothingItem' as never)}
            style={styles.emptyStateButton}
          />
        </View>
      )}

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddClothingItem' as never)}
      >
        <Text style={styles.fabIcon}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  categoriesContainer: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  categoriesContent: {
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: 20,
    backgroundColor: COLORS.gray100,
    gap: SPACING.xs,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 18,
  },
  categoryLabel: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
  },
  categoryLabelActive: {
    color: COLORS.textLight,
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: SCREEN_PADDING,
    paddingVertical: SPACING.lg,
    backgroundColor: COLORS.card,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
  },
  stat: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.text,
  },
  statLabel: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  grid: {
    padding: SCREEN_PADDING,
    paddingBottom: 80,
  },
  itemContainer: {
    flex: 1,
    maxWidth: '50%',
    padding: SPACING.xs,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SCREEN_PADDING,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  emptyStateTitle: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.lg,
  },
  emptyStateButton: {
    marginTop: SPACING.md,
  },
  fab: {
    position: 'absolute',
    bottom: SPACING.xl,
    right: SPACING.xl,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: COLORS.accent,
    justifyContent: 'center',
    alignItems: 'center',
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  fabIcon: {
    fontSize: 32,
    color: COLORS.textLight,
    fontWeight: FONTS.weight.bold,
  },
});
