export function createTermsCheckbox(navigateTo) {
  function handleNavigation(event, route) {
    event.preventDefault();
    navigateTo(route);
  }

  return (
    <div className="my-5">
      <label className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-cinza-ardosia">
        <input
          id="terms"
          name="terms"
          type="checkbox"
          required
          className="mt-1 h-5 w-5 shrink-0 cursor-pointer accent-azul-iris"
        />

        <span>
          Concordo com os {' '}
          <a
            href="/termos"
            className="cursor-pointer font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2"
            onClick={(event) => handleNavigation(event, "/termos")}
          >
            Termos de Uso
          </a>
          {' '} e com a {' '}
          <a
          href="/privacidade"
          className="cursor-pointer font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2"
          onClick={(event) => handleNavigation(event, "/privacidade")}
          >
            Política de privacidade (LGPD)
          </a>.
        </span>
      </label>
    </div>
  );
}