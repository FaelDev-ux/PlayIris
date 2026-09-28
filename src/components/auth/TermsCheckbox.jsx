import { Checkbox } from "../ui/Checkbox.jsx";

export function TermsCheckbox({ onNavigateToTerms, onNavigateToPrivacity }) {

  return (
    <div className="my-5">
      <Checkbox id="terms" name="terms" required={true}>
        Concordo com os{" "}
        <a
          href="/termos"
          className="cursor-pointer font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2"
          onClick={onNavigateToTerms}
        >
          Termos de Uso
        </a>{" "}
        e com a{" "}
        <a
          href="/privacidade"
          className="cursor-pointer font-bold text-azul-meia-noite underline decoration-azul-iris underline-offset-2"
          onClick={onNavigateToPrivacity}
        >
          Política de privacidade (LGPD)
        </a>
        .
      </Checkbox>
    </div>
  );
}
