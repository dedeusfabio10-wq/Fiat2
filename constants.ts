import { Prayer, Novena, Saint, Mystery, DevotionalRosary } from './types';
// Helper to create generic days
const createGenericDays = (duration: number, prayer?: string) =>
  Array.from({ length: duration }, (_, i) => ({
    title: `Dia ${i + 1}`,                     // ← aqui era o erro!
    reflection:
      'Medite hoje sobre a virtude deste santo e seu amor a Deus. Entregue suas intenções com fé.',
    prayer: prayer || 'Rogai por nós, para que sejamos dignos das promessas de Cristo.',
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
  { id: 'nossa-senhora-aparecida', name: 'Nossa Senhora Aparecida', title: 'Padroeira do Brasil', date: '12 de Outubro', bio: 'Rainha e Padroeira do Brasil. Imagem encontrada no rio Paraíba em 1717.' },
  { id: 'nossa-senhora-fatima', name: 'Nossa Senhora de Fátima', title: 'Rainha do Rosário', date: '13 de Maio', bio: 'Apareceu a três pastorinhos em 1917 pedindo oração e penitência.' },
  { id: 'nossa-senhora-guadalupe', name: 'Nossa Senhora de Guadalupe', title: 'Imperatriz da América', date: '12 de Dezembro', bio: 'Apareceu a São Juan Diego em 1531 no México.' },
  { id: 'nossa-senhora-lourdes', name: 'Nossa Senhora de Lourdes', title: 'Imaculada Conceição', date: '11 de Fevereiro', bio: 'Apareceu 18 vezes a Santa Bernadette em 1858.' },
  { id: 'santo-antonio', name: 'Santo Antônio de Pádua', title: 'Martelo dos Hereges', date: '13 de Junho', bio: 'Doutor da Igreja, grande pregador e casamenteiro.' },
  { id: 'sao-francisco-assis', name: 'São Francisco de Assis', title: 'Pobrezinho de Deus', date: '04 de Outubro', bio: 'Fundador dos Franciscanos, amante da criação e da pobreza.' },
  { id: 'santa-rita', name: 'Santa Rita de Cássia', title: 'Santa das Causas Impossíveis', date: '22 de Maio', bio: 'Esposa, mãe, viúva e monja agostiniana. Recebeu o espinho da coroa de Cristo.' },
  { id: 'sao-judas-tadeu', name: 'São Judas Tadeu', title: 'Apóstolo das Causas Desesperadas', date: '28 de Outubro', bio: 'Primo de Jesus, apóstolo e mártir.' },
  { id: 'santa-monica', name: 'Santa Mônica', title: 'Mãe de Santo Agostinho', date: '27 de Agosto', bio: 'Exemplo de mãe que reza e chora pelos filhos.' },
  { id: 'santo-agostinho', name: 'Santo Agostinho', title: 'Doutor da Graça', date: '28 de Agosto', bio: 'Bispo, teólogo e um dos maiores Doutores da Igreja.' },
  { id: 'sao-domingos-gusmao', name: 'São Domingos de Gusmão', title: 'Fundador dos Dominicanos', date: '08 de Agosto', bio: 'Recebeu o Rosário das mãos de Maria.' },
  { id: 'santa-catarina-siena', name: 'Santa Catarina de Sena', title: 'Doutora da Igreja', date: '29 de Abril', bio: 'Mística, conselheira de papas e doutora da Igreja.' },
  { id: 'sao-tomas-aquino', name: 'São Tomás de Aquino', title: 'Doutor Angélico', date: '28 de Janeiro', bio: 'Maior teólogo da história da Igreja.' },
  { id: 'sao-joao-bosco', name: 'São João Bosco', title: 'Pai e Mestre da Juventude', date: '31 de Janeiro', bio: 'Fundador dos Salesianos.' },
  { id: 'santa-clara', name: 'Santa Clara de Assis', title: 'Fundadora das Clarissas', date: '11 de Agosto', bio: 'Seguiu São Francisco na radical pobreza.' },
  { id: 'sao-vicente-paul', name: 'São Vicente de Paulo', title: 'Pai dos Pobres', date: '27 de Setembro', bio: 'Fundador das Filhas da Caridade.' },
  { id: 'santa-camilia', name: 'Santa Camila Batista Varano', title: 'Mãe dos Enfermos', date: '31 de Maio', bio: 'Fundadora das Camilianas.' },
  { id: 'sao-camilo', name: 'São Camilo de Lellis', title: 'Padroeiro dos Enfermos', date: '14 de Julho', bio: 'Fundador dos Camilianos.' },
  { id: 'santa-terezinha', name: 'Santa Teresinha do Menino Jesus', title: 'Doutora da Igreja', date: '01 de Outubro', bio: 'A Pequena Via da infância espiritual.' },
  { id: 'sao-pio', name: 'São Pio de Pietrelcina', title: 'Padre estigmatizado', date: '23 de Setembro', bio: 'Carregou os estigmas de Cristo por 50 anos.' },
  { id: 'santa-faustina', name: 'Santa Faustina Kowalska', title: 'Apóstola da Divina Misericórdia', date: '05 de Outubro', bio: 'Recebeu as revelações da Divina Misericórdia.' },
  { id: 'sao-joao-paulo-ii', name: 'São João Paulo II', title: 'O Papa da Família', date: '22 de Outubro', bio: 'Papa peregrino que guiou a Igreja no século XX.' },
  { id: 'santa-gema', name: 'Santa Gema Galgani', title: 'Alma vítima', date: '11 de Abril', bio: 'Mística estigmatizada italiana.' },
  { id: 'sao-charbel', name: 'São Charbel Makhlouf', title: 'Eremita do Líbano', date: '24 de Julho', bio: 'Monge maronita famoso por milagres após a morte.' },
  { id: 'santa-filomena', name: 'Santa Filomena', title: 'Poderosa com Deus', date: '11 de Agosto', bio: 'Mártir virgem do século IV.' },
  { id: 'sao-cristovao', name: 'São Cristóvão', title: 'Padroeiro dos Motoristas', date: '25 de Julho', bio: 'Gigante que carregou o Menino Jesus.' },
  { id: 'sao-sebastiao', name: 'São Sebastião', title: 'Mártir das flechas', date: '20 de Janeiro', bio: 'Soldado romano martirizado por ser cristão.' },
  { id: 'santa-lucia', name: 'Santa Lúcia', title: 'Virgem e Mártir', date: '13 de Dezembro', bio: 'Arrancaram-lhe os olhos por amor a Cristo.' },
  { id: 'santa-agnes', name: 'Santa Inês', title: 'Virgem e Mártir', date: '21 de Janeiro', bio: 'Morreu com apenas 13 anos por amor a Jesus.' },
  { id: 'sao-lourenco', name: 'São Lourenço', title: 'Diácono e Mártir', date: '10 de Agosto', bio: 'Morreu assado numa grelha.' },
  { id: 'sao-bartolomeu', name: 'São Bartolomeu', title: 'Apóstolo esfolado vivo', date: '24 de Agosto', bio: 'Um dos 12 apóstolos.' },
  { id: 'santa-edwiges', name: 'Santa Edwiges', title: 'Protetora dos Endividados', date: '16 de Outubro', bio: 'Rainha que ajudava os pobres e endividados.' },
  { id: 'santa-catarina-laboure', name: 'Santa Catarina Labouré', title: 'Vidente da Medalha Milagrosa', date: '28 de Novembro', bio: 'Recebeu a Medalha Milagrosa de Maria.' },
  { id: 'sao-martinho', name: 'São Martinho de Tours', title: 'Soldado de Cristo', date: '11 de Novembro', bio: 'Dividiu sua capa com um pobre (que era Jesus).' },
  { id: 'santa-cecilia', name: 'Santa Cecília', title: 'Padroeira dos Músicos', date: '22 de Novembro', bio: 'Cantava a Deus no coração enquanto a perseguiam.' },
  { id: 'sao-nicolau', name: 'São Nicolau', title: 'O verdadeiro Papai Noel', date: '06 de Dezembro', bio: 'Bispo famoso pela caridade.' },
  { id: 'santa-barbara', name: 'Santa Bárbara', title: 'Protetora contra raios', date: '04 de Dezembro', bio: 'Mártir do século III.' },
  { id: 'sao-joao-evangelista', name: 'São João Evangelista', title: 'Discípulo amado', date: '27 de Dezembro', bio: 'Apóstolo que reclinou no peito de Jesus.' },
  { id: 'santo-inacio', name: 'Santo Inácio de Loyola', title: 'Fundador dos Jesuítas', date: '31 de Julho', bio: '“Ad maiorem Dei gloriam”.' },
  { id: 'santa-teresa-avila', name: 'Santa Teresa de Ávila', title: 'Doutora da Igreja', date: '15 de Outubro', bio: 'Reformadora do Carmelo, mística.' },
  { id: 'sao-joao-da-cruz', name: 'São João da Cruz', title: 'Doutor Místico', date: '14 de Dezembro', bio: 'Mestre da noite escura da alma.' },
  { id: 'santa-maria-madalena', name: 'Santa Maria Madalena', title: 'Apóstola dos Apóstolos', date: '22 de Julho', bio: 'Primeira testemunha da Ressurreição.' },
  { id: 'sao-pedro-claver', name: 'São Pedro Claver', title: 'Escravo dos escravos', date: '09 de Setembro', bio: 'Missionário dos negros escravizados.' },
  { id: 'santa-clotilde', name: 'Santa Clotilde', title: 'Rainha da França', date: '03 de Junho', bio: 'Converteu o rei Clóvis e a França.' },
  { id: 'sao-luis', name: 'São Luís IX', title: 'Rei da França', date: '25 de Agosto', bio: 'Rei santo e cruzado.' },
  { id: 'santa-isabel-portugal', name: 'Santa Isabel de Portugal', title: 'Rainha Pacificadora', date: '04 de Julho', bio: 'Conhecida como a Rainha Santa.' },
  { id: 'sao-roque', name: 'São Roque', title: 'Protetor contra a peste', date: '16 de Agosto', bio: 'Cuidava dos pestosos na Idade Média.' },
  { id: 'santa-rosa-lima', name: 'Santa Rosa de Lima', title: 'Primeira santa da América', date: '23 de Agosto', bio: 'Dominicana terciária peruana.' },
  { id: 'sao-martinho-porres', name: 'São Martinho de Porres', title: 'Vassoura de Deus', date: '03 de Novembro', bio: 'Mulato dominicano, famoso por milagres.' },
  { id: 'sao-jose-cupertino', name: 'São José de Cupertino', title: 'O santo que voava', date: '18 de Setembro', bio: 'Frade franciscano que levitava em êxtase.' },
  { id: 'santa-brigida', name: 'Santa Brígida da Suécia', title: 'Mística do Norte', date: '23 de Julho', bio: 'Mãe de 8 filhos e mística.' },
  { id: 'sao-patricio', name: 'São Patrício', title: 'Apóstolo da Irlanda', date: '17 de Março', bio: 'Levou o cristianismo à Irlanda.' },
  { id: 'santa-joana-darc', name: 'Santa Joana d’Arc', title: 'A Donzela de Orléans', date: '30 de Maio', bio: 'Salvou a França guiada por vozes celestes.' },
  { id: 'santa-maria-goretti', name: 'Santa Maria Goretti', title: 'Mártir da Pureza', date: '06 de Julho', bio: 'Morreu perdoando quem tentou violá-la.' },
  { id: 'sao-dominic-savio', name: 'São Domingos Sávio', title: 'Adolescente santo', date: '06 de Maio', bio: 'Aluno de Dom Bosco. “A morte, mas não pecado”.' },
  { id: 'beato-carlo-acutis', name: 'Beato Carlo Acutis', title: 'Apóstolo da Internet', date: '12 de Outubro', bio: 'Jovem italiano apaixonado pela Eucaristia.' },
  { id: 'santa-gianna', name: 'Santa Gianna Beretta Molla', title: 'Mãe que deu a vida', date: '28 de Abril', bio: 'Médica que escolheu salvar o filho em vez de si mesma.' },
  { id: 'sao-maximiliano-kolbe', name: 'São Maximiliano Kolbe', title: 'Mártir de Auschwitz', date: '14 de Agosto', bio: 'Frade que se ofereceu no lugar de um pai de família.' },
  { id: 'santa-edith-stein', name: 'Santa Teresa Benedita da Cruz', title: 'Mártir judia convertida', date: '09 de Agosto', bio: 'Filósofa, carmelita, morta em Auschwitz.' },
  { id: 'sao-josemaria', name: 'São Josemaría Escrivá', title: 'Apóstolo da santidade no trabalho', date: '26 de Junho', bio: 'Fundador do Opus Dei.' },
  { id: 'santa-clara-fiet', name: 'Santa Clara de Montefalco', title: 'Cruz no coração', date: '17 de Agosto', bio: 'Encontraram a cruz impressa em seu coração.' },
  { id: 'sao-felipe-neri', name: 'São Filipe Neri', title: 'Apóstolo de Roma', date: '26 de Maio', bio: 'Fundador do Oratório, o santo da alegria.' },
  { id: 'santa-margarida-alacoque', name: 'Santa Margarida Maria Alacoque', title: 'Apóstola do Sagrado Coração', date: '16 de Outubro', bio: 'Recebeu as promessas do Sagrado Coração de Jesus.' },
  { id: 'sao-gerardo', name: 'São Gerardo Majella', title: 'Padroeiro das grávidas', date: '16 de Outubro', bio: 'Redentorista, famoso por milagres com mães.' },
  { id: 'santa-perpetua-felicidade', name: 'Santa Perpétua e Santa Felicidade', title: 'Mártires de Cartago', date: '07 de Março', bio: 'Morreram juntas na arena por amor a Cristo.' },
  { id: 'sao-pantaleao', name: 'São Pantaleão', title: 'Padroeiro dos médicos', date: '27 de Julho', bio: 'Médico mártir do século IV.' },
  { id: 'sao-blas', name: 'São Brás', title: 'Protetor da garganta', date: '03 de Fevereiro', bio: 'Bispo e mártir, famoso pela bênção da garganta.' },
  { id: 'santa-apollonia', name: 'Santa Apolônia', title: 'Protetora dos dentes', date: '09 de Fevereiro', bio: 'Arrancaram-lhe os dentes antes do martírio.' },
  { id: 'sao-valentim', name: 'São Valentim', title: 'Mártir do amor casto', date: '14 de Fevereiro', bio: 'Bispo que casava casais cristãos em segredo.' },
  { id: 'sao-victor', name: 'São Vítor', title: 'Mártir adolescente', date: '14 de Maio', bio: 'Morreu aos 15 anos por não renegar a fé.' },
  { id: 'santa-escritura', name: 'Santa Escolástica', title: 'Irmã de São Bento', date: '10 de Fevereiro', bio: 'Irmã gêmea de São Bento, fundadora do ramo feminino.' },
  { id: 'sao-gregorio-magno', name: 'São Gregório Magno', title: 'Papa e Doutor', date: '03 de Setembro', bio: 'Grande reformador da liturgia.' },
  { id: 'sao-leao-magno', name: 'São Leão Magno', title: 'Papa que deteve Átila', date: '10 de Novembro', bio: 'Papa que enfrentou Átila, o Huno.' },
  { id: 'sao-bonifacio', name: 'São Bonifácio', title: 'Apóstolo da Alemanha', date: '05 de Junho', bio: 'Derrubou o carvalho de Thor.' },
  { id: 'sao-cirilo-metodio', name: 'São Cirilo e São Metódio', title: 'Apóstolos dos Eslavos', date: '14 de Fevereiro', bio: 'Levaram o Evangelho aos povos eslavos.' },
  { id: 'santa-kateri', name: 'Santa Kateri Tekakwitha', title: 'Lírio dos Moicanos', date: '14 de Julho', bio: 'Primeira santa indígena da América do Norte.' },
  { id: 'sao-juan-diego', name: 'São Juan Diego', title: 'Vidente de Guadalupe', date: '09 de Dezembro', bio: 'Indígena mexicano a quem Maria apareceu.' },
  { id: 'sao-damian', name: 'São Damião de Molokai', title: 'Apóstolo dos leprosos', date: '15 de Abril', bio: 'Morreu cuidando dos leprosos no Havaí.' },
  { id: 'madre-teresa', name: 'Santa Teresa de Calcutá', title: 'Mãe dos mais pobres', date: '05 de Setembro', bio: 'Fundadora das Missionárias da Caridade.' },
  { id: 'sao-paulo-miki', name: 'São Paulo Miki e companheiros', title: 'Mártires do Japão', date: '06 de Fevereiro', bio: '26 mártires crucificados em Nagasaki.' },
  { id: 'sao-ignacio-antioquia', name: 'Santo Inácio de Antioquia', title: 'Mártir do século II', date: '17 de Outubro', bio: 'Discípulo de São João, escreveu belas cartas.' },
  { id: 'santa-perpetua', name: 'Santa Perpétua', title: 'Mártir mãe', date: '07 de Março', bio: 'Deixou diário do seu martírio.' },
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
  { id: 'maternidade', title: 'Maternidade Divina', desc: 'Maria é verdadeiramente Mãe de Deus (Theotokos).', icon: 'Crown' },
  { id: 'virgindade', title: 'Virgindade Perpétua', desc: 'Maria foi Virgem antes, durante e depois do parto.', icon: 'Star' },
  { id: 'imaculada', title: 'Imaculada Conceição', desc: 'Preservada do pecado original desde a concepção.', icon: 'Sparkles' },
  { id: 'assuncao', title: 'Assunção', desc: 'Elevada em corpo e alma à glória celeste.', icon: 'Cloud' }
];
export const THE_APOSTLES = [
  { id: 'pedro', name: 'São Pedro', symbol: 'Chaves', title: 'O Príncipe dos Apóstolos', desc: 'Primeiro Papa, recebeu as chaves do Reino e a missão de apascentar as ovelhas.' },
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
  { id: 'matias', name: 'São Matias', symbol: 'Machado', title: 'O Escolhido', desc: 'Eleito para substituir Judas Iscariotes e completar os doze.' },
  { id: 'paulo', name: 'São Paulo', symbol: 'Espada', title: 'Apóstolo dos Gentios', desc: 'Embora não seja dos doze originais, é a coluna da Igreja junto com Pedro. Grande missionário.' }
];
export const LITURGICAL_OBJECTS = [
  { id: 'calice', title: 'Cálice', desc: 'Taça onde se consagra o vinho no Sangue de Cristo.', icon: 'Grape' },
  { id: 'patena', title: 'Patena', desc: 'Prato onde se coloca a hóstia a ser consagrada.', icon: 'Circle' },
  { id: 'ostensorio', title: 'Ostensório', desc: 'Objeto para expor o Santíssimo Sacramento à adoração.', icon: 'Sun' },
  { id: 'ciborio', title: 'Cibório', desc: 'Recipiente com tampa para guardar as hóstias consagradas no sacrário.', icon: 'Circle' },
  { id: 'corporal', title: 'Corporal', desc: 'Pano quadrado onde se colocam o cálice e a patena. Representa o sudário.', icon: 'BookOpen' },
  { id: 'purificatorio', title: 'Sanguíneo', desc: 'Pano utilizado para purificar o cálice e os dedos do sacerdote.', icon: 'Droplet' }
];
export const APOSTOLIC_LINE = [
  { id: 'leao14', name: 'Papa Leão XIV', period: '2025 - Atual', title: 'Robert Francis Prevost (OSA)', bio: 'Primeiro Papa da América do Norte e da Ordem de Santo Agostinho. Inspirado por Leão XIII, enfrenta os desafios da Inteligência Artificial e da Quarta Revolução Industrial na defesa da dignidade humana.', highlight: true },
  { id: 'francisco', name: 'Papa Francisco', period: '2013 - 2025', title: 'Jorge Mario Bergoglio', bio: 'O Papa da misericórdia e dos pobres. Primeiro Papa das Américas.', highlight: false },
  { id: 'bento', name: 'Bento XVI', period: '2005 - 2013', title: 'Joseph Ratzinger', bio: 'Grande teólogo, lutou contra o relativismo.', highlight: false },
  { id: 'jp2', name: 'São João Paulo II', period: '1978 - 2005', title: 'Karol Wojtyla', bio: 'O Papa da família e da juventude.', highlight: false },
  { id: 'jp1', name: 'João Paulo I', period: '1978', title: 'Albino Luciani', bio: 'O Papa do Sorriso.', highlight: false },
  { id: 'paulo6', name: 'São Paulo VI', period: '1963 - 1978', title: 'Giovanni B. Montini', bio: 'Concluiu o Vaticano II.', highlight: false },
  { id: 'joao23', name: 'São João XXIII', period: '1958 - 1963', title: 'Angelo Roncalli', bio: 'O Papa Bom, convocou o Concílio.', highlight: false },
  { id: 'pio12', name: 'Pio XII', period: '1939 - 1958', title: 'Eugenio Pacelli', bio: 'Pastor Angelicus, guiou a Igreja na Guerra.', highlight: false },
  { id: 'pio11', name: 'Pio XI', period: '1922 - 1939', title: 'Achille Ratti', bio: 'Instituiu a festa de Cristo Rei.', highlight: false },
  { id: 'bento15', name: 'Bento XV', period: '1914 - 1922', title: 'Giacomo della Chiesa', bio: 'Papa da Paz durante a 1ª Guerra.', highlight: false },
  { id: 'pio10', name: 'São Pio X', period: '1903 - 1914', title: 'Giuseppe Sarto', bio: 'Papa da Eucaristia, combateu o modernismo.', highlight: false },
  { id: 'leao13', name: 'Leão XIII', period: '1878 - 1903', title: 'Vincenzo Pecci', bio: 'Autor da Rerum Novarum e grande devoto de São José.', highlight: false },
  { id: 'pio9', name: 'Beato Pio IX', period: '1846 - 1878', title: 'Giovanni M. Mastai-Ferretti', bio: 'Proclamou o dogma da Imaculada Conceição.', highlight: false },
  { id: 'gregorio16', name: 'Gregório XVI', period: '1831 - 1846', title: 'Bartolomeo Cappellari', bio: 'Grande missionário.', highlight: false },
  { id: 'pedro', name: 'São Pedro', period: '30 - 67', title: 'Simão Pedro', bio: 'O primeiro Papa, escolhido por Cristo. A Pedra.', highlight: true }
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
  { id: 'acolyto', title: 'Acólito / Coroinha', desc: 'Serve ao altar, auxiliando o sacerdote e o diácono nas celebrações litúrgicas.', icon: 'Bell' },
  { id: 'musica', title: 'Músico Sacro', desc: 'Serve a Deus através da arte. A música sacra eleva a alma e ajuda a assembleia a rezar. "Quem canta reza duas vezes".', icon: 'Music' },
  { id: 'pascom', title: 'Pascom', desc: 'Pastoral da Comunicação. Evangeliza através dos meios de comunicação e redes sociais.', icon: 'Users' },
  { id: 'caridade', title: 'Vicentinos / Caridade', desc: 'Serviço aos pobres e necessitados, vendo neles a face de Cristo sofredor.', icon: 'Heart' }
];
export const PRAYERS: Prayer[] = [
  // Basic Prayers
  { id: 'pai-nosso', title: 'Pai Nosso', category: 'Basic', content: PRAYERS_TEXT.paiNosso, latin: 'Pater noster, qui es in caelis...' },
  { id: 'ave-maria', title: 'Ave Maria', category: 'Marian', content: PRAYERS_TEXT.aveMaria, latin: 'Ave Maria, gratia plena...' },
  { id: 'credo', title: 'Credo (Símbolo dos Apóstolos)', category: 'Basic', content: PRAYERS_TEXT.creio },
  { id: 'gloria', title: 'Glória ao Pai', category: 'Basic', content: PRAYERS_TEXT.gloria },
  { id: 'santo-anjo', title: 'Santo Anjo', category: 'Basic', content: 'Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, me guarde, me governe me ilumine. Amém.' },
  { id: 'oferecimento-dia', title: 'Oferecimento do Dia', category: 'Basic', content: 'Ofereço-vos, ó meu Deus, em união com o Santíssimo Coração de Jesus, as orações, obras e sofrimentos deste dia, em reparação de nossas ofensas e por todas as intenções pelas quais o mesmo Divino Coração está continuamente intercedendo e sacrificando-se em nossos altares. Eu vo-las ofereço em particular por... (colocar intenção).' },
  { id: 'ato-contricao', title: 'Ato de Contrição', category: 'Basic', content: 'Meu Deus, eu me arrependo, de todo o meu coração, de todos os meus pecados, porque pecando não só mereci os castigos que tão justamente estabelecestes, mas principalmente porque Vos ofendi a Vós, sumo bem e digno de ser amado sobre todas as coisas. Por isso proponho firmemente, com a ajuda da vossa graça, não mais pecar e fugir das ocasiões de pecado. Amém.' },
  { id: 'alma-de-cristo', title: 'Alma de Cristo', category: 'Basic', content: 'Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me. Sangue de Cristo, inebriai-me. Água do lado de Cristo, lavai-me. Paixão de Cristo, confortai-me. Ó bom Jesus, ouvi-me. Dentro de vossas chagas, escondei-me. Não permitais que eu me separe de vós. Do espírito maligno, defendei-me. Na hora da minha morte, chamai-me e mandai-me ir para vós, para que com vossos Santos vos louve por todos os séculos dos séculos. Amém.', latin: 'Anima Christi, sanctifica me...' },
  { id: 'oracao-manha', title: 'Oração da Manhã Completa', category: 'Basic', content: 'EM NOME DO PAI, DO FILHO E DO ESPÍRITO SANTO. AMÉM.\n\nOFERECIMENTO DO DIA\nSenhor, Deus onipotente, que nos fizestes chegar ao começo deste dia, salvai-nos hoje pelo vosso poder, para que não caiamos em pecado, mas os nossos pensamentos, palavras e obras se dirijam sempre a fazer a vossa justiça. Por Nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo.\n\nATO DE FÉ\nEu creio firmemente que há um só Deus em três pessoas realmente distintas: Pai, Filho e Espírito Santo. Creio que o Filho de Deus se fez homem, padeceu e morreu na cruz para nos salvar e ao terceiro dia ressuscitou.\n\nATO DE ESPERANÇA\nEu espero, meu Deus, com firme confiança, que, pelos merecimentos de meu Senhor Jesus Cristo, me dareis a salvação eterna e as graças necessárias para consegui-la.\n\nATO DE CARIDADE\nEu vos amo, meu Deus, de todo o meu coração e sobre todas as coisas, porque sois infinitamente bom e amável, e prefiro perder a vida a ofender-vos.' },
  { id: 'oracao-noite', title: 'Oração da Noite Completa', category: 'Basic', content: 'EM NOME DO PAI, DO FILHO E DO ESPÍRITO SANTO. AMÉM.\n\nAgradeço-vos, meu Deus, por todos os benefícios que hoje recebi da vossa bondade.\n\nEXAME DE CONSCIÊNCIA (Breve pausa)\nPensei mal? Falei mal? Agi mal? Deixei de fazer o bem?\n\nATO DE CONTRIÇÃO\nSenhor meu, Jesus Cristo, Deus e homem verdadeiro... (rezar o ato de contrição)\n\nJESUS, MARIA E JOSÉ\nJesus, Maria e José, eu vos dou meu coração e minha alma.\nJesus, Maria e José, assisti-me na minha última agonia.\nJesus, Maria e José, expire em paz convosco a minha alma.\n\nSanto Anjo do Senhor...' },
  { id: 'exame-consciencia', title: 'Exame de Consciência', category: 'Basic', content: 'Coloque-se na presença de Deus.\n\nOS 10 MANDAMENTOS\n1. Amei a Deus sobre todas as coisas? Rezei hoje? Duvidei da fé?\n2. Usei o santo nome de Deus em vão? Blasfemei?\n3. Guardei os domingos e dias santos? Fui à Missa?\n4. Honrei pai e mãe? Fui desobediente ou desrespeitoso?\n5. Matei ou feri alguém? Tive ódio, rancor ou desejo de vingança?\n6. Pequei contra a castidade? (Pensamentos, palavras, olhares impuros...)\n7. Roubei ou danifiquei bens alheios? Fui honesto no trabalho?\n8. Menti? Fiz fofoca ou calúnia? Julguei mal o próximo?\n9. Desejei a mulher/homem do próximo?\n10. Cobicei as coisas alheias? Tive inveja?\n\nPECADOS CAPITAIS\nSoberba, Avareza, Luxúria, Ira, Gula, Inveja, Preguiça.' },
  // Marian Prayers
  { id: 'salve-rainha', title: 'Salve Rainha', category: 'Marian', content: PRAYERS_TEXT.salveRainha },
  { id: 'consagracao-cenaculo', title: 'Consagração (Cenáculo)', category: 'Marian', content: CENACULO_CONSAGRACAO.content },
  { id: 'memorare', title: 'Lembrai-vos (Memorare)', category: 'Marian', content: 'Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência, e reclamado o vosso socorro, fosse por Vós desamparado. Animado eu, pois, com igual confiança, a Vós, Virgem entre todas singular, como a Mãe recorro, de Vós me valho e, gemendo sob o peso dos meus pecados, me prostro aos vossos pés. Não rejeiteis as minhas súplicas, ó Mãe do Filho de Deus humanado, mas dignai-vos de as ouvir propícia e de me alcançar o que vos rogo. Amém.' },
  { id: 'angelus', title: 'O Angelus', category: 'Marian', content: 'V. O Anjo do Senhor anunciou a Maria.\nR. E ela concebeu do Espírito Santo.\nAve Maria...\n\nV. Eis aqui a serva do Senhor.\nR. Faça-se em mim segundo a vossa palavra.\nAve Maria...\n\nV. E o Verbo se fez carne.\nR. E habitou entre nós.\nAve Maria...\n\nV. Rogai por nós, Santa Mãe de Deus.\nR. Para que sejamos dignos das promessas de Cristo.\n\nOremos: Infundi, Senhor, nós Vos pedimos, a Vossa graça em nossas almas, para que nós, que pela Anunciação do Anjo conhecemos a Encarnação de Jesus Cristo, Vosso Filho, pela Sua Paixão e Cruz sejamos conduzidos à glória da Ressurreição. Pelo mesmo Cristo, Senhor nosso. Amém.' },
  { id: 'angelus-sinos', title: 'Angelus (com Sinos)', category: 'Marian', content: '(Toca-se o sino 3 vezes)\nV. O Anjo do Senhor anunciou a Maria.\nR. E ela concebeu do Espírito Santo.\nAve Maria...\n\n(Toca-se o sino 3 vezes)\nV. Eis aqui a serva do Senhor.\nR. Faça-se em mim segundo a vossa palavra.\nAve Maria...\n\n(Toca-se o sino 3 vezes)\nV. E o Verbo se fez carne.\nR. E habitou entre nós.\nAve Maria...\n\nV. Rogai por nós, Santa Mãe de Deus.\nR. Para que sejamos dignos das promessas de Cristo.\n\n(Toca-se o sino 9 vezes)\nOremos: Infundi, Senhor, nós Vos pedimos...' },
  { id: 'regina-caeli', title: 'Rainha do Céu (Regina Caeli)', category: 'Marian', content: 'V. Rainha do Céu, alegrai-vos, Aleluia!\nR. Porque Aquele que merecestes trazer em vosso seio, Aleluia!\nV. Ressuscitou como disse, Aleluia!\nR. Rogai por nós a Deus, Aleluia!\nV. Alegrai-vos e exultai, ó Virgem Maria, Aleluia!\nR. Porque o Senhor ressuscitou verdadeiramente, Aleluia!\n\nOremos: Ó Deus, que Vos dignastes alegrar o mundo com a Ressurreição do Vosso Filho Jesus Cristo, Senhor Nosso, concedei-nos, Vos suplicamos, que por sua Mãe, a Virgem Maria, alcancemos os prazeres da vida eterna. Pelo mesmo Cristo, Senhor Nosso. Amém.' },
  { id: 'sub-tuum', title: 'À Vossa Proteção', category: 'Marian', content: 'À vossa proteção recorremos, Santa Mãe de Deus; não desprezeis as nossas súplicas em nossas necessidades, mas livrai-nos sempre de todos os perigos, ó Virgem gloriosa e bendita. Amém.' },
  { id: 'magnificat', title: 'Magnificat', category: 'Marian', content: 'A minha alma engrandece ao Senhor, e o meu espírito se alegra em Deus meu Salvador, porque olhou para a humildade de sua serva. Doravante todas as gerações me chamarão bem-aventurada, porque o Todo-poderoso fez grandes coisas em meu favor. O seu nome é santo, e sua misericórdia se estende, de geração em geração, a todos os que o temem. Manifestou o poder do seu braço, dispersou os soberbos. Derrubou os poderosos de seus tronos e exaltou os humildes. Aos famintos encheu de bens e aos ricos despediu de mãos vazias. Acolheu a Israel, seu servo, lembrado da sua misericórdia, como tinha prometido a nossos pais, a Abraão e à sua descendência para sempre.' },
  { id: 'consagracao-ns', title: 'Consagração a Nossa Senhora', category: 'Marian', content: 'Ó minha Senhora, ó minha Mãe, eu me ofereço todo a Vós, e em prova da minha devoção para convosco, Vos consagro neste dia: os meus olhos, os meus ouvidos, a minha boca, o meu coração e inteiramente todo o meu ser. E porque assim sou vosso, ó incomparável Mãe, guardai-me e defendei-me como coisa e propriedade vossa. Amém.' },
  { id: 'ave-fatima', title: 'Ave de Fátima', category: 'Marian', content: 'A treze de maio na Cova da Iria, apareceu brilhando a Virgem Maria. Ave, Ave, Ave Maria. Ave, Ave, Ave Maria. A três pastorinhos, cercada de luz, visita a Maria, a Mãe de Jesus.' },
  { id: 'alma-redemptoris', title: 'Alma Redemptoris Mater', category: 'Marian', content: 'Ó Mãe do Redentor, que permaneces Porta do Céu, e Estrela do Mar, socorre o povo que cai e que procura levantar-se. Tu, que geraste, diante do espanto da natureza, o teu Santo Criador, Virgem antes e depois, acolhendo o Ave da boca de Gabriel, tem piedade dos pecadores.' },
  { id: 'virgem-silencio', title: 'Oração à Virgem do Silêncio', category: 'Marian', content: 'Senhora do Silêncio, ensina-me a calar para ouvir a voz de Deus. Fazei que o meu coração seja uma morada silenciosa onde a Palavra de Deus possa habitar e frutificar.' },
  { id: 'desatadora', title: 'Nossa Senhora Desatadora dos Nós', category: 'Marian', content: 'Santa Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus e nossa Mãe, tu que com coração materno desatas os nós que entorpecem nossa vida, te pedimos que recebas em tuas mãos (nome da pessoa) e que a livres das amarras e confusões com que o nosso inimigo a castiga. Por tua graça, por tua intercessão, com teu exemplo, livra-nos de todo o mal, Senhora nossa, e desata os nós que impedem de nos unirmos a Deus, para que, livres de toda confusão e erros, O louvemos em todas as coisas, coloquemos n’Ele nossos corações e possamos servi-Lo sempre em nossos irmãos. Amém.' },
  { id: 'imaculada', title: 'Oração à Imaculada Conceição', category: 'Marian', content: 'Ó Deus, que pela Imaculada Conceição da Virgem preparastes para o vosso Filho digna morada, nós vos suplicamos que, assim como, prevendo a morte do vosso Filho, Vós a preservastes de toda a mancha, concedais também a nós, por sua intercessão, chegar até Vós purificados de todo o pecado. Por Nosso Senhor Jesus Cristo. Amém.' },
  { id: 'consagracao-montfort', title: 'Pequena Consagração (São Luís)', category: 'Marian', content: 'Eu vos escolho hoje, ó Maria, na presença de toda a corte celeste, por minha Mãe e minha Rainha. Eu vos entrego e consagro, com toda a submissão e amor, o meu corpo e a minha alma, os meus bens interiores e exteriores, e o próprio valor das minhas boas obras passadas, presentes e futuras, deixando-vos inteiro e pleno direito de dispor de mim e de tudo o que me pertence, sem exceção alguma, segundo o vosso beneplácito, para a maior glória de Deus, no tempo e na eternidade.' },
  { id: 'ladainha-ns', title: 'Ladainha de Nossa Senhora', category: 'Marian', content: 'Senhor, tende piedade de nós.\nJesus Cristo, tende piedade de nós.\nSenhor, tende piedade de nós.\n\nJesus Cristo, ouvi-nos.\nJesus Cristo, atendei-nos.\n\nPai celeste que sois Deus, tende piedade de nós.\nFilho, Redentor do mundo, que sois Deus, tende piedade de nós.\nEspírito Santo, que sois Deus, tende piedade de nós.\nSantíssima Trindade, que sois um só Deus, tende piedade de nós.\n\nSanta Maria, rogai por nós.\nSanta Mãe de Deus, rogai por nós.\nSanta Virgem das virgens, rogai por nós.\nMãe de Jesus Cristo, rogai por nós.\n(E assim segue com todas as invocações...)\n\nCordeiro de Deus, que tirais os pecados do mundo, perdoai-nos, Senhor.\nCordeiro de Deus, que tirais os pecados do mundo, ouvi-nos, Senhor.\nCordeiro de Deus, que tirais os pecados do mundo, tende piedade de nós.' },
  { id: 'tres-ave-marias', title: 'As Três Ave-Marias', category: 'Marian', content: 'Rezar três Ave-Marias de manhã e à noite em honra ao Poder, Sabedoria e Amor da Santíssima Trindade conferidos a Nossa Senhora.' },
  // Saints
  { id: 'sao-miguel', title: 'São Miguel Arcanjo', category: 'Saint', content: 'São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos, e vós, príncipe da milícia celeste, pela virtude divina, precipitai no inferno a satanás e aos outros espíritos malignos, que andam pelo mundo para perder as almas. Amém.' },
  { id: 'sao-jose', title: 'São José', category: 'Saint', content: 'A vós, São José, recorremos em nossa tribulação e, depois de ter implorado o auxílio de vossa santíssima Esposa, cheios de confiança solicitamos também o vosso patrocínio. Por esse laço sagrado de caridade que vos uniu à Virgem Imaculada Mãe de Deus, e pelo amor paternal que tivestes ao Menino Jesus, ardentemente suplicamos que lanceis um olhar benigno sobre a herança que Jesus Cristo conquistou com o seu sangue, e nos socorrais em nossas necessidades com o vosso auxílio e poder. Protegei, ó guarda providente da divina Família, a raça eleita de Jesus Cristo. Afastai para longe de nós, ó pai amantíssimo, a peste do erro e do vício. Assisti-nos do alto do céu, ó nosso fortíssimo sustentáculo, na luta contra o poder das trevas; e assim como outrora salvastes da morte a vida ameaçada do Menino Jesus, assim também defendei agora a Santa Igreja de Deus das ciladas de seus inimigos e de toda a adversidade. Amparai a cada um de nós com o vosso constante patrocínio, a fim de que, a vosso exemplo e sustentados com o vosso auxílio, possamos viver virtuosamente, morrer piedosamente, e obter no céu a eterna bem-aventurança. Amém.' },
  { id: 'santa-teresinha', title: 'Santa Teresinha', category: 'Saint', content: 'Ó Santa Teresinha do Menino Jesus, que na vossa curta existência, fostes um espelho de angélica pureza, de amor forte e de tão generosa entrega a Deus, agora que gozais do prêmio de vossas virtudes, volvei um olhar de compaixão sobre mim, que em vós confio. Fazei vossa a minha intenção, dizei por mim uma palavra a essa Virgem Imaculada de que fostes a florzinha privilegiada, à Rainha do Céu que vos sorriu na manhã da vida. Rogai-lhe que vele sobre mim e que alcance de Deus a graça que tanto necessito e desejo. Santa Teresinha do Menino Jesus, atendei o meu pedido e mandai sobre mim uma chuva de rosas. Amém.' },
  { id: 'sao-francisco', title: 'São Francisco de Assis', category: 'Saint', content: 'Senhor, fazei de mim um instrumento de vossa paz. Onde houver ódio, que eu leve o amor; Onde houver ofensa, que eu leve o perdão; Onde houver discórdia, que eu leve a união; Onde houver dúvida, que eu leve a fé; Onde houver erro, que eu leve a verdade; Onde houver desespero, que eu leve a esperança; Onde houver tristeza, que eu leve a alegria; Onde houver trevas, que eu leve a luz. Ó Mestre, fazei que eu procure mais consolar, que ser consolado; compreender, que ser compreendido; amar, que ser amado. Pois é dando que se recebe, é perdoando que se é perdoado, e é morrendo que se vive para a vida eterna. Amém.' },
  { id: 'sao-judas', title: 'São Judas Tadeu', category: 'Saint', content: 'São Judas Tadeu, glorioso Apóstolo, fiel servo e amigo de Jesus, o nome de traidor foi causa de que fôsseis esquecido por muitos, mas a Igreja vos honra e invoca universalmente como o patrono nos casos desesperados, nos negócios sem remédio. Rogai por mim, que sou tão miserável. Fazei uso, eu vos imploro, desse particular privilégio que vos foi concedido, de trazer visível e imediato auxílio, onde o socorro desapareceu quase por completo. Assisti-me nesta grande necessidade, para que possa receber as consolações e o auxílio do céu em todas as minhas precisões, atribulações e sofrimentos, alcançando-me a graça de (fazer o pedido), e para que eu possa louvar a Deus convosco e com todos os eleitos, por toda a eternidade. Eu vos prometo, ó bendito São Judas, lembrar-me sempre deste grande favor, e nunca deixar de vos honrar, como meu especial e poderoso patrono, e fazer tudo o que estiver ao meu alcance para incentivar a devoção a vós. Amém.' },
  { id: 'santo-expedito', title: 'Santo Expedito', category: 'Saint', content: 'Meu Santo Expedito das causas justas e urgentes. Interceda por mim junto ao Nosso Senhor Jesus Cristo, socorra-me nesta hora de aflição e desespero, meu Santo Expedito Vós que sois um Santo guerreiro, Vós que sois o Santo dos aflitos, Vós que sois o Santo dos desesperados, Vós que sois o Santo das causas urgentes, proteja-me. Ajuda-me, Dai-me força, coragem e serenidade. Atenda meu pedido (Fazer o pedido). Meu Santo Expedito! Ajuda-me a superar estas horas difíceis, proteja de todos que possam me prejudicar, proteja minha família, atenda ao meu pedido com urgência. Devolva-me a paz e a tranquilidade. Meu Santo Expedito! Serei grato pelo resto de minha vida e levarei seu nome a todos que têm fé. Muito obrigado. Amém.' },
  { id: 'santa-rita', title: 'Santa Rita de Cássia', category: 'Saint', content: 'Ó Poderosa e gloriosa Santa Rita de Cássia, eis aos vossos pés uma alma desamparada que, necessitando de auxílio, a vós recorre com a doce esperança de ser atendida por vós que tendes o título de Santa dos casos impossíveis e desesperados. Ó cara Santa, interessai-vos pela minha causa, intercedei junto a Deus para que me conceda a graça que tanto necessito: (fazer o pedido). Não permitais que eu tenha de me afastar dos vossos pés sem ser atendido. Se houver em mim algum obstáculo que impeça de alcançar a graça que imploro, auxiliai-me para que o afaste. Envolvei o meu pedido em vossos preciosos méritos e apresentai-o a vosso celeste Esposo, Jesus, em união com a vossa prece. Ó Santa Rita, eu ponho em vós toda a minha confiança; só de vós espero a graça que peço. Santa Rita, advogada dos impossíveis, rogai por nós.' },
  { id: 'sao-bento', title: 'São Bento', category: 'Saint', content: 'A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, satanás! Nunca me aconselhes coisas vãs. É mal o que tu me ofereces, bebe tu mesmo os teus venenos! Amém. (Oração da Medalha de São Bento)' },
  { id: 'padre-pio', title: 'São Padre Pio', category: 'Saint', content: 'Fica, Senhor, comigo, pois preciso da tua presença para não te esquecer. Sabes quão facilmente posso te abandonar. Fica, Senhor, comigo, porque sou fraco e preciso da tua força para não cair. Fica, Senhor, comigo, porque és minha vida, e sem ti perco o fervor. Fica, Senhor, comigo, porque és minha luz, e sem ti reina a escuridão. Fica, Senhor, comigo, para me mostrares a tua vontade. Fica, Senhor, comigo, para que ouça a tua voz e te siga. Fica, Senhor, comigo, pois desejo amar-te e permanecer sempre em tua companhia. Fica, Senhor, comigo, se queres que te seja fiel. Fica, Senhor, comigo, porque, por mais pobre que seja minha alma, quero que se transforme num lugar de consolação para ti, um ninho de amor. Amém.' },
  { id: 'santa-faustina', title: 'Santa Faustina', category: 'Saint', content: 'Ó Jesus, que fizestes de Santa Faustina uma grande devota da Vossa infinita misericórdia, dignai-vos, por sua intercessão, se for do Vosso agrado, conceder-me a graça que Vos peço... Eu, pecador, não sou digno da Vossa misericórdia. Peço-Vos, pois, pelo espírito de sacrifício e dedicação de Santa Faustina e por sua intercessão, atendei aos pedidos que, com confiança, Vos apresento. Pai Nosso... Ave Maria... Glória...' },
  { id: 'joao-paulo-ii', title: 'São João Paulo II', category: 'Saint', content: 'Ó Trindade Santa, nós Vos agradecemos por terdes dado à Igreja o Papa João Paulo II e por terdes feito resplandecer nele a ternura da vossa paternidade, a glória da cruz de Cristo e o esplendor do Espírito de amor. Confiado totalmente na vossa infinita misericórdia e na maternal intercessão de Maria, ele foi para nós uma imagem viva de Jesus Bom Pastor, indicando-nos a santidade como a mais alta medida da vida cristã ordinária, caminho para alcançar a comunhão eterna convosco. Concedei-nos, por sua intercessão, segundo a vossa vontade, a graça que imploramos. Amém.' },
  { id: 'sao-charbel', title: 'São Charbel', category: 'Saint', content: 'Deus, infinitamente Santo e Glorificado em Vossos Santos, Vós que inspirastes ao santo monge e eremita Charbel a viver e a morrer em perfeita semelhança com Jesus, concedei-lhe a graça de interceder por nós. Eu Vos imploro a graça de... (fazer o pedido) por intercessão de São Charbel. Amém.' },
  { id: 'santo-antonio', title: 'Santo Antônio', category: 'Saint', content: 'Lembrai-vos, ó grande Santo Antônio, que o erro, a morte, a calamidade, o demônio, a lepra, fogem à vossa invocação; os doentes saram, o mar se acalma, as correntes e os grilhões caem dos cativos, os estropiados recobram os membros, e as coisas perdidas voltam aos donos. Jovens e velhos, todos cantam os vossos louvores. Os perigos desaparecem e a necessidade deixa de existir. Quem o conta, sois vós, ó paduanos; digam-no os que o sentiram. Glória ao Pai... (Responsório de Santo Antônio)' },
  { id: 'sao-cristovao', title: 'São Cristóvão', category: 'Saint', content: 'Dai-me, Senhor, firmeza e vigilância no volante, para que eu chegue sem sinistros ao meu destino. Protegei os que viajam comigo. Ajudai-me a respeitar a todos e a dirigir com prudência. E que eu descubra a vossa presença na natureza e em tudo o que me rodeia. Amém.' },
  { id: 'sao-jorge', title: 'São Jorge', category: 'Saint', content: 'Eu andarei vestido e armado com as armas de São Jorge para que meus inimigos, tendo pés não me alcancem, tendo mãos não me peguem, tendo olhos não me vejam, e nem em pensamentos eles possam me fazer mal. Armas de fogo o meu corpo não alcançarão, facas e lanças se quebrem sem o meu corpo tocar, cordas e correntes se arrebentem sem o meu corpo amarrar. Jesus Cristo, me proteja e me defenda com o poder de sua santa e divina graça, Virgem de Nazaré, me cubra com o seu manto sagrado e divino, protegendo-me em todas as minhas dores e aflições, e Deus, com sua divina misericórdia e grande poder, seja meu defensor contra as maldades e perseguições dos meu inimigos. Glorioso São Jorge, em nome de Deus, estenda-me o seu escudo e as suas poderosas armas, defendendo-me com a sua força e com a sua grandeza, e que debaixo das patas de seu fiel ginete meus inimigos fiquem humildes e submissos a vós. Assim seja com o poder de Deus, de Jesus e da falange do Divino Espírito Santo. São Jorge Rogai por Nós. Amém.' },
  { id: 'santa-luzia', title: 'Santa Luzia', category: 'Saint', content: 'Ó Santa Luzia, que preferistes deixar que os vossos olhos fossem vazados e arrancados antes de negar a fé e conspurcar vossa alma; e Deus, com um milagre extraordinário, vos devolveu outros dois olhos sãos e perfeitos para recompensar vossa virtude e vossa fé, e vos constituiu protetora contra as doenças dos olhos, eu recorro a vós para que protejais minhas vistas e cureis a doença dos meus olhos. Ó Santa Luzia, conservai a luz dos meus olhos para que eu possa ver as belezas da criação. Conservai também os olhos de minha alma, a fé, pela qual eu possa compreender os ensinamentos do vosso Deus, viver segundo os seus preceitos e chegar um dia onde vós estais, em companhia dos anjos e santos. Santa Luzia, protegei meus olhos e conservai minha fé. Amém.' },
  { id: 'santa-edwiges', title: 'Santa Edwiges', category: 'Saint', content: 'Ó Santa Edwiges, vós que na terra fostes o amparo dos pobres, a ajuda dos desvalidos e o socorro dos endividados, e no Céu agora desfrutais do eterno prêmio de caridade que em vida praticastes, suplicante te peço que sejais a minha advogada, para que eu obtenha de Deus o auxílio de que urgentemente necessito: (fazer o pedido). Alcançai-me também a suprema graça da salvação eterna. Santa Edwiges, rogai por nós. Amém.' },
  { id: 'sao-sebastiao', title: 'São Sebastião', category: 'Saint', content: 'Glorioso mártir São Sebastião, soldado de Cristo e exemplo de cristão, hoje viemos pedir a vossa intercessão. Vós que sobrevivestes às flechas e permanecestes fiel a Jesus até o fim, protegei-nos contra as pestes, as doenças e as guerras. Livrai-nos de todo mal que possa atingir nosso corpo e nossa alma. Dai-nos força para testemunhar nossa fé e coragem para enfrentar as dificuldades da vida. Amém.' },
  { id: 'frei-galvao', title: 'São Frei Galvão', category: 'Saint', content: 'São Frei Galvão, Deus de amor, fonte de todas as luzes, derramai vossas bênçãos sobre nós. Vós que, inspirados pelo Espírito Santo, dedicastes vossa vida aos pobres e sofredores, ensinai-nos a praticar a caridade e a bondade. Intercedei por nós junto a Deus Pai, para que alcancemos a graça de (pedir a graça). São Frei Galvão, rogai por nós. Amém.' },
  { id: 'santa-dulce', title: 'Santa Dulce dos Pobres', category: 'Saint', content: 'Senhor nosso Deus, lembrados de vossa filha, a santa Dulce dos Pobres, cujo coração ardia de amor por vós e pelos irmãos, mais necessitados, nós vos pedimos: dai-nos, por sua intercessão, a graça que tanto precisamos... (fazer o pedido). Renovai nossa fé e nossa caridade, e concedei-nos seguir o exemplo desta vossa serva, na dedicação aos pobres e doentes, no amor à Eucaristia e na devoção à Virgem Maria. Por Nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.' },
  { id: 'carlo-acutis', title: 'Beato Carlo Acutis', category: 'Saint', content: 'Ó Deus, nosso Pai, nós Vos agradecemos por nos terdes dado Carlo, modelo de vida para os jovens, e mensagem de amor para todos. Vós o fizestes apaixonar-se pelo Vosso Filho Jesus, fazendo da Eucaristia a sua "rodovia para o Céu". Vós lhe destes Maria como Mãe muito amada, e fizestes dele com o Rosário um cantor da sua ternura. Acolhei a sua oração por nós. Olhai sobretudo para os pobres, que ele amou e socorreu. Concedei-me também a mim, por sua intercessão, a graça de que preciso... E fazei com que a nossa alegria seja plena, canonizando Carlo, para glória do Vosso nome. Amém.' },
  { id: 'sao-rafael', title: 'São Rafael Arcanjo', category: 'Saint', content: 'Ficai conosco, ó Arcanjo Rafael, chamado "Medicina de Deus". Afastai para longe de nós as doenças do corpo, da alma e do espírito e trazei-nos saúde e toda a plenitude de vida prometida por Nosso Senhor Jesus Cristo. Amém.' },
  { id: 'sao-gabriel', title: 'São Gabriel Arcanjo', category: 'Saint', content: 'Ó poderoso Arcanjo São Gabriel, a vossa aparição à Virgem Maria de Nazaré trouxe ao mundo, que estava mergulhado nas trevas, luz. Assim falastes à Santíssima Virgem: "Ave, Maria, cheia de graça, o Senhor é convosco... o Filho que de ti nascer será chamado Filho do Altíssimo". São Gabriel, intercedei por nós perante a Virgem Santíssima, Mãe de Jesus, Salvador. Afastai do mundo as trevas da descrença e da idolatria. Fazei brilhar a luz da fé em todos os corações. Ajudai a juventude a imitar Nossa Senhora nas virtudes da pureza e da humildade. Dai força a todos os homens contra os vícios e o pecado. São Gabriel! Que a luz da vossa mensagem anuncie a Redenção do gênero humano, ilumine o meu caminho e oriente toda a humanidade rumo ao céu. São Gabriel, rogai por nós. Amém.' },
  // Other / Blessings
  { id: 'pequeno-exorcismo', title: 'Pequeno Exorcismo', category: 'Other', content: 'São Miguel Arcanjo, defendei-nos no combate... Levanta-se Deus e sejam dispersos os seus inimigos, e fujam de Sua presença aqueles que O odeiam... Eis a Cruz do Senhor, fugi potências inimigas! Venceu o Leão da tribo de Judá, a estirpe de Davi. Venha a nós, Senhor, a Vossa misericórdia, Como esperamos em Vós. Exorcizámos-te, quem quer que sejas, espírito imundo, poder satânico...' },
  { id: 'bencao-casa', title: 'Bênção da Casa', category: 'Other', content: 'A paz esteja nesta casa e com todos os que nela habitam. Senhor Jesus Cristo, que ordenastes aos vossos apóstolos que invocassem a paz sobre os habitantes das casas onde entrassem, santificai, nós vos pedimos, esta casa por meio da nossa oração confiante. Derramai sobre ela as vossas bênçãos e a vossa paz. Venha a ela a salvação, como veio à casa de Zaqueu, quando nela entrastes. Encarregai os vossos Anjos de a guardarem e de expulsarem dela todo o poder do inimigo. Concedei aos que nela habitam que vos agradem pelas suas obras de virtude, e assim mereçam, quando chegar a hora, ser acolhidos na vossa morada celeste. Vós que viveis e reinais com o Pai na unidade do Espírito Santo. Amém.' },
  { id: 'bencao-veiculo', title: 'Bênção do Veículo', category: 'Other', content: 'Senhor Deus, ouvi as nossas preces e abençoai este veículo com a vossa mão santa. Designai os vossos santos Anjos para que o acompanhem sempre e protejam de todos os perigos aqueles que nele viajarem. E, assim como, por meio do vosso diácono Filipe, destes a fé e a graça ao homem da Etiópia quando estava sentado no seu carro e lia a Sagrada Escritura, mostrai também agora aos vossos servos o caminho da salvação. A fim de que, ajudados pela vossa graça e compenetrados na prática das boas obras, mereçam, depois de todas as viagens e da peregrinação desta vida, gozar as alegrias eternas. Por Cristo, nosso Senhor. Amém.' },
  { id: 'bencao-objetos', title: 'Bênção de Objetos Religiosos', category: 'Other', content: 'A nossa proteção está no nome do Senhor. Que fez o céu e a terra. Oremos: Ó Deus, de quem procede toda a bênção e a quem todas as coisas bendizem, abri o vosso espírito de santidade sobre nós e sobre este objeto de devoção (terço, medalha, imagem...), a fim de que, quem dele usar com piedade e fé, percorra o caminho da salvação e vos sirva com generosidade. Por Cristo, nosso Senhor. Amém.' }
];
export const NOVENAS: Novena[] = [
  // Janeiro
  {
    id: 'novena-sao-sebastiao',
    title: 'Novena de São Sebastião',
    description: 'Protetor contra pestes, fomes e guerras.',
    duration: 9,
    month: 0,
    fixedDay: 11,
    fixedMonth: 0,
    startDateDisplay: '11 a 19/01',
    days: createGenericDays(9, 'Ó glorioso mártir São Sebastião, soldado fiel de Cristo, sede nosso defensor.')
  },
  {
    id: 'novena-paz',
    title: 'Novena da Paz',
    description: 'Pela paz no mundo e nas famílias.',
    duration: 9,
    month: 0,
    fixedDay: 1,
    fixedMonth: 0,
    startDateDisplay: 'Início de Ano',
    days: createGenericDays(9, 'Senhor, fazei de mim um instrumento de vossa paz.')
  },
  // Fevereiro
  {
    id: 'novena-lourdes',
    title: 'Novena a N. Sra. de Lourdes',
    description: 'Pela cura dos enfermos e conversão.',
    duration: 9,
    month: 1,
    fixedDay: 2,
    fixedMonth: 1,
    startDateDisplay: '02 a 10/02',
    days: createGenericDays(9, 'Ó Virgem Imaculada, Mãe de Misericórdia, saúde dos enfermos, refúgio dos pecadores.')
  },
  // Março
  {
    id: 'novena-sao-jose',
    title: 'Novena a São José',
    description: 'Pelas famílias, trabalho e Igreja.',
    duration: 9,
    month: 2,
    fixedDay: 10,
    fixedMonth: 2,
    startDateDisplay: '10 a 18/03',
    days: createGenericDays(9, 'Ó glorioso São José, a quem foi dado o poder de tornar possíveis as coisas humanamente impossíveis.')
  },
  // Abril (Datas móveis, aproximadas ou fixas se possível)
  {
    id: 'novena-divina-misericordia',
    title: 'Novena da Divina Misericórdia',
    description: 'Pelas almas e pecadores (Revelada a Sta. Faustina).',
    duration: 9,
    month: 3, // Variable, usually starts Good Friday
    startDateDisplay: 'Sexta-feira Santa',
    days: createGenericDays(9, 'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.')
  },
  {
    id: 'novena-santo-expedito',
    title: 'Novena a Santo Expedito',
    description: 'Pelas causas justas e urgentes.',
    duration: 9,
    month: 3,
    fixedDay: 10,
    fixedMonth: 3,
    startDateDisplay: '10 a 18/04',
    days: createGenericDays(9, 'Meu Santo Expedito das causas justas e urgentes, intercedei por mim junto a Nosso Senhor.')
  },
  // Maio
  {
    id: 'novena-pentecostes',
    title: 'Novena de Pentecostes',
    description: 'Ao Espírito Santo, pelos 7 dons.',
    duration: 9,
    month: 4,
    startDateDisplay: '10 dias antes de Pentecostes',
    days: createGenericDays(9, 'Vinde, Espírito Santo, e enviai do céu um raio de vossa luz.')
  },
  {
    id: 'novena-santa-rita',
    title: 'Novena a Santa Rita',
    description: 'Pelas causas impossíveis.',
    duration: 9,
    month: 4,
    fixedDay: 13,
    fixedMonth: 4,
    startDateDisplay: '13 a 21/05',
    days: createGenericDays(9, 'Ó poderosa e gloriosa Santa Rita, eis a vossos pés uma alma desamparada.')
  },
  // Junho
  {
    id: 'novena-sagrado-coracao',
    title: 'Novena ao Sagrado Coração',
    description: 'Reparação e consagração ao Coração de Jesus.',
    duration: 9,
    month: 5,
    startDateDisplay: 'Após Corpus Christi',
    days: createGenericDays(9, 'Jesus, manso e humilde de coração, fazei o nosso coração semelhante ao vosso.')
  },
  {
    id: 'novena-santo-antonio',
    title: 'Novena a Santo Antônio',
    description: 'O santo dos milagres.',
    duration: 13, // Trezena
    month: 5,
    fixedDay: 1,
    fixedMonth: 5,
    startDateDisplay: '01 a 13/06',
    days: createGenericDays(13, 'Lembrai-vos, ó grande Santo Antônio, que o erro e a morte fogem diante de vós.')
  },
  // Julho
  {
    id: 'novena-carmo',
    title: 'Novena a N. Sra. do Carmo',
    description: 'Pela proteção e uso do Escapulário.',
    duration: 9,
    month: 6,
    fixedDay: 7,
    fixedMonth: 6,
    startDateDisplay: '07 a 15/07',
    days: createGenericDays(9, 'Flor do Carmelo, videira florida, esplendor do céu.')
  },
  // Agosto
  {
    id: 'quaresma-miguel',
    title: 'Quaresma de São Miguel',
    description: '40 dias de oração e penitência.',
    duration: 40,
    month: 7, // August start
    fixedDay: 15,
    fixedMonth: 7,
    startDateDisplay: '15/08 a 29/09',
    days: createGenericDays(40, 'São Miguel Arcanjo, defendei-nos no combate.')
  },
  // Setembro
  {
    id: 'novena-sao-miguel',
    title: 'Novena a São Miguel',
    description: 'Para alcançar proteção e libertação.',
    duration: 9,
    month: 8,
    fixedDay: 20,
    fixedMonth: 8,
    startDateDisplay: '20 a 28/09',
    days: createGenericDays(9, 'Quem como Deus? Ninguém como Deus.')
  },
  {
    id: 'novena-padre-pio',
    title: 'Novena a São Padre Pio',
    description: 'Pelas necessidades espirituais.',
    duration: 9,
    month: 8,
    fixedDay: 14,
    fixedMonth: 8,
    startDateDisplay: '14 a 22/09',
    days: createGenericDays(9, 'Fica, Senhor, comigo, pois preciso da tua presença.')
  },
  // Outubro
  {
    id: 'novena-aparecida',
    title: 'Novena a N. Sra. Aparecida',
    description: 'Pelo Brasil e pelas famílias.',
    duration: 9,
    month: 9,
    fixedDay: 3,
    fixedMonth: 9,
    startDateDisplay: '03 a 11/10',
    days: createGenericDays(9, 'Ó incomparável Senhora da Conceição Aparecida.')
  },
  {
    id: 'novena-terezinha',
    title: 'Novena a Santa Teresinha',
    description: 'A Novena das Rosas.',
    duration: 9,
    month: 9,
    fixedDay: 22,
    fixedMonth: 8, // Starts late Sep
    startDateDisplay: '22 a 30/09',
    days: createGenericDays(9, 'Santa Teresinha do Menino Jesus, rogai por nós.')
  },
  // Novembro
  {
    id: 'novena-gracas',
    title: 'Novena a N. Sra. das Graças',
    description: 'Peça a intercessão da Virgem da Medalha Milagrosa.',
    duration: 9,
    month: 10,
    fixedDay: 18,
    fixedMonth: 10,
    startDateDisplay: '18 a 26/11',
    days: createGenericDays(9, 'Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós.')
  },
  {
    id: 'novena-almas',
    title: 'Novena pelos Fiéis Defuntos',
    description: 'Pelo sufrágio das almas do purgatório.',
    duration: 9,
    month: 10,
    fixedDay: 1,
    fixedMonth: 10,
    startDateDisplay: '01 a 09/11',
    days: createGenericDays(9, 'Dai-lhes, Senhor, o descanso eterno, e brilhe para elas a vossa luz.')
  },
  // Dezembro
  {
    id: 'novena-imaculada',
    title: 'Novena da Imaculada Conceição',
    description: 'Preparação para a grande solenidade mariana.',
    duration: 9,
    month: 11,
    fixedDay: 29,
    fixedMonth: 10, // Nov 29
    startDateDisplay: '29/11 a 07/12',
    days: createGenericDays(9, 'Ó Deus, que pela Imaculada Conceição da Virgem preparastes para o vosso Filho digna morada.')
  },
  {
    id: 'novena-natal',
    title: 'Novena de Natal',
    description: 'Preparação para o nascimento do Menino Jesus.',
    duration: 9,
    month: 11,
    fixedDay: 16,
    fixedMonth: 11,
    startDateDisplay: '16 a 24/12',
    days: createGenericDays(9, 'Vinde, Senhor Jesus!')
  },
  {
    id: 'novena-desatadora',
    title: 'Novena a N. Sra. Desatadora',
    description: 'Para desatar os nós da vida.',
    duration: 9,
    month: 99, // Special ID for "Anytime"
    startDateDisplay: 'Qualquer época',
    days: createGenericDays(9, 'Maria, Desatadora dos Nós, rogai por mim.')
  }
];
