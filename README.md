<div align="center">

# 👔 outfitRATE

### *Your AI-Powered Personal Style Companion*

**Rate. Style. Shine.**

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![React Native](https://img.shields.io/badge/React%20Native-0.81-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-~54.0-000020.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Tech Stack](#-tech-stack) • [Contributing](#-contributing)

---

</div>

## 🎯 What is outfitRATE?

**outfitRATE** is a cutting-edge mobile application designed for urban teenagers who want to level up their style game. Using advanced AI technology, outfitRATE analyzes your outfits, provides personalized ratings, and offers expert fashion advice tailored to your unique taste.

Whether you're heading to school, meeting friends, or planning your next trip, outfitRATE helps you look your best every single day.

> **"Your personal stylist, always in your pocket."**

---

## ✨ Features

### 📸 **AI Outfit Rating**
- Capture your outfit with your phone camera
- Get instant AI-powered analysis with scores from 0-10
- Receive detailed feedback on color harmony, style coherence, fit & proportion
- Discover strengths and areas for improvement

### 👕 **Digital Wardrobe**
- Organize all your clothing items in one place
- Categorize by type: tops, bottoms, shoes, outerwear, accessories
- Track brands, colors, seasons, and purchase dates
- Mark your favorite pieces for quick access

### ☀️ **Weather-Based Recommendations**
- Get outfit suggestions based on real-time weather
- Smart algorithms consider temperature, humidity, and conditions
- Never be caught unprepared for the weather again

### ✈️ **Trip Planner**
- Planning a trip? Let outfitRATE help you pack smart
- Input your destination and travel dates
- Receive personalized packing lists based on weather forecasts
- Ensure you have the perfect outfit for every occasion

### 🌐 **Social Feed**
- Share your best outfits with friends
- Like and comment on others' looks
- Get inspired by the community's style
- Build your fashion network

### 🎁 **Gift Suggestions**
- Receive personalized clothing recommendations
- Find items that match your style preferences
- Perfect for wishlists or discovering new pieces

---

## 📱 Screenshots

```
┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐
│    Home     │  │  Wardrobe   │  │   Capture   │  │   Social    │
│             │  │             │  │             │  │             │
│  📊 Stats   │  │  👔 Items   │  │  📸 Rating  │  │  👥 Feed    │
│  🌤️ Weather │  │  🔍 Search  │  │  ⭐ Score   │  │  💬 Comments│
│  ✨ Suggest │  │  ➕ Add     │  │  💡 Tips    │  │  ❤️ Likes   │
└─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘
```

---

## 🚀 Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Android Studio** (para Android) ou **Xcode** (para iOS no macOS)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dblazaro/outfitRATE.git
   cd outfitRATE/outfitRATE
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Generate native files (first time only)**
   ```bash
   npm run prebuild
   ```

4. **Run on your device**
   ```bash
   npm run android  # For Android
   npm run ios      # For iOS (macOS only)
   ```

> **📱 Nota Importante:** Este app agora usa **Development Builds** ao invés do Expo Go para melhor estabilidade e performance. Para instruções detalhadas de configuração, consulte [DEVELOPMENT_BUILD.md](outfitRATE/DEVELOPMENT_BUILD.md).

---

## 📖 Usage

### Getting Started

1. **Create an Account**
   - Launch the app and sign up with your email
   - Set up your style preferences and sizes

2. **Build Your Wardrobe**
   - Navigate to the Wardrobe tab
   - Add clothing items by taking photos or selecting from gallery
   - Categorize and tag your items

3. **Rate an Outfit**
   - Go to the Capture tab
   - Take a photo of your outfit
   - Receive instant AI analysis with scores and tips

4. **Plan a Trip**
   - Access the Trip Planner from the menu
   - Enter destination and dates
   - Get smart packing recommendations

5. **Connect with Friends**
   - Share your outfits on the Social feed
   - Follow friends and exchange style inspiration

---

## 🛠 Tech Stack

**outfitRATE** is built with modern, powerful technologies:

### Frontend
- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe JavaScript
- **Expo** - Development platform and workflow

### Navigation
- **React Navigation** - Stack & Tab navigation
- **React Native Gesture Handler** - Smooth gestures

### State Management
- **React Context API** - Global state management
- **AsyncStorage** - Local data persistence

### APIs & Services
- **Axios** - HTTP client
- **Expo Camera** - Photo capture
- **Expo Image Picker** - Gallery access
- **Expo Location** - Geolocation services
- **Weather API Integration** - Real-time weather data
- **AI Rating Service** - Outfit analysis

### UI/UX
- **Custom Components** - Reusable UI elements
- **Safe Area Context** - Device-safe layouts
- **Modern Theme System** - Consistent styling

---

## 📁 Project Structure

```
outfitRATE/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ClothingItemCard.tsx
│   │   ├── Input.tsx
│   │   ├── OutfitCard.tsx
│   │   └── index.ts
│   ├── contexts/            # React Context providers
│   │   ├── AuthContext.tsx
│   │   └── WardrobeContext.tsx
│   ├── navigation/          # Navigation configuration
│   │   └── AppNavigator.tsx
│   ├── screens/             # Application screens
│   │   ├── AddClothingItemScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── OutfitCaptureScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── SocialScreen.tsx
│   │   ├── TripPlannerScreen.tsx
│   │   ├── WardrobeScreen.tsx
│   │   └── index.ts
│   ├── services/            # External services & APIs
│   │   ├── outfitRatingService.ts
│   │   └── weatherService.ts
│   ├── types/               # TypeScript definitions
│   │   └── index.ts
│   └── constants/           # App constants & theme
│       └── theme.ts
├── App.tsx                  # Root component
├── index.ts                 # Entry point
├── package.json
└── tsconfig.json
```

---

## 🤝 Contributing

We welcome contributions from the community! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
4. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
5. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write clean, readable code
- Add comments for complex logic
- Test on both iOS and Android
- Keep components modular and reusable

---

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Roadmap

- [ ] Implement backend API for user authentication
- [ ] Add machine learning model for outfit recommendations
- [ ] Social features: Following system, direct messaging
- [ ] Outfit history and analytics
- [ ] Integration with fashion e-commerce platforms
- [ ] AR try-on feature
- [ ] Style challenges and achievements
- [ ] Dark mode support

---

## 💬 Support

Having issues? We're here to help!

- 📧 Email: support@outfitrate.com
- 💬 [Open an issue](https://github.com/dblazaro/outfitRATE/issues)
- 📖 [Documentation](https://github.com/dblazaro/outfitRATE/wiki)

---

## 👥 Team

**outfitRATE Team** - *Creating the future of personal style*

---

<div align="center">

### ⭐ Star us on GitHub if you like this project!

**Made with ❤️ for the fashion-forward generation**

[⬆ Back to Top](#-outfitrate)

</div>
