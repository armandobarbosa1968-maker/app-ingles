export interface Mascote {
  id: string;
  nome: string;
  emoji: string;
  pontosNecessarios: number;
  descricao: string;
}

export interface Autocolante {
  id: string;
  emoji: string;
  nome: string;
}

/** 10 mascotes desbloqueáveis por progresso de pontos. */
export const mascotes: Mascote[] = [
  { id: "m-cao", nome: "Buddy", emoji: "🐶", pontosNecessarios: 0, descricao: "O teu primeiro amigo!" },
  { id: "m-gato", nome: "Whiskers", emoji: "🐱", pontosNecessarios: 50, descricao: "Curioso e brincalhão." },
  { id: "m-coelho", nome: "Hoppy", emoji: "🐰", pontosNecessarios: 100, descricao: "Salta de alegria contigo." },
  { id: "m-raposa", nome: "Foxy", emoji: "🦊", pontosNecessarios: 200, descricao: "Esperta e rápida." },
  { id: "m-coruja", nome: "Hoot", emoji: "🦉", pontosNecessarios: 350, descricao: "Sabia que ias chegar aqui." },
  { id: "m-leao", nome: "Roar", emoji: "🦁", pontosNecessarios: 500, descricao: "Rei da floresta inglesa!" },
  { id: "m-panda", nome: "Bamboo", emoji: "🐼", pontosNecessarios: 700, descricao: "Doce e poderoso." },
  { id: "m-unicornio", nome: "Sparkle", emoji: "🦄", pontosNecessarios: 950, descricao: "Mágico e brilhante." },
  { id: "m-dragao", nome: "Blaze", emoji: "🐲", pontosNecessarios: 1200, descricao: "Solta fogo de inglês!" },
  { id: "m-alien", nome: "Zog", emoji: "👽", pontosNecessarios: 1500, descricao: "Vem do espaço para te elogiar." },
];

/** 20 autocolantes colecionáveis. */
export const autocolantes: Autocolante[] = [
  { id: "a-01", emoji: "⭐", nome: "Estrela" },
  { id: "a-02", emoji: "🏆", nome: "Troféu" },
  { id: "a-03", emoji: "🥇", nome: "Medalha de ouro" },
  { id: "a-04", emoji: "🎉", nome: "Festa" },
  { id: "a-05", emoji: "🎈", nome: "Balão" },
  { id: "a-06", emoji: "🌟", nome: "Estrela mágica" },
  { id: "a-07", emoji: "🎁", nome: "Prenda" },
  { id: "a-08", emoji: "🍭", nome: "Chupa" },
  { id: "a-09", emoji: "🌈", nome: "Arco-íris" },
  { id: "a-10", emoji: "🎯", nome: "Alvo" },
  { id: "a-11", emoji: "🚀", nome: "Foguete" },
  { id: "a-12", emoji: "🪐", nome: "Planeta" },
  { id: "a-13", emoji: "🦋", nome: "Borboleta" },
  { id: "a-14", emoji: "🌸", nome: "Flor" },
  { id: "a-15", emoji: "🍀", nome: "Trevo da sorte" },
  { id: "a-16", emoji: "💎", nome: "Diamante" },
  { id: "a-17", emoji: "👑", nome: "Coroa" },
  { id: "a-18", emoji: "🎨", nome: "Paleta" },
  { id: "a-19", emoji: "🎪", nome: "Circo" },
  { id: "a-20", emoji: "🪄", nome: "Varinha" },
];

/** Frases de incentivo aleatórias para o "Parabéns!". */
export const fimDeRonda: string[] = [
  "Parabéns! Estás incrível!",
  "Boa! Mais um passo gigante!",
  "Continua assim, campeão!",
  "Bravo! O teu inglês está a brilhar!",
  "Que ronda fantástica!",
  "Estás cada vez melhor!",
  "Que talento! Fizeste muito bem!",
  "Yes! Mais uma vitória!",
  "Excelente trabalho!",
  "És uma estrela do inglês!",
  "Wow! Que rapidez!",
  "Olha que orgulho!",
  "És mesmo um(a) crack!",
  "Boa pontaria!",
  "Vais longe!",
];

/** Mensagens curtas após um acerto. */
export const acertou: string[] = [
  "Boa!",
  "Certinho!",
  "Excelente!",
  "Bravo!",
  "Yes!",
  "Brilhante!",
  "Genial!",
  "Boa resposta!",
  "Super!",
  "Top!",
];

/** Mensagens curtas e gentis após um erro. */
export const tentaOutraVez: string[] = [
  "Quase! Tenta outra vez.",
  "Não foi desta. Continua!",
  "Estás muito perto!",
  "Vamos tentar de novo.",
  "Já vais conseguir!",
  "Vai com calma e tenta outra vez.",
];

/** Devolve uma frase aleatória sem repetir a anterior. */
export function aleatoria(lista: string[], ultima: string | null): string {
  if (lista.length === 0) return "";
  if (lista.length === 1) return lista[0];
  let escolhida = lista[Math.floor(Math.random() * lista.length)];
  let tentativas = 0;
  while (escolhida === ultima && tentativas < 5) {
    escolhida = lista[Math.floor(Math.random() * lista.length)];
    tentativas++;
  }
  return escolhida;
}

export function mascoteAtual(pontos: number): Mascote {
  const desbloqueadas = mascotes.filter((m) => m.pontosNecessarios <= pontos);
  return desbloqueadas[desbloqueadas.length - 1] ?? mascotes[0];
}

export function mascotesDesbloqueadasPara(pontos: number): Mascote[] {
  return mascotes.filter((m) => m.pontosNecessarios <= pontos);
}
