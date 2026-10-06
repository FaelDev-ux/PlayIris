import { Button } from "../ui/Button.jsx";
import soundOnIcon from "../../assets/images/icons/sound-on.svg";
import soundOffIcon from "../../assets/images/icons/sound-off.svg";
import expandIcon from "../../assets/images/icons/expand.svg";
import minimizeIcon from "../../assets/images/icons/minimize.svg";

export function GameControls({
  gameTitle,
  worldTitle,
  onToggleSound,
  onToggleMaximize,
  isMaximized,
  isSoundOn
}) {
  return (
    <section className="flex shrink-0 items-center justify-between w-full gap-2 px-2 py-1 sm:gap-3 sm:p-3 border-t-2 border-cinza-ardosia/30">
      <div className="flex min-w-0 gap-2 items-center">
        <span
          class="size-2 sm:size-3 border shrink-0 rounded-full bg-coral-suave"
          aria-hidden="true"
        ></span>
        <h1 className="mb-0 truncate text-sm sm:text-2xl font-bold text-azul-meia-noite">{gameTitle}</h1>
        {worldTitle && <div class="hidden sm:flex items-center gap-2 rounded-neo border-neo-thin bg-lilas-cognitivo/30 px-3 py-2 text-xs font-bold">
          <span
            class="size-3 border shrink-0 rounded-full bg-lilas-cognitivo"
            aria-hidden="true"
          ></span>
          {worldTitle}
        </div>}
      </div>

      <div className="flex shrink-0 gap-2 sm:gap-3">
        <Button text="Som" textClassName="hidden sm:inline" ariaLabel="Som" ariaPressed={isSoundOn}
          iconSrc={isSoundOn ? soundOnIcon : soundOffIcon} variant="outline" onClick={onToggleSound}
          className="mb-0 w-auto min-w-11 rounded-xl px-2 py-2 sm:px-4 focus-visible:ring-4 focus-visible:ring-azul-iris/30" />
        <Button ariaLabel="Alternar tela cheia" ariaPressed={isMaximized}
          iconSrc={isMaximized ? minimizeIcon : expandIcon} variant="outline" onClick={onToggleMaximize}
          className="mb-0 w-auto min-w-11 rounded-xl bg-ciano-fluido/60 px-2 py-2 hover:bg-ciano-fluido focus-visible:ring-4 focus-visible:ring-azul-iris/30" />
      </div>
    </section>
  );
}
