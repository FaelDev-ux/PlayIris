export function createAccountTypeSelector() {
  return (
    <fieldset className="mb-6">
      <legend className="mb-2 text-xs font-bold uppercase tracking-wide">
        Tipo de conta
      </legend>

      <div className="grid grid-cols-2 rounded-neo border-neo-thin bg-gelo-artico p-1">
        <label className="cursor-pointer">
          <input
            className="peer sr-only"
            type="radio"
            name="accountType"
            value="responsible"
            checked
          />

          <span className="flex min-h-touch-target items-center rounded-xl gap-2 px-2 text-center justify-center text-xs font-bold transition-colors peer-checked:border-neo-thin peer-checked:bg-azul-iris peer-checked:text-white peer-checked:[&>.account-dot]:bg-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul-iris/30">
          <span className="account-dot h-3 w-3 shrink-0 rounded-full border border-cinza-ardosia bg-cinza-nuvem transition-colors" aria-hidden="true">
          </span>
            Responsável / Família
          </span>
        </label>

        <label className="cursor-not-allowed">
          <input
            className="peer sr-only"
            type="radio"
            name="accountType"
            value="professional"
            disabled
          />

          <span className="flex min-h-touch-target items-center justify-center rounded-xl gap-2 px-2 text-center text-xs font-bold transition-colors peer-checked:border-neo-thin peer-checked:bg-azul-iris peer-checked:text-white peer-checked:[&>.account-dot]:bg-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul-iris/30">
          <span className="account-dot h-3 w-3 shrink-0 rounded-full border border-cinza-ardosia bg-cinza-nuvem transition-colors" aria-hidden="true">
          </span>
            Profissional / Clínica
          </span>
        </label>
      </div>
    </fieldset>
  );
}