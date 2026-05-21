export type Nivel = 1 | 2 | 3;

export type Tema =
  | "animais"
  | "cores"
  | "numeros"
  | "familia"
  | "comida"
  | "roupa"
  | "escola"
  | "rotinas"
  | "tempo"
  | "corpo"
  | "casa"
  | "brinquedos"
  | "lugares"
  | "acoes"
  | "dias"
  | "saudacoes";

export interface Palavra {
  id: string;
  ingles: string;
  portugues: string;
  emoji: string;
  tema: Tema;
  nivel: Nivel;
  /** Etiquetas opcionais para filtrar cenários ou mini-jogos. */
  tags?: string[];
}

/**
 * Vocabulário alinhado com as Aprendizagens Essenciais de Inglês
 * do 1.º Ciclo do Ensino Básico (Ministério da Educação, Portugal).
 *
 * Nível 1 → 1.º e 2.º ano   (mínimo 80 palavras)
 * Nível 2 → 3.º ano         (mínimo 80 palavras)
 * Nível 3 → 4.º ano         (mínimo 80 palavras)
 */
export const vocabulario: Palavra[] = [
  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 1 — 1.º/2.º ano
  // ═════════════════════════════════════════════════════════════════

  // Animais (22)
  { id: "n1-a-dog", ingles: "dog", portugues: "cão", emoji: "🐶", tema: "animais", nivel: 1 },
  { id: "n1-a-cat", ingles: "cat", portugues: "gato", emoji: "🐱", tema: "animais", nivel: 1 },
  { id: "n1-a-fish", ingles: "fish", portugues: "peixe", emoji: "🐟", tema: "animais", nivel: 1 },
  { id: "n1-a-bird", ingles: "bird", portugues: "pássaro", emoji: "🐦", tema: "animais", nivel: 1 },
  { id: "n1-a-rabbit", ingles: "rabbit", portugues: "coelho", emoji: "🐰", tema: "animais", nivel: 1 },
  { id: "n1-a-cow", ingles: "cow", portugues: "vaca", emoji: "🐮", tema: "animais", nivel: 1 },
  { id: "n1-a-horse", ingles: "horse", portugues: "cavalo", emoji: "🐴", tema: "animais", nivel: 1 },
  { id: "n1-a-pig", ingles: "pig", portugues: "porco", emoji: "🐷", tema: "animais", nivel: 1 },
  { id: "n1-a-duck", ingles: "duck", portugues: "pato", emoji: "🦆", tema: "animais", nivel: 1 },
  { id: "n1-a-sheep", ingles: "sheep", portugues: "ovelha", emoji: "🐑", tema: "animais", nivel: 1 },
  { id: "n1-a-mouse", ingles: "mouse", portugues: "rato", emoji: "🐭", tema: "animais", nivel: 1 },
  { id: "n1-a-frog", ingles: "frog", portugues: "rã", emoji: "🐸", tema: "animais", nivel: 1 },
  { id: "n1-a-bear", ingles: "bear", portugues: "urso", emoji: "🐻", tema: "animais", nivel: 1 },
  { id: "n1-a-lion", ingles: "lion", portugues: "leão", emoji: "🦁", tema: "animais", nivel: 1 },
  { id: "n1-a-monkey", ingles: "monkey", portugues: "macaco", emoji: "🐵", tema: "animais", nivel: 1 },
  { id: "n1-a-elephant", ingles: "elephant", portugues: "elefante", emoji: "🐘", tema: "animais", nivel: 1 },
  { id: "n1-a-tiger", ingles: "tiger", portugues: "tigre", emoji: "🐯", tema: "animais", nivel: 1 },
  { id: "n1-a-giraffe", ingles: "giraffe", portugues: "girafa", emoji: "🦒", tema: "animais", nivel: 1 },
  { id: "n1-a-zebra", ingles: "zebra", portugues: "zebra", emoji: "🦓", tema: "animais", nivel: 1 },
  { id: "n1-a-snake", ingles: "snake", portugues: "cobra", emoji: "🐍", tema: "animais", nivel: 1 },
  { id: "n1-a-turtle", ingles: "turtle", portugues: "tartaruga", emoji: "🐢", tema: "animais", nivel: 1 },
  { id: "n1-a-butterfly", ingles: "butterfly", portugues: "borboleta", emoji: "🦋", tema: "animais", nivel: 1 },

  // Cores (11)
  { id: "n1-c-red", ingles: "red", portugues: "vermelho", emoji: "🟥", tema: "cores", nivel: 1 },
  { id: "n1-c-blue", ingles: "blue", portugues: "azul", emoji: "🟦", tema: "cores", nivel: 1 },
  { id: "n1-c-yellow", ingles: "yellow", portugues: "amarelo", emoji: "🟨", tema: "cores", nivel: 1 },
  { id: "n1-c-green", ingles: "green", portugues: "verde", emoji: "🟩", tema: "cores", nivel: 1 },
  { id: "n1-c-orange", ingles: "orange", portugues: "laranja", emoji: "🟧", tema: "cores", nivel: 1 },
  { id: "n1-c-purple", ingles: "purple", portugues: "roxo", emoji: "🟪", tema: "cores", nivel: 1 },
  { id: "n1-c-black", ingles: "black", portugues: "preto", emoji: "⬛", tema: "cores", nivel: 1 },
  { id: "n1-c-white", ingles: "white", portugues: "branco", emoji: "⬜", tema: "cores", nivel: 1 },
  { id: "n1-c-pink", ingles: "pink", portugues: "cor-de-rosa", emoji: "🌸", tema: "cores", nivel: 1 },
  { id: "n1-c-brown", ingles: "brown", portugues: "castanho", emoji: "🟫", tema: "cores", nivel: 1 },
  { id: "n1-c-grey", ingles: "grey", portugues: "cinzento", emoji: "🌫️", tema: "cores", nivel: 1 },

  // Números 1–10 (10)
  { id: "n1-n-1", ingles: "one", portugues: "um", emoji: "1️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-2", ingles: "two", portugues: "dois", emoji: "2️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-3", ingles: "three", portugues: "três", emoji: "3️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-4", ingles: "four", portugues: "quatro", emoji: "4️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-5", ingles: "five", portugues: "cinco", emoji: "5️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-6", ingles: "six", portugues: "seis", emoji: "6️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-7", ingles: "seven", portugues: "sete", emoji: "7️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-8", ingles: "eight", portugues: "oito", emoji: "8️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-9", ingles: "nine", portugues: "nove", emoji: "9️⃣", tema: "numeros", nivel: 1 },
  { id: "n1-n-10", ingles: "ten", portugues: "dez", emoji: "🔟", tema: "numeros", nivel: 1 },

  // Família (12)
  { id: "n1-f-mother", ingles: "mother", portugues: "mãe", emoji: "👩", tema: "familia", nivel: 1 },
  { id: "n1-f-father", ingles: "father", portugues: "pai", emoji: "👨", tema: "familia", nivel: 1 },
  { id: "n1-f-sister", ingles: "sister", portugues: "irmã", emoji: "👧", tema: "familia", nivel: 1 },
  { id: "n1-f-brother", ingles: "brother", portugues: "irmão", emoji: "👦", tema: "familia", nivel: 1 },
  { id: "n1-f-grandma", ingles: "grandmother", portugues: "avó", emoji: "👵", tema: "familia", nivel: 1 },
  { id: "n1-f-grandpa", ingles: "grandfather", portugues: "avô", emoji: "👴", tema: "familia", nivel: 1 },
  { id: "n1-f-baby", ingles: "baby", portugues: "bebé", emoji: "👶", tema: "familia", nivel: 1 },
  { id: "n1-f-uncle", ingles: "uncle", portugues: "tio", emoji: "🧔", tema: "familia", nivel: 1 },
  { id: "n1-f-aunt", ingles: "aunt", portugues: "tia", emoji: "👩‍🦰", tema: "familia", nivel: 1 },
  { id: "n1-f-cousin", ingles: "cousin", portugues: "primo", emoji: "🧒", tema: "familia", nivel: 1 },
  { id: "n1-f-son", ingles: "son", portugues: "filho", emoji: "👦", tema: "familia", nivel: 1 },
  { id: "n1-f-daughter", ingles: "daughter", portugues: "filha", emoji: "👧", tema: "familia", nivel: 1 },

  // Saudações/básico (12)
  { id: "n1-s-hello", ingles: "hello", portugues: "olá", emoji: "👋", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-bye", ingles: "goodbye", portugues: "adeus", emoji: "🙋", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-yes", ingles: "yes", portugues: "sim", emoji: "✅", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-no", ingles: "no", portugues: "não", emoji: "❌", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-please", ingles: "please", portugues: "por favor", emoji: "🙏", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-thanks", ingles: "thank you", portugues: "obrigado", emoji: "💖", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-sorry", ingles: "sorry", portugues: "desculpa", emoji: "😔", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-friend", ingles: "friend", portugues: "amigo", emoji: "🧑‍🤝‍🧑", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-boy", ingles: "boy", portugues: "menino", emoji: "👦", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-girl", ingles: "girl", portugues: "menina", emoji: "👧", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-happy", ingles: "happy", portugues: "feliz", emoji: "😊", tema: "saudacoes", nivel: 1 },
  { id: "n1-s-sad", ingles: "sad", portugues: "triste", emoji: "😢", tema: "saudacoes", nivel: 1 },

  // Brinquedos/natureza (12)
  { id: "n1-b-ball", ingles: "ball", portugues: "bola", emoji: "⚽", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-doll", ingles: "doll", portugues: "boneca", emoji: "🪆", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-car", ingles: "car", portugues: "carro", emoji: "🚗", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-house", ingles: "house", portugues: "casa", emoji: "🏠", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-bed", ingles: "bed", portugues: "cama", emoji: "🛏️", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-sun", ingles: "sun", portugues: "sol", emoji: "☀️", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-moon", ingles: "moon", portugues: "lua", emoji: "🌙", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-star", ingles: "star", portugues: "estrela", emoji: "⭐", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-tree", ingles: "tree", portugues: "árvore", emoji: "🌳", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-flower", ingles: "flower", portugues: "flor", emoji: "🌸", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-balloon", ingles: "balloon", portugues: "balão", emoji: "🎈", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-kite", ingles: "kite", portugues: "papagaio", emoji: "🪁", tema: "brinquedos", nivel: 1 },
  { id: "n1-b-bike", ingles: "bike", portugues: "bicicleta", emoji: "🚲", tema: "brinquedos", nivel: 1 },

  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 2 — 3.º ano
  // ═════════════════════════════════════════════════════════════════

  // Comida (24)
  { id: "n2-co-apple", ingles: "apple", portugues: "maçã", emoji: "🍎", tema: "comida", nivel: 2 },
  { id: "n2-co-banana", ingles: "banana", portugues: "banana", emoji: "🍌", tema: "comida", nivel: 2 },
  { id: "n2-co-bread", ingles: "bread", portugues: "pão", emoji: "🍞", tema: "comida", nivel: 2 },
  { id: "n2-co-cheese", ingles: "cheese", portugues: "queijo", emoji: "🧀", tema: "comida", nivel: 2 },
  { id: "n2-co-milk", ingles: "milk", portugues: "leite", emoji: "🥛", tema: "comida", nivel: 2 },
  { id: "n2-co-water", ingles: "water", portugues: "água", emoji: "💧", tema: "comida", nivel: 2 },
  { id: "n2-co-pizza", ingles: "pizza", portugues: "piza", emoji: "🍕", tema: "comida", nivel: 2 },
  { id: "n2-co-cake", ingles: "cake", portugues: "bolo", emoji: "🍰", tema: "comida", nivel: 2 },
  { id: "n2-co-egg", ingles: "egg", portugues: "ovo", emoji: "🥚", tema: "comida", nivel: 2 },
  { id: "n2-co-rice", ingles: "rice", portugues: "arroz", emoji: "🍚", tema: "comida", nivel: 2 },
  { id: "n2-co-grape", ingles: "grape", portugues: "uva", emoji: "🍇", tema: "comida", nivel: 2 },
  { id: "n2-co-strawb", ingles: "strawberry", portugues: "morango", emoji: "🍓", tema: "comida", nivel: 2 },
  { id: "n2-co-lemon", ingles: "lemon", portugues: "limão", emoji: "🍋", tema: "comida", nivel: 2 },
  { id: "n2-co-tomato", ingles: "tomato", portugues: "tomate", emoji: "🍅", tema: "comida", nivel: 2 },
  { id: "n2-co-potato", ingles: "potato", portugues: "batata", emoji: "🥔", tema: "comida", nivel: 2 },
  { id: "n2-co-carrot", ingles: "carrot", portugues: "cenoura", emoji: "🥕", tema: "comida", nivel: 2 },
  { id: "n2-co-chicken", ingles: "chicken", portugues: "frango", emoji: "🍗", tema: "comida", nivel: 2 },
  { id: "n2-co-meat", ingles: "meat", portugues: "carne", emoji: "🥩", tema: "comida", nivel: 2 },
  { id: "n2-co-sandwich", ingles: "sandwich", portugues: "sandes", emoji: "🥪", tema: "comida", nivel: 2 },
  { id: "n2-co-soup", ingles: "soup", portugues: "sopa", emoji: "🥣", tema: "comida", nivel: 2 },
  { id: "n2-co-chocolate", ingles: "chocolate", portugues: "chocolate", emoji: "🍫", tema: "comida", nivel: 2 },
  { id: "n2-co-icecream", ingles: "ice cream", portugues: "gelado", emoji: "🍦", tema: "comida", nivel: 2 },
  { id: "n2-co-juice", ingles: "juice", portugues: "sumo", emoji: "🧃", tema: "comida", nivel: 2 },
  { id: "n2-co-biscuit", ingles: "biscuit", portugues: "bolacha", emoji: "🍪", tema: "comida", nivel: 2 },

  // Roupa (16)
  { id: "n2-r-shirt", ingles: "shirt", portugues: "camisa", emoji: "👕", tema: "roupa", nivel: 2 },
  { id: "n2-r-pants", ingles: "trousers", portugues: "calças", emoji: "👖", tema: "roupa", nivel: 2 },
  { id: "n2-r-shoes", ingles: "shoes", portugues: "sapatos", emoji: "👟", tema: "roupa", nivel: 2 },
  { id: "n2-r-hat", ingles: "hat", portugues: "chapéu", emoji: "🎩", tema: "roupa", nivel: 2 },
  { id: "n2-r-dress", ingles: "dress", portugues: "vestido", emoji: "👗", tema: "roupa", nivel: 2 },
  { id: "n2-r-coat", ingles: "coat", portugues: "casaco", emoji: "🧥", tema: "roupa", nivel: 2 },
  { id: "n2-r-socks", ingles: "socks", portugues: "meias", emoji: "🧦", tema: "roupa", nivel: 2 },
  { id: "n2-r-gloves", ingles: "gloves", portugues: "luvas", emoji: "🧤", tema: "roupa", nivel: 2 },
  { id: "n2-r-tshirt", ingles: "t-shirt", portugues: "t-shirt", emoji: "👕", tema: "roupa", nivel: 2 },
  { id: "n2-r-skirt", ingles: "skirt", portugues: "saia", emoji: "👚", tema: "roupa", nivel: 2 },
  { id: "n2-r-shorts", ingles: "shorts", portugues: "calções", emoji: "🩳", tema: "roupa", nivel: 2 },
  { id: "n2-r-scarf", ingles: "scarf", portugues: "cachecol", emoji: "🧣", tema: "roupa", nivel: 2 },
  { id: "n2-r-boots", ingles: "boots", portugues: "botas", emoji: "🥾", tema: "roupa", nivel: 2 },
  { id: "n2-r-sweater", ingles: "sweater", portugues: "camisola", emoji: "🧶", tema: "roupa", nivel: 2 },
  { id: "n2-r-pyjamas", ingles: "pyjamas", portugues: "pijama", emoji: "🌙", tema: "roupa", nivel: 2 },
  { id: "n2-r-jeans", ingles: "jeans", portugues: "calças de ganga", emoji: "👖", tema: "roupa", nivel: 2 },

  // Escola (18)
  { id: "n2-e-book", ingles: "book", portugues: "livro", emoji: "📖", tema: "escola", nivel: 2 },
  { id: "n2-e-pencil", ingles: "pencil", portugues: "lápis", emoji: "✏️", tema: "escola", nivel: 2 },
  { id: "n2-e-pen", ingles: "pen", portugues: "caneta", emoji: "🖊️", tema: "escola", nivel: 2 },
  { id: "n2-e-bag", ingles: "school bag", portugues: "mochila", emoji: "🎒", tema: "escola", nivel: 2 },
  { id: "n2-e-ruler", ingles: "ruler", portugues: "régua", emoji: "📏", tema: "escola", nivel: 2 },
  { id: "n2-e-scissors", ingles: "scissors", portugues: "tesoura", emoji: "✂️", tema: "escola", nivel: 2 },
  { id: "n2-e-board", ingles: "board", portugues: "quadro", emoji: "📋", tema: "escola", nivel: 2 },
  { id: "n2-e-eraser", ingles: "eraser", portugues: "borracha", emoji: "🧽", tema: "escola", nivel: 2 },
  { id: "n2-e-classroom", ingles: "classroom", portugues: "sala de aula", emoji: "🏫", tema: "escola", nivel: 2 },
  { id: "n2-e-teacher", ingles: "teacher", portugues: "professor", emoji: "🧑‍🏫", tema: "escola", nivel: 2 },
  { id: "n2-e-student", ingles: "student", portugues: "aluno", emoji: "🧑‍🎓", tema: "escola", nivel: 2 },
  { id: "n2-e-desk", ingles: "desk", portugues: "secretária", emoji: "🪑", tema: "escola", nivel: 2 },
  { id: "n2-e-chair", ingles: "chair", portugues: "cadeira", emoji: "🪑", tema: "escola", nivel: 2 },
  { id: "n2-e-notebook", ingles: "notebook", portugues: "caderno", emoji: "📓", tema: "escola", nivel: 2 },
  { id: "n2-e-computer", ingles: "computer", portugues: "computador", emoji: "💻", tema: "escola", nivel: 2 },
  { id: "n2-e-paint", ingles: "paint", portugues: "tinta", emoji: "🎨", tema: "escola", nivel: 2 },
  { id: "n2-e-brush", ingles: "brush", portugues: "pincel", emoji: "🖌️", tema: "escola", nivel: 2 },
  { id: "n2-e-glue", ingles: "glue", portugues: "cola", emoji: "🩹", tema: "escola", nivel: 2 },

  // Números 1–20 (20)
  { id: "n2-n-1", ingles: "one", portugues: "um", emoji: "1️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-2", ingles: "two", portugues: "dois", emoji: "2️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-3", ingles: "three", portugues: "três", emoji: "3️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-4", ingles: "four", portugues: "quatro", emoji: "4️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-5", ingles: "five", portugues: "cinco", emoji: "5️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-6", ingles: "six", portugues: "seis", emoji: "6️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-7", ingles: "seven", portugues: "sete", emoji: "7️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-8", ingles: "eight", portugues: "oito", emoji: "8️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-9", ingles: "nine", portugues: "nove", emoji: "9️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-10", ingles: "ten", portugues: "dez", emoji: "🔟", tema: "numeros", nivel: 2 },
  { id: "n2-n-11", ingles: "eleven", portugues: "onze", emoji: "1️⃣1️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-12", ingles: "twelve", portugues: "doze", emoji: "1️⃣2️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-13", ingles: "thirteen", portugues: "treze", emoji: "1️⃣3️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-14", ingles: "fourteen", portugues: "catorze", emoji: "1️⃣4️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-15", ingles: "fifteen", portugues: "quinze", emoji: "1️⃣5️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-16", ingles: "sixteen", portugues: "dezasseis", emoji: "1️⃣6️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-17", ingles: "seventeen", portugues: "dezassete", emoji: "1️⃣7️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-18", ingles: "eighteen", portugues: "dezoito", emoji: "1️⃣8️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-19", ingles: "nineteen", portugues: "dezanove", emoji: "1️⃣9️⃣", tema: "numeros", nivel: 2 },
  { id: "n2-n-20", ingles: "twenty", portugues: "vinte", emoji: "2️⃣0️⃣", tema: "numeros", nivel: 2 },

  // Casa (extra para nível 2)
  { id: "n2-h-kitchen", ingles: "kitchen", portugues: "cozinha", emoji: "🍳", tema: "casa", nivel: 2 },
  { id: "n2-h-bedroom", ingles: "bedroom", portugues: "quarto", emoji: "🛌", tema: "casa", nivel: 2 },
  { id: "n2-h-bathroom", ingles: "bathroom", portugues: "casa de banho", emoji: "🛁", tema: "casa", nivel: 2 },
  { id: "n2-h-garden", ingles: "garden", portugues: "jardim", emoji: "🌷", tema: "casa", nivel: 2 },
  { id: "n2-h-living", ingles: "living room", portugues: "sala", emoji: "🛋️", tema: "casa", nivel: 2 },

  // ═════════════════════════════════════════════════════════════════
  // NÍVEL 3 — 4.º ano
  // ═════════════════════════════════════════════════════════════════

  // Rotinas diárias (16)
  { id: "n3-ro-wake", ingles: "wake up", portugues: "acordar", emoji: "⏰", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-brush", ingles: "brush teeth", portugues: "lavar os dentes", emoji: "🪥", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-breakfast", ingles: "eat breakfast", portugues: "tomar o pequeno-almoço", emoji: "🥣", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-go", ingles: "go to school", portugues: "ir para a escola", emoji: "🏫", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-play", ingles: "play", portugues: "brincar", emoji: "🧸", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-read", ingles: "read", portugues: "ler", emoji: "📚", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-sleep", ingles: "sleep", portugues: "dormir", emoji: "😴", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-shower", ingles: "take a shower", portugues: "tomar banho", emoji: "🚿", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-dressed", ingles: "get dressed", portugues: "vestir-se", emoji: "🧥", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-lunch", ingles: "have lunch", portugues: "almoçar", emoji: "🍽️", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-dinner", ingles: "have dinner", portugues: "jantar", emoji: "🍝", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-homework", ingles: "do homework", portugues: "fazer trabalhos de casa", emoji: "📝", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-tv", ingles: "watch TV", portugues: "ver televisão", emoji: "📺", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-music", ingles: "listen to music", portugues: "ouvir música", emoji: "🎧", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-walk", ingles: "walk the dog", portugues: "passear o cão", emoji: "🦮", tema: "rotinas", nivel: 3 },
  { id: "n3-ro-bed", ingles: "go to bed", portugues: "ir para a cama", emoji: "🛏️", tema: "rotinas", nivel: 3 },

  // Tempo/clima (14)
  { id: "n3-t-sunny", ingles: "sunny", portugues: "sol", emoji: "☀️", tema: "tempo", nivel: 3 },
  { id: "n3-t-rainy", ingles: "rainy", portugues: "chuva", emoji: "🌧️", tema: "tempo", nivel: 3 },
  { id: "n3-t-cloudy", ingles: "cloudy", portugues: "nublado", emoji: "☁️", tema: "tempo", nivel: 3 },
  { id: "n3-t-snowy", ingles: "snowy", portugues: "neve", emoji: "❄️", tema: "tempo", nivel: 3 },
  { id: "n3-t-windy", ingles: "windy", portugues: "vento", emoji: "🌬️", tema: "tempo", nivel: 3 },
  { id: "n3-t-storm", ingles: "stormy", portugues: "trovoada", emoji: "⛈️", tema: "tempo", nivel: 3 },
  { id: "n3-t-hot", ingles: "hot", portugues: "calor", emoji: "🥵", tema: "tempo", nivel: 3 },
  { id: "n3-t-cold", ingles: "cold", portugues: "frio", emoji: "🥶", tema: "tempo", nivel: 3 },
  { id: "n3-t-warm", ingles: "warm", portugues: "morno", emoji: "🌤️", tema: "tempo", nivel: 3 },
  { id: "n3-t-cool", ingles: "cool", portugues: "fresco", emoji: "🍃", tema: "tempo", nivel: 3 },
  { id: "n3-t-foggy", ingles: "foggy", portugues: "nevoeiro", emoji: "🌁", tema: "tempo", nivel: 3 },
  { id: "n3-t-weather", ingles: "weather", portugues: "tempo", emoji: "🌦️", tema: "tempo", nivel: 3 },
  { id: "n3-t-sky", ingles: "sky", portugues: "céu", emoji: "🌌", tema: "tempo", nivel: 3 },
  { id: "n3-t-rainbow", ingles: "rainbow", portugues: "arco-íris", emoji: "🌈", tema: "tempo", nivel: 3 },

  // Partes do corpo (20)
  { id: "n3-co-head", ingles: "head", portugues: "cabeça", emoji: "🧠", tema: "corpo", nivel: 3 },
  { id: "n3-co-hand", ingles: "hand", portugues: "mão", emoji: "✋", tema: "corpo", nivel: 3 },
  { id: "n3-co-foot", ingles: "foot", portugues: "pé", emoji: "🦶", tema: "corpo", nivel: 3 },
  { id: "n3-co-eye", ingles: "eye", portugues: "olho", emoji: "👁️", tema: "corpo", nivel: 3 },
  { id: "n3-co-ear", ingles: "ear", portugues: "orelha", emoji: "👂", tema: "corpo", nivel: 3 },
  { id: "n3-co-nose", ingles: "nose", portugues: "nariz", emoji: "👃", tema: "corpo", nivel: 3 },
  { id: "n3-co-mouth", ingles: "mouth", portugues: "boca", emoji: "👄", tema: "corpo", nivel: 3 },
  { id: "n3-co-arm", ingles: "arm", portugues: "braço", emoji: "💪", tema: "corpo", nivel: 3 },
  { id: "n3-co-leg", ingles: "leg", portugues: "perna", emoji: "🦵", tema: "corpo", nivel: 3 },
  { id: "n3-co-knee", ingles: "knee", portugues: "joelho", emoji: "🦵", tema: "corpo", nivel: 3 },
  { id: "n3-co-finger", ingles: "finger", portugues: "dedo", emoji: "👆", tema: "corpo", nivel: 3 },
  { id: "n3-co-toe", ingles: "toe", portugues: "dedo do pé", emoji: "🦶", tema: "corpo", nivel: 3 },
  { id: "n3-co-hair", ingles: "hair", portugues: "cabelo", emoji: "💇", tema: "corpo", nivel: 3 },
  { id: "n3-co-neck", ingles: "neck", portugues: "pescoço", emoji: "🦒", tema: "corpo", nivel: 3 },
  { id: "n3-co-shoulder", ingles: "shoulder", portugues: "ombro", emoji: "🤷", tema: "corpo", nivel: 3 },
  { id: "n3-co-back", ingles: "back", portugues: "costas", emoji: "🔙", tema: "corpo", nivel: 3 },
  { id: "n3-co-tooth", ingles: "tooth", portugues: "dente", emoji: "🦷", tema: "corpo", nivel: 3 },
  { id: "n3-co-tongue", ingles: "tongue", portugues: "língua", emoji: "👅", tema: "corpo", nivel: 3 },
  { id: "n3-co-lips", ingles: "lips", portugues: "lábios", emoji: "👄", tema: "corpo", nivel: 3 },
  { id: "n3-co-face", ingles: "face", portugues: "cara", emoji: "😀", tema: "corpo", nivel: 3 },

  // Lugares e ações (16)
  { id: "n3-l-park", ingles: "park", portugues: "parque", emoji: "🌳", tema: "lugares", nivel: 3 },
  { id: "n3-l-beach", ingles: "beach", portugues: "praia", emoji: "🏖️", tema: "lugares", nivel: 3 },
  { id: "n3-l-supermarket", ingles: "supermarket", portugues: "supermercado", emoji: "🛒", tema: "lugares", nivel: 3 },
  { id: "n3-l-library", ingles: "library", portugues: "biblioteca", emoji: "📚", tema: "lugares", nivel: 3 },
  { id: "n3-l-hospital", ingles: "hospital", portugues: "hospital", emoji: "🏥", tema: "lugares", nivel: 3 },
  { id: "n3-l-zoo", ingles: "zoo", portugues: "jardim zoológico", emoji: "🦁", tema: "lugares", nivel: 3 },
  { id: "n3-l-farm", ingles: "farm", portugues: "quinta", emoji: "🚜", tema: "lugares", nivel: 3 },
  { id: "n3-l-city", ingles: "city", portugues: "cidade", emoji: "🏙️", tema: "lugares", nivel: 3 },
  { id: "n3-ac-swim", ingles: "swim", portugues: "nadar", emoji: "🏊", tema: "acoes", nivel: 3 },
  { id: "n3-ac-run", ingles: "run", portugues: "correr", emoji: "🏃", tema: "acoes", nivel: 3 },
  { id: "n3-ac-jump", ingles: "jump", portugues: "saltar", emoji: "🤸", tema: "acoes", nivel: 3 },
  { id: "n3-ac-dance", ingles: "dance", portugues: "dançar", emoji: "💃", tema: "acoes", nivel: 3 },
  { id: "n3-ac-sing", ingles: "sing", portugues: "cantar", emoji: "🎤", tema: "acoes", nivel: 3 },
  { id: "n3-ac-paint", ingles: "paint", portugues: "pintar", emoji: "🎨", tema: "acoes", nivel: 3 },
  { id: "n3-ac-cook", ingles: "cook", portugues: "cozinhar", emoji: "🍳", tema: "acoes", nivel: 3 },
  { id: "n3-ac-learn", ingles: "learn", portugues: "aprender", emoji: "🎓", tema: "acoes", nivel: 3 },

  // Dias e tempo (14)
  { id: "n3-d-mon", ingles: "Monday", portugues: "segunda-feira", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-tue", ingles: "Tuesday", portugues: "terça-feira", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-wed", ingles: "Wednesday", portugues: "quarta-feira", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-thu", ingles: "Thursday", portugues: "quinta-feira", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-fri", ingles: "Friday", portugues: "sexta-feira", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-sat", ingles: "Saturday", portugues: "sábado", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-sun", ingles: "Sunday", portugues: "domingo", emoji: "📅", tema: "dias", nivel: 3 },
  { id: "n3-d-today", ingles: "today", portugues: "hoje", emoji: "📆", tema: "dias", nivel: 3 },
  { id: "n3-d-tomorrow", ingles: "tomorrow", portugues: "amanhã", emoji: "🌅", tema: "dias", nivel: 3 },
  { id: "n3-d-yesterday", ingles: "yesterday", portugues: "ontem", emoji: "🌇", tema: "dias", nivel: 3 },
  { id: "n3-d-morning", ingles: "morning", portugues: "manhã", emoji: "🌄", tema: "dias", nivel: 3 },
  { id: "n3-d-afternoon", ingles: "afternoon", portugues: "tarde", emoji: "🌞", tema: "dias", nivel: 3 },
  { id: "n3-d-evening", ingles: "evening", portugues: "final do dia", emoji: "🌆", tema: "dias", nivel: 3 },
  { id: "n3-d-night", ingles: "night", portugues: "noite", emoji: "🌙", tema: "dias", nivel: 3 },
];

export function porNivel(nivel: Nivel): Palavra[] {
  return vocabulario.filter((p) => p.nivel === nivel);
}

export function porTema(tema: Tema, nivel?: Nivel): Palavra[] {
  return vocabulario.filter(
    (p) => p.tema === tema && (nivel === undefined || p.nivel === nivel)
  );
}

export function palavraPorId(id: string): Palavra | undefined {
  return vocabulario.find((p) => p.id === id);
}

/** Temas presentes em cada nível, ordenados para uso em cenários e seleção. */
export const temasPorNivel: Record<Nivel, Tema[]> = {
  1: ["animais", "cores", "numeros", "familia", "saudacoes", "brinquedos"],
  2: ["comida", "roupa", "escola", "numeros", "casa"],
  3: ["rotinas", "tempo", "corpo", "lugares", "acoes", "dias"],
};
