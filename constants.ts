import { Prayer, Novena, Saint, Mystery, DevotionalRosary, CatechismSection } from './types';

// Helper to create generic days
const createGenericDays = (duration: number, prayer?: string) => Array.from({ length: duration }, (_, i) => ({
    title: `Dia ${i + 1}`,
    reflection: 'Medite hoje sobre a virtude deste santo e seu amor a Deus. Entregue suas intenções com fé.',
    prayer: prayer || 'Rogai por nós, para que sejamos dignos das promessas de Cristo.'
}));

export const CENACULO_CONSAGRACAO = {
  title: "Consagração ao Imaculado Coração de Maria",
  content: "Virgem de Fátima, Mãe de Misericórdia, Rainha do Céu e da Terra, refúgio dos pecadores, nós nos consagramos ao Vosso Imaculado Coração. Consagramos-Vos o nosso coração, a nossa alma, a nossa família e tudo o que somos. E para que esta consagração seja verdadeiramente eficaz e duradoura, renovamos hoje as promessas do nosso Batismo e da nossa Crisma. Comprometemo-nos a viver como bons cristãos, fiéis a Deus, à Igreja e ao Santo Padre. Queremos rezar o Santo Terço todos os dias, participar da Eucaristia e viver na vossa presença, ó Mãe, para que, por meio de Vós, cheguemos mais perfeitamente a Jesus."
};

export const PRAYERS_TEXT = {
  creio: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor. Que foi concebido pelo poder do Espírito Santo. Nasceu da Virgem Maria. Padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado. Desceu à mansão dos mortos. Ressuscitou ao terceiro dia. Subiu aos céus, está sentado à direita de Deus Pai todo-poderoso. Donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  paiNosso: "Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.",
  aveMaria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.",
  gloria: "Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  ohJesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.",
  salveRainha: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria."
};

export const PRAYERS: Prayer[] = [
  { id: 'pai-nosso', title: 'Pai Nosso', category: 'Basic', content: PRAYERS_TEXT.paiNosso, latin: 'Pater Noster' },
  { id: 'ave-maria', title: 'Ave Maria', category: 'Basic', content: PRAYERS_TEXT.aveMaria, latin: 'Ave Maria' },
  { id: 'creio', title: 'Credo', category: 'Basic', content: PRAYERS_TEXT.creio, latin: 'Credo in Deum' },
  { id: 'gloria', title: 'Glória', category: 'Basic', content: PRAYERS_TEXT.gloria, latin: 'Gloria Patri' },
  { id: 'salve-rainha', title: 'Salve Rainha', category: 'Marian', content: PRAYERS_TEXT.salveRainha, latin: 'Salve Regina' },
  { id: 'oracao-sao-miguel', title: 'Oração a São Miguel', category: 'Saint', content: 'São Miguel Arcanjo, defendei-nos no combate...' },
  { id: 'oracao-santo-espirito', title: 'Oração ao Espírito Santo', category: 'Other', content: 'Vinde Espírito Santo, enchei os corações dos vossos fiéis...' },
];

export const NOVENAS: Novena[] = [
    {
        id: 'novena-natal',
        title: 'Novena de Natal',
        month: 11,
        startDateDisplay: '16 a 24 de Dezembro',
        description: 'Prepare seu coração para a vinda do Menino Jesus.',
        duration: 9,
        days: createGenericDays(9, 'Vinde, Senhor Jesus!'),
        standardPrayer: 'Glória ao Pai...',
        fixedDay: 16,
        fixedMonth: 11,
    },
    {
        id: 'novena-imaculada-conceicao',
        title: 'Novena da Imaculada Conceição',
        month: 10,
        startDateDisplay: '29 de Novembro',
        description: 'Celebrando a pureza da Virgem Maria.',
        duration: 9,
        days: createGenericDays(9, 'Ó Maria concebida sem pecado...'),
        fixedDay: 29,
        fixedMonth: 10,
    },
];

export const DAILY_QUOTES = [
  { text: "Tarde Te amei, ó Beleza tão antiga e tão nova, tarde Te amei!", author: "Santo Agostinho" },
  { text: "Quem a Deus tem, nada lhe falta. Só Deus basta.", author: "Santa Teresa d'Ávila" },
];

