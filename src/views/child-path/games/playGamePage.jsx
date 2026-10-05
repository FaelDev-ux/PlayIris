import { PageBackground } from "../../../components/layout/PageBackground.jsx";
import { GameHeader } from "../../../components/layout/GameHeader.jsx";
import { GameArea } from "../../../components/layout/GameArea.jsx";
import { GameControls } from "../../../components/layout/GameControls.jsx";

import soundOnIcon from "../../../assets/images/icons/sound-on.svg";
import soundOffIcon from "../../../assets/images/icons/sound-off.svg";
import expandIcon from "../../../assets/images/icons/expand.svg";
import minimizeIcon from "../../../assets/images/icons/minimize.svg";
import { logout } from "../../../core/auth/login.js";
import { mountMonteBichos } from "../../../games/monte-bichos/index.jsx";

export function playGamePage(container) {
  const handleBack = () => {
    console.log("Navegar de volta para o mapa/trilha");
    //navigateTo('/trilha');
    logout();
  };

  let isSoundOn = true;
  let isMaximized = false;

  const handleToggleSound = (event) => {
    isSoundOn = !isSoundOn;

    const imgElement = event.currentTarget.querySelector("img");
    if (imgElement) {
      imgElement.src = isSoundOn ? soundOnIcon : soundOffIcon;
    }
  };

  const handleToggleMaximize = (event) => {
    isMaximized = !isMaximized;

    const imgElement = event.currentTarget.querySelector("img");
    if (imgElement) {
      imgElement.src = isMaximized ? minimizeIcon : expandIcon;
    }

    if (!document.fullscreenElement) {
        document
        .querySelector(".gameScreen")
        .requestFullscreen()
        .catch((err) => console.log(`Erro ao ativar: ${err.message}`));
    } else {
      document.exitFullscreen();
    }
  };

  container.replaceChildren(
    <PageBackground className="h-dvh min-h-0 overflow-hidden" contentClassName="flex min-h-0 flex-col">
      <GameHeader onBack={handleBack} />

      <div className="gameScreen flex min-h-0 flex-col flex-1 overflow-hidden border-neo-max rounded-neo mx-2 mb-2 sm:mx-5 bg-[#E2E8EF]">
        <GameArea>
          <div id="game-canvas" className="w-full h-full"></div>
        </GameArea>

        <GameControls
          gameTitle="Monte os Bichos"
          worldTitle="Mundo das Formas"
          onToggleSound={handleToggleSound}
          onToggleMaximize={handleToggleMaximize}
          isSoundOn={isSoundOn}
          isMaximized={isMaximized}
        />
      </div>
    </PageBackground>,
  );

  const unmountGame = mountMonteBichos(container.querySelector('#game-canvas'));

  return function desmontar() {
    unmountGame();
    container.innerHTML = "";
  };
}
