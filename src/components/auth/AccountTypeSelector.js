export function createAccountTypeSelector() {
  const fieldset = document.createElement('fieldset');

  fieldset.className = 'mb-6';

  fieldset.innerHTML = `
    <legend class="mb-2 text-xs font-bold uppercase tracking-wide">
      Tipo de conta
    </legend>

    <div class="grid grid-cols-2 rounded-neo border-neo-thin bg-gelo-artico p-1">
      <label class="cursor-pointer">
        <input
          class="peer sr-only"
          type="radio"
          name="accountType"
          value="responsible"
          checked
        />

        <span class="flex min-h-touch-target items-center rounded-xl gap-2 px-2 text-center justify-center text-xs font-bold transition-colors peer-checked:border-neo-thin peer-checked:bg-azul-iris peer-checked:text-white peer-checked:[&>.account-dot]:bg-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul-iris/30">
        <span class="account-dot h-3 w-3 shrink-0 rounded-full border border-cinza-ardosia bg-cinza-nuvem transition-colors" aria-hidden="true"></span>
          Responsável / Família
        </span>
      </label>

      <label class="cursor-not-allowed">
        <input
          class="peer sr-only"
          type="radio"
          name="accountType"
          value="professional"
          disabled
        />

        <span class="flex min-h-touch-target items-center justify-center rounded-xl gap-2 px-2 text-center text-xs font-bold transition-colors peer-checked:border-neo-thin peer-checked:bg-azul-iris peer-checked:text-white peer-checked:[&>.account-dot]:bg-white peer-focus-visible:ring-4 peer-focus-visible:ring-azul-iris/30">
        <span class="account-dot h-3 w-3 shrink-0 rounded-full border border-cinza-ardosia bg-cinza-nuvem transition-colors" aria-hidden="true"></span>
          Profissional / Clínica
        </span>
      </label>
    </div>
  `;

  return fieldset;
}