import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { useAuth } from '../contexts/AuthContext';
import { useWardrobe } from '../contexts/WardrobeContext';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { outfitRatingService } from '../services/outfitRatingService';
import { weatherService } from '../services/weatherService';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const OutfitCaptureScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { addOutfit } = useWardrobe();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria de fotos');
      return;
    }

    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const analyzeOutfit = async () => {
    if (!imageUri || !user) return;

    setAnalyzing(true);
    try {
      // Get location and weather
      let temperature: number | undefined;
      let location: string | undefined;

      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === 'granted') {
          const locationData = await Location.getCurrentPositionAsync({});
          const weatherData = await weatherService.getCurrentWeather(
            locationData.coords.latitude,
            locationData.coords.longitude
          );
          temperature = weatherData.temperature;
          location = weatherData.location;
        }
      } catch (error) {
        console.log('Could not get location/weather', error);
      }

      // Rate the outfit using AI
      const rating = await outfitRatingService.rateOutfit(imageUri);

      // Save outfit
      await addOutfit({
        userId: user.id,
        items: [], // In production, detect items from image
        imageUrl: imageUri,
        rating,
        temperature,
        location,
        tags: ['outfit', 'style'],
      });

      Alert.alert(
        'Outfit Avaliado! 🎉',
        `Você recebeu ${rating.score.toFixed(1)} de 10`,
        [
          {
            text: 'Ver Detalhes',
            onPress: () => {
              navigation.goBack();
              // Navigate to outfit details would go here
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível avaliar o outfit. Tente novamente.');
      console.error('Error analyzing outfit:', error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {!imageUri ? (
          <Card style={styles.captureCard}>
            <Text style={styles.captureIcon}>📸</Text>
            <Text style={styles.captureTitle}>Capture seu Outfit</Text>
            <Text style={styles.captureText}>
              Tire uma foto ou selecione uma da galeria para receber uma avaliação detalhada
            </Text>

            <View style={styles.buttonGroup}>
              <Button
                title="Tirar Foto"
                onPress={takePhoto}
                fullWidth
                variant="primary"
              />
              <Button
                title="Escolher da Galeria"
                onPress={pickImage}
                fullWidth
                variant="outline"
              />
            </View>
          </Card>
        ) : (
          <View style={styles.previewContainer}>
            <Image source={{ uri: imageUri }} style={styles.preview} resizeMode="cover" />

            {analyzing && (
              <View style={styles.analyzingOverlay}>
                <ActivityIndicator size="large" color={COLORS.textLight} />
                <Text style={styles.analyzingText}>Analisando seu outfit...</Text>
              </View>
            )}
          </View>
        )}
      </View>

      {imageUri && !analyzing && (
        <View style={styles.footer}>
          <Button
            title="Escolher Outra Foto"
            onPress={() => setImageUri(null)}
            variant="ghost"
            fullWidth
          />
          <Button
            title="Avaliar Outfit"
            onPress={analyzeOutfit}
            fullWidth
            style={styles.analyzeButton}
          />
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
  content: {
    flex: 1,
    padding: SCREEN_PADDING,
    justifyContent: 'center',
  },
  captureCard: {
    alignItems: 'center',
    padding: SPACING['2xl'],
  },
  captureIcon: {
    fontSize: 64,
    marginBottom: SPACING.md,
  },
  captureTitle: {
    fontSize: FONTS.size['2xl'],
    fontWeight: FONTS.weight.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    textAlign: 'center',
  },
  captureText: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  buttonGroup: {
    width: '100%',
    gap: SPACING.md,
  },
  previewContainer: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
  },
  preview: {
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.gray100,
  },
  analyzingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: COLORS.overlay,
    justifyContent: 'center',
    alignItems: 'center',
    gap: SPACING.md,
  },
  analyzingText: {
    fontSize: FONTS.size.lg,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.textLight,
  },
  footer: {
    padding: SCREEN_PADDING,
    gap: SPACING.sm,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.gray200,
  },
  analyzeButton: {
    marginTop: SPACING.sm,
  },
});