export const MYSTERIES: Mystery[] = [
  {
    id: 'joyful',
    name: 'Mistérios Gozosos',
    days: [1, 6],
    mysteries: [
      { title: 'Anunciação', scripture: 'Ave, cheia de graça...', meditation: 'Humildade de Maria.' },
      { title: 'Visitação', scripture: 'Bendita és tu...', meditation: 'Caridade para com o próximo.' },
      { title: 'Nascimento', scripture: 'Nasceu-vos o Salvador.', meditation: 'Pobreza de espírito.' },
      { title: 'Apresentação', scripture: 'Meus olhos viram a tua salvação.', meditation: 'Obediência.' },
      { title: 'Perda e Encontro', scripture: 'Devo ocupar-me das coisas de meu Pai.', meditation: 'Alegria de encontrar Jesus.' }
    ]
  },
  {
    id: 'luminous',
    name: 'Mistérios Luminosos',
    days: [4],
    mysteries: [
      { title: 'Batismo no Jordão', scripture: 'Este é o meu Filho amado.', meditation: 'Filiação divina.' },
      { title: 'Bodas de Caná', scripture: 'Fazei tudo o que ele vos disser.', meditation: 'Confiança em Maria.' },
      { title: 'Anúncio do Reino', scripture: 'Convertei-vos e crede no Evangelho.', meditation: 'Conversão.' },
      { title: 'Transfiguração', scripture: 'Seu rosto brilhou como o sol.', meditation: 'Contemplação da glória.' },
      { title: 'Eucaristia', scripture: 'Isto é o meu corpo.', meditation: 'Adoração Eucarística.' }
    ]
  },
  {
    id: 'sorrowful',
    name: 'Mistérios Dolorosos',
    days: [2, 5],
    mysteries: [
      { title: 'Agonia no Horto', scripture: 'Vigiai e orai.', meditation: 'Contrição dos pecados.' },
      { title: 'Flagelação', scripture: 'Pelas suas chagas fomos curados.', meditation: 'Mortificação dos sentidos.' },
      { title: 'Coroação de Espinhos', scripture: 'Salve, rei dos judeus!', meditation: 'Mortificação do orgulho.' },
      { title: 'Caminho da Cruz', scripture: 'Tomou a cruz sobre si.', meditation: 'Paciência nas tribulações.' },
      { title: 'Crucificação', scripture: 'Pai, em tuas mãos entrego o meu espírito.', meditation: 'Amor à Cruz.' }
    ]
  },
  {
    id: 'glorious',
    name: 'Mistérios Gloriosos',
    days: [0, 3],
    mysteries: [
      { title: 'Ressurreição', scripture: 'Não está aqui, ressuscitou.', meditation: 'Fé.' },
      { title: 'Ascensão', scripture: 'Sereis minhas testemunhas.', meditation: 'Esperança.' },
      { title: 'Vinda do Espírito Santo', scripture: 'Ficaram todos cheios do Espírito Santo.', meditation: 'Caridade.' },
      { title: 'Assunção', scripture: 'Fez em mim maravilhas.', meditation: 'Graça de uma boa morte.' },
      { title: 'Coroação', scripture: 'Apareceu no céu um grande sinal.', meditation: 'Confiança em Maria Rainha.' }
    ]
  }
];

export const DEVOTIONAL_ROSARIES: DevotionalRosary[] = [
  { id: 'misericordia', title: 'Terço da Divina Misericórdia', description: 'Revelado a Santa Faustina.', content: 'Pai Eterno, eu Vos ofereço...' },
  { id: 'libertacao', title: 'Terço da Libertação', description: 'Se o Filho vos libertar...', content: 'Jesus, tem piedade de mim!...' }
];

export const SAINTS: Saint[] = [
  { id: 'sao-miguel', name: 'São Miguel Arcanjo', title: 'Príncipe da Milícia Celeste', date: '29 de Setembro', bio: 'Defensor da Igreja...', prayer: 'São Miguel Arcanjo, defendei-nos...' },
  { id: 'sao-jose', name: 'São José', title: 'Patrono da Igreja', date: '19 de Março', bio: 'Esposo da Virgem Maria...', prayer: 'A vós, São José...' }
];

