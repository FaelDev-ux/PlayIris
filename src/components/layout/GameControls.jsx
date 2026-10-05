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
        <div class="hidden sm:flex items-center gap-2 rounded-neo border-neo-thin bg-lilas-cognitivo/30 px-3 py-2 text-xs font-bold">
          <span
            class="size-3 border shrink-0 rounded-full bg-lilas-cognitivo"
            aria-hidden="true"
          ></span>
          {worldTitle}
        </div>
      </div>

      <div className="flex shrink-0 gap-2 sm:gap-3">
        <button type="button" aria-label="Som" onClick={onToggleSound} className="flex min-h-touch-target min-w-11 items-center justify-center gap-2 rounded-xl border-2 border-azul-meia-noite bg-branco-porcelana px-2 sm:px-4 font-bold focus-visible:ring-4 focus-visible:ring-azul-iris/30">
          <img src={isSoundOn ? soundOnIcon : soundOffIcon} alt="" className="h-5 w-5" /><span className="hidden sm:inline">Som</span>
        </button>
        <button type="button" aria-label="Alternar tela cheia" onClick={onToggleMaximize} className="flex min-h-touch-target min-w-11 items-center justify-center rounded-xl border-2 border-azul-meia-noite bg-ciano-fluido/60 px-2 hover:bg-ciano-fluido focus-visible:ring-4 focus-visible:ring-azul-iris/30">
          <img src={isMaximized ? minimizeIcon : expandIcon} alt="" className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
