import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { useWardrobe } from '../contexts/WardrobeContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { clothingItems, outfits } = useWardrobe();

  const handleSignOut = () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: signOut, style: 'destructive' },
      ]
    );
  };

  const averageRating = outfits.length > 0
    ? outfits.reduce((sum, o) => sum + (o.rating?.score || 0), 0) / outfits.length
    : 0;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Profile Header */}
      <Card style={styles.profileCard}>
        <Image
          source={{ uri: user?.avatar || 'https://i.pravatar.cc/150' }}
          style={styles.avatar}
        />
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{clothingItems.length}</Text>
            <Text style={styles.statLabel}>Peças</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{outfits.length}</Text>
            <Text style={styles.statLabel}>Outfits</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{averageRating.toFixed(1)}</Text>
            <Text style={styles.statLabel}>Média</Text>
          </View>
        </View>
      </Card>

      {/* Preferences */}
      {user?.preferences && (
        <Card style={styles.section}>
          <Text style={styles.sectionTitle}>Preferências de Estilo</Text>
          {user.preferences.styles.length > 0 && (
            <View style={styles.preferenceGroup}>
              <Text style={styles.preferenceLabel}>Estilos</Text>
              <View style={styles.tags}>
                {user.preferences.styles.map((style, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{style}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          {user.preferences.brands.length > 0 && (
            <View style={styles.preferenceGroup}>
              <Text style={styles.preferenceLabel}>Marcas Favoritas</Text>
              <View style={styles.tags}>
                {user.preferences.brands.map((brand, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{brand}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
        </Card>
      )}

      {/* Settings */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações</Text>
        <Button
          title="Editar Perfil"
          variant="outline"
          fullWidth
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          style={styles.settingButton}
        />
        <Button
          title="Preferências"
          variant="outline"
          fullWidth
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          style={styles.settingButton}
        />
        <Button
          title="Notificações"
          variant="outline"
          fullWidth
          onPress={() => Alert.alert('Em breve', 'Funcionalidade em desenvolvimento')}
          style={styles.settingButton}
        />
      </Card>

      {/* Sign Out */}
      <Button
        title="Sair"
        variant="ghost"
        onPress={handleSignOut}
        style={styles.signOutButton}
      />

      <Text style={styles.version}>outfitRATE v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    padding: SCREEN_PADDING,
    paddingBottom: SPACING['3xl'],
  },
  profileCard: {
    alignItems: 'center',
    padding: SPACING.xl,
    marginBottom: SPACING.lg,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.gray200,
    marginBottom: SPACING.md,
  },
  name: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  email: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.lg,
  },
  stats: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    paddingTop: SPACING.lg,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  stat: {
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
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  preferenceGroup: {
    marginBottom: SPACING.md,
  },
  preferenceLabel: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.xs,
  },
  tag: {
    backgroundColor: COLORS.gray100,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: 16,
  },
  tagText: {
    fontSize: FONTS.size.sm,
    color: COLORS.text,
    fontWeight: FONTS.weight.medium,
  },
  settingButton: {
    marginBottom: SPACING.sm,
  },
  signOutButton: {
    marginTop: SPACING.lg,
  },
  version: {
    fontSize: FONTS.size.xs,
    color: COLORS.textMuted,
    textAlign: 'center',
    marginTop: SPACING.xl,
  },
});
