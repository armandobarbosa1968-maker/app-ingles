import { porNivel, type Nivel, type Palavra } from "@/data/vocabulary";
import { hashString, rngSeeded } from "./random";

function dataDeHoje(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
}

export interface DesafioDoDia {
  data: string;
  nivel: Nivel;
  palavras: Palavra[];
  /** Multiplicador de pontos para este desafio. */
  multiplicador: number;
}

/**
 * Gera o desafio do dia de forma determinística a partir da data atual.
 * Garante que toda a gente vê o mesmo desafio no mesmo dia.
 */
export function desafioDeHoje(nivel: Nivel): DesafioDoDia {
  const data = dataDeHoje();
  const seed = hashString(`${data}|n${nivel}`);
  const rand = rngSeeded(seed);
  const pool = porNivel(nivel);
  const baralhado = pool
    .map((p) => ({ p, r: rand() }))
    .sort((a, b) => a.r - b.r)
    .map((x) => x.p);
  return {
    data,
    nivel,
    palavras: baralhado.slice(0, 5),
    multiplicador: 2,
  };
}

export function jaFezDesafioHoje(ultimaData: string | null): boolean {
  return ultimaData === dataDeHoje();
}

export { dataDeHoje };
