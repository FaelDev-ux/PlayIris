import { Button } from "../ui/Button.jsx";
import arrowBackIcon from "../../assets/images/icons/arrow-back.svg";
import starIcon from "../../assets/images/icons/star.svg";

export function GameHeader({ onBack }) {
  return (
    <header className="flex w-full shrink-0 flex-wrap justify-between items-center gap-3 p-3 sm:p-5">
      <Button
        text="Voltar aos jogos"
        iconSrc={arrowBackIcon}
        variant="outline"
        onClick={onBack}
        className="px-5 py-0 w-auto"
      />

      <div className="contents">
        <div className="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin bg-branco-porcelana px-3 py-2 text-xs font-bold">
          <span
            class="h-3 w-3 border shrink-0 rounded-full bg-verde-salvia "
            aria-hidden="true"
          ></span>

          <h4 className="mb-0">Sessão: </h4>

          <span className="text-azul-iris">Gael Henrique</span>

          <div className="flex items-center gap-2 rounded-neo border-neo-thin bg-amarelo-estrela px-3 py-2 text-xs font-bold">
            <img
              src={starIcon}
              alt="ícone de estrela"
              className="h-4 w-4"
              aria-hidden="true"
            />

            <span>0 estrelas</span>
          </div>
        </div>
      </div>
    </header>
  );
}
