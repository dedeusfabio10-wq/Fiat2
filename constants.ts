import { Prayer, Novena, Saint, Mystery, DevotionalRosary } from './types';

// Helper to create generic days
const createGenericDays = (duration: number, prayer?: string) => Array.from({ length: duration }, (_, i) => ({
    title: `Dia ${i + 1}`,
    reflection: 'Medite hoje sobre a virtude deste santo e seu amor a Deus. Entregue suas intenções com fé.',
    prayer: prayer || 'Rogai por nós, para que sejamos dignos das promessas de Cristo.'
}));

export const PRAYERS_TEXT = {
  creio: "Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra. E em Jesus Cristo, seu único Filho, nosso Senhor. Que foi concebido pelo poder do Espírito Santo. Nasceu da Virgem Maria. Padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado. Desceu à mansão dos mortos. Ressuscitou ao terceiro dia. Subiu aos céus, está sentado à direita de Deus Pai todo-poderoso. Donde há de vir a julgar os vivos e os mortos. Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos santos, na remissão dos pecados, na ressurreição da carne, na vida eterna. Amém.",
  paiNosso: "Pai Nosso que estais nos Céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade assim na terra como no Céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas assim como nós perdoamos a quem nos tem ofendido, e não nos deixeis cair em tentação, mas livrai-nos do Mal. Amém.",
  aveMaria: "Ave Maria, cheia de graça, o Senhor é convosco, bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pecadores, agora e na hora de nossa morte. Amém.",
  gloria: "Glória ao Pai e ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém.",
  ohJesus: "Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, levai as almas todas para o céu e socorrei principalmente as que mais precisarem.",
  salveRainha: "Salve, Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós bradamos os degredados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, esses vossos olhos misericordiosos a nós volvei, e depois deste desterro mostrai-nos Jesus, bendito fruto do vosso ventre, ó clemente, ó piedosa, ó doce sempre Virgem Maria."
};

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
  { id: 'desatadora', title: 'Nossa Senhora Desatadora dos Nós', category: 'Marian', content: 'Santa Maria, cheia da presença de Deus, durante os dias de tua vida aceitaste com toda a humildade a vontade do Pai, e o Maligno nunca foi capaz de te envolver com suas confusões. Junto a teu Filho, intercedeste por nossas dificuldades e, com toda simplicidade e paciência, nos deste exemplo de como desenredar o emaranhado de nossas vidas. E, ao permaneceres para sempre como Nossa Mãe, pões em ordem e fazes mais claros os laços que nos unem ao Senhor. Santa Maria, Mãe de Deus e nossa Mãe, tu que com coração materno desatas os nós que entorpecem nossa vida, te pedimos que recebas em tuas mãos (nome da pessoa) e que a livres das amarras e confusões com que o nosso inimigo a castiga. Por tua graça, por tua intercessão, com teu exemplo, livra-nos de todo o mal, Senhora nossa, e desata os nós que impedem de nos unirmos a Deus, para que, livres de toda confusão e erros, O louvemos em todas as coisas, coloquemos n’Ele nossos corações e possamos servi-Lo sempre em nossos irmãos. Amém.' },
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
    startDateDisplay: '11 a 19/01',
    days: createGenericDays(9, 'Ó glorioso mártir São Sebastião, soldado fiel de Cristo, sede nosso defensor.')
  },
  {
    id: 'novena-paz',
    title: 'Novena da Paz',
    description: 'Pela paz no mundo e nas famílias.',
    duration: 9,
    month: 0,
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
    startDateDisplay: '10 a 18/03',
    days: createGenericDays(9, 'Ó glorioso São José, a quem foi dado o poder de tornar possíveis as coisas humanamente impossíveis.')
  },
  // Abril
  {
    id: 'novena-divina-misericordia',
    title: 'Novena da Divina Misericórdia',
    description: 'Pelas almas e pecadores (Revelada a Sta. Faustina).',
    duration: 9,
    month: 3, // Variable, but associated with April/Easter
    startDateDisplay: 'Sexta-feira Santa',
    days: createGenericDays(9, 'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.')
  },
  {
    id: 'novena-santo-expedito',
    title: 'Novena a Santo Expedito',
    description: 'Pelas causas justas e urgentes.',
    duration: 9,
    month: 3,
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
    startDateDisplay: '20 a 28/09',
    days: createGenericDays(9, 'Quem como Deus? Ninguém como Deus.')
  },
  {
    id: 'novena-padre-pio',
    title: 'Novena a São Padre Pio',
    description: 'Pelas necessidades espirituais.',
    duration: 9,
    month: 8,
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
    startDateDisplay: '03 a 11/10',
    days: createGenericDays(9, 'Ó incomparável Senhora da Conceição Aparecida.')
  },
  {
    id: 'novena-terezinha',
    title: 'Novena a Santa Teresinha',
    description: 'A Novena das Rosas.',
    duration: 9,
    month: 9, 
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
    startDateDisplay: '18 a 26/11',
    days: createGenericDays(9, 'Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós.')
  },
  {
    id: 'novena-almas',
    title: 'Novena pelos Fiéis Defuntos',
    description: 'Pelo sufrágio das almas do purgatório.',
    duration: 9,
    month: 10,
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
    startDateDisplay: '29/11 a 07/12',
    days: createGenericDays(9, 'Ó Deus, que pela Imaculada Conceição da Virgem preparastes para o vosso Filho digna morada.')
  },
  {
    id: 'novena-natal',
    title: 'Novena de Natal',
    description: 'Preparação para o nascimento do Menino Jesus.',
    duration: 9,
    month: 11,
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

export const SAINTS: Saint[] = [
  { id: 'sao-sebastiao', name: 'São Sebastião', title: 'Defensor da Igreja', date: '20 de Janeiro', bio: 'Soldado romano martirizado por flechas e depois açoitado. Protetor contra pestes, fomes e guerras.', prayer: 'Glorioso mártir São Sebastião, soldado de Cristo e exemplo de cristão, hoje viemos pedir a vossa intercessão. Vós que sobrevivestes às flechas e permanecestes fiel a Jesus até o fim, protegei-nos contra as pestes, as doenças e as guerras. Amém.' },
  { id: 'sao-longuinho', name: 'São Longuinho', title: 'O Centurião', date: '15 de Março', bio: 'O soldado que perfurou o lado de Jesus com a lança e, ao ser tocado pelo Sangue e Água, converteu-se.', prayer: 'Ó São Longuinho, que aos pés da cruz tocastes o coração de Jesus, ajudai-nos a encontrar o caminho da verdade e a sermos fiéis até o fim. Amém.' },
  { id: 'sao-jose', name: 'São José', title: 'Patrono da Igreja Universal', date: '19 de Março', bio: 'Esposo da Virgem Maria e pai adotivo de Jesus. Protetor da Sagrada Família e modelo de pai e trabalhador.', prayer: 'A vós, São José, recorremos em nossa tribulação e, depois de ter implorado o auxílio de vossa santíssima Esposa, cheios de confiança solicitamos também o vosso patrocínio. Amém.' },
  { id: 'santo-expedito', name: 'Santo Expedito', title: 'Santo das Causas Urgentes', date: '19 de Abril', bio: 'Comandante da legião romana, converteu-se e foi martirizado. É o santo da "hora undécima", que não adia a conversão.', prayer: 'Meu Santo Expedito das causas justas e urgentes. Interceda por mim junto ao Nosso Senhor Jesus Cristo. Amém.' },
  { id: 'sao-jorge', name: 'São Jorge', title: 'O Grande Mártir', date: '23 de Abril', bio: 'Soldado romano que enfrentou o dragão do mal e o imperador perseguidor para defender a fé cristã.', prayer: 'Eu andarei vestido e armado com as armas de São Jorge para que meus inimigos, tendo pés não me alcancem, tendo mãos não me peguem. Amém.' },
  { id: 'santa-rita', name: 'Santa Rita de Cássia', title: 'Santa dos Impossíveis', date: '22 de Maio', bio: 'Esposa, mãe, viúva e monja agostiniana. Recebeu em sua testa o estigma de um espinho da coroa de Jesus.', prayer: 'Ó Poderosa e gloriosa Santa Rita de Cássia, eis aos vossos pés uma alma desamparada que, necessitando de auxílio, a vós recorre. Amém.' },
  { id: 'santo-antonio', name: 'Santo Antônio', title: 'Doutora Evangélico', date: '13 de Junho', bio: 'Frade franciscano, grande pregador e taumaturgo. Conhecido como o santo que encontra coisas perdidas e casamenteiro.', prayer: 'Lembrai-vos, ó grande Santo Antônio, que o erro, a morte, a calamidade, o demônio, a lepra, fogem à vossa invocação. Amém.' },
  { id: 'sao-bento', name: 'São Bento', title: 'Pai do Monaquismo Ocidental', date: '11 de Julho', bio: 'Fundador da Ordem Beneditina e criador da Regra "Ora et Labora". Sua medalha é poderoso sacramental contra o mal.', prayer: 'A Cruz Sagrada seja a minha luz, não seja o dragão o meu guia. Retira-te, satanás! Amém.' },
  { id: 'sao-charbel', name: 'São Charbel', title: 'Eremita do Líbano', date: '24 de Julho', bio: 'Monge maronita que viveu em profundo silêncio e oração. Grande taumaturgo, realizou inúmeros milagres.', prayer: 'Deus, infinitamente Santo e Glorificado em Vossos Santos, concedei-nos a graça de interceder por nós. Amém.' },
  { id: 'sao-cristovao', name: 'São Cristóvão', title: 'Padroeiro dos Motoristas', date: '25 de Julho', bio: 'Mártir que, segundo a tradição, carregou o Menino Jesus nos ombros ao atravessar um rio.', prayer: 'Dai-me, Senhor, firmeza e vigilância no volante, para que eu chegue sem sinistros ao meu destino. Amém.' },
  { id: 'santa-filomena', name: 'Santa Filomena', title: 'Filha da Luz', date: '11 de Agosto', bio: 'Jovem mártir dos primeiros séculos, cujas relíquias foram descobertas nas catacumbas. Grande taumaturga.', prayer: 'Ó Santa Filomena, Virgem e Mártir, rogai por nós para que, pela vossa poderosa intercessão, alcancemos a pureza de coração e a fortaleza na fé. Amém.' },
  { id: 'santa-dulce', name: 'Santa Dulce dos Pobres', title: 'O Anjo Bom da Bahia', date: '13 de Agosto', bio: 'Freira brasileira que dedicou a vida inteira a acolher os doentes e miseráveis nas ruas de Salvador.', prayer: 'Senhor nosso Deus, lembrados de vossa filha, a santa Dulce dos Pobres, dai-nos, por sua intercessão, a graça que tanto precisamos. Amém.' },
  { id: 'padre-pio', name: 'São Padre Pio', title: 'O Santo dos Estigmas', date: '23 de Setembro', bio: 'Frade capuchinho que carregou os estigmas de Cristo por 50 anos. Grande confessor e intercessor.', prayer: 'Fica, Senhor, comigo, pois preciso da tua presença para não te esquecer. Amém.' },
  { id: 'santa-teresinha', name: 'Santa Teresinha', title: 'Doutora da Igreja', date: '01 de Outubro', bio: 'A Santa da Pequena Via e padroeira das missões. Ensinou que o caminho para o céu é feito de pequenos atos de amor.', prayer: 'Ó Santa Teresinha do Menino Jesus, mandai sobre mim uma chuva de rosas. Amém.' },
  { id: 'sao-francisco', name: 'São Francisco de Assis', title: 'O Pobre de Assis', date: '04 de Outubro', bio: 'Fundador da Ordem Franciscana, amante da pobreza e da natureza. Reconstruiu a Igreja de Cristo com humildade.', prayer: 'Senhor, fazei de mim um instrumento de vossa paz. Onde houver ódio, que eu leve o amor. Amém.' },
  { id: 'santa-faustina', name: 'Santa Faustina', title: 'Apóstola da Divina Misericórdia', date: '05 de Outubro', bio: 'Freira polonesa a quem Jesus revelou a profundidade de sua Misericórdia. Escreveu o famoso Diário.', prayer: 'Ó Jesus, que fizestes de Santa Faustina uma grande devota da Vossa infinita misericórdia, dignai-vos conceder-me a graça que Vos peço. Amém.' },
  { id: 'nossa-senhora-aparecida', name: 'N. Sra. Aparecida', title: 'Padroeira do Brasil', date: '12 de Outubro', bio: 'A imagem encontrada no Rio Paraíba do Sul por pescadores. Realizou milagres e uniu um povo em devoção.', prayer: 'Ó incomparável Senhora da Conceição Aparecida, mãe de Deus e minha mãe, rainha dos anjos, advogada dos pecadores, refúgio e consolação dos aflitos e atribulados. Amém.' },
  { id: 'carlo-acutis', name: 'Beato Carlo Acutis', title: 'Apóstolo da Internet', date: '12 de Outubro', bio: 'Jovem que usou a tecnologia para evangelizar. Devoto da Eucaristia, chamava-a de "minha rodovia para o céu".', prayer: 'Ó Deus, nosso Pai, nós Vos agradecemos por nos terdes dado Carlo, modelo de vida para os jovens. Amém.' },
  { id: 'santa-edwiges', name: 'Santa Edwiges', title: 'Protetora dos Endividados', date: '16 de Outubro', bio: 'Duquesa que usava sua fortuna para pagar dívidas de presos e construir hospitais. Modelo de caridade.', prayer: 'Ó Santa Edwiges, vós que na terra fostes o amparo dos pobres, a ajuda dos desvalidos e o socorro dos endividados. Amém.' },
  { id: 'sao-geraldo', name: 'São Geraldo Majella', title: 'Protetor das Grávidas', date: '16 de Outubro', bio: 'Irmão redentorista, humilde e obediente. Invocado pelas mães para um bom parto e proteção dos bebês.', prayer: 'Ó São Geraldo, patrono das mães e das crianças, protegei os nascituros e guiai as gestantes para um parto feliz. Amém.' },
  { id: 'joao-paulo-ii', name: 'São João Paulo II', title: 'O Papa da Família', date: '22 de Outubro', bio: 'Papa peregrino que mudou a história do século XX. Devoto de Maria ("Totus Tuus") e criador da JMJ.', prayer: 'Ó Trindade Santa, nós Vos agradecemos por terdes dado à Igreja o Papa João Paulo II. Amém.' },
  { id: 'frei-galvao', name: 'São Frei Galvão', title: 'Primeiro Santo Brasileiro', date: '25 de Outubro', bio: 'Frade franciscano conhecido por seus dons de cura e pelas pílulas de fé que distribuía aos doentes.', prayer: 'São Frei Galvão, Deus de amor, fonte de todas as luzes, derramai vossas bênçãos sobre nós. Amém.' },
  { id: 'sao-judas', name: 'São Judas Tadeu', title: 'Patrono das Causas Impossíveis', date: '28 de Outubro', bio: 'Apóstolo e mártir, primo de Jesus. É invocado com grande fé nos casos desesperados e negócios sem remédio.', prayer: 'São Judas Tadeu, glorioso Apóstolo, fiel servo e amigo de Jesus, rogai por mim que sou tão miserável. Amém.' },
  { id: 'desatadora', name: 'N. Sra. Desatadora dos Nós', title: 'Mãe que Resolve Problemas', date: '08 de Dezembro', bio: 'Título mariano que invoca Maria como aquela que desata os nós dos problemas matrimoniais e da vida.', prayer: 'Virgem Maria, Mãe do belo amor, Mãe que jamais deixa de vir em socorro a um filho aflito. Desatai os nós de minha vida. Amém.' },
  { id: 'santa-luzia', name: 'Santa Luzia', title: 'Protetora dos Olhos', date: '13 de Dezembro', bio: 'Virgem e mártir siciliana. Teve os olhos arrancados, mas Deus os restituiu. Invocada para cura da visão.', prayer: 'Ó Santa Luzia, que preferistes deixar que os vossos olhos fossem vazados e arrancados antes de negar a fé e conspurcar vossa alma; e Deus, com um milagre extraordinário, vos devolveu outros dois olhos sãos e perfeitos para recompensar vossa virtude e vossa fé, e vos constituiu protetora contra as doenças dos olhos, eu recorro a vós para que protejais minhas vistas e cureis a doença dos meus olhos. Ó Santa Luzia, conservai a luz dos meus olhos para que eu possa ver as belezas da criação. Conservai também os olhos de minha alma, a fé, pela qual eu possa compreender os ensinamentos do vosso Deus, viver segundo os seus preceitos e chegar um dia onde vós estais, em companhia dos anjos e santos. Santa Luzia, protegei meus olhos e conservai minha fé. Amém.' },
  { id: 'sao-miguel', name: 'São Miguel', title: 'Arcanjo', date: '29 de Setembro', bio: 'Príncipe da Milícia Celeste.', prayer: 'São Miguel Arcanjo, defendei-nos no combate.' },
  { id: 'sao-rafael', name: 'São Rafael', title: 'Arcanjo', date: '29 de Setembro', bio: 'Medicina de Deus.', prayer: 'Ficai conosco, ó Arcanjo Rafael.' },
  { id: 'sao-gabriel', name: 'São Gabriel', title: 'Arcanjo', date: '29 de Setembro', bio: 'Mensageiro de Deus.', prayer: 'Ó poderoso Arcanjo São Gabriel.' }
];

export const THE_APOSTLES = [
  { id: 'pedro', name: 'São Pedro', title: 'Príncipe dos Apóstolos', symbol: 'Chaves', desc: 'O pescador da Galileia a quem Cristo confiou as Chaves do Céu. Primeiro Papa. Morreu crucificado de cabeça para baixo em Roma.' },
  { id: 'andre', name: 'São André', title: 'O Primeiro Chamado', symbol: 'Cruz em X', desc: 'Irmão de Pedro e o primeiro a seguir Jesus. Evangelizou a Grécia e morreu em uma cruz em forma de X.' },
  { id: 'tiago-maior', name: 'São Tiago Maior', title: 'Filho do Trovão', symbol: 'Concha', desc: 'Irmão de João. Primeiro apóstolo a ser martirizado (decapitado por Herodes). Padroeiro dos peregrinos (Caminho de Santiago).' },
  { id: 'joao', name: 'São João', title: 'O Discípulo Amado', symbol: 'Águia', desc: 'O mais jovem, autor do 4º Evangelho e do Apocalipse. Único apóstolo que não morreu martirizado, cuidou da Virgem Maria.' },
  { id: 'filipe', name: 'São Filipe', title: 'Apóstolo Zeloso', symbol: 'Cruz e Pães', desc: 'Natural de Betsaida. Foi quem pediu a Jesus: "Senhor, mostra-nos o Pai". Evangelizou a Frígia.' },
  { id: 'bartolomeu', name: 'São Bartolomeu', title: 'Israelita sem Falsidade', symbol: 'Faca', desc: 'Também chamado Natanael. Pregou na Armênia e Índia. Foi esfolado vivo por amor a Cristo.' },
  { id: 'tome', name: 'São Tomé', title: 'O Didimo', symbol: 'Lança', desc: 'Famoso por duvidar da Ressurreição até tocar nas chagas. Levou o Evangelho até a Índia, onde foi martirizado com uma lança.' },
  { id: 'mateus', name: 'São Mateus', title: 'O Evangelista', symbol: 'Anjo/Homem', desc: 'Era cobrador de impostos (Levi) antes de seguir Jesus. Escreveu o primeiro Evangelho para os judeus.' },
  { id: 'tiago-menor', name: 'São Tiago Menor', title: 'Filho de Alfeu', symbol: 'Maça de Pisoeiro', desc: 'Primo de Jesus e primeiro Bispo de Jerusalém. Escreveu a Epístola de Tiago. Foi apedrejado e morto a pauladas.' },
  { id: 'judas-tadeu', name: 'São Judas Tadeu', title: 'Santo das Causas Impossíveis', symbol: 'Machado', desc: 'Irmão de Tiago Menor. Pregou na Pérsia e Judeia. É invocado nas causas desesperadas. Morto a machadadas.' },
  { id: 'simao', name: 'São Simão', title: 'O Zelote', symbol: 'Serrote', desc: 'Pertencia ao partido dos Zelotes antes de Cristo. Pregou no Egito e na Pérsia junto com Judas Tadeu. Foi serrado ao meio.' },
  { id: 'matias', name: 'São Matias', title: 'O Escolhido', symbol: 'Machadinha', desc: 'Eleito pelos apóstolos para ocupar o lugar de Judas Iscariotes após a Ascensão. Pregou na Etiópia.' },
  { id: 'paulo', name: 'São Paulo', title: 'Apóstolo dos Gentios', symbol: 'Espada', desc: 'Perseguidor que se tornou o maior missionário da história. Escreveu grande parte do Novo Testamento. Decapitado em Roma.' }
];

export const APOSTOLIC_LINE = [
  { id: 1, name: "São Pedro", period: "32-67", title: "Príncipe dos Apóstolos", highlight: true, bio: "O primeiro Papa, a quem Cristo confiou as Chaves do Reino dos Céus. Mártir em Roma." },
  { id: 2, name: "São Lino", period: "67-76", title: "Mártir", bio: "Sucessor imediato de Pedro, mencionado por São Paulo em suas cartas." },
  { id: 3, name: "São Anacleto", period: "76-88", title: "Mártir", bio: "Também chamado de Cleto, ordenou 25 sacerdotes em Roma e construiu o túmulo de São Pedro." },
  { id: 4, name: "São Clemente I", period: "88-97", title: "Padre Apostólico", bio: "Autor de uma famosa carta aos Coríntios, restabelecendo a autoridade apostólica." },
  { id: 32, name: "São Melquíades", period: "311-314", title: "Fim da Perseguição", bio: "Papa durante o Édito de Milão, que deu liberdade aos cristãos." },
  { id: 45, name: "São Leão I", period: "440-461", title: "Magno e Doutor", highlight: true, bio: "Defendeu a fé no Concílio de Calcedônia e convenceu Átila, o Huno, a não invadir Roma." },
  { id: 64, name: "São Gregório I", period: "590-604", title: "Magno", bio: "Reformou a liturgia (Canto Gregoriano), enviou missionários à Inglaterra e foi grande Doutor." },
  { id: 254, name: "Pio IX", period: "1846-1878", title: "Concílio Vaticano I", highlight: true, bio: "Proclamou o Dogma da Imaculada Conceição e convocou o Vaticano I." },
  { id: 256, name: "Leão XIII", period: "1878-1903", title: "Rerum Novarum", highlight: true, bio: "O Papa dos trabalhadores. Escreveu a primeira grande encíclica social e promoveu o Rosário." },
  { id: 257, name: "São Pio X", period: "1903-1914", title: "Eucaristia", bio: "Permitiu a comunhão para crianças e combateu o modernismo. 'Restaurar tudo em Cristo'." },
  { id: 260, name: "Pio XII", period: "1939-1958", title: "Pastor Angelicus", bio: "Guiou a Igreja durante a II Guerra Mundial, salvando judeus e definindo o Dogma da Assunção." },
  { id: 261, name: "São João XXIII", period: "1958-1963", title: "O Papa Bom", bio: "Convocou o Concílio Vaticano II para 'abrir as janelas da Igreja' ao Espírito Santo." },
  { id: 262, name: "São Paulo VI", period: "1963-1978", title: "Vaticano II", bio: "Concluiu o Concílio, defendeu a vida na 'Humanae Vitae' e foi o primeiro Papa peregrino moderno." },
  { id: 263, name: "João Paulo I", period: "1978", title: "O Papa do Sorriso", bio: "Reinou por apenas 33 dias, conquistando o mundo com sua humildade e alegria." },
  { id: 264, name: "São João Paulo II", period: "1978-2005", title: "Magno", highlight: true, bio: "Um dos maiores pontificados da história. Criou a JMJ, a Teologia do Corpo e viajou o mundo." },
  { id: 265, name: "Bento XVI", period: "2005-2013", title: "Doutor da Fé", bio: "Grande teólogo que combateu o relativismo e renunciou humildemente ao pontificado." },
  { id: 266, name: "Francisco", period: "2013-2025", title: "O Papa da Misericórdia", bio: "Primeiro Papa latino-americano e jesuíta. Focou seu pontificado nos pobres, na misericórdia e no cuidado com a Casa Comum." },
  { id: 267, name: "Leão XIV", period: "2025-At", title: "O Papa Agostiniano", highlight: true, bio: "Robert Francis Prevost. Primeiro Papa Agostiniano e nascido na América do Norte. Escolheu o nome em homenagem a Leão XIII para enfrentar os desafios da Quarta Revolução Industrial e da Inteligência Artificial." }
];

export const CHURCH_HISTORY = [
  {
    id: 'fundacao',
    title: 'A Fundação e a Igreja Primitiva',
    period: '33 - 313 d.C.',
    desc: 'Do Pentecostes ao fim das perseguições. O sangue dos mártires foi a semente de novos cristãos.',
    events: [
      'Pentecostes: O nascimento da Igreja.',
      'Conversão de São Paulo e missões aos gentios.',
      'Mártires: Pedro, Paulo, Inácio de Antioquia.',
      'Perseguições Romanas (Nero, Diocleciano).',
      'Vida nas Catacumbas e a Eucaristia secreta.'
    ]
  },
  {
    id: 'imperial',
    title: 'A Igreja Imperial e os Concílios',
    period: '313 - 476 d.C.',
    desc: 'A liberdade religiosa e a definição dos dogmas contra as heresias.',
    events: [
      '313: Édito de Milão (Constantino dá liberdade de culto).',
      '325: Concílio de Niceia (Credo Niceno contra Ario).',
      'Grandes Doutores: Santo Agostinho, São Jerônimo, Santo Ambrósio.',
      'Definição do Cânon Bíblico.'
    ]
  },
  {
    id: 'medievel',
    title: 'Idade Média e Evangelização',
    period: '476 - 1517 d.C.',
    desc: 'A construção da Cristandade, o monaquismo e as universidades.',
    events: [
      'São Bento e o Monaquismo (Preservação da cultura).',
      'Conversão dos Bárbaros e evangelização da Europa.',
      'O Grande Cisma do Oriente (1054).',
      'Surgimento das Universidades e Catedrais Góticas.',
      'São Francisco, São Domingos e a Escolástica (São Tomás).'
    ]
  },
  {
    id: 'moderna',
    title: 'Reforma e Missões',
    period: '1517 - 1789 d.C.',
    desc: 'A crise da Reforma Protestante, a resposta de Trento e a expansão para o Novo Mundo.',
    events: [
      'Reforma Protestante (Lutero, Calvino).',
      'Concílio de Trento e a Contrarreforma.',
      'Fundação dos Jesuítas e Místicos (Teresa d\'Ávila).',
      'Evangelização das Américas e Ásia (São Francisco Xavier).',
      'Nossa Senhora de Guadalupe.'
    ]
  },
  {
    id: 'contemporanea',
    title: 'Era Contemporânea',
    period: '1789 - Hoje',
    desc: 'A Igreja frente ao mundo moderno, guerras mundiais e a nova evangelização.',
    events: [
      'Revolução Francesa e secularização.',
      'Concílio Vaticano I (Infalibilidade Papal).',
      'Doutrina Social da Igreja (Rerum Novarum).',
      'Concílio Vaticano II (Renovação e Diálogo).',
      'São João Paulo II e a queda do Comunismo.'
    ]
  }
];

export const CHURCH_HIERARCHY = [
  {
    id: 'papa',
    role: 'O Papa',
    title: 'Sucessor de Pedro',
    desc: 'É o Bispo de Roma, Vigário de Cristo e Pastor da Igreja Universal. Ele possui a autoridade suprema, plena e imediata sobre toda a Igreja. Sua missão é confirmar os irmãos na fé e garantir a unidade.',
    symbol: 'Chaves do Reino',
    color: 'text-white'
  },
  {
    id: 'cardeais',
    role: 'Cardeais',
    title: 'Príncipes da Igreja',
    desc: 'São os principais conselheiros do Papa e formam o Colégio Cardinalício. Sua função mais notável é eleger o novo Pontífice no Conclave. Vestem vermelho simbolizando a disposição de derramar o sangue pela fé.',
    symbol: 'Barrete Vermelho',
    color: 'text-red-500'
  },
  {
    id: 'bispos',
    role: 'Bispos',
    title: 'Sucessores dos Apóstolos',
    desc: 'Possuem a plenitude do sacramento da Ordem. São responsáveis por ensinar, santificar e governar uma porção do povo de Deus (Diocese).',
    symbol: 'Báculo e Mitra',
    color: 'text-purple-400'
  },
  {
    id: 'padres',
    role: 'Padres (Presbíteros)',
    title: 'Colaboradores dos Bispos',
    desc: 'Recebem o segundo grau da Ordem. Sua missão principal é celebrar a Eucaristia, perdoar os pecados e pastorear as paróquias em nome do Bispo.',
    symbol: 'Estola',
    color: 'text-fiat-gold'
  },
  {
    id: 'diaconos',
    role: 'Diáconos',
    title: 'Ministros do Serviço',
    desc: 'Recebem o primeiro grau da Ordem para o serviço da caridade, da Palavra e da liturgia. Podem batizar e assistir matrimônios, mas não celebram missa nem confessam.',
    symbol: 'Dalmática',
    color: 'text-gray-300'
  },
  {
    id: 'leigos',
    role: 'Leigos',
    title: 'Povo Santo de Deus',
    desc: 'Todos os fiéis batizados. Sua missão é santificar o mundo "de dentro", levando Cristo para a família, o trabalho, a política e a cultura.',
    symbol: 'Mundo',
    color: 'text-green-400'
  }
];

export const CHURCH_MINISTRIES = [
  {
    id: 'eucaristia',
    title: 'Ministros Extraordinários da Sagrada Comunhão',
    desc: 'Leigos investidos da função de levar a Santa Comunhão aos enfermos, idosos que não podem ir à Missa, e auxiliar o sacerdote na distribuição do Corpo de Cristo durante as celebrações quando há muitos fiéis. É um serviço de profundo amor e reverência à Eucaristia.',
    icon: 'Heart'
  },
  {
    id: 'coroinhas',
    title: 'Coroinhas e Cerimoniários',
    desc: 'Crianças e jovens que servem o altar com dignidade e piedade. Auxiliam o sacerdote nas funções litúrgicas (livro, cálice, turíbulo), garantindo a beleza e a ordem da celebração. Aprendem desde cedo a amar a Casa de Deus.',
    icon: 'Bell'
  },
  {
    id: 'liturgia',
    title: 'Equipe de Liturgia e Leitores',
    desc: 'Responsáveis por proclamar a Palavra de Deus (Leituras e Preces) com clareza e unção. A equipe também prepara o ambiente sagrado, escolhe os textos e garante que tudo esteja conforme as normas da Igreja.',
    icon: 'BookOpen'
  },
  {
    id: 'musica',
    title: 'Ministério de Música e Salmistas',
    desc: 'A música sacra não é um "show", mas oração cantada. Sua função é elevar a alma dos fiéis a Deus, ajudar na participação ativa e criar um ambiente de mistério e beleza. O salmista entoa o Salmo Responsorial do ambão.',
    icon: 'Music'
  },
  {
    id: 'acolhida',
    title: 'Pastoral da Acolhida',
    desc: 'A "face" da paróquia. Recebem os fiéis na porta da igreja com alegria, entregam os folhetos, ajudam na organização dos lugares e garantem que todos se sintam bem-vindos na casa do Pai.',
    icon: 'Users'
  },
  {
    id: 'sacristia',
    title: 'Sacristão',
    desc: 'O guardião dos tesouros da igreja. Cuida dos paramentos, cálices, hóstias, vinho, velas e limpeza do presbitério. Prepara tudo silenciosamente para que a Missa aconteça com perfeição.',
    icon: 'Key'
  }
];

export const MARIAN_DOGMAS = [
  {
    id: 'mae-de-deus',
    title: 'Maternidade Divina (Theotokos)',
    desc: 'O primeiro e mais fundamental dogma. Maria é verdadeiramente Mãe de Deus, pois Jesus é Deus e Homem verdadeiro em uma só pessoa. Ela não gerou a divindade, mas gerou a pessoa humana do Verbo que é inseparável de sua natureza divina.',
    icon: 'Crown'
  },
  {
    id: 'imaculada',
    title: 'Imaculada Conceição',
    desc: 'Proclamado por Pio IX em 1854. Por graça singular de Deus e em previsão dos méritos de Cristo, Maria foi preservada de toda mancha do pecado original desde o primeiro instante de sua concepção. Ela é a "Cheia de Graça".',
    icon: 'Sparkles'
  },
  {
    id: 'virgindade',
    title: 'Virgindade Perpétua',
    desc: 'Maria permaneceu Virgem antes, durante e após o parto. Jesus é seu único filho biológico. Este dogma é o sinal de sua total consagração a Deus e de que Jesus é Filho unicamente do Pai Eterno.',
    icon: 'Heart'
  },
  {
    id: 'assuncao',
    title: 'Assunção Gloriosa',
    desc: 'Proclamado por Pio XII em 1950. Ao terminar o curso de sua vida terrestre, Maria foi elevada em corpo e alma à glória celeste, onde participa da ressurreição de seu Filho e antecipa a ressurreição de todos os cristãos.',
    icon: 'Star'
  }
];

export const HOLY_MASS = {
  intro: {
    title: "O que é a Missa?",
    text: "A Santa Missa não é apenas uma lembrança ou uma reunião fraterna. É a renovação incruenta (sem derramamento de sangue visível) do Sacrifício do Calvário. Naquele altar, o mesmo Cristo que morreu na Cruz se faz presente. O tempo para e somos transportados para o momento da Redenção."
  },
  spiritual: {
    title: "O Mundo Invisível",
    desc: "O que nossos olhos não veem, mas a fé revela:",
    points: [
      "O Céu se abre sobre o altar.",
      "Miríades de anjos cercam o sacerdote e adoram o Cordeiro.",
      "As almas do Purgatório são aliviadas pelo Sangue de Cristo.",
      "A Santíssima Virgem e os Santos se unem a nós na adoração.",
      "Estamos no pé da Cruz, recebendo as graças diretas do Coração de Jesus."
    ]
  },
  rites: [
    {
      part: "Ritos Iniciais",
      desc: "Preparação e Purificação",
      actions: [
        { name: "Entrada e Sinal da Cruz", meaning: "Entramos na presença da Trindade." },
        { name: "Ato Penitencial", meaning: "Reconhecemos nossa miséria para receber a misericórdia (Kyrie Eleison)." },
        { name: "Glória", meaning: "Louvor à Trindade (omitido no Advento e Quaresma)." },
        { name: "Oração do Dia (Coleta)", meaning: "O padre recolhe as intenções de toda a Igreja." }
      ]
    },
    {
      part: "Liturgia da Palavra",
      desc: "Deus fala ao seu povo",
      actions: [
        { name: "Leituras e Salmo", meaning: "Ouvimos as profecias e os apóstolos (Sentados)." },
        { name: "Evangelho", meaning: "O próprio Cristo fala. Ficamos em pé em sinal de prontidão e respeito." },
        { name: "Homilia", meaning: "Explicação das escrituras." },
        { name: "Credo e Preces", meaning: "Professamos nossa fé e rezamos pelo mundo." }
      ]
    },
    {
      part: "Liturgia Eucarística",
      desc: "O Sacrifício e a Ceia",
      highlight: true,
      actions: [
        { name: "Ofertório", meaning: "Oferecemos o pão, o vinho e nossas vidas." },
        { name: "Consagração", meaning: "O MOMENTO SAGRADO. O pão e vinho se tornam Corpo e Sangue de Cristo (Transubstanciação). Devemos ajoelhar em adoração profunda." },
        { name: "Pai Nosso e Paz", meaning: "Preparação para a comunhão fraterna." },
        { name: "Cordeiro de Deus", meaning: "Jesus, a vítima inocente que tira o pecado do mundo." },
        { name: "Comunhão", meaning: "Recebemos o próprio Deus em nossa alma." }
      ]
    },
    {
      part: "Ritos Finais",
      desc: "Envio em Missão",
      actions: [
        { name: "Bênção Final", meaning: "A graça de Deus para a semana." },
        { name: "Ide em paz", meaning: "Somos enviados para viver o Evangelho no mundo (Ite, missa est)." }
      ]
    }
  ],
  etiquette: [
    "Jejum Eucarístico: Não comer nada 1h antes da comunhão (exceto água e remédios).",
    "Vestimenta: Usar roupas modestas e dignas do Rei dos Reis.",
    "Silêncio: Desligar o celular e evitar conversas na nave da Igreja.",
    "Genuflexão: Ao entrar, dobrar o joelho direito até o chão voltado para o Sacrário (onde Jesus está).",
    "Ação de Graças: Após a missa, permanecer uns minutos agradecendo a Jesus pela comunhão."
  ]
};

export const MYSTERIES: Mystery[] = [
  {
    id: 'gozosos',
    name: 'Mistérios Gozosos',
    days: [1, 6], // Seg, Sab
    mysteries: [
      { title: 'Anunciação', scripture: 'Eis aqui a serva do Senhor.', meditation: 'Humildade de Maria.' },
      { title: 'Visitação', scripture: 'Minha alma engrandece o Senhor.', meditation: 'Caridade fraterna.' },
      { title: 'Nascimento', scripture: 'Nasceu-vos hoje um Salvador.', meditation: 'Pobreza de espírito.' },
      { title: 'Apresentação', scripture: 'Luz para iluminar as nações.', meditation: 'Obediência.' },
      { title: 'Perda e Encontro', scripture: 'Eu devia estar na casa de meu Pai.', meditation: 'Alegria de encontrar Jesus.' }
    ]
  },
  {
    id: 'dolorosos',
    name: 'Mistérios Dolorosos',
    days: [2, 5], // Ter, Sex
    mysteries: [
      { title: 'Agonia no Horto', scripture: 'Pai, se queres, afasta de mim este cálice.', meditation: 'Contrição pelos pecados.' },
      { title: 'Flagelação', scripture: 'Foi ferido por nossas iniquidades.', meditation: 'Mortificação dos sentidos.' },
      { title: 'Coroação de Espinhos', scripture: 'Salve, Rei dos Judeus.', meditation: 'Desapego das honras.' },
      { title: 'Caminho da Cruz', scripture: 'Tomou a cruz e seguiu.', meditation: 'Paciência nas tribulações.' },
      { title: 'Morte na Cruz', scripture: 'Tudo está consumado.', meditation: 'Amor a Deus e salvação das almas.' }
    ]
  },
  {
    id: 'gloriosos',
    name: 'Mistérios Gloriosos',
    days: [0, 3], // Dom, Qua
    mysteries: [
      { title: 'Ressurreição', scripture: 'Não está aqui, ressuscitou.', meditation: 'A fé.' },
      { title: 'Ascensão', scripture: 'Subiu aos céus.', meditation: 'A esperança.' },
      { title: 'Vinda do Espírito Santo', scripture: 'Ficaram cheios do Espírito Santo.', meditation: 'Amor a Deus.' },
      { title: 'Assunção de Maria', scripture: 'Foi elevada aos céus.', meditation: 'Graça de uma boa morte.' },
      { title: 'Coroação de Maria', scripture: 'Apareceu no céu um grande sinal.', meditation: 'Confiança em Maria.' }
    ]
  },
  {
    id: 'luminosos',
    name: 'Mistérios Luminosos',
    days: [4], // Qui
    mysteries: [
      { title: 'Batismo', scripture: 'Este é o meu Filho amado.', meditation: 'Filiação divina.' },
      { title: 'Bodas de Caná', scripture: 'Fazei tudo o que ele vos disser.', meditation: 'Intercessão de Maria.' },
      { title: 'Anúncio do Reino', scripture: 'Convertei-vos e crede.', meditation: 'Conversão.' },
      { title: 'Transfiguração', scripture: 'O seu rosto brilhou como o sol.', meditation: 'Contemplação.' },
      { title: 'Eucaristia', scripture: 'Isto é o meu corpo.', meditation: 'Adoração Eucarística.' }
    ]
  }
];

export const DEVOTIONAL_ROSARIES: DevotionalRosary[] = [
  {
    id: 'divina-misericordia',
    title: 'Terço da Divina Misericórdia',
    description: 'Pela Sua dolorosa paixão',
    content: 'Início: Pai Nosso, Ave Maria, Credo.\n\nNas contas grandes:\n"Eterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e do mundo inteiro."\n\nNas contas pequenas:\n"Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro."\n\nAo final (3x):\n"Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro."'
  },
  {
    id: 'sao-jose',
    title: 'Terço de São José',
    description: 'Patrono da Igreja',
    content: 'Contemplam-se os mistérios da vida de São José.\n\nNas contas grandes:\n"Meu glorioso São José, nas vossas maiores aflições e tribulações, não vos valeu o anjo do Senhor? Valei-nos nós também, meu glorioso São José."\n\nNas contas pequenas:\n"São José, valei-nos."'
  },
  {
    id: 'lagrimas',
    title: 'Terço das Lágrimas',
    description: 'Das Lágrimas de Sangue de Maria',
    content: 'Oração Inicial:\n"Jesus crucificado! Ajoelhados aos vossos pés, nós vos oferecemos as lágrimas daquela que, com grande amor compassivo, vos acompanhou no caminho doloroso do Calvário."\n\nNas contas grandes:\n"Vede, ó Jesus, que são as lágrimas daquela que mais Vos amou na terra, e que mais Vos ama no céu."\n\nNas contas pequenas:\n"Meu Jesus, ouvi os nossos rogos, pelas lágrimas de Vossa Mãe Santíssima."\n\nOração Final:\n"Virgem Santíssima e Mãe das Dores, nós vos pedimos que junteis os vossos rogos aos nossos..."'
  },
  {
    id: 'libertacao',
    title: 'Terço da Libertação',
    description: 'Clamor por cura e libertação',
    content: 'Início: Credo.\n\nNas contas grandes:\n"Se Jesus me libertar, serei verdadeiramente livre."\n\nNas contas pequenas:\n"Jesus, tem piedade de mim!\nJesus, cura-me!\nJesus, salva-me!\nJesus, liberta-me!"\n\nAo final: Salve Rainha.'
  },
  {
    id: 'ns-gracas',
    title: 'Terço de N. Sra. das Graças',
    description: 'Medalha Milagrosa',
    content: 'Início: Sinal da Cruz e Credo.\n\nNas contas grandes:\n"Glória ao Pai, ao Filho e ao Espírito Santo. Como era no princípio, agora e sempre. Amém."\n\nNas contas pequenas:\n"Ó Maria concebida sem pecado, rogai por nós que recorremos a Vós."'
  },
  {
    id: 'preciosissimo-sangue',
    title: 'Terço do Preciosíssimo Sangue',
    description: 'Devoção ao Sangue de Cristo',
    content: 'Mistérios: A Mão Direita, A Mão Esquerda, O Pé Direito, O Pé Esquerdo, O Lado Aberto.\n\nNas contas grandes:\n"Pai Eterno, eu Vos ofereço o Preciosíssimo Sangue de Jesus Cristo em descontos dos meus pecados, pelas necessidades da Santa Igreja e pelas almas do Purgatório."\n\nNas contas pequenas:\n"Sangue de Jesus, inebriai-nos. (ou: Salvai-nos!)"'
  },
  {
    id: 'sao-miguel',
    title: 'Terço de São Miguel',
    description: 'Coroa Angélica',
    content: 'Saudação aos 9 Coros dos Anjos. Em cada saudação, reza-se 1 Pai Nosso e 3 Ave-Marias.\n\n1. Serafins\n2. Querubins\n3. Tronos\n4. Dominações\n5. Potestades\n6. Virtudes\n7. Principados\n8. Arcanjos\n9. Anjos\n\nAo final: 4 Pai Nossos (em honra a S. Miguel, S. Gabriel, S. Rafael e Anjo da Guarda).'
  },
  {
    id: 'paz',
    title: 'Terço da Paz',
    description: 'Pela paz no mundo',
    content: 'Início: Credo.\n\nRezam-se 7 séries de:\n1 Pai Nosso\n1 Ave Maria\n1 Glória ao Pai\n\nPela paz no mundo, na Igreja e nas famílias.'
  },
  {
    id: 'santas-chagas',
    title: 'Terço das Santas Chagas',
    description: 'Devoção das Chagas de Jesus',
    content: 'Início: Credo.\n\nNas contas grandes:\n"Eterno Pai, eu Vos ofereço as Chagas de Nosso Senhor Jesus Cristo, para curar as de nossas almas."\n\nNas contas pequenas:\n"Meu Jesus, perdão e misericórdia, pelos méritos de Vossas Santas Chagas."'
  },
  {
    id: 'coroinha-misericordia',
    title: 'Coroinha da Misericórdia (Completa)',
    description: 'Oração completa ditada a Sta. Faustina',
    content: '1. Sinal da Cruz.\n2. Pai Nosso.\n3. Ave Maria.\n4. Credo.\n\nNas contas grandes (Pai Nosso):\n"Eterno Pai, eu Vos ofereço o Corpo e Sangue, Alma e Divindade de Vosso diletíssimo Filho, Nosso Senhor Jesus Cristo, em expiação dos nossos pecados e do mundo inteiro."\n\nNas contas pequenas (Ave Maria):\n"Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro."\n\nAo final (3x):\n"Deus Santo, Deus Forte, Deus Imortal, tende piedade de nós e do mundo inteiro."\n\nOração Opcional:\n"Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, eu confio em Vós."'
  }
];

export const VIA_SACRA = [
  { id: 1, title: 'I Estação', meditation: 'Jesus é condenado à morte.' },
  { id: 2, title: 'II Estação', meditation: 'Jesus carrega a cruz.' },
  { id: 3, title: 'III Estação', meditation: 'Jesus cai pela primeira vez.' },
  { id: 4, title: 'IV Estação', meditation: 'Jesus encontra Sua Mãe.' },
  { id: 5, title: 'V Estação', meditation: 'Simão Cirineu ajuda Jesus.' },
  { id: 6, title: 'VI Estação', meditation: 'Verônica enxuga o rosto de Jesus.' },
  { id: 7, title: 'VII Estação', meditation: 'Jesus cai pela segunda vez.' },
  { id: 8, title: 'VIII Estação', meditation: 'Jesus consola as mulheres.' },
  { id: 9, title: 'IX Estação', meditation: 'Jesus cai pela terceira vez.' },
  { id: 10, title: 'X Estação', meditation: 'Jesus é despojado de suas vestes.' },
  { id: 11, title: 'XI Estação', meditation: 'Jesus é pregado na cruz.' },
  { id: 12, title: 'XII Estação', meditation: 'Jesus morre na cruz.' },
  { id: 13, title: 'XIII Estação', meditation: 'Jesus é descido da cruz.' },
  { id: 14, title: 'XIV Estação', meditation: 'Jesus é sepultado.' },
  { id: 15, title: 'XV Estação', meditation: 'A Ressurreição (opcional).' }
];

export const DAILY_QUOTES = [
  { text: 'Tarde Te amei, ó Beleza tão antiga e tão nova!', author: 'Santo Agostinho' },
  { text: 'Quem a Deus tem, nada lhe falta. Só Deus basta.', author: 'Santa Teresa d\'Ávila' },
  { text: 'O amor é a asa veloz que Deus deu à alma para que ela voe até o céu.', author: 'Michelangelo' }
];

export const CATECHISM_CONTENT = [
  { 
    id: 'credo', 
    title: 'O Credo Explicado', 
    items: [
      { id: 'credo-1', title: 'Deus Pai', content: 'Creio em Deus Pai Todo-Poderoso, Criador do céu e da terra...' },
      { id: 'credo-2', title: 'Jesus Cristo', content: 'E em Jesus Cristo, um só seu Filho, Nosso Senhor...' },
      { id: 'credo-3', title: 'Espírito Santo', content: 'Creio no Espírito Santo, Senhor que dá a vida...' }
    ] 
  },
  { 
    id: 'sacramentos', 
    title: 'Os 7 Sacramentos', 
    items: [
      { id: 'batismo', title: 'Batismo', content: 'O fundamento de toda a vida cristã, porta da vida no Espírito.' },
      { id: 'eucaristia', title: 'Eucaristia', content: 'Fonte e ápice de toda a vida cristã.' },
      { id: 'confissao', title: 'Confissão', content: 'O sacramento da cura e do perdão dos pecados.' },
      { id: 'crisma', title: 'Crisma', content: 'Confirmação e fortalecimento da graça batismal.' },
      { id: 'matrimonio', title: 'Matrimônio', content: 'A união santa entre homem e mulher como sinal do amor de Cristo.' },
      { id: 'ordem', title: 'Ordem', content: 'O sacramento do serviço apostólico (Padres e Bispos).' },
      { id: 'uncao', title: 'Unção dos Enfermos', content: 'A graça de consolo e cura para os doentes.' }
    ] 
  },
  {
    id: 'mandamentos',
    title: 'Os 10 Mandamentos',
    items: [
      { id: 'mand-1', title: '1. Amar a Deus', content: 'Amar a Deus sobre todas as coisas.' },
      { id: 'mand-2', title: '2. Santo Nome', content: 'Não tomar seu Santo Nome em vão.' },
      { id: 'mand-3', title: '3. Domingos', content: 'Guardar domingos e festas de guarda.' },
      { id: 'mand-4', title: '4. Pais', content: 'Honrar pai e mãe.' },
      { id: 'mand-5', title: '5. Não Matar', content: 'Não matar (respeitar a vida).' },
      { id: 'mand-6', title: '6. Castidade', content: 'Não pecar contra a castidade.' },
      { id: 'mand-7', title: '7. Não Roubar', content: 'Não furtar.' },
      { id: 'mand-8', title: '8. Verdade', content: 'Não levantar falso testemunho.' },
      { id: 'mand-9', title: '9. Desejos Impuros', content: 'Não desejar a mulher do próximo.' },
      { id: 'mand-10', title: '10. Cobiça', content: 'Não cobiçar as coisas alheias.' }
    ]
  },
  {
    id: 'pecados',
    title: 'Pecados e Virtudes',
    items: [
      { id: 'pec-1', title: 'Soberba vs Humildade', content: 'O orgulho é combatido pela humildade.' },
      { id: 'pec-2', title: 'Avareza vs Generosidade', content: 'O apego aos bens é vencido pela doação.' },
      { id: 'pec-3', title: 'Luxúria vs Castidade', content: 'O desejo desordenado é vencido pela pureza.' },
      { id: 'pec-4', title: 'Ira vs Paciência', content: 'A raiva é vencida pela mansidão.' },
      { id: 'pec-5', title: 'Gula vs Temperança', content: 'O excesso é vencido pelo equilíbrio.' },
      { id: 'pec-6', title: 'Inveja vs Caridade', content: 'A tristeza pelo bem alheio é vencida pelo amor.' },
      { id: 'pec-7', title: 'Preguiça vs Diligência', content: 'O desânimo é vencido pelo fervor no trabalho.' }
    ]
  }
];