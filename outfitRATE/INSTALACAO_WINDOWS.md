# 🪟 Guia de Instalação Completo - Windows 11

Este guia foi feito especialmente para **adolescentes de 13 anos** ou qualquer pessoa que nunca programou antes e quer rodar o app outfitRATE no Windows 11! 🚀

## ⏱️ Tempo estimado: 30-45 minutos

---

## 📋 O que vamos instalar?

1. Node.js (para rodar o código)
2. Git (para baixar o projeto)
3. Expo Go (app no celular)
4. O projeto outfitRATE

---

## 🎯 Passo 1: Instalar Node.js

Node.js é o programa que roda o código JavaScript no computador.

### Como instalar:

1. **Abra seu navegador** (Chrome, Edge, Firefox...)

2. **Acesse**: [https://nodejs.org](https://nodejs.org)

3. Você verá dois botões grandes de download. **Clique no da ESQUERDA** que diz "LTS" (versão recomendada)

   ![Node.js Download](https://via.placeholder.com/600x200?text=Clique+no+botao+LTS)

4. **Aguarde o download** do arquivo `node-vXX.XX.X-x64.msi`

5. **Localize o arquivo** baixado (geralmente na pasta Downloads)

6. **Clique duas vezes** no arquivo para iniciar a instalação

7. Na janela de instalação:
   - Clique em **"Next"** (Avançar)
   - Aceite os termos (marque a caixinha) e clique **"Next"**
   - Mantenha a pasta padrão e clique **"Next"**
   - Clique **"Next"** novamente
   - Clique **"Install"** (pode pedir senha de administrador)
   - Aguarde a instalação (1-2 minutos)
   - Clique **"Finish"**

### ✅ Verificar se funcionou:

1. Pressione as teclas **Win + R** ao mesmo tempo (Win é a tecla com o logo do Windows)

2. Digite: `cmd` e pressione **Enter**

3. Uma janela preta vai abrir (Prompt de Comando)

4. Digite este comando e pressione **Enter**:
   ```bash
   node --version
   ```

5. Se aparecer algo como `v18.17.0` ou `v20.10.0`, **FUNCIONOU!** ✅

6. Agora digite este comando:
   ```bash
   npm --version
   ```

7. Se aparecer algo como `9.8.0`, **PERFEITO!** ✅

8. Pode **fechar** a janela preta

---

## 🎯 Passo 2: Instalar Git

Git é o programa que baixa projetos da internet.

### Como instalar:

1. **Abra seu navegador**

2. **Acesse**: [https://git-scm.com/download/win](https://git-scm.com/download/win)

3. O download deve começar **automaticamente**. Se não começar, clique em "Click here to download manually"

4. **Aguarde o download** do arquivo `Git-X.XX.X-64-bit.exe`

5. **Clique duas vezes** no arquivo

6. Na instalação, **IMPORTANTE**:
   - Clique **"Next"** em todas as telas
   - **NÃO MUDE NADA**, use as opções padrão
   - Na penúltima tela, clique **"Install"**
   - Aguarde (1-2 minutos)
   - Clique **"Finish"**

### ✅ Verificar se funcionou:

1. Pressione **Win + R**, digite `cmd` e pressione **Enter**

2. Digite este comando:
   ```bash
   git --version
   ```

3. Se aparecer algo como `git version 2.42.0`, **FUNCIONOU!** ✅

4. Pode **fechar** a janela

---

## 🎯 Passo 3: Baixar o Projeto outfitRATE

Agora vamos baixar o código do app!

### 3.1 Criar uma pasta para projetos:

1. Abra o **Explorador de Arquivos** (ícone de pasta na barra de tarefas)

2. Clique em **"Este Computador"** no painel esquerdo

3. Clique duas vezes em **"Disco Local (C:)"**

4. Clique com o **botão direito** em uma área vazia

5. Escolha **"Novo"** → **"Pasta"**

6. Digite o nome: `MeusProjetos` e pressione **Enter**

7. **Clique duas vezes** na pasta que você criou para entrar nela

### 3.2 Abrir Prompt de Comando nesta pasta:

1. **Dentro da pasta** `MeusProjetos`:

2. Clique na **barra de endereço** (onde está escrito C:\MeusProjetos)

3. Digite `cmd` e pressione **Enter**

4. Uma janela preta vai abrir **já dentro da sua pasta!**

### 3.3 Baixar o projeto:

⚠️ **ATENÇÃO**: Você precisa ter o link do repositório Git. Se não tiver, peça ao professor/responsável.

1. Na janela preta, digite este comando (substitua URL_DO_PROJETO pelo link real):
   ```bash
   git clone URL_DO_PROJETO
   ```

2. Pressione **Enter**

3. Aguarde o download (pode levar 1-2 minutos)

4. Quando terminar, digite:
   ```bash
   cd outfitRATE
   ```

5. Pressione **Enter**

---

## 🎯 Passo 4: Instalar as Dependências

Dependências são bibliotecas de código que o app usa.

### Como fazer:

1. Na **mesma janela preta** (se fechou, volte para a pasta e abra novamente)

2. Certifique-se de estar dentro da pasta `outfitRATE`. Deve aparecer algo como:
   ```
   C:\MeusProjetos\outfitRATE>
   ```

3. Digite este comando:
   ```bash
   npm install
   ```

4. Pressione **Enter**

5. **AGUARDE!** ⏳ Isso pode levar 5-10 minutos

6. Muitas linhas de texto vão aparecer - é normal!

7. Quando terminar, vai voltar para a linha de comando

8. **NÃO FECHE** a janela ainda!

---

## 🎯 Passo 5: Instalar Expo Go no Celular

O Expo Go é o app que vai mostrar o outfitRATE no seu celular!

### Para Android:

1. Abra a **Google Play Store** no celular

2. Na barra de pesquisa, digite: `Expo Go`

3. Toque no app **"Expo Go"** (ícone roxo/azul)

4. Toque em **"Instalar"**

5. Aguarde a instalação

6. **NÃO ABRA AINDA**, volte para o computador primeiro

### Para iPhone (iOS):

1. Abra a **App Store** no celular

2. Na barra de pesquisa, digite: `Expo Go`

3. Toque no app **"Expo Go"**

4. Toque em **"Obter"** (pode pedir senha/Face ID)

5. Aguarde a instalação

6. **NÃO ABRA AINDA**, volte para o computador primeiro

---

## 🎯 Passo 6: Rodar o App!

Agora vem a parte mais legal! 🎉

### 6.1 Iniciar o servidor:

1. Na **janela preta** (Prompt de Comando), digite:
   ```bash
   npx expo start
   ```

2. Pressione **Enter**

3. **AGUARDE!** Pode levar 30-60 segundos

4. Quando carregar, você verá:
   - Um **QR Code** (aquele quadrado preto e branco)
   - Várias opções de teclas
   - Algumas linhas de informação

5. **NÃO FECHE** esta janela!

### 6.2 Conectar o celular:

⚠️ **IMPORTANTE**: Certifique-se que:
- Seu celular está conectado no **MESMO Wi-Fi** que o computador
- O Wi-Fi está **funcionando** em ambos

#### Se você tem Android:

1. Pegue seu celular

2. Abra o app **Expo Go**

3. Toque em **"Scan QR Code"**

4. Aponte a câmera para o **QR Code** no computador

5. Aguarde carregar (30-60 segundos na primeira vez)

6. **PRONTO!** O app vai abrir! 🎊

#### Se você tem iPhone:

1. Pegue seu celular

2. Abra o app **Câmera** (o padrão do iPhone)

3. Aponte para o **QR Code** no computador

4. Vai aparecer uma **notificação** no topo

5. Toque na notificação

6. O Expo Go vai abrir automaticamente

7. Aguarde carregar (30-60 segundos na primeira vez)

8. **PRONTO!** O app vai abrir! 🎊

---

## 🎮 Como Usar o App

Agora que o app está rodando:

### Primeiro Acesso:

1. Você verá a tela de **Login**

2. Digite **qualquer email** (exemplo: teste@email.com)

3. Digite **qualquer senha** (exemplo: 123456)

4. Toque em **"Entrar"**

5. **Pronto!** Você está dentro do app!

### Explorando:

- **🏠 Início**: Veja o clima e ações rápidas
- **👔 Guarda-roupa**: Adicione suas roupas
- **📸 Avaliar**: Tire foto de um outfit e receba nota!
- **👥 Social**: Em breve, compartilhe com amigos
- **👤 Perfil**: Veja suas estatísticas

---

## 🔄 Nos próximos usos

### Para rodar o app novamente:

1. Abra o **Prompt de Comando** na pasta do projeto
   - Navegue até `C:\MeusProjetos\outfitRATE`
   - Clique na barra de endereço, digite `cmd`, Enter

2. Digite:
   ```bash
   npx expo start
   ```

3. Escaneie o QR Code no celular

**É só isso!** Não precisa instalar nada de novo! 😊

---

## 🐛 Problemas Comuns

### "npm não é reconhecido como comando"

**Solução**: Node.js não instalou corretamente.
- Volte ao Passo 1 e instale novamente
- Reinicie o computador
- Tente novamente

### "git não é reconhecido como comando"

**Solução**: Git não instalou corretamente.
- Volte ao Passo 2 e instale novamente
- Reinicie o computador
- Tente novamente

### QR Code não aparece

**Solução 1**: Espere mais tempo (até 2 minutos)

**Solução 2**:
- Pressione `Ctrl + C` na janela preta
- Digite novamente: `npx expo start`
- Aguarde

### App não abre no celular

**Verificar**:
1. Celular e computador estão no **mesmo Wi-Fi**?
2. O Wi-Fi está **funcionando**?
3. O Expo Go está **atualizado**? (vá na loja e veja se tem atualização)

**Solução**:
- Feche o Expo Go completamente
- Abra novamente
- Escaneie o QR Code de novo

### Erros durante `npm install`

**Solução**:
1. Feche a janela preta
2. Abra o Explorador de Arquivos
3. Vá até `C:\MeusProjetos\outfitRATE`
4. **Delete a pasta** `node_modules` (se existir)
5. Abra o Prompt de Comando novamente na pasta
6. Digite: `npm install`

### Erro "Cannot find module..."

**Solução**:
- Certifique-se de estar na pasta correta (`outfitRATE`)
- Execute novamente: `npm install`

---

## 📞 Precisa de Ajuda?

### Checklist antes de pedir ajuda:

- [ ] Node.js instalado? (teste com `node --version`)
- [ ] Git instalado? (teste com `git --version`)
- [ ] Pasta do projeto existe?
- [ ] `npm install` rodou sem erros?
- [ ] Celular no mesmo Wi-Fi?
- [ ] Expo Go instalado no celular?

### Como pedir ajuda:

1. Tire uma **foto** da tela com erro
2. Anote qual **passo** você estava fazendo
3. Procure ajuda:
   - Pergunte ao professor/responsável
   - Abra uma Issue no GitHub
   - Entre em contato com suporte

---

## 🎉 Parabéns!

Se chegou até aqui e o app está funcionando, você:

- ✅ Instalou um ambiente de desenvolvimento
- ✅ Baixou um projeto real
- ✅ Rodou um app mobile
- ✅ Está pronto para explorar programação!

**Você é incrível!** 🌟

---

## 🚀 Próximos Passos

Quer aprender mais?

1. **Explore o código**: Abra a pasta do projeto no Bloco de Notas ou baixe o VS Code
2. **Faça mudanças**: Tente mudar cores, textos
3. **Aprenda React Native**: [reactnative.dev](https://reactnative.dev)
4. **Assista tutoriais**: YouTube tem muitos tutoriais de React Native

---

<div align="center">

**Divirta-se explorando o mundo do desenvolvimento mobile!** 📱✨

Made with ❤️ for future developers

</div>
