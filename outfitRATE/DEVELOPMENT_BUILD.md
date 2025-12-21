# Rodando outfitRATE sem Expo Go

Este guia explica como rodar o aplicativo outfitRATE usando Development Builds ao invés do Expo Go.

## O que mudou?

O aplicativo agora usa **Expo Development Client** (`expo-dev-client`), que permite:
- Rodar o app nativamente no dispositivo ou emulador
- Não depender do Expo Go
- Suporte completo a bibliotecas nativas
- Melhor performance e debugging

## Pré-requisitos

### Para Android:
- Android Studio instalado
- SDK do Android configurado
- Emulador Android ou dispositivo físico conectado via USB

### Para iOS (apenas macOS):
- Xcode instalado
- CocoaPods instalado (`sudo gem install cocoapods`)
- Simulador iOS ou dispositivo físico

## Primeiros Passos

### 1. Instalar dependências

```bash
cd outfitRATE
npm install
```

### 2. Gerar arquivos nativos (primeira vez)

Este comando cria as pastas `android/` e `ios/` com o código nativo:

```bash
npm run prebuild
```

**Nota:** Se você já tiver as pastas e quiser recriá-las:
```bash
npm run prebuild:clean
```

## Como Rodar o App

### Android

**Opção 1: Usando emulador**
1. Abra o Android Studio
2. Inicie um emulador Android (AVD Manager)
3. Execute:
```bash
npm run android
```

**Opção 2: Usando dispositivo físico**
1. Conecte seu Android via USB
2. Ative o modo de desenvolvedor e depuração USB
3. Execute:
```bash
npm run android
```

### iOS (apenas macOS)

**Opção 1: Usando simulador**
```bash
npm run ios
```

**Opção 2: Usando dispositivo físico**
1. Abra o projeto no Xcode: `ios/outfitrate.xcworkspace`
2. Selecione seu dispositivo
3. Configure o Team de assinatura
4. Execute pelo Xcode ou:
```bash
npm run ios -- --device
```

## Desenvolvimento

Após a primeira build, você pode usar:

```bash
npm start
```

Isso abrirá o Expo Dev Client no seu dispositivo/emulador já instalado. Qualquer alteração no código será recarregada automaticamente (Fast Refresh).

### Limpar cache

Se encontrar problemas:
```bash
npm run clear
```

## Diferenças em relação ao Expo Go

| Expo Go | Development Build |
|---------|------------------|
| App genérico pré-instalado | Build customizada do seu app |
| Limitado a bibliotecas do Expo Go | Qualquer biblioteca nativa |
| Mais rápido para começar | Requer build inicial |
| Pode ter bugs/incompatibilidades | Mais estável e performático |

## Solução de Problemas

### Android: "SDK location not found"
Configure a variável de ambiente `ANDROID_HOME`:
```bash
export ANDROID_HOME=$HOME/Android/Sdk
export PATH=$PATH:$ANDROID_HOME/emulator
export PATH=$PATH:$ANDROID_HOME/tools
export PATH=$PATH:$ANDROID_HOME/tools/bin
export PATH=$PATH:$ANDROID_HOME/platform-tools
```

### iOS: "CocoaPods could not find compatible versions"
```bash
cd ios
pod install --repo-update
cd ..
```

### Erro ao fazer build
Tente limpar e reconstruir:
```bash
npm run prebuild:clean
npm run android  # ou ios
```

## Recursos Adicionais

- [Documentação Expo Development Builds](https://docs.expo.dev/develop/development-builds/introduction/)
- [Configuração Android Studio](https://docs.expo.dev/workflow/android-studio-emulator/)
- [Configuração Xcode](https://docs.expo.dev/workflow/ios-simulator/)
