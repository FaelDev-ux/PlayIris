export function createTermsCheckbox() {
  const wrapper = document.createElement('div');

  wrapper.className = 'my-5';

  wrapper.innerHTML = `
    <label class="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-cinza-ardosia">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        class="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-azul-iris"
      />

      <span>
        Concordo com os
        <a href="/termos" class="font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2">
          Termos de Uso
        </a>
        e com a
        <a href="/privacidade" class="font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2">
          Política de Privacidade (LGPD)
        </a>.
      </span>
    </label>
  `;

  return wrapper;
}