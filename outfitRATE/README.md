# outfitRATE - Seu Personal Stylist com IA 👔

<div align="center">

![outfitRATE Logo](https://via.placeholder.com/150?text=outfitRATE)

**Avalie, aprimore e compartilhe seu estilo com ajuda de inteligência artificial**

[![React Native](https://img.shields.io/badge/React%20Native-0.74-blue.svg)](https://reactnative.dev/)
[![Expo](https://img.shields.io/badge/Expo-51-black.svg)](https://expo.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)

</div>

## 📱 Sobre o App

outfitRATE é um aplicativo mobile inovador que combina inteligência artificial com moda streetwear para ajudar você a avaliar e aprimorar seus outfits. Com design minimalista e moderno, o app oferece:

### ✨ Funcionalidades Principais

- **📸 Avaliação de Outfits com IA**: Tire uma foto do seu outfit e receba uma nota de 0 a 10 com análise detalhada
- **👕 Guarda-roupa Digital**: Cadastre suas peças favoritas e organize por categoria
- **🌡️ Recomendações Inteligentes**: Sugestões baseadas em temperatura, local e preferências pessoais
- **👥 Social**: Compartilhe outfits, receba likes e comentários de amigos
- **✈️ Planejador de Viagem**: Prepare malas inteligentes baseadas no clima do destino
- **🎨 Análise de Cores**: Descubra paletas que combinam com você
- **🛍️ Sugestões de Compras**: Receba recomendações de peças que combinam com seu estilo

### 🎯 Design

- **Minimalista e Moderno**: Interface limpa com foco em usabilidade
- **Streetwear**: Paleta de cores e tipografia inspiradas no estilo urbano
- **Glassmorphism**: Efeitos de vidro fosco para profundidade visual
- **Animações Suaves**: Transições fluidas e feedback visual

## 🚀 Começando

### Pré-requisitos

Antes de começar, você precisa ter instalado em seu computador Windows 11:

1. **Node.js** (versão 18 ou superior)
2. **Git**
3. **Expo Go** (app no celular - Android ou iOS)

### 📥 Instalação Passo a Passo

#### Passo 1: Instalar Node.js

1. Acesse [nodejs.org](https://nodejs.org/)
2. Baixe a versão LTS (recomendada)
3. Execute o instalador e siga as instruções
4. Após instalar, abra o **Prompt de Comando** (pressione `Win + R`, digite `cmd` e Enter)
5. Verifique a instalação digitando:
   ```bash
   node --version
   npm --version
   ```
   Você deve ver os números das versões instaladas.

#### Passo 2: Instalar Git

1. Acesse [git-scm.com](https://git-scm.com/download/win)
2. Baixe e execute o instalador
3. Use as opções padrão durante a instalação
4. Verifique digitando no Prompt de Comando:
   ```bash
   git --version
   ```

#### Passo 3: Baixar o Projeto

1. Crie uma pasta para seus projetos (exemplo: `C:\Projetos`)
2. Abra o Prompt de Comando nesta pasta (Shift + Botão Direito na pasta → "Abrir janela do PowerShell aqui")
3. Clone o projeto:
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd outfitRATE
   ```

#### Passo 4: Instalar Dependências

No Prompt de Comando, dentro da pasta do projeto:

```bash
npm install
```

Aguarde alguns minutos enquanto todas as dependências são baixadas.

#### Passo 5: Instalar Expo Go no Celular

1. Abra a loja de apps do seu celular:
   - **Android**: Google Play Store
   - **iOS**: App Store
2. Procure por "Expo Go"
3. Instale o aplicativo

### ▶️ Executando o App

1. No Prompt de Comando, na pasta do projeto, digite:
   ```bash
   npx expo start
   ```

2. Aguarde até aparecer um QR Code no terminal

3. No seu celular:
   - **Android**: Abra o Expo Go e escaneie o QR Code
   - **iOS**: Abra a câmera e escaneie o QR Code, depois toque na notificação do Expo

4. O app começará a carregar no seu celular! 🎉

### 🔧 Configuração das APIs (Opcional)

Para funcionalidades completas de IA e clima, você precisará de chaves de API:

#### API de Clima (OpenWeatherMap)

1. Acesse [openweathermap.org](https://openweathermap.org/api)
2. Crie uma conta gratuita
3. Copie sua API Key
4. Crie um arquivo `.env` na raiz do projeto:
   ```
   OPENWEATHER_API_KEY=sua_chave_aqui
   ```

#### API de IA (OpenAI - Opcional)

1. Acesse [platform.openai.com](https://platform.openai.com/)
2. Crie uma conta
3. Gere uma API Key
4. Adicione no arquivo `.env`:
   ```
   OPENAI_API_KEY=sua_chave_aqui
   ```

**Nota**: O app funciona em modo demo sem as APIs, com dados simulados.

## 📖 Como Usar

### 1. Primeiro Acesso

1. Ao abrir o app, você verá a tela de login
2. Digite qualquer email e senha (modo demo)
3. Clique em "Entrar"

### 2. Avaliar um Outfit

1. Na tela inicial, toque em "📸 Avaliar Outfit"
2. Tire uma foto ou escolha da galeria
3. Aguarde a análise (alguns segundos)
4. Veja sua nota e comentários detalhados!

### 3. Adicionar Peças ao Guarda-roupa

1. Vá para a aba "👔 Guarda-roupa"
2. Toque no botão "+" no canto inferior direito
3. Tire/escolha foto da peça
4. Preencha nome, marca e categoria
5. Salve!

### 4. Planejar uma Viagem

1. Na tela inicial, toque em "✈️ Planejar Viagem"
2. Preencha destino e datas
3. Receba sugestões personalizadas de itens para levar

### 5. Explorar o Social

1. Vá para a aba "👥 Social"
2. Veja outfits de amigos (em breve)
3. Curta e comente

## 🎨 Tecnologias Utilizadas

- **React Native** - Framework mobile
- **Expo** - Plataforma de desenvolvimento
- **TypeScript** - Tipagem estática
- **React Navigation** - Navegação entre telas
- **AsyncStorage** - Armazenamento local
- **Expo Image Picker** - Captura de fotos
- **Expo Location** - Geolocalização
- **Axios** - Requisições HTTP

## 📁 Estrutura do Projeto

```
outfitRATE/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── ClothingItemCard.tsx
│   │   └── OutfitCard.tsx
│   ├── screens/          # Telas do app
│   │   ├── LoginScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── WardrobeScreen.tsx
│   │   ├── OutfitCaptureScreen.tsx
│   │   ├── SocialScreen.tsx
│   │   ├── ProfileScreen.tsx
│   │   ├── TripPlannerScreen.tsx
│   │   └── AddClothingItemScreen.tsx
│   ├── navigation/       # Configuração de rotas
│   │   └── AppNavigator.tsx
│   ├── contexts/         # Gerenciamento de estado
│   │   ├── AuthContext.tsx
│   │   └── WardrobeContext.tsx
│   ├── services/         # Integrações com APIs
│   │   ├── weatherService.ts
│   │   └── outfitRatingService.ts
│   ├── types/            # Definições TypeScript
│   │   └── index.ts
│   ├── constants/        # Constantes (cores, fontes)
│   │   └── theme.ts
│   └── utils/            # Funções utilitárias
├── App.tsx               # Componente raiz
├── package.json          # Dependências
└── tsconfig.json         # Configuração TypeScript
```

## 🐛 Resolução de Problemas

### O app não abre no celular

1. Verifique se o celular e o computador estão na mesma rede Wi-Fi
2. Tente fechar e abrir o Expo Go novamente
3. No terminal, pressione `r` para recarregar

### Erro ao instalar dependências

1. Delete a pasta `node_modules`
2. Execute novamente `npm install`

### QR Code não aparece

1. Pressione `Ctrl + C` para parar
2. Execute novamente `npx expo start`

### Permissões de câmera/galeria

1. Quando o app solicitar, toque em "Permitir"
2. Se negou, vá em Configurações do celular → Apps → Expo Go → Permissões

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Roadmap

- [ ] Integração completa com OpenAI GPT-4 Vision
- [ ] Sistema de autenticação real (Firebase/Supabase)
- [ ] Backend próprio para dados
- [ ] Sistema de amigos e social completo
- [ ] Gamificação (badges, conquistas)
- [ ] Try-on virtual com AR
- [ ] Integração com e-commerces
- [ ] Versão Web
- [ ] Dark Mode
- [ ] Múltiplos idiomas

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## 👤 Autor

Desenvolvido com ❤️ para ajudar você a arrasar no estilo!

## 📞 Suporte

Encontrou um bug ou tem uma sugestão?

- Abra uma [Issue](../../issues)
- Entre em contato pelo email: suporte@outfitrate.com

---

<div align="center">

**Feito para adolescentes, jovens e todos que amam moda! 🔥**

[Instagram](https://instagram.com) • [TikTok](https://tiktok.com) • [Twitter](https://twitter.com)

</div>
