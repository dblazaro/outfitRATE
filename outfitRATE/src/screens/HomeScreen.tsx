import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext';
import { useWardrobe } from '../contexts/WardrobeContext';
import { OutfitCard } from '../components/OutfitCard';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { weatherService } from '../services/weatherService';
import { WeatherData } from '../types';
import * as Location from 'expo-location';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { outfits, loading: wardrobeLoading } = useWardrobe();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  useEffect(() => {
    loadWeather();
  }, []);

  const loadWeather = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status === 'granted');

      if (status === 'granted') {
        const location = await Location.getCurrentPositionAsync({});
        const weatherData = await weatherService.getCurrentWeather(
          location.coords.latitude,
          location.coords.longitude
        );
        setWeather(weatherData);
      }
    } catch (error) {
      console.error('Error loading weather:', error);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadWeather();
    setRefreshing(false);
  };

  const recentOutfits = outfits.slice(0, 5);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Olá, {user?.name?.split(' ')[0] || 'Usuário'}!</Text>
          <Text style={styles.subtitle}>Como está seu estilo hoje?</Text>
        </View>
      </View>

      {/* Weather Card */}
      {weather && (
        <Card style={styles.weatherCard}>
          <View style={styles.weatherContent}>
            <View>
              <Text style={styles.weatherLocation}>{weather.location}</Text>
              <Text style={styles.weatherCondition}>{weather.description}</Text>
            </View>
            <View style={styles.weatherTemp}>
              <Text style={styles.weatherTempValue}>{weather.temperature}°</Text>
              <Text style={styles.weatherFeelsLike}>Sensação {weather.feelsLike}°</Text>
            </View>
          </View>
          <Text style={styles.weatherRecommendation}>
            {weather.temperature < 18
              ? '🧥 Clima para jaqueta ou moletom'
              : weather.temperature < 25
              ? '👕 Clima para camiseta e calça'
              : '🩳 Clima para roupas leves'}
          </Text>
        </Card>
      )}

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ações Rápidas</Text>
        <View style={styles.quickActions}>
          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('OutfitCapture' as never)}
          >
            <Text style={styles.quickActionIcon}>📸</Text>
            <Text style={styles.quickActionText}>Avaliar Outfit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('AddClothingItem' as never)}
          >
            <Text style={styles.quickActionIcon}>👕</Text>
            <Text style={styles.quickActionText}>Adicionar Peça</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAction}
            onPress={() => navigation.navigate('TripPlanner' as never)}
          >
            <Text style={styles.quickActionIcon}>✈️</Text>
            <Text style={styles.quickActionText}>Planejar Viagem</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Recent Outfits */}
      {recentOutfits.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Outfits Recentes</Text>
          {recentOutfits.map((outfit) => (
            <OutfitCard
              key={outfit.id}
              outfit={outfit}
              onPress={() => navigation.navigate('OutfitDetail' as never, { outfitId: outfit.id } as never)}
            />
          ))}
        </View>
      )}

      {recentOutfits.length === 0 && !wardrobeLoading && (
        <Card style={styles.emptyState}>
          <Text style={styles.emptyStateIcon}>👔</Text>
          <Text style={styles.emptyStateTitle}>Nenhum outfit ainda</Text>
          <Text style={styles.emptyStateText}>
            Tire uma foto do seu outfit e receba uma avaliação detalhada!
          </Text>
          <Button
            title="Avaliar Primeiro Outfit"
            onPress={() => navigation.navigate('OutfitCapture' as never)}
            style={styles.emptyStateButton}
          />
        </Card>
      )}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.lg,
  },
  greeting: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.text,
  },
  subtitle: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  weatherCard: {
    marginBottom: SPACING.lg,
  },
  weatherContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.md,
  },
  weatherLocation: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
  },
  weatherCondition: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    textTransform: 'capitalize',
  },
  weatherTemp: {
    alignItems: 'flex-end',
  },
  weatherTempValue: {
    fontSize: FONTS.size['4xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.text,
  },
  weatherFeelsLike: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
  },
  weatherRecommendation: {
    fontSize: FONTS.size.sm,
    color: COLORS.textSecondary,
    fontStyle: 'italic',
  },
  section: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.md,
  },
  quickAction: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: SPACING.lg,
    borderRadius: 16,
    alignItems: 'center',
    ...{
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
  },
  quickActionIcon: {
    fontSize: 32,
    marginBottom: SPACING.sm,
  },
  quickActionText: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
    textAlign: 'center',
  },
  emptyState: {
    alignItems: 'center',
    padding: SPACING['2xl'],
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
});
