import { Input } from "../ui/Input.jsx";
import { Button } from "../ui/Button.jsx";

export function ResetPassWordForm({
  onSubmitResetPassword,
  onNavigateToLogin,
  inputsRef,
  successMessage,
}) {
  return (
    <form
      id="form-reset-password"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit={onSubmitResetPassword}
    >
      <header className="mb-6">
        <h2 id="reset-heading" className="text-2xl font-bold">
          Redefinir senha
        </h2>
        <p className="mb-0 text-sm text-cinza-ardosia">
          Crie uma nova senha segura para a sua conta.
        </p>
      </header>
      {successMessage && (
        <div className="mb-4 rounded-neo border-neo-thin bg-green-50 p-3 text-xs font-semibold text-green-700">
          {successMessage}
        </div>
      )}
      <Input
        ref={inputsRef.password}
        id="password"
        name="password"
        label="NOVA SENHA"
        type="password"
        placeholder="Crie uma nova senha (min. 8 caracteres)"
        autocomplete="new-password"
        minLength={8}
        required
      />
      <Input
        ref={inputsRef.confirmPassword}
        id="confirmPassword"
        name="confirmPassword"
        label="CONFIRMAR NOVA SENHA"
        type="password"
        placeholder="Repita sua nova senha"
        autocomplete="new-password"
        minLength={8}
        required
      />
      <Button
        text="Salvar nova senha"
        type="submit"
        variant="primary"
      />
      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Lembrou da senha ou quer cancelar?{" "}
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