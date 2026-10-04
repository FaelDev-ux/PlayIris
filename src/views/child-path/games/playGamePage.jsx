import { PageBackground } from "../../../components/layout/PageBackground.jsx";
import { GameHeader } from "../../../components/layout/GameHeader.jsx";
import { GameArea } from "../../../components/layout/GameArea.jsx";
import { GameControls } from "../../../components/layout/GameControls.jsx";

import soundOnIcon from "../../../assets/images/icons/sound-on.svg";
import soundOffIcon from "../../../assets/images/icons/sound-off.svg";
import expandIcon from "../../../assets/images/icons/expand.svg";
import minimizeIcon from "../../../assets/images/icons/minimize.svg";
import { logout } from "../../../core/auth/login.js";

export function playGamePage(container) {
  const handleBack = () => {
    console.log("Navegar de volta para o mapa/trilha");
    //navigateTo('/trilha');
    logout();
  };

  const handleInstructions = () => {
    console.log("Abrir modal de instruções em áudio/texto");
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
    <PageBackground className="flex h-screen w-screen flex-col bg-gelo-artico overflow-hidden">
      <GameHeader onBack={handleBack} onInstructions={handleInstructions} />

      <div className="gameScreen flex flex-col flex-1 overflow-hidden border-neo-max rounded-neo mx-5 bg-[#E2E8EF]">
        <GameArea>
          <div id="game-canvas" className="w-full h-full min-h-180"></div>
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

  return function desmontar() {
    container.innerHTML = "";
  };
}
