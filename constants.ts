import { Prayer, Novena, Saint, Mystery, DevotionalRosary } from './types';

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

// FIX: Added missing PRAYERS and NOVENAS constants to fix import errors.
export const PRAYERS: Prayer[] = [
  // Básicas
  { id: 'pai-nosso', title: 'Pai Nosso', category: 'Basic', content: PRAYERS_TEXT.paiNosso, latin: 'Pater Noster' },
  { id: 'ave-maria', title: 'Ave Maria', category: 'Basic', content: PRAYERS_TEXT.aveMaria, latin: 'Ave Maria' },
  { id: 'creio', title: 'Credo', category: 'Basic', content: PRAYERS_TEXT.creio, latin: 'Credo in Deum' },
  { id: 'gloria', title: 'Glória', category: 'Basic', content: PRAYERS_TEXT.gloria, latin: 'Gloria Patri' },
  
  // Marianas
  { id: 'salve-rainha', title: 'Salve Rainha', category: 'Marian', content: PRAYERS_TEXT.salveRainha, latin: 'Salve Regina' },
  { id: 'consagracao-nossa-senhora', title: 'Consagração a Nossa Senhora', category: 'Marian', content: 'Ó Senhora minha, ó minha Mãe, eu me ofereço todo a vós e, em prova da minha devoção para convosco, vos consagro neste dia os meus olhos, os meus ouvidos, a minha boca, o meu coração e inteiramente todo o meu ser. E porque assim sou vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade vossa. Amém.' },

  // Santos
  { id: 'oracao-sao-miguel', title: 'Oração a São Miguel', category: 'Saint', content: 'São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos, que andam pelo mundo para perder as almas. Amém.' },
  { id: 'oracao-sao-jose', title: 'Oração a São José', category: 'Saint', content: 'A vós, São José, recorremos em nossa tribulação, e depois de ter implorado o auxílio de vossa santíssima esposa, cheios de confiança solicitamos também o vosso patrocínio. Por esse laço sagrado de caridade que vos uniu à Virgem Imaculada Mãe de Deus, e pelo amor paternal que tivestes ao Menino Jesus, ardentemente suplicamos que lanceis um olhar benigno sobre a herança que Jesus Cristo conquistou com seu sangue, e nos socorrais em nossas necessidades com o vosso auxílio e poder. Amém.' },

  // Outras
  { id: 'oracao-santo-espirito', title: 'Oração ao Espírito Santo', category: 'Other', content: 'Vinde Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor. Enviai o vosso Espírito e tudo será criado. E renovareis a face da terra. Oremos: Ó Deus que instruístes os corações dos vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da sua consolação. Por Cristo Senhor Nosso. Amém.' },
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
        fixedMonth: 11, // Dezembro (0-indexed)
    },
    {
        id: 'novena-sao-miguel',
        title: 'Quaresma de São Miguel',
        month: 7,
        startDateDisplay: '15 de Agosto',
        description: '40 dias de oração e penitência com o Arcanjo.',
        duration: 40,
        days: createGenericDays(40, 'São Miguel Arcanjo, defendei-nos no combate!'),
        standardPrayer: PRAYERS.find(p => p.id === 'oracao-sao-miguel')?.content || '',
        fixedDay: 15,
        fixedMonth: 7, // Agosto
    },
    {
        id: 'novena-misericordia',
        title: 'Novena à Divina Misericórdia',
        month: 3, // Abril, a festa é no primeiro domingo depois da páscoa.
        startDateDisplay: 'Sexta-feira Santa',
        description: 'Inicia na Sexta-feira Santa e termina no Sábado antes da Festa da Misericórdia.',
        duration: 9,
        days: createGenericDays(9, 'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.'),
        standardPrayer: 'Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.',
    },
    {
        id: 'novena-imaculada-conceicao',
        title: 'Novena da Imaculada Conceição',
        month: 10,
        startDateDisplay: '29 de Novembro',
        description: 'Celebrando a pureza da Virgem Maria.',
        duration: 9,
        days: createGenericDays(9, 'Ó Maria concebida sem pecado, rogai por nós que recorremos a vós.'),
        fixedDay: 29,
        fixedMonth: 10, // Novembro
    },
    {
        id: 'novena-almas',
        title: 'Novena pelas Almas do Purgatório',
        month: 99, // Qualquer época
        startDateDisplay: 'Qualquer época',
        description: 'Ofereça orações em sufrágio das almas que padecem no purgatório.',
        duration: 9,
        days: createGenericDays(9, 'Dai-lhes, Senhor, o descanso eterno. E a luz perpétua os ilumine. Descansem em paz. Amém.'),
    },
];

