import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ClothingItemCard } from '../components/ClothingItemCard';
import { useWardrobe } from '../contexts/WardrobeContext';
import { weatherService } from '../services/weatherService';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const TripPlannerScreen: React.FC = () => {
  const { clothingItems } = useWardrobe();
  const [destination, setDestination] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const generateSuggestions = async () => {
    if (!destination || !startDate || !endDate) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      // In production, this would:
      // 1. Geocode the destination
      // 2. Get weather forecast
      // 3. Suggest items based on weather and trip duration

      // Mock suggestions for demo
      const duration = Math.ceil(
        (new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 60 * 60 * 24)
      );

      const baseItems = [
        'Camisetas básicas (2-3)',
        'Calças jeans (1-2)',
        'Shorts (1-2)',
        'Tênis confortável',
        'Chinelo',
        'Roupa íntima (quantidade para ' + duration + ' dias)',
        'Meias (quantidade para ' + duration + ' dias)',
      ];

      // Add weather-dependent items
      // This would use actual weather data in production
      const weatherItems = [
        'Jaqueta leve',
        'Moletom',
        'Óculos de sol',
        'Boné',
      ];

      setSuggestions([...baseItems, ...weatherItems]);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível gerar sugestões');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const suggestedItems = clothingItems.filter(item =>
    item.favorited || ['t-shirt', 'jeans', 'sneakers'].includes(item.type)
  ).slice(0, 6);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Text style={styles.title}>Planejador de Mala</Text>
      <Text style={styles.subtitle}>
        Informe os detalhes da viagem e receba sugestões personalizadas
      </Text>

      <Card style={styles.form}>
        <Input
          label="Destino"
          placeholder="Ex: São Paulo, SP"
          value={destination}
          onChangeText={setDestination}
        />

        <Input
          label="Data de Início"
          placeholder="DD/MM/AAAA"
          value={startDate}
          onChangeText={setStartDate}
        />

        <Input
          label="Data de Término"
          placeholder="DD/MM/AAAA"
          value={endDate}
          onChangeText={setEndDate}
        />

        <Button
          title="Gerar Sugestões"
          onPress={generateSuggestions}
          loading={loading}
          fullWidth
          style={styles.submitButton}
        />
      </Card>

      {suggestions.length > 0 && (
        <Card style={styles.suggestions}>
          <Text style={styles.sectionTitle}>Itens Sugeridos</Text>
          {suggestions.map((item, index) => (
            <View key={index} style={styles.suggestionItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.suggestionText}>{item}</Text>
            </View>
          ))}
        </Card>
      )}

      {suggestedItems.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Do seu Guarda-roupa</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.itemsScroll}
          >
            {suggestedItems.map((item) => (
              <View key={item.id} style={styles.itemWrapper}>
                <ClothingItemCard item={item} compact />
              </View>
            ))}
          </ScrollView>
        </View>
      )}

      <Card style={styles.tip}>
        <Text style={styles.tipIcon}>💡</Text>
        <Text style={styles.tipText}>
          Dica: Adicione suas peças favoritas ao guarda-roupa para receber sugestões mais personalizadas!
        </Text>
      </Card>
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
  title: {
    fontSize: FONTS.size['3xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.md,
    marginBottom: SPACING.lg,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
  section: {
    marginBottom: SPACING.lg,
  },
  sectionTitle: {
    fontSize: FONTS.size.xl,
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  suggestions: {
    marginBottom: SPACING.lg,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: SPACING.sm,
  },
  bullet: {
    fontSize: FONTS.size.lg,
    color: COLORS.accent,
    marginRight: SPACING.sm,
    marginTop: -2,
  },
  suggestionText: {
    flex: 1,
    fontSize: FONTS.size.base,
    color: COLORS.text,
    lineHeight: 22,
  },
  itemsScroll: {
    gap: SPACING.md,
  },
  itemWrapper: {
    width: 100,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: SPACING.md,
    backgroundColor: COLORS.accentBlue + '20',
  },
  tipIcon: {
    fontSize: 24,
  },
  tipText: {
    flex: 1,
    fontSize: FONTS.size.sm,
    color: COLORS.text,
    lineHeight: 20,
  },
});
