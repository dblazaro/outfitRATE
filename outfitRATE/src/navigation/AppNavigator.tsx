import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList, MainTabParamList } from '../types';
import { COLORS, FONTS } from '../constants/theme';

// Screens
import { LoginScreen } from '../screens/LoginScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { WardrobeScreen } from '../screens/WardrobeScreen';
import { OutfitCaptureScreen } from '../screens/OutfitCaptureScreen';
import { SocialScreen } from '../screens/SocialScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { TripPlannerScreen } from '../screens/TripPlannerScreen';
import { AddClothingItemScreen } from '../screens/AddClothingItemScreen';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator
const MainTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray400,
        tabBarStyle: {
          backgroundColor: COLORS.background,
          borderTopWidth: 1,
          borderTopColor: COLORS.gray200,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: FONTS.weight.semibold,
        },
        headerStyle: {
          backgroundColor: COLORS.background,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: FONTS.weight.bold,
          fontSize: FONTS.size.xl,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabIcon icon="🏠" color={color} />,
        }}
      />
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{
          title: 'Guarda-roupa',
          tabBarIcon: ({ color }) => <TabIcon icon="👔" color={color} />,
        }}
      />
      <Tab.Screen
        name="Capture"
        component={OutfitCaptureScreen}
        options={{
          title: 'Avaliar',
          tabBarIcon: ({ color }) => <TabIcon icon="📸" color={color} />,
          tabBarIconStyle: {
            marginTop: -10,
          },
        }}
      />
      <Tab.Screen
        name="Social"
        component={SocialScreen}
        options={{
          title: 'Social',
          tabBarIcon: ({ color }) => <TabIcon icon="👥" color={color} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color }) => <TabIcon icon="👤" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
};

// Tab Icon Component
const TabIcon: React.FC<{ icon: string; color: string }> = ({ icon }) => (
  <span style={{ fontSize: 24 }}>{icon}</span>
);

// Main Navigator
export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Add loading screen here if needed
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: FONTS.weight.bold,
          },
        }}
      >
        {!user ? (
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="Main"
              component={MainTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="OutfitCapture"
              component={OutfitCaptureScreen}
              options={{ title: 'Avaliar Outfit' }}
            />
            <Stack.Screen
              name="AddClothingItem"
              component={AddClothingItemScreen}
              options={{ title: 'Adicionar Peça' }}
            />
            <Stack.Screen
              name="TripPlanner"
              component={TripPlannerScreen}
              options={{ title: 'Planejador de Viagem' }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
