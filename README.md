# Inglês a Brincar 🎈

Aplicação web em **Next.js 14** (App Router) com **TypeScript** e **Tailwind
CSS**, totalmente em **português europeu**, desenhada para crianças do **1.º
ciclo (6–10 anos)** aprenderem **inglês como língua estrangeira** alinhado com
as Aprendizagens Essenciais do Ministério da Educação.

## ✨ O que tem

- 🐶 **Mascote animada** e nome da criança guardado em `localStorage`.
- 🎮 **3 jogos principais**, cada um com 3–4 variantes:
  - **Jogo 1 — Imagem & Palavra:** toca na imagem, toca na palavra, memória, ordenar letras.
  - **Jogo 2 — Ouvir & Escolher:** ouve e escolhe palavra escrita, ouve e escolhe imagem, ouve a frase e escolhe a tradução.
  - **Jogo 3 — Completar Frases:** preencher lacuna, ordenar palavras, verdadeiro ou falso.
- 🎉 **6 mini-jogos surpresa** (balão, caça à palavra, labirinto, memória, roda da sorte, velocidade) que aparecem a cada 5 rondas.
- 🌍 **8 cenários temáticos** (selva, cozinha, escola, quarto, praia, quinta, parque, espaço) com gradientes e decorações que mudam.
- ⭐ **Sistema de pontos, estrelas e autocolantes**, com 10 mascotes desbloqueáveis e 20 autocolantes coleccionáveis.
- 🎯 **Desafio do dia**: 5 palavras especiais geradas a partir da data — pontos a dobrar.
- 🧠 **Seleção inteligente:**
  - Mínimo **80+ palavras por nível** (240+ total) e **30+ frases por nível** (90+ total).
  - Cada ronda escolhe aleatoriamente do banco grande.
  - Nunca repete itens já mostrados na sessão até esgotar o pool.
  - Dá maior probabilidade a palavras erradas no passado (`errosPorPalavra` em `localStorage`).
- 🔊 **Áudio em inglês britânico (en-GB)** com `speechSynthesis`.
- 🔇 **Botão global para silenciar.**
- 🎨 Paleta alegre (azul-céu, amarelo-sol, verde-menta, coral), tipografia **Nunito**, animações **Framer Motion**.
- ♿ **Acessibilidade:** botões ≥ 64px, contraste AA, `aria-label` em tudo, suporte de `prefers-reduced-motion`, navegação por teclado.
- 📱 **Mobile-first**, funciona em tablet e desktop.

## 📁 Estrutura

```
app-ingles/
├─ app/                     # Next.js App Router
│  ├─ layout.tsx
│  ├─ page.tsx              # Página inicial
│  ├─ globals.css
│  ├─ jogo/[id]/page.tsx    # Jogos 1, 2, 3
│  ├─ desafio/page.tsx      # Desafio do dia
│  └─ mini/page.tsx         # Mini-jogos surpresa
├─ components/
│  ├─ BarraTopo.tsx         # Topo com pontos e som
│  ├─ Cenario.tsx           # Cenário temático
│  ├─ Mascote.tsx
│  ├─ EntradaNome.tsx
│  ├─ SeletorNivel.tsx
│  ├─ CartaoJogo.tsx
│  ├─ DesafioDoDia.tsx
│  ├─ Coleccao.tsx          # Mascotes + autocolantes
│  ├─ BarraProgresso.tsx
│  ├─ FimRonda.tsx          # Ecrã "Parabéns!"
│  ├─ QuadroJogo.tsx        # Estrutura partilhada para jogos
│  └─ jogos/
│     ├─ Jogo1.tsx
│     ├─ Jogo2.tsx
│     ├─ Jogo3.tsx
│     └─ MiniJogos.tsx
├─ data/
│  ├─ vocabulary.ts         # 240+ palavras (≥80/nível)
│  ├─ sentences.ts          # 90+ frases (≥30/nível)
│  ├─ scenarios.ts          # 8 cenários
│  ├─ rewards.ts            # Mascotes, autocolantes, frases
│  └─ minigames.ts          # Metadados dos 6 mini-jogos
├─ lib/
│  ├─ storage.ts            # Persistência em localStorage
│  ├─ selection.ts          # Seleção aleatória inteligente
│  ├─ session.ts            # Memória da sessão (vistos)
│  ├─ random.ts             # Embaralhar, ponderação, RNG seedeado
│  ├─ speech.ts             # Web Speech API (en-GB)
│  ├─ sounds.ts             # Web Audio API (acerto/erro/vitória)
│  └─ daily.ts              # Desafio do dia determinístico
├─ public/sounds/           # (opcional) ficheiros .mp3
├─ tailwind.config.ts
├─ tsconfig.json
└─ next.config.js
```

## 🚀 Como correr localmente

Requisitos: **Node.js 18+** (recomendado 20+).

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

Para produção:

```bash
npm run build
npm start
```

## ☁️ Publicar na Vercel

1. Faz push deste repositório para o GitHub.
2. Em [vercel.com/new](https://vercel.com/new), importa o repositório.
3. A Vercel deteta automaticamente o **Next.js**. Não é preciso configurar
   variáveis de ambiente.
4. Clica em **Deploy**. Em ~1 minuto tens um URL público pronto.

Como toda a persistência é local (`localStorage`), **não há backend a
configurar** — funciona em qualquer plano gratuito.

## 🧱 Adicionar conteúdo

Toda a arquitetura está preparada para crescer:

- **Mais palavras:** edita `data/vocabulary.ts`. Basta criar novos
  objetos com `id`, `ingles`, `portugues`, `emoji`, `tema` e `nivel`.
- **Mais frases:** edita `data/sentences.ts`. Cada frase tem um
  `template` com `___`, a palavra `correta`, dois `distractores` e a
  `traducao`.
- **Mais cenários:** edita `data/scenarios.ts`. Cada cenário tem o
  gradiente, mascote e decorações em emoji.
- **Mais autocolantes/mascotes:** edita `data/rewards.ts`.
- **Mais mini-jogos:** acrescenta a entrada em `data/minigames.ts` e
  cria o componente correspondente em `components/jogos/MiniJogos.tsx`.

A seleção, o cenário e a recompensa adaptam-se automaticamente.

## 🔐 Privacidade

Nenhum dado sai do dispositivo. Tudo é guardado apenas no
**`localStorage`** do navegador da criança.

## 🎓 Licença

Uso educativo livre. Bons estudos! 💙
