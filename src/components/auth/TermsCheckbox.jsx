import { Checkbox } from '../ui/Checkbox.jsx';

export function createTermsCheckbox(navigateTo) {
  function handleNavigation(event, route) {
    event.preventDefault();
    navigateTo(route);
  }

  return (
    <div className="my-5">
      <Checkbox id="terms" name="terms" required={true}>
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
      </Checkbox>
    </div>
  );
}