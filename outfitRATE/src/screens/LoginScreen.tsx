import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { COLORS, FONTS, SPACING, SCREEN_PADDING } from '../constants/theme';

export const LoginScreen: React.FC = () => {
  const { signIn, signUp } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password || (isSignUp && !name)) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(name, email, password);
      } else {
        await signIn(email, password);
      }
    } catch (error) {
      Alert.alert('Erro', error instanceof Error ? error.message : 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Text style={styles.logo}>outfit</Text>
          <Text style={[styles.logo, styles.logoAccent]}>RATE</Text>
        </View>

        <Text style={styles.subtitle}>
          {isSignUp
            ? 'Crie sua conta e comece a avaliar seus outfits'
            : 'Avalie e aprimore seu estilo'}
        </Text>

        <View style={styles.form}>
          {isSignUp && (
            <Input
              label="Nome"
              placeholder="Seu nome"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          )}

          <Input
            label="Email"
            placeholder="seu@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Senha"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          <Button
            title={isSignUp ? 'Criar Conta' : 'Entrar'}
            onPress={handleAuth}
            loading={loading}
            fullWidth
            style={styles.submitButton}
          />

          <Button
            title={isSignUp ? 'Já tenho uma conta' : 'Criar nova conta'}
            onPress={() => setIsSignUp(!isSignUp)}
            variant="ghost"
            fullWidth
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Demo Mode: Use qualquer email/senha para entrar
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: SCREEN_PADDING,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: SPACING.md,
  },
  logo: {
    fontSize: FONTS.size['4xl'],
    fontWeight: FONTS.weight.black,
    color: COLORS.primary,
  },
  logoAccent: {
    color: COLORS.accent,
  },
  subtitle: {
    fontSize: FONTS.size.base,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: SPACING.xl,
  },
  form: {
    gap: SPACING.lg,
  },
  submitButton: {
    marginTop: SPACING.md,
  },
  footer: {
    marginTop: SPACING['2xl'],
    alignItems: 'center',
  },
  footerText: {
    fontSize: FONTS.size.sm,
    color: COLORS.textMuted,
    textAlign: 'center',
  },
});
