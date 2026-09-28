import { Input } from "../ui/Input.jsx";
import { AccountTypeSelector } from "./AccountTypeSelector.jsx";
import { RememberLoginCheckbox } from "./rememberLoginCheckbox.jsx";
import { Button } from "../ui/Button.jsx";
import googleIcon from "../../assets/images/google.svg";

export function LoginForm({ onSubmitLogin, onNavigateToRegister, inputsRef }) {
  return (
    <form
      id="form-login"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit={onSubmitLogin}
    >
      <header className="mb-6">
        <h2 id="login-heading" className="text-2xl font-bold">
          Entrar
        </h2>

        <p className="mb-0 text-sm text-cinza-ardosia">
          Acesse sua conta para continuar acompanhando as atividades.
        </p>
      </header>
      <AccountTypeSelector />

      <Input
        ref={inputsRef.email}
        id="email"
        name="email"
        label="E-MAIL"
        type="email"
        placeholder="seuemail@exemplo.com"
        autocomplete="email"
        required
      />

      <Input
        ref={inputsRef.password}
        id="password"
        name="password"
        label="SENHA"
        type="password"
        placeholder="Digite sua senha"
        autocomplete="password"
        topLink
        required
      />

      <RememberLoginCheckbox />

      <Button text="Entrar" type="submit" variant="primary" />

      <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase text-cinza-ardosia">
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
        <span>ou</span>
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
      </div>

      <Button
        text="Continuar com o google"
        variant="outline"
        iconSrc={googleIcon}
      />

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Ainda não tem uma conta Íris?{" "}
        <a
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2"
          href="/cadastro"
          onClick={onNavigateToRegister}
        >
          Criar Conta
        </a>
      </p>
    </form>
  );
}
