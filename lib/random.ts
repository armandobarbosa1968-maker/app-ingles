/** Embaralha (Fisher-Yates) sem mutar o array original. */
export function baralhar<T>(arr: readonly T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Escolhe n elementos aleatórios distintos. */
export function escolherN<T>(arr: readonly T[], n: number): T[] {
  return baralhar(arr).slice(0, Math.min(n, arr.length));
}

/** Escolha aleatória ponderada — pesos paralelos ao array. */
export function escolhaPonderada<T>(
  arr: readonly T[],
  pesos: readonly number[]
): T {
  const total = pesos.reduce((s, p) => s + p, 0);
  if (total <= 0) return arr[Math.floor(Math.random() * arr.length)];
  let r = Math.random() * total;
  for (let i = 0; i < arr.length; i++) {
    r -= pesos[i];
    if (r <= 0) return arr[i];
  }
  return arr[arr.length - 1];
}

/** Gera n itens distintos com seleção ponderada (sem reposição). */
export function escolherNPonderado<T>(
  arr: readonly T[],
  pesos: (t: T) => number,
  n: number
): T[] {
  const pool = arr.slice();
  const escolhidos: T[] = [];
  while (escolhidos.length < n && pool.length > 0) {
    const ps = pool.map(pesos);
    const total = ps.reduce((s, p) => s + p, 0);
    if (total <= 0) {
      const idx = Math.floor(Math.random() * pool.length);
      escolhidos.push(pool.splice(idx, 1)[0]);
      continue;
    }
    let r = Math.random() * total;
    let idx = pool.length - 1;
    for (let i = 0; i < pool.length; i++) {
      r -= ps[i];
      if (r <= 0) {
        idx = i;
        break;
      }
    }
    escolhidos.push(pool.splice(idx, 1)[0]);
  }
  return escolhidos;
}

/** Hash determinístico simples para gerar seeds a partir de strings (data). */
export function hashString(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

/** Gerador pseudo-aleatório determinístico (mulberry32). */
export function rngSeeded(seed: number): () => number {
  let a = seed >>> 0;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
