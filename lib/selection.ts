import {
  porNivel,
  type Nivel,
  type Palavra,
} from "@/data/vocabulary";
import { frasesPorNivel, type Frase } from "@/data/sentences";
import { carregarProgresso } from "./storage";
import { jaViuNestaSessao, marcarVisto } from "./session";
import { escolherNPonderado, baralhar } from "./random";

/**
 * Devolve `n` palavras do nível pedido para esta ronda.
 *
 *  - Nunca repete palavras já mostradas nesta sessão
 *    (até que o pool se esgote, altura em que é reiniciado).
 *  - Dá maior probabilidade a palavras que a criança já errou antes.
 */
export function escolherPalavrasRonda(
  nivel: Nivel,
  n: number,
  filtroTema?: Palavra["tema"]
): Palavra[] {
  let pool = porNivel(nivel);
  if (filtroTema) pool = pool.filter((p) => p.tema === filtroTema);

  // Excluir já vistos; se sobrar pouco, ignorar o filtro.
  let disponiveis = pool.filter((p) => !jaViuNestaSessao(p.id));
  if (disponiveis.length < n) disponiveis = pool;

  const erros = carregarProgresso().errosPorPalavra;
  const escolhidas = escolherNPonderado(
    disponiveis,
    (p) => 1 + (erros[p.id] ?? 0) * 2.5,
    n
  );

  for (const p of escolhidas) marcarVisto(p.id);
  return escolhidas;
}

/** Escolhe distractores plausíveis vindos do mesmo nível (e tema, se possível). */
export function escolherDistractores(
  alvo: Palavra,
  n: number,
  nivel: Nivel
): Palavra[] {
  const candidatos = porNivel(nivel).filter((p) => p.id !== alvo.id);
  // preferir mesmo tema; se não chegarem, completar com outros
  const mesmoTema = candidatos.filter((p) => p.tema === alvo.tema);
  const outros = candidatos.filter((p) => p.tema !== alvo.tema);
  const ordenados = [...baralhar(mesmoTema), ...baralhar(outros)];
  return ordenados.slice(0, n);
}

export function escolherFrasesRonda(nivel: Nivel, n: number): Frase[] {
  const pool = frasesPorNivel(nivel);
  const disponiveis = pool.filter((f) => !jaViuNestaSessao(f.id));
  const fonte = disponiveis.length >= n ? disponiveis : pool;
  const escolhidas = baralhar(fonte).slice(0, n);
  for (const f of escolhidas) marcarVisto(f.id);
  return escolhidas;
}
