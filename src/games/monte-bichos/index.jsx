import { animals } from './animals.js';
import { mountAnimalPuzzle } from './puzzle.jsx';
import logo from '../../assets/images/games/monte-o-bicho/logo.svg';

export function mountMonteBichos(gameContainer) {
  let unmountPuzzle = null;
  let playButton;
  const root = <section className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-linear-to-br from-amber-50 via-stone-50 to-teal-50" aria-label="Monte os Bichos"></section>;
  gameContainer.replaceChildren(root);

  function showHome() {
    unmountPuzzle?.();
    unmountPuzzle = null;
    root.replaceChildren(
      <div className="flex h-full min-h-0 flex-col items-center justify-center gap-5 px-6 py-4">
        <img src={logo} alt="Monte os Bichos" className="max-h-[45%] w-full max-w-lg rounded-3xl object-contain" />
        <p className="mb-0 max-w-sm text-center text-base text-cinza-ardosia">Junte as peças e descubra os animais.</p>
        <button ref={(element) => (playButton = element)} type="button" onClick={showGame} className="min-h-14 min-w-44 rounded-2xl border-2 border-azul-meia-noite bg-azul-iris px-10 py-3 text-xl font-bold text-white shadow-neo-solid cursor-pointer focus-visible:ring-4 focus-visible:ring-azul-iris/30">
          Jogar
        </button>
      </div>,
    );
  }

  function showGame() {
    let puzzleContainer;
    let animalIndex = 0;
    function selectAnimal() {
      unmountPuzzle?.();
      unmountPuzzle = mountAnimalPuzzle(puzzleContainer, animals[animalIndex], {
        onContinue() {
          animalIndex = (animalIndex + 1) % animals.length;
          selectAnimal();
        },
      });
    }
    root.replaceChildren(
      <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 px-3 pt-2 z-21 absolute">
          <button type="button" onClick={() => { showHome(); playButton.focus(); }} className="min-h-touch-target rounded-xl cursor-pointer bg-white/80 px-3 py-2 text-sm font-bold focus-visible:ring-4 border-neo focus-visible:ring-azul-iris/30">Voltar ao início</button>
        </div>
        <div ref={(element) => (puzzleContainer = element)} className="min-h-0 flex-1"></div>
      </div>
    );
    selectAnimal();
  }

  showHome();
  return function unmountMonteBichos() {
    unmountPuzzle?.();
    root.remove();
  };
}
