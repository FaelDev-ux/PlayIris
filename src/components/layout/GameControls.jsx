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
    <section className="flex justify-between w-full gap-6 p-5 border-t-2 border-cinza-ardosia/30">
      <div className="flex gap-4 items-center">
        <span
          class="h-3 w-3 border shrink-0 rounded-full bg-coral-suave"
          aria-hidden="true"
        ></span>
        <h1 className="text-3xl font-bold text-azul-meia-noite">{gameTitle}</h1>
        <div class="flex items-center gap-2 rounded-neo border-neo-thin bg-lilas-cognitivo/30 px-3 py-2 text-xs font-bold">
          <span
            class="h-2 w-2 border shrink-0 rounded-full bg-lilas-cognitivo"
            aria-hidden="true"
          ></span>
          {worldTitle}
        </div>
      </div>

      <div className="flex gap-3 mt-2">
        <Button
          text="Som"
          iconSrc={isSoundOn ? soundOnIcon : soundOffIcon}
          variant="outline"
          className="w-auto"
          onClick={onToggleSound}
        />
        <Button
          text=""
          iconSrc={isMaximized ? minimizeIcon : expandIcon}
          variant="outline"
          className="w-auto bg-ciano-fluido/60 hover:bg-ciano-fluido"
          onClick={onToggleMaximize}
        />
      </div>
    </section>
  );
}