export const CATECHISM_CONTENT: CatechismSection[] = [
  {
    id: 'credo',
    title: 'O Credo',
    items: [
      { id: 'creio-deus', title: 'Creio em Deus Pai', content: 'Deus é o Pai Todo-Poderoso, Criador do céu e da terra...' },
      { id: 'creio-jesus', title: 'Creio em Jesus Cristo', content: 'Jesus é o Filho único de Deus, nosso Senhor...' }
    ]
  },
  {
    id: 'sacramentos',
    title: 'Os Sacramentos',
    items: [{ id: 'batismo', title: 'Batismo', content: 'O fundamento de toda a vida cristã...' }]
  },
  {
    id: 'mandamentos',
    title: 'Os 10 Mandamentos',
    items: [{ id: 'mand-1', title: '1º Mandamento', content: 'Amar a Deus sobre todas as coisas.' }]
  },
];

export const MARIAN_DOGMAS = [
  { id: 'maternidade', title: 'Maternidade Divina', desc: 'Maria é verdadeiramente Mãe de Deus (Theotokos)...', icon: 'Crown' },
  { id: 'virgindade', title: 'Virgindade Perpétua', desc: 'Maria foi Virgem antes, durante e perpetuamente após o parto...', icon: 'Star' },
  { id: 'imaculada', title: 'Imaculada Conceição', desc: 'Por um privilégio único, Maria foi preservada do pecado original...', icon: 'Sparkles' },
  { id: 'assuncao', title: 'Assunção', desc: 'Terminado o curso de sua vida, Maria foi elevada em corpo e alma à glória celeste.', icon: 'Cloud' }
];

export const THE_APOSTLES = [
  { id: 'pedro', name: 'São Pedro', symbol: 'Chaves', title: 'O Príncipe dos Apóstolos', bio: 'Primeiro Papa, recebeu as chaves do Reino. Martirizado em Roma.' },
  { id: 'paulo', name: 'São Paulo', symbol: 'Espada', title: 'Apóstolo dos Gentios', bio: 'De perseguidor a maior missionário da Igreja. Autor de diversas epístolas.' },
  { id: 'andre', name: 'São André', symbol: 'Cruz em X', title: 'O Protocleto', bio: 'Irmão de Pedro, o primeiro a ser chamado. Morreu em uma cruz em forma de X.' },
  { id: 'tiago-maior', name: 'São Tiago Maior', symbol: 'Concha', title: 'Filho do Trovão', bio: 'Primeiro apóstolo a ser martirizado. Padroeiro dos peregrinos.' },
  { id: 'joao', name: 'São João', symbol: 'Águia', title: 'O Discípulo Amado', bio: 'Evangelista e autor do Apocalipse. Cuidou de Maria.' },
  { id: 'filipe', name: 'São Filipe', symbol: 'Cruz/Pão', title: 'O Evangelizador', bio: 'Pregou na Frígia e morreu crucificado de cabeça para baixo.' },
  { id: 'bartolomeu', name: 'São Bartolomeu', symbol: 'Faca', title: 'O Israelita sem falsidade', bio: 'Também chamado Natanael. Morreu esfolado vivo.' },
  { id: 'tome', name: 'São Tomé', symbol: 'Lança', title: 'O Dídimo', bio: 'Levou o Evangelho até a Índia. Disse: "Meu Senhor e meu Deus".' },
  { id: 'mateus', name: 'São Mateus', symbol: 'Livro/Anjo', title: 'O Cobrador de Impostos', bio: 'Deixou tudo para seguir Jesus. Escreveu o primeiro Evangelho.' },
  { id: 'tiago-menor', name: 'São Tiago Menor', symbol: 'Maça', title: 'O Justo', bio: 'Primo de Jesus e primeiro Bispo de Jerusalém.' },
  { id: 'judas-tadeu', name: 'São Judas Tadeu', symbol: 'Machado', title: 'O Santo das Causas Impossíveis', bio: 'Primo de Jesus, mártir na Pérsia.' },
  { id: 'simao', name: 'São Simão', symbol: 'Serra', title: 'O Zelote', bio: 'Pregou no Egito e na Pérsia. Foi martirizado sendo serrado ao meio.' },
  { id: 'matias', name: 'São Matias', symbol: 'Machado', title: 'O Escolhido', bio: 'Eleito para substituir Judas Iscariotes e completar os doze.' }
];

