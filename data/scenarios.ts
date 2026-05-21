import type { Tema, Nivel } from "./vocabulary";

export interface Cenario {
  id: string;
  /** Nome visível ao utilizador. */
  nome: string;
  /** Emoji da mascote para este cenário. */
  mascote: string;
  /** Gradiente Tailwind (classes via getter abaixo). */
  fundo: string;
  /** Decorações em emoji a flutuar no fundo. */
  decoracoes: string[];
  /** Temas a que este cenário se aplica. */
  temas: Tema[];
}

/**
 * 8 cenários temáticos ilustrados com emoji + gradientes alegres.
 * Cada cenário cobre temas específicos para variar a experiência.
 */
export const cenarios: Cenario[] = [
  {
    id: "selva",
    nome: "Selva",
    mascote: "🐵",
    fundo: "from-menta-200 via-menta-100 to-sol-100",
    decoracoes: ["🌴", "🌿", "🦜", "🦋", "🌳"],
    temas: ["animais"],
  },
  {
    id: "cozinha",
    nome: "Cozinha",
    mascote: "👩‍🍳",
    fundo: "from-coral-100 via-sol-100 to-sol-200",
    decoracoes: ["🍽️", "🥄", "🍴", "🧂", "🍯"],
    temas: ["comida"],
  },
  {
    id: "escola",
    nome: "Escola",
    mascote: "🦉",
    fundo: "from-ceu-100 via-ceu-50 to-sol-100",
    decoracoes: ["✏️", "📚", "🎒", "📐", "🖍️"],
    temas: ["escola", "numeros"],
  },
  {
    id: "quarto",
    nome: "Quarto",
    mascote: "🧸",
    fundo: "from-coral-100 via-ceu-50 to-menta-100",
    decoracoes: ["🌙", "⭐", "🛏️", "🧦", "💤"],
    temas: ["rotinas", "roupa"],
  },
  {
    id: "praia",
    nome: "Praia",
    mascote: "🐠",
    fundo: "from-ceu-200 via-ceu-100 to-sol-200",
    decoracoes: ["🌊", "🐚", "⛱️", "🏖️", "☀️"],
    temas: ["tempo", "corpo", "lugares"],
  },
  {
    id: "quinta",
    nome: "Quinta",
    mascote: "🐮",
    fundo: "from-menta-200 via-sol-100 to-sol-200",
    decoracoes: ["🌾", "🚜", "🌻", "🐔", "🍃"],
    temas: ["animais", "familia"],
  },
  {
    id: "parque",
    nome: "Parque",
    mascote: "🦊",
    fundo: "from-menta-100 via-ceu-50 to-coral-100",
    decoracoes: ["🌳", "🌷", "🦋", "🏃", "⚽"],
    temas: ["acoes", "lugares", "brinquedos"],
  },
  {
    id: "espaco",
    nome: "Espaço",
    mascote: "👽",
    fundo: "from-ceu-300 via-ceu-100 to-coral-100",
    decoracoes: ["🌟", "🚀", "🪐", "🌙", "💫"],
    temas: ["numeros", "dias", "cores", "saudacoes"],
  },
];

const FALLBACK: Cenario = cenarios[7]; // espaço serve como fallback elegante

/** Escolhe o cenário mais apropriado para um conjunto de temas. */
export function cenarioParaTemas(temas: Tema[]): Cenario {
  if (temas.length === 0) return FALLBACK;
  const contagem = new Map<string, number>();
  for (const c of cenarios) {
    let n = 0;
    for (const t of temas) if (c.temas.includes(t)) n++;
    if (n > 0) contagem.set(c.id, n);
  }
  if (contagem.size === 0) return FALLBACK;
  let melhor = FALLBACK;
  let max = 0;
  for (const c of cenarios) {
    const n = contagem.get(c.id) ?? 0;
    if (n > max) {
      max = n;
      melhor = c;
    }
  }
  return melhor;
}

export function cenarioPorNivel(nivel: Nivel, seed: number): Cenario {
  const opcoes = cenarios.filter((c) =>
    c.temas.some((t) => {
      if (nivel === 1) return ["animais", "cores", "numeros", "familia", "saudacoes", "brinquedos"].includes(t);
      if (nivel === 2) return ["comida", "roupa", "escola", "numeros", "casa"].includes(t);
      return ["rotinas", "tempo", "corpo", "lugares", "acoes", "dias"].includes(t);
    })
  );
  if (opcoes.length === 0) return FALLBACK;
  return opcoes[Math.abs(seed) % opcoes.length];
}
