import { PageBackground } from '../../../components/layout/PageBackground.jsx';
import { GameHeader } from '../../../components/layout/GameHeader.jsx';
import { GameArea } from '../../../components/layout/GameArea.jsx';
import { GameControls } from '../../../components/layout/GameControls.jsx';
import { Button } from '../../../components/ui/Button.jsx';
import soundOnIcon from '../../../assets/images/icons/sound-on.svg';
import soundOffIcon from '../../../assets/images/icons/sound-off.svg';
import expandIcon from '../../../assets/images/icons/expand.svg';
import minimizeIcon from '../../../assets/images/icons/minimize.svg';
import { logout } from '../../../core/auth/login.js';
import { getGame, DEFAULT_GAME_ID } from '../../../games/registry.js';

export function playGamePage(container, {
  searchParams = new URLSearchParams(window.location.search),
  sessionName = 'Gael Henrique', stars = 0, onBack = logout,
} = {}) {
  const gameId = searchParams.get('game') ?? DEFAULT_GAME_ID;
  const game = getGame(gameId);
  let canvas, gameScreen, instructionsDialog;
  let gameInstance = null;
  let disposed = false;
  let isSoundOn = true;
  function handleInstructions() {
    if (!instructionsDialog.open) instructionsDialog.showModal();
  }

  function handleToggleSound(event) {
    isSoundOn = !isSoundOn;
    event.currentTarget.setAttribute('aria-pressed', String(isSoundOn));
    event.currentTarget.querySelector('img').src = isSoundOn ? soundOnIcon : soundOffIcon;
    gameInstance?.setSoundEnabled?.(isSoundOn);
  }
  async function handleToggleMaximize() {
    try {
      if (document.fullscreenElement === gameScreen) await document.exitFullscreen();
      else await gameScreen.requestFullscreen();
    } catch (error) {
      console.log(`Erro ao alternar tela cheia: ${error.message}`);
    }
  }
  function syncFullscreen() {
    const maximized = document.fullscreenElement === gameScreen;
    const button = gameScreen.querySelector('[aria-label="Alternar tela cheia"]');
    button.setAttribute('aria-pressed', String(maximized));
    button.querySelector('img').src = maximized ? minimizeIcon : expandIcon;
  }
  function showUnavailable(message) {
    canvas.replaceChildren(
      <div className="flex h-full items-center justify-center p-6 text-center" role="alert">
        <p className="mb-0 font-semibold">{message}</p>
      </div>,
    );
  }

  container.replaceChildren(
    <PageBackground className="h-dvh min-h-0 overflow-hidden" contentClassName="flex min-h-0 flex-col">
      <GameHeader onBack={onBack} onInstructions={game?.instructions ? handleInstructions : undefined} sessionName={sessionName} stars={stars} />
      <div ref={(element) => (gameScreen = element)} className="gameScreen flex min-h-0 flex-col flex-1 overflow-hidden border-neo-max rounded-neo mx-2 mb-2 sm:mx-5 bg-[#E2E8EF]">
        <GameArea>
          <div ref={(element) => (canvas = element)} id="game-canvas" className="w-full h-full">
            <p className="p-6 text-center" role="status">Carregando jogo…</p>
          </div>
        </GameArea>
        <GameControls gameTitle={game?.title ?? 'Jogo indisponível'} worldTitle={game?.worldTitle}
          onToggleSound={handleToggleSound} onToggleMaximize={handleToggleMaximize}
          isSoundOn={isSoundOn} isMaximized={false} />
        {game?.instructions && <dialog
          ref={(element) => (instructionsDialog = element)} aria-labelledby="game-instructions-title"
          onKeyDown={(event) => {
            if (event.key === 'Tab') {
              event.preventDefault();
              instructionsDialog.querySelector('button').focus();
            }
          }}
          className="m-auto w-[calc(100%-2rem)] max-w-md max-h-[85dvh] overflow-y-auto rounded-3xl border-2 border-azul-meia-noite bg-branco-porcelana p-5 sm:p-6 text-azul-meia-noite shadow-neo-solid backdrop:bg-azul-meia-noite/40">
          <h2 id="game-instructions-title" className="mb-2 text-2xl font-bold">Como jogar?</h2>
          <p className="mb-4 text-sm font-bold text-azul-iris">{game.title}</p>
          <p className="mb-4 font-semibold">{game.instructions.introduction}</p>
          <ol className="mb-5 list-decimal space-y-3 pl-5 text-sm sm:text-base">
            {game.instructions.steps.map((step) => <li>{step}</li>)}
          </ol>
          <Button text="Entendi" className="mb-0 focus-visible:ring-4 focus-visible:ring-azul-iris/30" onClick={() => instructionsDialog.close()} />
        </dialog>}
      </div>
    </PageBackground>,
  );
  document.addEventListener('fullscreenchange', syncFullscreen);

  async function loadGame() {
    if (!game) {
      showUnavailable('Este jogo ainda não está disponível.');
      return;
    }
    try {
      const mount = await game.load();
      if (disposed) return;
      gameInstance = mount(canvas, { gameId, searchParams: new URLSearchParams(searchParams), soundEnabled: isSoundOn });
    } catch (error) {
      if (!disposed) showUnavailable('Não foi possível carregar o jogo. Tente abrir a página novamente.');
      console.error('Falha ao carregar jogo:', error);
    }
  }
  loadGame();

  return function desmontar() {
    disposed = true;
    if (instructionsDialog?.open) instructionsDialog.close();
    document.removeEventListener('fullscreenchange', syncFullscreen);
    gameInstance?.destroy();
    container.replaceChildren();
  };
}
