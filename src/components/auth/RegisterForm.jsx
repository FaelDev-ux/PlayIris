import { Input } from "../ui/Input.jsx";
import { AccountTypeSelector } from "./AccountTypeSelector.jsx";
import { Button } from "../ui/Button.jsx";
import googleIcon from "../../assets/images/google.svg";
import { TermsCheckbox } from "./TermsCheckbox.jsx";

export function RegisterForm({ onSubmitRegister, onNavigateToLogin, onNavigateToTerms, onNavigateToPrivacity }) {
  return (
    <form
      id="form-registro"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit={onSubmitRegister}
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold" id="register-heading">
          Criar conta
        </h2>

        <p className="mb-0 text-sm text-cinza-ardosia">
          Cadastre-se para acessar o painel de atividades e suporte
          personalizado.
        </p>
      </header>

      <AccountTypeSelector />

      <Input
        id="full-name"
        name="fullName"
        label="NOME COMPLETO"
        placeholder="Ex: Mariana Costa"
        autocomplete="name"
        required
      />

      <Input
        id="email"
        name="email"
        label="E-MAIL"
        type="email"
        placeholder="seuemail@exemplo.com"
        autocomplete="email"
        required
      />

      <Input
        id="password"
        name="password"
        label="SENHA"
        type="password"
        placeholder="Crie uma senha (min. 8 caracteres)"
        autocomplete="new-password"
        minLength={8}
        required
      />

      <Input
        id="password-confirmation"
        name="passwordConfirmation"
        label="CONFIRMAR SENHA"
        type="password"
        placeholder="Repita sua senha"
        autocomplete="new-password"
        minLength={8}
        required
      />

      <TermsCheckbox onNavigateToTerms={onNavigateToTerms} onNavigateToPrivacity={onNavigateToPrivacity} />

      <Button
        text="Criar conta"
        type="submit"
        variant="primary"
      />

      <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase text-cinza-ardosia">
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
        <span>ou</span>
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
      </div>

      <Button
        text="Criar conta com o Google"
        variant="outline"
        iconSrc={googleIcon}
      />

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Já tem uma conta no Íris?{" "}
        <a
          href="/login"
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2"
          onClick={onNavigateToLogin}
        >
          Entrar
        </a>
      </p>
    </form>
  );
}
