import type { Nivel } from "./vocabulary";

export interface Frase {
  id: string;
  /** Frase com "___" no lugar da palavra em falta. */
  template: string;
  /** Palavra correta em inglês. */
  correta: string;
  /** Distractores plausíveis em inglês. */
  distractores: string[];
  /** Tradução da frase completa para português. */
  traducao: string;
  nivel: Nivel;
}

export const frases: Frase[] = [
  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 1 — 30+ frases simples
  // ═════════════════════════════════════════════════════════════════
  { id: "f1-01", template: "The cat is ___.", correta: "black", distractores: ["one", "dog"], traducao: "O gato é preto.", nivel: 1 },
  { id: "f1-02", template: "I have a ___.", correta: "dog", distractores: ["red", "five"], traducao: "Eu tenho um cão.", nivel: 1 },
  { id: "f1-03", template: "The sun is ___.", correta: "yellow", distractores: ["blue", "cat"], traducao: "O sol é amarelo.", nivel: 1 },
  { id: "f1-04", template: "I am ___ years old.", correta: "seven", distractores: ["red", "dog"], traducao: "Eu tenho sete anos.", nivel: 1 },
  { id: "f1-05", template: "My ___ is happy.", correta: "mother", distractores: ["blue", "ten"], traducao: "A minha mãe está feliz.", nivel: 1 },
  { id: "f1-06", template: "The fish is in the ___.", correta: "water", distractores: ["cat", "red"], traducao: "O peixe está na água.", nivel: 1 },
  { id: "f1-07", template: "I see a big ___.", correta: "elephant", distractores: ["one", "green"], traducao: "Eu vejo um grande elefante.", nivel: 1 },
  { id: "f1-08", template: "The frog is ___.", correta: "green", distractores: ["bird", "five"], traducao: "A rã é verde.", nivel: 1 },
  { id: "f1-09", template: "I count to ___.", correta: "ten", distractores: ["pink", "horse"], traducao: "Eu conto até dez.", nivel: 1 },
  { id: "f1-10", template: "My ___ is my best friend.", correta: "brother", distractores: ["red", "cat"], traducao: "O meu irmão é o meu melhor amigo.", nivel: 1 },
  { id: "f1-11", template: "I love my ___.", correta: "father", distractores: ["seven", "green"], traducao: "Eu amo o meu pai.", nivel: 1 },
  { id: "f1-12", template: "The bird can ___.", correta: "fly", distractores: ["red", "ten"], traducao: "O pássaro pode voar.", nivel: 1 },
  { id: "f1-13", template: "I have ___ apples.", correta: "three", distractores: ["dog", "yellow"], traducao: "Eu tenho três maçãs.", nivel: 1 },
  { id: "f1-14", template: "The lion is ___ and big.", correta: "yellow", distractores: ["mother", "two"], traducao: "O leão é amarelo e grande.", nivel: 1 },
  { id: "f1-15", template: "I say ___ to my friend.", correta: "hello", distractores: ["red", "fish"], traducao: "Eu digo olá ao meu amigo.", nivel: 1 },
  { id: "f1-16", template: "The ___ is in the tree.", correta: "monkey", distractores: ["blue", "eight"], traducao: "O macaco está na árvore.", nivel: 1 },
  { id: "f1-17", template: "I have ___ eyes.", correta: "two", distractores: ["pink", "dog"], traducao: "Eu tenho dois olhos.", nivel: 1 },
  { id: "f1-18", template: "Look! A ___ rainbow!", correta: "purple", distractores: ["cat", "four"], traducao: "Olha! Um arco-íris roxo!", nivel: 1 },
  { id: "f1-19", template: "My ___ is small.", correta: "sister", distractores: ["blue", "six"], traducao: "A minha irmã é pequena.", nivel: 1 },
  { id: "f1-20", template: "I play with my ___.", correta: "ball", distractores: ["green", "nine"], traducao: "Eu brinco com a minha bola.", nivel: 1 },
  { id: "f1-21", template: "The ___ is in the sky.", correta: "moon", distractores: ["pig", "red"], traducao: "A lua está no céu.", nivel: 1 },
  { id: "f1-22", template: "The cow says ___.", correta: "moo", distractores: ["blue", "ten"], traducao: "A vaca diz mu.", nivel: 1 },
  { id: "f1-23", template: "I have a ___ kite.", correta: "red", distractores: ["dog", "eight"], traducao: "Eu tenho um papagaio vermelho.", nivel: 1 },
  { id: "f1-24", template: "My ___ is old and kind.", correta: "grandmother", distractores: ["green", "two"], traducao: "A minha avó é velhinha e simpática.", nivel: 1 },
  { id: "f1-25", template: "The ___ has stripes.", correta: "zebra", distractores: ["pink", "four"], traducao: "A zebra tem riscas.", nivel: 1 },
  { id: "f1-26", template: "I am very ___ today.", correta: "happy", distractores: ["bird", "ten"], traducao: "Eu estou muito feliz hoje.", nivel: 1 },
  { id: "f1-27", template: "The ___ is white and fluffy.", correta: "sheep", distractores: ["red", "one"], traducao: "A ovelha é branca e fofa.", nivel: 1 },
  { id: "f1-28", template: "There are ___ stars.", correta: "five", distractores: ["dog", "yellow"], traducao: "Há cinco estrelas.", nivel: 1 },
  { id: "f1-29", template: "I see a ___ butterfly.", correta: "pink", distractores: ["cat", "six"], traducao: "Eu vejo uma borboleta cor-de-rosa.", nivel: 1 },
  { id: "f1-30", template: "Goodbye, my ___.", correta: "friend", distractores: ["blue", "ten"], traducao: "Adeus, meu amigo.", nivel: 1 },
  { id: "f1-31", template: "The ___ is in the garden.", correta: "flower", distractores: ["nine", "purple"], traducao: "A flor está no jardim.", nivel: 1 },
  { id: "f1-32", template: "I have ___ fingers.", correta: "ten", distractores: ["pig", "green"], traducao: "Eu tenho dez dedos.", nivel: 1 },

  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 2 — 30+ frases
  // ═════════════════════════════════════════════════════════════════
  { id: "f2-01", template: "I eat an ___ for breakfast.", correta: "apple", distractores: ["pencil", "shoes"], traducao: "Eu como uma maçã ao pequeno-almoço.", nivel: 2 },
  { id: "f2-02", template: "I read a ___ at school.", correta: "book", distractores: ["milk", "hat"], traducao: "Eu leio um livro na escola.", nivel: 2 },
  { id: "f2-03", template: "She is wearing a ___.", correta: "dress", distractores: ["bread", "ruler"], traducao: "Ela está a usar um vestido.", nivel: 2 },
  { id: "f2-04", template: "I write with a ___.", correta: "pencil", distractores: ["cheese", "coat"], traducao: "Eu escrevo com um lápis.", nivel: 2 },
  { id: "f2-05", template: "I drink ___ every day.", correta: "milk", distractores: ["socks", "twelve"], traducao: "Eu bebo leite todos os dias.", nivel: 2 },
  { id: "f2-06", template: "I am ___ years old.", correta: "ten", distractores: ["pizza", "shoes"], traducao: "Eu tenho dez anos.", nivel: 2 },
  { id: "f2-07", template: "I put my books in my ___.", correta: "school bag", distractores: ["banana", "gloves"], traducao: "Eu ponho os livros na minha mochila.", nivel: 2 },
  { id: "f2-08", template: "My favourite fruit is the ___.", correta: "strawberry", distractores: ["chair", "scarf"], traducao: "A minha fruta favorita é o morango.", nivel: 2 },
  { id: "f2-09", template: "In winter I wear a ___.", correta: "coat", distractores: ["soup", "ruler"], traducao: "No inverno eu visto um casaco.", nivel: 2 },
  { id: "f2-10", template: "I cut paper with ___.", correta: "scissors", distractores: ["bread", "shoes"], traducao: "Eu corto papel com a tesoura.", nivel: 2 },
  { id: "f2-11", template: "She has ___ pencils.", correta: "fifteen", distractores: ["dress", "pizza"], traducao: "Ela tem quinze lápis.", nivel: 2 },
  { id: "f2-12", template: "I eat ___ for lunch.", correta: "rice", distractores: ["socks", "notebook"], traducao: "Eu como arroz ao almoço.", nivel: 2 },
  { id: "f2-13", template: "I sit on a ___.", correta: "chair", distractores: ["cake", "hat"], traducao: "Eu sento-me numa cadeira.", nivel: 2 },
  { id: "f2-14", template: "I want a slice of ___.", correta: "cake", distractores: ["ruler", "boots"], traducao: "Eu quero uma fatia de bolo.", nivel: 2 },
  { id: "f2-15", template: "He puts on his ___.", correta: "shoes", distractores: ["egg", "board"], traducao: "Ele calça os sapatos.", nivel: 2 },
  { id: "f2-16", template: "There are ___ days in two weeks.", correta: "fourteen", distractores: ["milk", "shirt"], traducao: "Há catorze dias em duas semanas.", nivel: 2 },
  { id: "f2-17", template: "My teacher writes on the ___.", correta: "board", distractores: ["chicken", "scarf"], traducao: "O meu professor escreve no quadro.", nivel: 2 },
  { id: "f2-18", template: "I love eating ___.", correta: "chocolate", distractores: ["pen", "boots"], traducao: "Eu adoro comer chocolate.", nivel: 2 },
  { id: "f2-19", template: "It is cold, I need ___.", correta: "gloves", distractores: ["water", "rice"], traducao: "Está frio, eu preciso de luvas.", nivel: 2 },
  { id: "f2-20", template: "I have ___ apples and three pears.", correta: "eleven", distractores: ["pencil", "skirt"], traducao: "Eu tenho onze maçãs e três peras.", nivel: 2 },
  { id: "f2-21", template: "She paints with a ___.", correta: "brush", distractores: ["banana", "shoes"], traducao: "Ela pinta com um pincel.", nivel: 2 },
  { id: "f2-22", template: "We have lunch in the ___.", correta: "kitchen", distractores: ["pen", "skirt"], traducao: "Nós almoçamos na cozinha.", nivel: 2 },
  { id: "f2-23", template: "I wear ___ on my feet.", correta: "socks", distractores: ["bread", "ruler"], traducao: "Eu uso meias nos pés.", nivel: 2 },
  { id: "f2-24", template: "I drink ___ when I am thirsty.", correta: "water", distractores: ["scarf", "pen"], traducao: "Eu bebo água quando tenho sede.", nivel: 2 },
  { id: "f2-25", template: "There are ___ months in a year.", correta: "twelve", distractores: ["soup", "shoes"], traducao: "Há doze meses num ano.", nivel: 2 },
  { id: "f2-26", template: "He sleeps in the ___.", correta: "bedroom", distractores: ["egg", "ruler"], traducao: "Ele dorme no quarto.", nivel: 2 },
  { id: "f2-27", template: "I draw with a ___.", correta: "pen", distractores: ["pizza", "boots"], traducao: "Eu desenho com uma caneta.", nivel: 2 },
  { id: "f2-28", template: "She likes ___ very much.", correta: "ice cream", distractores: ["board", "scarf"], traducao: "Ela gosta muito de gelado.", nivel: 2 },
  { id: "f2-29", template: "I take a bath in the ___.", correta: "bathroom", distractores: ["bread", "skirt"], traducao: "Eu tomo banho na casa de banho.", nivel: 2 },
  { id: "f2-30", template: "The cat eats ___.", correta: "chicken", distractores: ["pencil", "hat"], traducao: "O gato come frango.", nivel: 2 },
  { id: "f2-31", template: "My new ___ is blue.", correta: "t-shirt", distractores: ["water", "twenty"], traducao: "A minha t-shirt nova é azul.", nivel: 2 },
  { id: "f2-32", template: "I have a ___ for my snack.", correta: "sandwich", distractores: ["chair", "skirt"], traducao: "Eu tenho uma sandes para o lanche.", nivel: 2 },

  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 3 — 30+ frases
  // ═════════════════════════════════════════════════════════════════
  { id: "f3-01", template: "Today it is ___.", correta: "sunny", distractores: ["read", "hand"], traducao: "Hoje está sol.", nivel: 3 },
  { id: "f3-02", template: "I ___ at seven o'clock.", correta: "wake up", distractores: ["cloudy", "nose"], traducao: "Eu acordo às sete horas.", nivel: 3 },
  { id: "f3-03", template: "I see with my ___.", correta: "eyes", distractores: ["windy", "play"], traducao: "Eu vejo com os olhos.", nivel: 3 },
  { id: "f3-04", template: "Take an umbrella, it is ___.", correta: "rainy", distractores: ["sleep", "arm"], traducao: "Leva um guarda-chuva, está a chover.", nivel: 3 },
  { id: "f3-05", template: "I ___ a book before bed.", correta: "read", distractores: ["hot", "foot"], traducao: "Eu leio um livro antes de dormir.", nivel: 3 },
  { id: "f3-06", template: "I hear music with my ___.", correta: "ears", distractores: ["snowy", "go to school"], traducao: "Eu ouço música com os ouvidos.", nivel: 3 },
  { id: "f3-07", template: "In winter the weather is ___.", correta: "cold", distractores: ["mouth", "play"], traducao: "No inverno o tempo está frio.", nivel: 3 },
  { id: "f3-08", template: "I ___ my teeth every morning.", correta: "brush", distractores: ["foggy", "back"], traducao: "Eu lavo os dentes todas as manhãs.", nivel: 3 },
  { id: "f3-09", template: "We go to the ___ to swim.", correta: "beach", distractores: ["hair", "stormy"], traducao: "Nós vamos à praia para nadar.", nivel: 3 },
  { id: "f3-10", template: "She can ___ very fast.", correta: "run", distractores: ["sunny", "knee"], traducao: "Ela consegue correr muito rápido.", nivel: 3 },
  { id: "f3-11", template: "I do my ___ after school.", correta: "homework", distractores: ["cloudy", "shoulder"], traducao: "Eu faço os trabalhos de casa depois da escola.", nivel: 3 },
  { id: "f3-12", template: "Look at the ___ in the sky.", correta: "rainbow", distractores: ["leg", "play"], traducao: "Olha para o arco-íris no céu.", nivel: 3 },
  { id: "f3-13", template: "On ___ I go to the park.", correta: "Saturday", distractores: ["nose", "windy"], traducao: "Ao sábado vou ao parque.", nivel: 3 },
  { id: "f3-14", template: "I smell flowers with my ___.", correta: "nose", distractores: ["foggy", "swim"], traducao: "Eu cheiro flores com o nariz.", nivel: 3 },
  { id: "f3-15", template: "We have many books in the ___.", correta: "library", distractores: ["cold", "tooth"], traducao: "Nós temos muitos livros na biblioteca.", nivel: 3 },
  { id: "f3-16", template: "I love to ___ on the stage.", correta: "dance", distractores: ["rainy", "ear"], traducao: "Eu adoro dançar no palco.", nivel: 3 },
  { id: "f3-17", template: "She has long ___.", correta: "hair", distractores: ["sing", "stormy"], traducao: "Ela tem cabelo comprido.", nivel: 3 },
  { id: "f3-18", template: "It is ___ in summer.", correta: "hot", distractores: ["lips", "go to bed"], traducao: "É quente no verão.", nivel: 3 },
  { id: "f3-19", template: "I ___ a song every morning.", correta: "sing", distractores: ["foot", "cold"], traducao: "Eu canto uma canção todas as manhãs.", nivel: 3 },
  { id: "f3-20", template: "I touch with my ___.", correta: "fingers", distractores: ["snowy", "swim"], traducao: "Eu toco com os dedos.", nivel: 3 },
  { id: "f3-21", template: "My grandma can ___ delicious food.", correta: "cook", distractores: ["windy", "ear"], traducao: "A minha avó sabe cozinhar comida deliciosa.", nivel: 3 },
  { id: "f3-22", template: "I go to bed at ___.", correta: "night", distractores: ["sunny", "foot"], traducao: "Eu vou para a cama à noite.", nivel: 3 },
  { id: "f3-23", template: "The dog walks on four ___.", correta: "legs", distractores: ["rainy", "read"], traducao: "O cão anda em quatro patas.", nivel: 3 },
  { id: "f3-24", template: "On ___ I have my English class.", correta: "Monday", distractores: ["cloudy", "neck"], traducao: "À segunda tenho a aula de Inglês.", nivel: 3 },
  { id: "f3-25", template: "In autumn the weather is ___.", correta: "windy", distractores: ["arm", "paint"], traducao: "No outono o tempo está ventoso.", nivel: 3 },
  { id: "f3-26", template: "I ___ pictures with watercolours.", correta: "paint", distractores: ["foot", "rainy"], traducao: "Eu pinto quadros com aquarela.", nivel: 3 },
  { id: "f3-27", template: "Animals live at the ___.", correta: "zoo", distractores: ["knee", "cloudy"], traducao: "Os animais vivem no jardim zoológico.", nivel: 3 },
  { id: "f3-28", template: "I ___ the dog every evening.", correta: "walk", distractores: ["hot", "tongue"], traducao: "Eu passeio o cão todas as tardes.", nivel: 3 },
  { id: "f3-29", template: "I can ___ in the swimming pool.", correta: "swim", distractores: ["windy", "back"], traducao: "Eu sei nadar na piscina.", nivel: 3 },
  { id: "f3-30", template: "I eat breakfast in the ___.", correta: "morning", distractores: ["lips", "snowy"], traducao: "Eu tomo o pequeno-almoço de manhã.", nivel: 3 },
  { id: "f3-31", template: "I learn English at ___.", correta: "school", distractores: ["windy", "foot"], traducao: "Eu aprendo inglês na escola.", nivel: 3 },
  { id: "f3-32", template: "After dinner I ___ on the sofa.", correta: "watch TV", distractores: ["rainy", "ear"], traducao: "Depois de jantar vejo televisão no sofá.", nivel: 3 },
];

export function frasesPorNivel(nivel: Nivel): Frase[] {
  return frases.filter((f) => f.nivel === nivel);
}
