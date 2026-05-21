/**
 * Estado em memória que vive enquanto a aba estiver aberta.
 * Guarda IDs de palavras/frases já mostradas nesta sessão
 * para evitar repetir até que o pool se esgote.
 */

const vistos = new Set<string>();
const variantesRecentes: string[] = [];
let ultimaFraseIncentivo: string | null = null;
let ultimaMascote: string | null = null;

export function jaViuNestaSessao(id: string): boolean {
  return vistos.has(id);
}

export function marcarVisto(id: string): void {
  vistos.add(id);
}

export function limparVistos(): void {
  vistos.clear();
}

export function quantosVistos(): number {
  return vistos.size;
}

export function registarVariante(v: string): void {
  variantesRecentes.push(v);
  if (variantesRecentes.length > 4) variantesRecentes.shift();
}

export function variantePossivel(v: string): boolean {
  // evita repetir a mesma variante imediatamente; permite após 1 outra
  return variantesRecentes[variantesRecentes.length - 1] !== v;
}

export function getUltimaFraseIncentivo(): string | null {
  return ultimaFraseIncentivo;
}

export function setUltimaFraseIncentivo(f: string): void {
  ultimaFraseIncentivo = f;
}

export function getUltimaMascote(): string | null {
  return ultimaMascote;
}

export function setUltimaMascote(m: string): void {
  ultimaMascote = m;
}
