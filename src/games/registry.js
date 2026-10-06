export const DEFAULT_GAME_ID = 'monte-bichos';

export const games = Object.freeze({
  'monte-bichos': {
    id: 'monte-bichos',
    title: 'Monte os Bichos',
    worldTitle: 'Mundo das Formas',
    instructions: {
      introduction: 'Junte as peças para montar cada animal.',
      steps: [
        'Deslize a faixa para encontrar as peças. Ela fica horizontal com a tela em pé e vertical com a tela deitada.',
        'Toque ou clique em uma peça para destacá-la. Arraste em direção ao desenho e solte perto do lugar certo para encaixar.',
        'Se a peça voltar para a faixa, tente novamente. Você pode tentar quantas vezes quiser.',
        'Ao terminar o animal, escolha “Continuar” para montar o próximo. “Voltar ao início” abre a tela inicial do jogo.',
      ],
    },
    load: () => import('./monte-bichos/index.jsx').then((module) => module.mountMonteBichos),
  },
});

export function getGame(id = DEFAULT_GAME_ID) {
  return Object.hasOwn(games, id) ? games[id] : null;
}
