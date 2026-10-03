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
          Informe deu email cadastrado e enviaremos um link para você redefinir sua senha.
        </p>
      </header>
      {successMessage && (
        <div className="mb-4 p-2 rounded-neo border-neo-thin bg-green-50 text-xs font-semibold text-green-700">
          {successMessage}
        </div>
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
        text="Enviar link de redefinição"
        type="submit"
        variant="primary"
      />

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Lembrar da senha? {" "}

        <a 
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2"
          href="/login"
          onClick={onNavigateToLogin}
        >
          Voltar para o login
        </a>
      </p>

    </form>
  )
}