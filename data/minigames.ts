export type IdMiniJogo =
  | "balao"
  | "caca"
  | "labirinto"
  | "memoria"
  | "roda"
  | "velocidade";

export interface MiniJogo {
  id: IdMiniJogo;
  nome: string;
  emoji: string;
  descricao: string;
}

/** 6 mini-jogos surpresa em rotação a cada 5 rondas. */
export const miniJogos: MiniJogo[] = [
  {
    id: "balao",
    nome: "Estoura o balão",
    emoji: "🎈",
    descricao: "Toca no balão com a resposta certa antes que voe!",
  },
  {
    id: "caca",
    nome: "Caça à palavra",
    emoji: "🔍",
    descricao: "Encontra a palavra escondida entre as outras.",
  },
  {
    id: "labirinto",
    nome: "Labirinto",
    emoji: "🌀",
    descricao: "Escolhe o caminho certo para chegar ao tesouro.",
  },
  {
    id: "memoria",
    nome: "Memória",
    emoji: "🃏",
    descricao: "Encontra todos os pares de palavra e imagem.",
  },
  {
    id: "roda",
    nome: "Roda da sorte",
    emoji: "🎡",
    descricao: "Gira a roda e responde à palavra que sair.",
  },
  {
    id: "velocidade",
    nome: "Velocidade",
    emoji: "⚡",
    descricao: "Quantas palavras certas em 30 segundos?",
  },
];

export function miniJogoPorIndice(i: number): MiniJogo {
  return miniJogos[i % miniJogos.length];
}