export const DAILY_QUOTES = [
  { text: "Tarde Te amei, ó Beleza tão antiga e tão nova, tarde Te amei!", author: "Santo Agostinho" },
  { text: "Quem a Deus tem, nada lhe falta. Só Deus basta.", author: "Santa Teresa d'Ávila" },
  { text: "Pregue o Evangelho em todo tempo. Se necessário, use palavras.", author: "São Francisco de Assis" },
  { text: "Não tenhas medo. Eu estou contigo.", author: "Jesus Cristo" },
  { text: "A medida do amor é amar sem medida.", author: "Santo Agostinho" },
  { text: "Onde não houver amor, coloque amor e colherá amor.", author: "São João da Cruz" },
  { text: "Santidade não é fazer coisas extraordinárias, mas fazer as coisas ordinárias com amor extraordinário.", author: "Santa Teresa de Calcutá" }
];

export const MYSTERIES: Mystery[] = [
  {
    id: 'joyful',
    name: 'Mistérios Gozosos',
    days: [1, 6], // Seg, Sab
    mysteries: [
      { title: 'Anunciação', scripture: 'Ave, cheia de graça, o Senhor é contigo.', meditation: 'Humildade de Maria.' },
      { title: 'Visitação', scripture: 'Bendita és tu entre as mulheres.', meditation: 'Caridade para com o próximo.' },
      { title: 'Nascimento', scripture: 'Hoje, na cidade de Davi, nasceu-vos o Salvador.', meditation: 'Pobreza de espírito.' },
      { title: 'Apresentação', scripture: 'Meus olhos viram a tua salvação.', meditation: 'Obediência.' },
      { title: 'Perda e Encontro', scripture: 'Não sabíeis que devo ocupar-me das coisas de meu Pai?', meditation: 'Alegria de encontrar Jesus.' }
    ]
  },
  {
    id: 'luminous',
    name: 'Mistérios Luminosos',
    days: [4], // Qui
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
    days: [2, 5], // Ter, Sex
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
    days: [0, 3], // Dom, Qua
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
  {
    id: 'misericordia',
    title: 'Terço da Divina Misericórdia',
    description: 'Revelado a Santa Faustina para aplacar a ira de Deus.',
    content: 'Pai Eterno, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e do mundo inteiro.\n\nPela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.\n\nDeus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro.'
  },
  {
    id: 'providencia',
    title: 'Terço da Providência',
    description: 'Para pedir o auxílio divino nas necessidades materiais e espirituais.',
    content: 'Mãe da Divina Providência, providenciai!\n\nDeus provê, Deus proverá, Sua misericórdia não faltará.'
  },
  {
    id: 'libertacao',
    title: 'Terço da Libertação',
    description: 'Baseado na Palavra de Deus: "Se o Filho vos libertar, sereis verdadeiramente livres".',
    content: 'Jesus, tem piedade de mim!\nJesus, cura-me!\nJesus, salva-me!\nJesus, liberta-me!'
  }
];

export const SAINTS: Saint[] = [
  { id: 'sao-miguel', name: 'São Miguel Arcanjo', title: 'Príncipe da Milícia Celeste', date: '29 de Setembro', bio: 'Defensor da Igreja e vencedor do dragão, é invocado contra as ciladas do demônio.', prayer: 'São Miguel Arcanjo, defendei-nos no combate...' },
  { id: 'sao-jose', name: 'São José', title: 'Patrono Universal da Igreja', date: '19 de Março', bio: 'Esposo da Virgem Maria e pai adotivo de Jesus, modelo de trabalhador e pai.', prayer: 'A vós, São José, recorremos em nossa tribulação...' },
  { id: 'santa-teresinha', name: 'Santa Teresinha', title: 'Padroeira das Missões', date: '01 de Outubro', bio: 'Doutora da Igreja, ensinou a "Pequena Via" da infância espiritual.', prayer: 'Vou passar meu céu fazendo o bem na terra...' },
  { id: 'sao-francisco', name: 'São Francisco de Assis', title: 'O Pobre de Assis', date: '04 de Outubro', bio: 'Fundador dos Franciscanos, amou a pobreza e a criação como reflexo de Deus.', prayer: 'Senhor, fazei de mim um instrumento de vossa paz...' },
  { id: 'nossa-senhora', name: 'Nossa Senhora', title: 'Mãe de Deus', date: '01 de Janeiro', bio: 'A Virgem Maria, Mãe de Deus e nossa Mãe.', prayer: 'Ave Maria...' },
  { id: 'sao-bento', name: 'São Bento', title: 'Pai do Monaquismo Ocidental', date: '11 de Julho', bio: 'Fundador da Ordem Beneditina, conhecido por sua Regra e medalha contra o mal.', prayer: 'A Cruz Sagrada seja a minha luz...' },
  { id: 'padre-pio', name: 'São Padre Pio', title: 'Confessor e Estigmatizado', date: '23 de Setembro', bio: 'Frade capuchinho que carregou os estigmas de Cristo e dedicou a vida à confissão.', prayer: 'Fica, Senhor, comigo...' },
  { id: 'santa-rita', name: 'Santa Rita de Cássia', title: 'Das Causas Impossíveis', date: '22 de Maio', bio: 'Esposa, mãe e monja, exemplo de perdão e paciência no sofrimento.', prayer: 'Ó poderosa e gloriosa Santa Rita...' },
  { id: 'santo-antonio', name: 'Santo Antônio', title: 'Martelo dos Hereges', date: '13 de Junho', bio: 'Grande pregador franciscano e taumaturgo.', prayer: 'Se milagres desejais...' },
  { id: 'sao-judas', name: 'São Judas Tadeu', title: 'Das Causas Desesperadas', date: '28 de Outubro', bio: 'Apóstolo e mártir, primo de Jesus.', prayer: 'São Judas Tadeu, glorioso apóstolo...' },
  { id: 'santa-faustina', name: 'Santa Faustina', title: 'Apóstola da Misericórdia', date: '05 de Outubro', bio: 'Recebeu as revelações de Jesus Misericordioso.', prayer: 'Jesus, eu confio em vós.' },
  { id: 'carlo-acutis', name: 'Beato Carlo Acutis', title: 'Apóstolo da Internet', date: '12 de Outubro', bio: 'Jovem que usou a tecnologia para evangelizar e amava a Eucaristia.', prayer: 'A Eucaristia é a minha autoestrada para o céu.' },
  { id: 'joao-paulo-ii', name: 'São João Paulo II', title: 'O Papa da Família', date: '22 de Outubro', bio: 'Papa peregrino que guiou a Igreja no terceiro milênio.', prayer: 'Não tenhais medo! Abri as portas a Cristo!' }
];

export const CATECHISM_CONTENT = [
  {
    id: 'credo',
    title: 'O Credo',
    items: [
      { id: 'creio-deus', title: 'Creio em Deus Pai', content: 'Deus é o Pai Todo-Poderoso, Criador do céu e da terra...' },
      { id: 'creio-jesus', title: 'Creio em Jesus Cristo', content: 'Jesus é o Filho único de Deus, nosso Senhor...' },
      { id: 'creio-espirito', title: 'Creio no Espírito Santo', content: 'Senhor que dá a vida, e procede do Pai e do Filho...' }
    ]
  },
  {
    id: 'sacramentos',
    title: 'Os Sacramentos',
    items: [
      { id: 'batismo', title: 'Batismo', content: 'O fundamento de toda a vida cristã, a porta da vida no Espírito.' },
      { id: 'eucaristia', title: 'Eucaristia', content: 'Fonte e ápice da vida cristã. O próprio Cristo.' },
      { id: 'confissao', title: 'Penitência', content: 'O sacramento da cura e do perdão dos pecados.' },
      { id: 'crisma', title: 'Crisma', content: 'Confirmação do Batismo e efusão do Espírito Santo.' },
      { id: 'matrimonio', title: 'Matrimônio', content: 'Aliança de amor entre homem e mulher, imagem do amor de Cristo pela Igreja.' },
      { id: 'ordem', title: 'Ordem', content: 'Sacramento do serviço apostólico.' },
      { id: 'uncao', title: 'Unção dos Enfermos', content: 'Conforto e cura para os doentes.' }
    ]
  },
  {
    id: 'mandamentos',
    title: 'Os 10 Mandamentos',
    items: [
      { id: 'mand-1', title: '1º Mandamento', content: 'Amar a Deus sobre todas as coisas.' },
      { id: 'mand-2', title: '2º Mandamento', content: 'Não tomar seu santo nome em vão.' },
      { id: 'mand-3', title: '3º Mandamento', content: 'Guardar domingos e festas.' },
      { id: 'mand-4', title: '4º Mandamento', content: 'Honrar pai e mãe.' },
      { id: 'mand-5', title: '5º Mandamento', content: 'Não matar.' },
      { id: 'mand-6', title: '6º Mandamento', content: 'Não pecar contra a castidade.' },
      { id: 'mand-7', title: '7º Mandamento', content: 'Não furtar.' },
      { id: 'mand-8', title: '8º Mandamento', content: 'Não levantar falso testemunho.' },
      { id: 'mand-9', title: '9º Mandamento', content: 'Não desejar a mulher do próximo.' },
      { id: 'mand-10', title: '10º Mandamento', content: 'Não cobiçar as coisas alheias.' }
    ]
  },
    {
    id: 'cenaculo',
    title: 'Cenáculo com Maria',
    items: [{ id: 'cenaculo-desc', title: 'O que é?', content: 'É um encontro de oração, como o que os Apóstolos tiveram com Maria no Cenáculo em Jerusalém. Rezamos o terço, consagramo-nos ao Coração de Maria e pedimos um novo Pentecostes.' }]
  },
  {
    id: 'advento',
    title: 'Advento',
    items: [{ id: 'advento-desc', title: 'O que é?', content: 'Tempo de preparação para o Natal. Usamos a cor roxa (penitência e esperança) e acendemos as velas da Coroa do Advento a cada domingo.' }]
  },
  {
    id: 'quaresma',
    title: 'Quaresma',
    items: [{ id: 'quaresma-desc', title: 'O que é?', content: '40 dias de oração, jejum e caridade em preparação para a Páscoa. É um tempo de conversão e penitência, lembrando os 40 dias de Jesus no deserto.' }]
  },
  {
    id: 'quaresma-miguel',
    title: 'Quaresma de São Miguel',
    items: [{ id: 'quaresma-miguel-desc', title: 'O que é?', content: 'Uma prática devocional de 40 dias de oração (de 15 de Agosto a 29 de Setembro) em honra a São Miguel Arcanjo, pedindo proteção contra o mal.' }]
  }
];

export const VIA_SACRA = [
  { id: 'I', title: '1ª Estação', meditation: 'Jesus é condenado à morte' },
  { id: 'II', title: '2ª Estação', meditation: 'Jesus carrega a Cruz' },
  { id: 'III', title: '3ª Estação', meditation: 'Jesus cai pela primeira vez' },
  { id: 'IV', title: '4ª Estação', meditation: 'Jesus encontra sua Mãe' },
  { id: 'V', title: '5ª Estação', meditation: 'Simão Cirineu ajuda a Jesus' },
  { id: 'VI', title: '6ª Estação', meditation: 'Verônica enxuga o rosto de Jesus' },
  { id: 'VII', title: '7ª Estação', meditation: 'Jesus cai pela segunda vez' },
  { id: 'VIII', title: '8ª Estação', meditation: 'Jesus consola as mulheres de Jerusalém' },
  { id: 'IX', title: '9ª Estação', meditation: 'Jesus cai pela terceira vez' },
  { id: 'X', title: '10ª Estação', meditation: 'Jesus é despojado de suas vestes' },
  { id: 'XI', title: '11ª Estação', meditation: 'Jesus é pregado na Cruz' },
  { id: 'XII', title: '12ª Estação', meditation: 'Jesus morre na Cruz' },
  { id: 'XIII', title: '13ª Estação', meditation: 'Jesus é descido da Cruz' },
  { id: 'XIV', title: '14ª Estação', meditation: 'Jesus é sepultado' },
  { id: 'XV', title: '15ª Estação', meditation: 'A Ressurreição do Senhor' }
];

export const MARIAN_DOGMAS = [
  { id: 'maternidade', title: 'Maternidade Divina', desc: 'Maria é verdadeiramente Mãe de Deus (Theotokos), pois gerou em sua carne a segunda Pessoa da Santíssima Trindade, Jesus Cristo.', icon: 'Crown' },
  { id: 'virgindade', title: 'Virgindade Perpétua', desc: 'Maria foi Virgem antes, durante e perpetuamente após o parto de Jesus, por um milagre do poder divino.', icon: 'Star' },
  { id: 'imaculada', title: 'Imaculada Conceição', desc: 'Por um privilégio único, em previsão dos méritos de Cristo, Maria foi preservada de toda mancha do pecado original desde o primeiro instante de sua concepção.', icon: 'Sparkles' },
  { id: 'assuncao', title: 'Assunção', desc: 'Terminado o curso de sua vida terrena, a Virgem Maria foi elevada em corpo e alma à glória celeste.', icon: 'Cloud' }
];

export const THE_APOSTLES = [
  { id: 'pedro', name: 'São Pedro', symbol: 'Chaves', title: 'O Príncipe dos Apóstolos', desc: 'Primeiro Papa, recebeu as chaves do Reino e a missão de apascentar as ovelhas. Martirizado em Roma.' },
  { id: 'paulo', name: 'São Paulo', symbol: 'Espada', title: 'Apóstolo dos Gentios', desc: 'De perseguidor a maior missionário da Igreja. Autor de diversas epístolas e coluna da fé, junto com Pedro.' },
  { id: 'andre', name: 'São André', symbol: 'Cruz em X', title: 'O Protocleto', desc: 'Irmão de Pedro, o primeiro a ser chamado. Morreu em uma cruz em forma de X.' },
  { id: 'tiago-maior', name: 'São Tiago Maior', symbol: 'Concha', title: 'Filho do Trovão', desc: 'Primeiro apóstolo a ser martirizado. Padroeiro dos peregrinos (Caminho de Santiago).' },
  { id: 'joao', name: 'São João', symbol: 'Águia', title: 'O Discípulo Amado', desc: 'Evangelista, teólogo e autor do Apocalipse. Único a não morrer mártir, cuidou de Maria.' },
  { id: 'filipe', name: 'São Filipe', symbol: 'Cruz/Pão', title: 'O Evangelizador', desc: 'Pregou na Frígia e morreu crucificado de cabeça para baixo.' },
  { id: 'bartolomeu', name: 'São Bartolomeu', symbol: 'Faca', title: 'O Israelita sem falsidade', desc: 'Também chamado Natanael. Morreu esfolado vivo por amor a Cristo.' },
  { id: 'tome', name: 'São Tomé', symbol: 'Lança', title: 'O Dídimo', desc: 'Levou o Evangelho até a Índia. Reconheceu a divindade de Jesus: "Meu Senhor e meu Deus".' },
  { id: 'mateus', name: 'São Mateus', symbol: 'Livro/Anjo', title: 'O Cobrador de Impostos', desc: 'Deixou tudo para seguir Jesus. Escreveu o primeiro Evangelho.' },
  { id: 'tiago-menor', name: 'São Tiago Menor', symbol: 'Maça de Pisoeiro', title: 'O Justo', desc: 'Primo de Jesus e primeiro Bispo de Jerusalém. Autor de uma epístola.' },
  { id: 'judas-tadeu', name: 'São Judas Tadeu', symbol: 'Machado', title: 'O Santo das Causas Impossíveis', desc: 'Primo de Jesus, escreveu uma epístola. Martirizado na Pérsia.' },
  { id: 'simao', name: 'São Simão', symbol: 'Serra', title: 'O Zelote', desc: 'Pregou no Egito e na Pérsia. Foi martirizado sendo serrado ao meio.' },
  { id: 'matias', name: 'São Matias', symbol: 'Machado', title: 'O Escolhido', desc: 'Eleito para substituir Judas Iscariotes e completar os doze.' }
];

export const LITURGICAL_OBJECTS = [
  { id: 'calice', title: 'Cálice', desc: 'Taça sagrada onde se consagra o vinho no Sangue de Cristo.', icon: 'Grape' },
  { id: 'patena', title: 'Patena', desc: 'Prato raso onde se coloca a hóstia principal a ser consagrada.', icon: 'Circle' },
  { id: 'ostensorio', title: 'Ostensório', desc: 'Objeto nobre, geralmente dourado, para expor a Hóstia Consagrada à adoração dos fiéis.', icon: 'Sun' },
  { id: 'ciborio', title: 'Cibório (ou Píxide)', desc: 'Recipiente com tampa para guardar as hóstias consagradas no sacrário.', icon: 'Circle' },
  { id: 'ambula', title: 'Âmbula (ou Teca)', desc: 'Pequeno recipiente para levar a comunhão aos doentes.', icon: 'Heart' },
  { id: 'corporal', title: 'Corporal', desc: 'Pano quadrado onde se colocam o cálice e a patena no altar. Representa o sudário de Cristo.', icon: 'BookOpen' },
  { id: 'sanguineo', title: 'Sanguíneo', desc: 'Pano retangular utilizado para purificar (limpar) o cálice e os dedos do sacerdote.', icon: 'Droplet' }
];

export const APOSTOLIC_LINE = [
  { id: 'leao14', name: 'Papa Leão XIV', period: '2025 - Atual', title: 'Robert Francis Prevost (OSA)', bio: 'Primeiro Papa da América do Norte e da Ordem de Santo Agostinho. Inspirado por Leão XIII, enfrenta os desafios da Inteligência Artificial e da Quarta Revolução Industrial na defesa da dignidade humana.', highlight: true },
  { id: 'francisco', name: 'Papa Francisco', period: '2013 - 2025', title: 'Jorge Mario Bergoglio', bio: 'O Papa da misericórdia e dos pobres. Primeiro Papa das Américas.', highlight: false },
  { id: 'bento', name: 'Bento XVI', period: '2005 - 2013', title: 'Joseph Ratzinger', bio: 'Grande teólogo, lutou contra o relativismo.', highlight: false },
  { id: 'jp2', name: 'São João Paulo II', period: '1978 - 2005', title: 'Karol Wojtyla', bio: 'O Papa da família e da juventude.', highlight: false },
  { id: 'jp1', name: 'João Paulo I', period: '1978', title: 'Albino Luciani', bio: 'O Papa do Sorriso.', highlight: false },
  { id: 'paulo6', name: 'São Paulo VI', period: '1963 - 1978', title: 'Giovanni B. Montini', bio: 'Concluiu o Vaticano II e escreveu a Humanae Vitae.', highlight: false },
  { id: 'joao23', name: 'São João XXIII', period: '1958 - 1963', title: 'Angelo Roncalli', bio: 'O Papa Bom, convocou o Concílio Vaticano II.', highlight: false },
  { id: 'pio12', name: 'Pio XII', period: '1939 - 1958', title: 'Eugenio Pacelli', bio: 'Pastor Angelicus, guiou a Igreja durante a Segunda Guerra e proclamou o Dogma da Assunção.', highlight: false },
  { id: 'pio10', name: 'São Pio X', period: '1903 - 1914', title: 'Giuseppe Sarto', bio: 'Papa da Eucaristia, combateu o modernismo.', highlight: false },
  { id: 'leao13', name: 'Leão XIII', period: '1878 - 1903', title: 'Vincenzo Pecci', bio: 'Autor da Rerum Novarum, fundador da Doutrina Social da Igreja.', highlight: false },
  { id: 'pio9', name: 'Beato Pio IX', period: '1846 - 1878', title: 'Giovanni M. Mastai-Ferretti', bio: 'Proclamou o dogma da Imaculada Conceição e convocou o Concílio Vaticano I.', highlight: false },
  { id: 'gregorio-magno', name: 'São Gregório Magno', period: '590 - 604', title: 'Doutor da Igreja', bio: 'Pai do Canto Gregoriano e grande reformador da Igreja.', highlight: false },
  { id: 'leao-magno', name: 'São Leão Magno', period: '440 - 461', title: 'Doutor da Igreja', bio: 'Defendeu a fé no Concílio de Calcedônia e protegeu Roma de Átila, o Huno.', highlight: false },
  { id: 'pedro', name: 'São Pedro', period: '30 - 67', title: 'Simão Pedro', bio: 'O primeiro Papa, escolhido por Cristo. A Pedra sobre a qual a Igreja foi edificada.', highlight: true }
];

export const CHURCH_HISTORY = [
  { id: 'era-apostolica', title: 'Era Apostólica', period: '33 - 100 d.C.', desc: 'O início da Igreja com os Apóstolos.', events: ['Pentecostes', 'Conversão de São Paulo', 'Martírio de Pedro e Paulo em Roma', 'São João escreve o Apocalipse'] },
  { id: 'patristica', title: 'Era Patrística', period: '100 - 800 d.C.', desc: 'Tempo dos Padres da Igreja, mártires e definição dos dogmas.', events: ['Perseguições Romanas', 'Édito de Milão (Liberdade de Culto)', 'Concílio de Niceia (Credo)', 'Santo Agostinho e São Jerônimo'] },
  { id: 'idade-media', title: 'Idade Média', period: '800 - 1500', desc: 'A Cristandade, as Catedrais e a Escolástica.', events: ['Cisma do Oriente (1054)', 'São Francisco e São Domingos', 'São Tomás de Aquino (Suma Teológica)', 'Construção das Catedrais Góticas'] },
  { id: 'idade-moderna', title: 'Idade Moderna', period: '1500 - 1900', desc: 'Reforma, Contrarreforma e Expansão Missionária.', events: ['Concílio de Trento', 'Evangelização das Américas (Brasil)', 'Aparição de Guadalupe e Lourdes', 'Concílio Vaticano I'] },
  { id: 'idade-contemp', title: 'Idade Contemporânea', period: '1900 - Hoje', desc: 'A Igreja no mundo atual.', events: ['Aparições de Fátima', 'Concílio Vaticano II', 'São João Paulo II', 'Papa Francisco'] }
];

export const HOLY_MASS = {
  intro: { title: 'O Mistério da Fé', text: 'A Santa Missa não é apenas uma lembrança da Ceia do Senhor. É o mesmo sacrifício da Cruz, tornado presente (re-apresentado) no altar de forma incruenta. O céu se une à terra, e Cristo se oferece ao Pai por nós.' },
  rites: [
    { part: 'Ritos Iniciais', desc: 'Reunidos em nome do Senhor', highlight: false, actions: [{name: 'Sinal da Cruz', meaning: 'Início em nome da Trindade'}, {name: 'Ato Penitencial', meaning: 'Reconhecemos nossos pecados (Kyrie)'}, {name: 'Glória', meaning: 'Louvor à Santíssima Trindade'}] },
    { part: 'Liturgia da Palavra', desc: 'Deus fala ao seu povo', highlight: false, actions: [{name: 'Leituras', meaning: 'Antigo Testamento, Salmo e Epístolas'}, {name: 'Evangelho', meaning: 'O próprio Cristo fala (ficamos de pé)'}, {name: 'Homilia', meaning: 'Atualização da Palavra'}] },
    { part: 'Liturgia Eucarística', desc: 'O Coração da Missa', highlight: true, actions: [{name: 'Ofertório', meaning: 'Entregamos nossa vida com o pão e vinho'}, {name: 'Consagração', meaning: 'O pão e vinho tornam-se Corpo e Sangue de Cristo (Transubstanciação)'}, {name: 'Doxologia', meaning: 'Por Cristo, com Cristo e em Cristo...'}]},
    { part: 'Rito da Comunhão', desc: 'União com Cristo', highlight: false, actions: [{name: 'Pai Nosso', meaning: 'Oração dos filhos de Deus'}, {name: 'Cordeiro de Deus', meaning: 'Aquele que tira o pecado do mundo'}, {name: 'Comunhão', meaning: 'Receber o próprio Deus'}]},
    { part: 'Ritos Finais', desc: 'Envio', highlight: false, actions: [{name: 'Bênção', meaning: 'A graça de Deus nos acompanha'}, {name: 'Ide em paz', meaning: 'Missão de levar Cristo ao mundo'}]}
  ],
  spiritual: { title: 'Mundo Invisível', desc: 'O que acontece espiritualmente', points: ['O céu se abre sobre o altar', 'Milhares de anjos adoram o Santíssimo', 'As almas do purgatório recebem alívio pelo Preciosíssimo Sangue', 'Nossa Senhora está presente ao pé da Cruz (Altar)'] },
  etiquette: ['Chegar cedo para preparação', 'Vestir-se com modéstia e respeito', 'Fazer jejum eucarístico de 1 hora', 'Participar ativamente das respostas', 'Desligar o celular', 'Fazer a genuflexão ao entrar e sair']
};

export const CHURCH_HIERARCHY = [
  { id: 'papa', role: 'Papa', color: 'text-white', symbol: 'Chaves', title: 'Sumo Pontífice', desc: 'Sucessor de Pedro, Vigário de Cristo na Terra e Pastor da Igreja Universal.' },
  { id: 'cardeal', role: 'Cardeal', color: 'text-red-500', symbol: 'Barrete', title: 'Príncipe da Igreja', desc: 'Conselheiro direto do Papa e eleitor no conclave. A cor vermelha simboliza a disposição para o martírio.' },
  { id: 'bispo', role: 'Bispo', color: 'text-purple-500', symbol: 'Mitra', title: 'Sucessor dos Apóstolos', desc: 'Possui a plenitude do sacramento da Ordem. Pastor de uma diocese, responsável por ensinar, santificar e governar.' },
  { id: 'padre', role: 'Padre', color: 'text-black', symbol: 'Estola', title: 'Presbítero', desc: 'Colaborador do Bispo, age "in persona Christi" para celebrar a Eucaristia e perdoar os pecados.' },
  { id: 'diacono', role: 'Diácono', color: 'text-gray-500', symbol: 'Dalmática', title: 'Servo', desc: 'Ordenado para o serviço da caridade, da Palavra e da Liturgia. Pode batizar e assistir matrimônios.' }
];

export const CHURCH_MINISTRIES = [
  { id: 'catequista', title: 'Catequista', desc: 'Tem a nobre missão de ecoar a Palavra de Deus. Ensina a fé católica e prepara crianças e adultos para receberem os sacramentos.', icon: 'BookOpen' },
  { id: 'ministro', title: 'Ministro da Eucaristia', desc: 'Ministro Extraordinário da Sagrada Comunhão (MESC). Auxilia os padres na distribuição da Eucaristia na Missa e leva Jesus aos doentes em suas casas.', icon: 'Grape' },
  { id: 'leitor', title: 'Leitor', desc: 'Proclama a Palavra de Deus na liturgia. Não é apenas ler, é emprestar a voz para que Deus fale ao seu povo.', icon: 'BookOpen' },
  { id: 'acolito', title: 'Acólito / Coroinha', desc: 'Serve ao altar, auxiliando o sacerdote e o diácono nas celebrações litúrgicas.', icon: 'Bell' },
  { id: 'musica', title: 'Músico Sacro', desc: 'Serve a Deus através da arte. A música sacra eleva a alma e ajuda a assembleia a rezar. "Quem canta reza duas vezes".', icon: 'Music' },
  { id: 'acolhida', title: 'Pastoral da Acolhida', desc: 'O rosto acolhedor da paróquia. Recepciona os fiéis e os ajuda a se sentirem em casa.', icon: 'Users' },
  { id: 'sacristao', title: 'Sacristão', desc: 'Prepara o altar e os objetos litúrgicos para a Santa Missa, cuidando com zelo da casa de Deus.', icon: 'Key' }
];
