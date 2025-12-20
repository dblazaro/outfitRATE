import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useWardrobe } from '../contexts/WardrobeContext';
import { useAuth } from '../contexts/AuthContext';
import { OutfitCard } from '../components/OutfitCard';
import { Card } from '../components/Card';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const SocialScreen: React.FC = () => {
  const { user } = useAuth();
  const { outfits, toggleLike } = useWardrobe();
  const [activeTab, setActiveTab] = useState<'feed' | 'friends'>('feed');

  // In production, this would fetch from a social feed API
  const socialOutfits = outfits;

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'feed' && styles.tabActive]}
          onPress={() => setActiveTab('feed')}
        >
          <Text style={[styles.tabText, activeTab === 'feed' && styles.tabTextActive]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'friends' && styles.tabActive]}
          onPress={() => setActiveTab('friends')}
        >
          <Text style={[styles.tabText, activeTab === 'friends' && styles.tabTextActive]}>
            Amigos
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'feed' ? (
        <ScrollView style={styles.content} contentContainerStyle={styles.feed}>
          {socialOutfits.length > 0 ? (
            socialOutfits.map((outfit) => (
              <OutfitCard
                key={outfit.id}
                outfit={outfit}
                onLike={() => user && toggleLike(outfit.id, user.id)}
              />
            ))
          ) : (
            <Card style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>👥</Text>
              <Text style={styles.emptyStateTitle}>Feed vazio</Text>
              <Text style={styles.emptyStateText}>
                Adicione amigos para ver os outfits deles aqui!
              </Text>
            </Card>
          )}
        </ScrollView>
      ) : (
        <View style={styles.content}>
          <Card style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>👯</Text>
            <Text style={styles.emptyStateTitle}>Conecte-se com amigos</Text>
            <Text style={styles.emptyStateText}>
              Em breve você poderá adicionar amigos, ver os outfits deles e receber sugestões!
            </Text>
          </Card>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray200,
    backgroundColor: COLORS.background,
  },
  tab: {
    flex: 1,
    paddingVertical: SPACING.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: {
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    fontSize: FONTS.size.base,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.textMuted,
  },
  tabTextActive: {
    color: COLORS.primary,
  },
  content: {
    flex: 1,
  },
  feed: {
    padding: SCREEN_PADDING,
    paddingBottom: SPACING['3xl'],
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING['2xl'],
    margin: SCREEN_PADDING,
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
  },
});
