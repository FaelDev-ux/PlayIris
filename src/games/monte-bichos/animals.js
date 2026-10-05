import cachorroSvg from '../../assets/images/games/monte-o-bicho/cachorro/cachorro-montado.svg?raw';
import sapoSvg from '../../assets/images/games/monte-o-bicho/sapo/sapo-montado.svg?raw';
import passaroSvg from '../../assets/images/games/monte-o-bicho/passaro/passaro-montado.svg?raw';
import tartarugaSvg from '../../assets/images/games/monte-o-bicho/tartaruga/tartaruga-montada.svg?raw';

export const animals = [
  {
    id: 'cachorro', name: 'Cachorro', article: 'o', svg: cachorroSvg, parts: [
      { id: 'rabo', label: 'Rabo' },
      { id: 'patas-traseiras', label: 'Patas traseiras' },
      { id: 'tronco', label: 'Tronco' },
      { id: 'patas-dianteiras', label: 'Patas dianteiras' },
      { id: 'cabeca', label: 'Cabeça' },
      { id: 'orelha-esquerda', label: 'Orelha esquerda' },
      { id: 'orelha-direita', label: 'Orelha direita' },
    ]
  },
  {
    id: 'sapo', name: 'Sapo', article: 'o', svg: sapoSvg,
    parts: [
      { id: 'perna-traseira-esquerda', label: 'Perna traseira esquerda' },
      { id: 'perna-traseira-direita', label: 'Perna traseira direita' },
      { id: 'tronco', label: 'Tronco' },
      { id: 'cabeca', label: 'Cabeça' },
      { id: 'olho-esquerdo', label: 'Olho esquerdo' },
      { id: 'olho-direito', label: 'Olho direito' },
    ],
  },
  {
    id: 'passaro', name: 'Pássaro', article: 'o', svg: passaroSvg,
    parts: [
      { id: 'rabo', label: 'Rabo' },
      { id: 'patas', label: 'Patas' },
      { id: 'cabeca', label: 'Cabeça e corpo' },
      { id: 'asa', label: 'Asa' },
      { id: 'topete', label: 'Topete' },
      { id: 'bico', label: 'Bico' },
    ],
  },
  {
    id: 'tartaruga', name: 'Tartaruga', article: 'a', svg: tartarugaSvg,
    parts: [
      { id: 'rabo', label: 'Rabo' },
      { id: 'patas-traseiras', label: 'Patas traseiras' },
      { id: 'barriga-casco-inferior', label: 'Barriga' },
      { id: 'cabeca-pescoco', label: 'Cabeça e pescoço' },
      { id: 'patas-dianteiras', label: 'Patas dianteiras' },
      { id: 'casco-esquerdo', label: 'Casco esquerdo' },
      { id: 'casco-direito', label: 'Casco direito' },
    ],
  },
];
