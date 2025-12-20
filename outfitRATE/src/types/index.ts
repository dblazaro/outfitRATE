// Type definitions for outfitRATE app

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences?: UserPreferences;
  friends?: Friend[];
}

export interface UserPreferences {
  styles: string[]; // e.g., ['streetwear', 'casual', 'sporty']
  colors: string[];
  brands: string[];
  sizes?: {
    top?: string;
    bottom?: string;
    shoes?: string;
  };
}

export interface Friend {
  id: string;
  name: string;
  avatar?: string;
  username: string;
}

export interface ClothingItem {
  id: string;
  userId: string;
  name: string;
  category: ClothingCategory;
  type: ClothingType;
  brand?: string;
  color: string[];
  imageUrl: string;
  season?: Season[];
  tags?: string[];
  purchaseDate?: string;
  price?: number;
  favorited: boolean;
  createdAt: string;
}

export enum ClothingCategory {
  TOP = 'top',
  BOTTOM = 'bottom',
  SHOES = 'shoes',
  OUTERWEAR = 'outerwear',
  ACCESSORIES = 'accessories',
}

export enum ClothingType {
  // Tops
  TSHIRT = 't-shirt',
  SHIRT = 'shirt',
  HOODIE = 'hoodie',
  SWEATER = 'sweater',
  TANK = 'tank',
  POLO = 'polo',

  // Bottoms
  JEANS = 'jeans',
  PANTS = 'pants',
  SHORTS = 'shorts',
  SKIRT = 'skirt',
  JOGGERS = 'joggers',

  // Shoes
  SNEAKERS = 'sneakers',
  BOOTS = 'boots',
  SANDALS = 'sandals',
  LOAFERS = 'loafers',

  // Outerwear
  JACKET = 'jacket',
  COAT = 'coat',
  BLAZER = 'blazer',
  VEST = 'vest',

  // Accessories
  HAT = 'hat',
  BAG = 'bag',
  BELT = 'belt',
  SUNGLASSES = 'sunglasses',
  WATCH = 'watch',
  JEWELRY = 'jewelry',
}

export enum Season {
  SPRING = 'spring',
  SUMMER = 'summer',
  FALL = 'fall',
  WINTER = 'winter',
}

export interface Outfit {
  id: string;
  userId: string;
  name?: string;
  items: string[]; // Array of ClothingItem IDs
  imageUrl?: string;
  rating?: OutfitRating;
  occasion?: string;
  temperature?: number;
  location?: string;
  date: string;
  likes: string[]; // Array of user IDs who liked
  comments: Comment[];
  tags?: string[];
}

export interface OutfitRating {
  score: number; // 0-10
  analysis: RatingAnalysis;
  ratedAt: string;
}

export interface RatingAnalysis {
  overall: string;
  strengths: string[];
  improvements: string[];
  tips: string[];
  colorHarmony: number; // 0-10
  styleCoherence: number; // 0-10
  fitAndProportion: number; // 0-10
  appropriateness: number; // 0-10
}

export interface Comment {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  text: string;
  createdAt: string;
  likes: number;
}

export interface OutfitRecommendation {
  id: string;
  outfit: string[]; // Array of ClothingItem IDs
  reason: string;
  score: number;
  temperature?: number;
  occasion?: string;
  weatherCondition?: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  icon: string;
  location: string;
}

export interface TripPacking {
  id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  duration: number; // days
  weatherForecast?: WeatherData[];
  suggestedItems: string[]; // Array of ClothingItem IDs
  packedItems: string[];
  occasions?: string[];
  notes?: string;
}

export interface GiftSuggestion {
  id: string;
  name: string;
  brand: string;
  category: ClothingCategory;
  type: ClothingType;
  price: number;
  imageUrl: string;
  purchaseUrl: string;
  matchScore: number; // How well it matches user preferences
  reason: string;
}

export interface SocialActivity {
  id: string;
  type: 'like' | 'comment' | 'outfit_post' | 'gift_received';
  userId: string;
  userName: string;
  userAvatar?: string;
  outfitId?: string;
  message?: string;
  timestamp: string;
  read: boolean;
}

export type RootStackParamList = {
  Login: undefined;
  Main: undefined;
  OutfitCapture: undefined;
  OutfitRating: { outfitId: string };
  AddClothingItem: undefined;
  EditClothingItem: { itemId: string };
  ClothingItemDetail: { itemId: string };
  OutfitDetail: { outfitId: string };
  TripPlanner: undefined;
  TripDetails: { tripId: string };
  FriendProfile: { friendId: string };
  Settings: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Wardrobe: undefined;
  Capture: undefined;
  Social: undefined;
  Profile: undefined;
};
