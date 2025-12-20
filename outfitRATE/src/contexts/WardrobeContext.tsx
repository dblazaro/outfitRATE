import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ClothingItem, Outfit } from '../types';

interface WardrobeContextData {
  clothingItems: ClothingItem[];
  outfits: Outfit[];
  loading: boolean;
  addClothingItem: (item: Omit<ClothingItem, 'id' | 'createdAt'>) => Promise<void>;
  updateClothingItem: (id: string, item: Partial<ClothingItem>) => Promise<void>;
  deleteClothingItem: (id: string) => Promise<void>;
  toggleFavorite: (id: string) => Promise<void>;
  addOutfit: (outfit: Omit<Outfit, 'id' | 'date' | 'likes' | 'comments'>) => Promise<void>;
  updateOutfit: (id: string, outfit: Partial<Outfit>) => Promise<void>;
  deleteOutfit: (id: string) => Promise<void>;
  toggleLike: (outfitId: string, userId: string) => Promise<void>;
  getItemById: (id: string) => ClothingItem | undefined;
  getOutfitById: (id: string) => Outfit | undefined;
}

const WardrobeContext = createContext<WardrobeContextData>({} as WardrobeContextData);

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within a WardrobeProvider');
  }
  return context;
};

interface WardrobeProviderProps {
  children: ReactNode;
}

export const WardrobeProvider: React.FC<WardrobeProviderProps> = ({ children }) => {
  const [clothingItems, setClothingItems] = useState<ClothingItem[]>([]);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [storedItems, storedOutfits] = await Promise.all([
        AsyncStorage.getItem('@outfitRATE:items'),
        AsyncStorage.getItem('@outfitRATE:outfits'),
      ]);

      if (storedItems) setClothingItems(JSON.parse(storedItems));
      if (storedOutfits) setOutfits(JSON.parse(storedOutfits));
    } catch (error) {
      console.error('Error loading wardrobe data:', error);
    } finally {
      setLoading(false);
    }
  };

  const addClothingItem = async (itemData: Omit<ClothingItem, 'id' | 'createdAt'>) => {
    try {
      const newItem: ClothingItem = {
        ...itemData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
      };

      const updatedItems = [...clothingItems, newItem];
      await AsyncStorage.setItem('@outfitRATE:items', JSON.stringify(updatedItems));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error adding clothing item:', error);
      throw new Error('Erro ao adicionar peça');
    }
  };

  const updateClothingItem = async (id: string, itemData: Partial<ClothingItem>) => {
    try {
      const updatedItems = clothingItems.map((item) =>
        item.id === id ? { ...item, ...itemData } : item
      );
      await AsyncStorage.setItem('@outfitRATE:items', JSON.stringify(updatedItems));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error updating clothing item:', error);
      throw new Error('Erro ao atualizar peça');
    }
  };

  const deleteClothingItem = async (id: string) => {
    try {
      const updatedItems = clothingItems.filter((item) => item.id !== id);
      await AsyncStorage.setItem('@outfitRATE:items', JSON.stringify(updatedItems));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error deleting clothing item:', error);
      throw new Error('Erro ao deletar peça');
    }
  };

  const toggleFavorite = async (id: string) => {
    try {
      const updatedItems = clothingItems.map((item) =>
        item.id === id ? { ...item, favorited: !item.favorited } : item
      );
      await AsyncStorage.setItem('@outfitRATE:items', JSON.stringify(updatedItems));
      setClothingItems(updatedItems);
    } catch (error) {
      console.error('Error toggling favorite:', error);
      throw new Error('Erro ao favoritar peça');
    }
  };

  const addOutfit = async (outfitData: Omit<Outfit, 'id' | 'date' | 'likes' | 'comments'>) => {
    try {
      const newOutfit: Outfit = {
        ...outfitData,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        likes: [],
        comments: [],
      };

      const updatedOutfits = [newOutfit, ...outfits];
      await AsyncStorage.setItem('@outfitRATE:outfits', JSON.stringify(updatedOutfits));
      setOutfits(updatedOutfits);
    } catch (error) {
      console.error('Error adding outfit:', error);
      throw new Error('Erro ao adicionar outfit');
    }
  };

  const updateOutfit = async (id: string, outfitData: Partial<Outfit>) => {
    try {
      const updatedOutfits = outfits.map((outfit) =>
        outfit.id === id ? { ...outfit, ...outfitData } : outfit
      );
      await AsyncStorage.setItem('@outfitRATE:outfits', JSON.stringify(updatedOutfits));
      setOutfits(updatedOutfits);
    } catch (error) {
      console.error('Error updating outfit:', error);
      throw new Error('Erro ao atualizar outfit');
    }
  };

  const deleteOutfit = async (id: string) => {
    try {
      const updatedOutfits = outfits.filter((outfit) => outfit.id !== id);
      await AsyncStorage.setItem('@outfitRATE:outfits', JSON.stringify(updatedOutfits));
      setOutfits(updatedOutfits);
    } catch (error) {
      console.error('Error deleting outfit:', error);
      throw new Error('Erro ao deletar outfit');
    }
  };

  const toggleLike = async (outfitId: string, userId: string) => {
    try {
      const updatedOutfits = outfits.map((outfit) => {
        if (outfit.id === outfitId) {
          const likes = outfit.likes.includes(userId)
            ? outfit.likes.filter((id) => id !== userId)
            : [...outfit.likes, userId];
          return { ...outfit, likes };
        }
        return outfit;
      });
      await AsyncStorage.setItem('@outfitRATE:outfits', JSON.stringify(updatedOutfits));
      setOutfits(updatedOutfits);
    } catch (error) {
      console.error('Error toggling like:', error);
      throw new Error('Erro ao curtir outfit');
    }
  };

  const getItemById = (id: string) => clothingItems.find((item) => item.id === id);
  const getOutfitById = (id: string) => outfits.find((outfit) => outfit.id === id);

  return (
    <WardrobeContext.Provider
      value={{
        clothingItems,
        outfits,
        loading,
        addClothingItem,
        updateClothingItem,
        deleteClothingItem,
        toggleFavorite,
        addOutfit,
        updateOutfit,
        deleteOutfit,
        toggleLike,
        getItemById,
        getOutfitById,
      }}
    >
      {children}
    </WardrobeContext.Provider>
  );
};
