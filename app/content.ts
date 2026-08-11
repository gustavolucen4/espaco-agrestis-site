export type Activity = {
  type: string;
  title: string;
  date: string;
  dateDay?: string;
  dateMonth?: string;
  place: string;
  detail: string;
  href: string;
  featured?: boolean;
};

export type Movie = {
  order: number;
  title: string;
  theme: string;
  year: string;
  status: string;
  favorite?: boolean;
  coverImage: string | null;
  coverFormat?: "cover" | "post";
  coverAlt: string;
  postUrl?: string;
  description: string;
  discussion: string;
};

export type Book = {
  title: string;
  author: string;
  status: string;
  stage: "read" | "current" | "upcoming";
  meeting: string;
  coverImage: string | null;
  coverFormat?: "cover" | "post";
  coverAlt: string;
  postUrl?: string;
  description: string;
  discussion: string;
};

export const upcomingActivities: Activity[] = [
  {
    type: "Clube do Livro",
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    date: "22 de agosto de 2026, às 9h",
    dateDay: "22",
    dateMonth: "AGO",
    place: "Pan Nossa · Caruaru, PE",
    detail:
      "Encontro para conversar sobre a primeira parte da jornada, a amizade entre os personagens e as escolhas feitas diante do perigo.",
    href: "/clube-do-livro",
    featured: true,
  },
  {
    type: "Recolhimento mensal",
    title: "Manhã de recolhimento com sacerdote",
    date: "Nova data em breve",
    place: "Caruaru, PE",
    detail:
      "Tempo de oração, formação e silêncio para renovar a vida interior no cotidiano.",
    href: "/#recolhimento",
  },
  {
    type: "Cinedebate",
    title: "Sessão e conversa sobre cinema",
    date: "Nova sessão em breve",
    place: "Espaço Agrestis",
    detail:
      "Um filme escolhido em comunidade, seguido de conversa sobre personagens, virtudes e escolhas concretas.",
    href: "/cinedebate",
  },
];

export const watchedMovies: Movie[] = [
  {
    order: 1,
    title: "Gênio Indomável",
    theme: "Talento e escolhas",
    year: "1997",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme Gênio Indomável",
    description:
      "Um jovem de inteligência extraordinária precisa decidir se continuará protegido por suas defesas ou aceitará ajuda para construir o próprio caminho.",
    discussion:
      "Amizade verdadeira, medo de mudar, responsabilidade pelos próprios dons e abertura para receber ajuda.",
  },
  {
    order: 2,
    title: "Whiplash",
    theme: "Ambição e limites",
    year: "2014",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme Whiplash",
    description:
      "A busca obsessiva pela excelência coloca um jovem músico diante dos limites entre disciplina, talento, abuso e sucesso.",
    discussion:
      "O preço da excelência, autoridade, obsessão por resultados e o equilíbrio entre vocação e vida pessoal.",
  },
  {
    order: 3,
    title: "Felicidade Não Se Compra",
    theme: "Esperança e comunidade",
    year: "1946",
    status: "Já assistido",
    favorite: true,
    coverImage: null,
    coverAlt: "Capa do filme Felicidade Não Se Compra",
    description:
      "Ao atravessar sua noite mais difícil, um homem descobre o valor que sua presença, seus sacrifícios e suas amizades tiveram na vida de toda uma cidade.",
    discussion:
      "O valor de uma vida comum, esperança nas crises, serviço aos outros e a riqueza construída pelas amizades.",
  },
  {
    order: 4,
    title: "Onde os Fracos Não Têm Vez",
    theme: "Escolhas e consequências",
    year: "2007",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme Onde os Fracos Não Têm Vez",
    description:
      "Uma decisão tomada diante de uma fortuna abandonada desencadeia uma perseguição marcada pela violência e pelas consequências do acaso.",
    discussion:
      "Responsabilidade moral, ganância, presença do mal e as consequências imprevisíveis de uma escolha.",
  },
  {
    order: 5,
    title: "O Preço de um Resgate",
    theme: "Família e coragem",
    year: "1996",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme O Preço de um Resgate",
    description:
      "O sequestro de uma criança leva seu pai a uma decisão extrema, colocando em tensão prudência, coragem e amor pela família.",
    discussion:
      "Decisões sob pressão, limites da negociação, proteção da família e diferença entre coragem e imprudência.",
  },
  {
    order: 6,
    title: "Gladiador",
    theme: "Honra e dever",
    year: "2000",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme Gladiador",
    description:
      "Um general traído transforma sua busca por justiça em uma luta por fidelidade, honra e liberdade diante do poder corrompido.",
    discussion:
      "Liderança, lealdade, justiça, desejo de vingança e permanência dos valores em situações extremas.",
  },
  {
    order: 7,
    title: "Cidadão Kane",
    theme: "Poder e vazio",
    year: "1941",
    status: "Já assistido",
    coverImage: null,
    coverAlt: "Capa do filme Cidadão Kane",
    description:
      "A vida de um magnata da imprensa é reconstruída a partir de lembranças que revelam suas conquistas, perdas e contradições.",
    discussion:
      "Ambição, poder, solidão, memória e aquilo que realmente permanece quando o sucesso exterior termina.",
  },
  {
    order: 8,
    title: "Encontrarás Dragões",
    theme: "Perdão e vocação",
    year: "2011",
    status: "Já assistido",
    coverImage: "/covers/encontraras-dragoes.jpg",
    coverFormat: "post",
    coverAlt: "Capa do filme Encontrarás Dragões",
    postUrl: "https://www.instagram.com/espacoagrestis/p/DaSgI7hxbEq/",
    description:
      "Duas trajetórias atravessadas pela guerra e por escolhas opostas conduzem a uma reflexão sobre fé, ressentimento, perdão e santidade no cotidiano.",
    discussion:
      "Liberdade interior, vocação, reconciliação, fé em tempos difíceis e as pequenas escolhas que formam uma vida.",
  },
  {
    order: 9,
    title: "Rocky Balboa",
    theme: "Perseverança e recomeço",
    year: "2006",
    status: "Já assistido",
    coverImage: "/covers/rocky-balboa.jpg",
    coverFormat: "post",
    coverAlt: "Capa do filme Rocky Balboa",
    postUrl: "https://www.instagram.com/espacoagrestis/p/DbUPwv2NvJW/",
    description:
      "Anos depois de deixar os ringues, Rocky encontra uma última oportunidade de enfrentar seus limites e dar sentido ao que ainda carrega por dentro.",
    discussion:
      "Maturidade, luto, perseverança, dignidade diante da derrota e coragem para recomeçar.",
  },
];

