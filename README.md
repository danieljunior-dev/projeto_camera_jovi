# JOVI · Hub de Assistentes da Câmera — Sprint 2

Front-end da aplicação web desenvolvido para o challenge FIAP + JOVI.

## Tecnologias utilizadas
- HTML5
- CSS3
- JavaScript (vanilla)
- Tailwind CSS (compilado localmente em `styles.css` — não depende de internet nem de build tools para rodar)
- Fonte oficial da marca: **JOVI Sans** (variante Global/Latina), embutida via `@font-face` em `assets/fonts/`

## Como abrir
Basta abrir o arquivo `index.html` em qualquer navegador. Não é necessário instalar nada.

## Estrutura
```
index.html   → estrutura das telas (Kai e Mia)
app.js       → toda a lógica: dados dos assistentes, chat dinâmico, navegação, simulação de voz
styles.css   → Tailwind CSS compilado + estilos customizados (bolhas de chat, telefone, animações)
assets/      → avatares e ilustrações dos assistentes Kai e Mia
assets/fonts/→ arquivos .woff2 da fonte JOVI Sans (pesos Regular, Medium, Demibold, Bold, Extrabold)
```

## Funcionalidades implementadas
- **Duas telas de assistente** (Kai e Mia), fiéis ao protótipo/Figma enviado.
- **Troca de assistente**: toque no avatar/nome no cabeçalho, na seta de voltar, ou no menu de três pontos para abrir o bottom sheet "Escolher assistente".
- **Seleção de opção com detalhe dedicado**: ao tocar em uma sugestão (ex: "Digitalização & PDF"), as demais opções somem e aparece apenas a descrição completa daquela função, com um botão "Voltar ao menu inicial" para retornar à lista completa.
- **Chat dinâmico e interativo** (via campo de texto livre):
  - O usuário pode digitar qualquer pergunta e receber uma resposta baseada em palavras-chave relacionadas às funções daquele assistente (com indicador de "digitando..."), com resposta padrão para o restante.
  - Botão de voz: simula reconhecimento de fala (efeito de pulso + "Ouvindo...") e preenche o campo com uma pergunta de exemplo, que pode então ser enviada.
- **Menu de três pontos** com opções (Configurações, Histórico, Ajuda, Trocar assistente).
- **Relógio real** no status bar, atualizado via JavaScript.
- Layout **responsivo** dentro do frame de smartphone, com animações sutis (partículas, transições de tela, bolhas de chat).

> Observação: a faixa "Protótipo: Kai / Mia" acima do celular é apenas um atalho de navegação para fins de demonstração/avaliação — a troca "oficial" dentro do fluxo do app acontece pelo cabeçalho, como descrito acima.
