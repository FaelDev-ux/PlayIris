export function createRememberLoginCheckbox() {
  const wrapper = document.createElement('div');

  wrapper.className = 'my-5';

  wrapper.innerHTML = `
    <label class="flex cursor-pointer items-center justify-center gap-3 text-xs leading-relaxed text-cinza-ardosia">
      <input
        id="terms"
        name="terms"
        type="checkbox"
        required
        class="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-azul-iris"
      />

      <span class="text-sm font-extrabold text-azul-meia-noite">
        Lembrar de mim neste dispositivo
      </span>
    </label>
  `;

  return wrapper;
}