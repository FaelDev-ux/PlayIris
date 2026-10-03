import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";

export function ForgotPasswordForm({
  onSubmitForgotPassword,
  onNavigateToLogin,
  inputsRef,
  successMessage,
}) {
  return (
    <form
      id="form-forgot-password"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit={onSubmitForgotPassword}
    >
      <header className="mb-6">
        <h2 id="forgot-heading" className="text-2xl font-bold">
          Recuperar senha
        </h2>
        <p className="mb-0 text-sm text-cinza-ardosia">
          Informe seu e-mail cadastrado e enviaremos um link para você redefinir
          sua senha.
        </p>
      </header>
      {successMessage && (
        <li class="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin text-xs font-semibold bg-verde-salvia/10 mb-4 px-3 py-2">
          <span
            class="h-3 w-3 border shrink-0 rounded-full bg-verde-salvia"
            aria-hidden="true"
          ></span>
          {successMessage}
        </li>
      )}

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

      <Button
        text="Enviar link"
        type="submit"
        variant="primary"
      />

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Lembrou da senha?{" "}
        <a
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2"
          href="/login"
          onClick={onNavigateToLogin}
        >
          Voltar para o login
        </a>
      </p>
    </form>
  );
}
