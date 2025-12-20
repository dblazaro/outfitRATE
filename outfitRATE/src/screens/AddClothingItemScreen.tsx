import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useWardrobe } from '../contexts/WardrobeContext';
import { useAuth } from '../contexts/AuthContext';
import { ClothingCategory, ClothingType, Season } from '../types';
import { COLORS, FONTS, SPACING, SCREEN_PADDING, BORDER_RADIUS } from '../constants/theme';

export const AddClothingItemScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { addClothingItem } = useWardrobe();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<ClothingCategory>(ClothingCategory.TOP);
  const [type, setType] = useState<ClothingType>(ClothingType.TSHIRT);
  const [color, setColor] = useState('#000000');
  const [loading, setLoading] = useState(false);

  const categories = [
    { value: ClothingCategory.TOP, label: 'Top', icon: '👕' },
    { value: ClothingCategory.BOTTOM, label: 'Bottom', icon: '👖' },
    { value: ClothingCategory.SHOES, label: 'Calçado', icon: '👟' },
    { value: ClothingCategory.OUTERWEAR, label: 'Casaco', icon: '🧥' },
    { value: ClothingCategory.ACCESSORIES, label: 'Acessório', icon: '🎒' },
  ];

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Precisamos de acesso à galeria');
      return;
    }

    const result = await ImagePicker.launchImagePickerAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = async () => {
    if (!name || !imageUri || !user) {
      Alert.alert('Erro', 'Preencha o nome e adicione uma imagem');
      return;
    }

    setLoading(true);
    try {
      await addClothingItem({
        userId: user.id,
        name,
        brand: brand || undefined,
        category,
        type,
        color: [color],
        imageUrl: imageUri,
        favorited: false,
      });

      Alert.alert('Sucesso! 🎉', 'Peça adicionada ao guarda-roupa');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível adicionar a peça');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Image Picker */}
      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.image} resizeMode="cover" />
        ) : (
          <View style={styles.imagePlaceholder}>
            <Text style={styles.imagePlaceholderIcon}>📷</Text>
            <Text style={styles.imagePlaceholderText}>Adicionar Foto</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Form */}
      <Card style={styles.form}>
        <Input
          label="Nome da Peça *"
          placeholder="Ex: Camiseta Básica Preta"
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Marca"
          placeholder="Ex: Nike, Adidas..."
          value={brand}
          onChangeText={setBrand}
        />

        {/* Category Selector */}
        <View>
          <Text style={styles.label}>Categoria</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat.value}
                style={[
                  styles.categoryChip,
                  category === cat.value && styles.categoryChipActive,
                ]}
                onPress={() => setCategory(cat.value)}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text
                  style={[
                    styles.categoryLabel,
                    category === cat.value && styles.categoryLabelActive,
                  ]}
                >
                  {cat.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Color Picker (Simple) */}
        <View>
          <Text style={styles.label}>Cor Principal</Text>
          <View style={styles.colorPicker}>
            {['#000000', '#FFFFFF', '#FF0000', '#0000FF', '#00FF00', '#FFFF00'].map((c) => (
              <TouchableOpacity
                key={c}
                style={[
                  styles.colorOption,
                  { backgroundColor: c },
                  color === c && styles.colorOptionActive,
                  c === '#FFFFFF' && styles.colorOptionWhite,
                ]}
                onPress={() => setColor(c)}
              />
            ))}
          </View>
        </View>
      </Card>

      {/* Actions */}
      <Button
        title="Adicionar ao Guarda-roupa"
        onPress={handleSave}
        loading={loading}
        fullWidth
      />
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
  imagePicker: {
    width: '100%',
    height: 300,
    borderRadius: BORDER_RADIUS.xl,
    overflow: 'hidden',
    marginBottom: SPACING.lg,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    flex: 1,
    backgroundColor: COLORS.gray100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderIcon: {
    fontSize: 48,
    marginBottom: SPACING.sm,
  },
  imagePlaceholderText: {
    fontSize: FONTS.size.base,
    color: COLORS.textMuted,
    fontWeight: FONTS.weight.semibold,
  },
  form: {
    gap: SPACING.lg,
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: SPACING.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: BORDER_RADIUS.lg,
    backgroundColor: COLORS.gray100,
    gap: SPACING.xs,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryIcon: {
    fontSize: 20,
  },
  categoryLabel: {
    fontSize: FONTS.size.sm,
    fontWeight: FONTS.weight.semibold,
    color: COLORS.text,
  },
  categoryLabelActive: {
    color: COLORS.textLight,
  },
  colorPicker: {
    flexDirection: 'row',
    gap: SPACING.md,
  },
  colorOption: {
    width: 40,
    height: 40,
    borderRadius: BORDER_RADIUS.full,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  colorOptionActive: {
    borderColor: COLORS.accent,
    borderWidth: 3,
  },
  colorOptionWhite: {
    borderWidth: 1,
    borderColor: COLORS.gray300,
  },
});
