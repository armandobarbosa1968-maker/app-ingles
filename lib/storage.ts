import type { Nivel } from "@/data/vocabulary";

export interface Progresso {
  nome: string;
  pontos: number;
  ultimoJogo: string | null;
  ultimoNivel: Nivel | null;
  silenciado: boolean;
  /** ID da mascote atualmente escolhida pela criança. */
  mascoteEscolhida: string | null;
  /** Histórico de erros por ID de palavra (para dar prioridade). */
  errosPorPalavra: Record<string, number>;
  /** IDs de autocolantes coleccionados. */
  autocolantes: string[];
  /** Última data ISO em que o desafio do dia foi completado. */
  ultimoDesafio: string | null;
  /** Contador de rondas concluídas (para acionar mini-jogos a cada 5). */
  rondasCompletas: number;
  /** Número total de jogos jogados (estatística). */
  jogosJogados: number;
}

const CHAVE = "app-ingles:progresso:v2";

const inicial: Progresso = {
  nome: "",
  pontos: 0,
  ultimoJogo: null,
  ultimoNivel: null,
  silenciado: false,
  mascoteEscolhida: null,
  errosPorPalavra: {},
  autocolantes: [],
  ultimoDesafio: null,
  rondasCompletas: 0,
  jogosJogados: 0,
};

export function carregarProgresso(): Progresso {
  if (typeof window === "undefined") return inicial;
  try {
    const raw = window.localStorage.getItem(CHAVE);
    if (!raw) return inicial;
    const lido = JSON.parse(raw);
    return { ...inicial, ...lido } as Progresso;
  } catch {
    return inicial;
  }
}

export function guardarProgresso(p: Partial<Progresso>): Progresso {
  if (typeof window === "undefined") return inicial;
  const atual = carregarProgresso();
  const novo = { ...atual, ...p };
  try {
    window.localStorage.setItem(CHAVE, JSON.stringify(novo));
    window.dispatchEvent(new CustomEvent("progresso-atualizado"));
  } catch {
    /* ignorar erros de quota */
  }
  return novo;
}

export function adicionarPontos(n: number): Progresso {
  const atual = carregarProgresso();
  return guardarProgresso({ pontos: atual.pontos + n });
}

export function registarErro(palavraId: string): Progresso {
  const atual = carregarProgresso();
  const errosPorPalavra = {
    ...atual.errosPorPalavra,
    [palavraId]: (atual.errosPorPalavra[palavraId] ?? 0) + 1,
  };
  return guardarProgresso({ errosPorPalavra });
}

export function registarAcerto(palavraId: string): Progresso {
  const atual = carregarProgresso();
  const erros = atual.errosPorPalavra[palavraId];
  if (!erros) return atual;
  const errosPorPalavra = { ...atual.errosPorPalavra };
  if (erros <= 1) delete errosPorPalavra[palavraId];
  else errosPorPalavra[palavraId] = erros - 1;
  return guardarProgresso({ errosPorPalavra });
}

export function adicionarAutocolante(id: string): Progresso {
  const atual = carregarProgresso();
  if (atual.autocolantes.includes(id)) return atual;
  return guardarProgresso({ autocolantes: [...atual.autocolantes, id] });
}

export function incrementarRondas(): Progresso {
  const atual = carregarProgresso();
  return guardarProgresso({
    rondasCompletas: atual.rondasCompletas + 1,
    jogosJogados: atual.jogosJogados + 1,
  });
}