export const books: Book[] = [
  {
    title: "O Hobbit",
    author: "J. R. R. Tolkien",
    status: "Já lido",
    stage: "read",
    meeting: "Leitura concluída",
    coverImage: "/covers/o-hobbit.webp",
    coverFormat: "post",
    coverAlt: "Capa do livro O Hobbit",
    postUrl: "https://www.instagram.com/espacoagrestis/p/DZwvjmsxLYg/",
    description:
      "A inesperada jornada de Bilbo Bolseiro para além do conforto do Condado, marcada por amizade, coragem e crescimento.",
    discussion:
      "Coragem adquirida no caminho, apego ao conforto, amizade e transformação pessoal diante das dificuldades.",
  },
  {
    title: "O Senhor dos Anéis: A Sociedade do Anel",
    author: "J. R. R. Tolkien",
    status: "Em leitura",
    stage: "current",
    meeting: "Próximo encontro: 22 de agosto de 2026, às 9h",
    coverImage: "/covers/sociedade-do-anel.webp",
    coverFormat: "post",
    coverAlt: "Capa do livro O Senhor dos Anéis: A Sociedade do Anel",
    postUrl: "https://www.instagram.com/espacoagrestis/p/DawbiSbtQtA/",
    description:
      "O início da grande jornada para destruir o Anel, reunindo personagens diferentes em torno de uma missão maior do que cada um deles.",
    discussion:
      "Amizade, responsabilidade, tentação do poder, esperança e fidelidade à missão mesmo sem conhecer todo o caminho.",
  },
  {
    title: "O Senhor dos Anéis: As Duas Torres",
    author: "J. R. R. Tolkien",
    status: "Próxima leitura",
    stage: "upcoming",
    meeting: "Data a confirmar",
    coverImage: null,
    coverAlt: "Capa do livro O Senhor dos Anéis: As Duas Torres",
    description:
      "A Sociedade segue dividida, enquanto cada grupo precisa permanecer fiel à missão diante de novos perigos e alianças.",
    discussion:
      "Fidelidade na distância, liderança, esperança em cenários adversos e responsabilidade quando os planos mudam.",
  },
  {
    title: "O Senhor dos Anéis: O Retorno do Rei",
    author: "J. R. R. Tolkien",
    status: "Próxima leitura",
    stage: "upcoming",
    meeting: "Data a confirmar",
    coverImage: null,
    coverAlt: "Capa do livro O Senhor dos Anéis: O Retorno do Rei",
    description:
      "A etapa final da jornada reúne sacrifício, esperança e perseverança quando a missão parece mais difícil de cumprir.",
    discussion:
      "Serviço, realeza, sacrifício, amizade perseverante e a força das pequenas ações diante de grandes desafios.",
  },
];

export const pillars = [
  { number: "01", title: "Formação", detail: "Vida cristã no cotidiano" },
  { number: "02", title: "Cultura", detail: "Leitura, cinema e conversa" },
  { number: "03", title: "Amizade", detail: "Encontros e serviço em Caruaru" },
];