export const APOSTOLIC_LINE = [
  { id: 'leao14', name: 'Papa Leão XIV', period: '2025 - Atual', title: 'Robert Francis Prevost', bio: 'Primeiro Papa da América do Norte. Enfrenta os desafios da Inteligência Artificial.', highlight: true },
  { id: 'francisco', name: 'Papa Francisco', period: '2013 - 2025', title: 'Jorge Mario Bergoglio', bio: 'O Papa da misericórdia e dos pobres.', highlight: false },
  { id: 'bento', name: 'Bento XVI', period: '2005 - 2013', title: 'Joseph Ratzinger', bio: 'Grande teólogo, lutou contra o relativismo.', highlight: false },
  { id: 'jp2', name: 'São João Paulo II', period: '1978 - 2005', title: 'Karol Wojtyla', bio: 'O Papa da família e da juventude.', highlight: false },
  { id: 'pedro', name: 'São Pedro', period: '30 - 67', title: 'Simão Pedro', bio: 'O primeiro Papa, a Pedra sobre a qual a Igreja foi edificada.', highlight: true }
];

export const CHURCH_HISTORY = [
  { id: 'era-apostolica', title: 'Era Apostólica', period: '33 - 100 d.C.', desc: 'O início da Igreja com os Apóstolos.', events: ['Pentecostes', 'Conversão de São Paulo', 'Martírio de Pedro e Paulo'] },
  { id: 'patristica', title: 'Era Patrística', period: '100 - 800 d.C.', desc: 'Tempo dos Padres da Igreja e definição dos dogmas.', events: ['Concílio de Niceia', 'Santo Agostinho'] },
  { id: 'idade-media', title: 'Idade Média', period: '800 - 1500', desc: 'A Cristandade e as Catedrais.', events: ['Cisma do Oriente', 'São Francisco'] },
  { id: 'idade-moderna', title: 'Idade Moderna', period: '1500 - 1900', desc: 'Reforma e Contrarreforma.', events: ['Concílio de Trento', 'Aparição de Guadalupe'] },
  { id: 'idade-contemp', title: 'Idade Contemporânea', period: '1900 - Hoje', desc: 'A Igreja no mundo atual.', events: ['Aparições de Fátima', 'Concílio Vaticano II', 'Papa Francisco'] }
];

export const HOLY_MASS = {
  intro: { title: 'O Mistério da Fé', text: 'A Santa Missa é o mesmo sacrifício da Cruz, tornado presente no altar.' },
  rites: [ { part: 'Ritos Iniciais', desc: 'Reunidos em nome do Senhor', highlight: false, actions: [{name: 'Sinal da Cruz', meaning: 'Início em nome da Trindade'}] }],
  spiritual: { title: 'Mundo Invisível', desc: 'O que acontece espiritualmente', points: ['O céu se abre sobre o altar', 'Milhares de anjos adoram o Santíssimo'] },
  etiquette: ['Chegar cedo para preparação', 'Vestir-se com modéstia', 'Fazer jejum eucarístico']
};

export const CHURCH_HIERARCHY = [
  { id: 'papa', role: 'Papa', symbol: 'Chaves', title: 'Sumo Pontífice', desc: 'Sucessor de Pedro, Vigário de Cristo na Terra.' },
  { id: 'cardeal', role: 'Cardeal', symbol: 'Barrete', title: 'Príncipe da Igreja', desc: 'Conselheiro direto do Papa e eleitor.' },
];

export const CHURCH_MINISTRIES = [
  { id: 'catequista', title: 'Catequista', desc: 'Ensina a fé e prepara para os sacramentos.', icon: 'BookOpen' },
  { id: 'ministro', title: 'Ministro da Eucaristia', desc: 'Auxilia na distribuição da Sagrada Comunhão.', icon: 'Grape' },
];

export const LITURGICAL_OBJECTS = [
  { id: 'calice', title: 'Cálice', desc: 'Taça sagrada onde se consagra o vinho.', icon: 'Grape' },
  { id: 'ostensorio', title: 'Ostensório', desc: 'Objeto nobre para expor a Hóstia Consagrada.', icon: 'Sun' },
];

export const VIA_SACRA = [
  { id: 'I', title: '1ª Estação', meditation: 'Jesus é condenado à morte' },
  { id: 'II', title: '2ª Estação', meditation: 'Jesus carrega a Cruz' },
];
