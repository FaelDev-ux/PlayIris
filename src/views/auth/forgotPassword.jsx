import { ForgotPasswordForm } from "../../components/auth/ForgotPasswordForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";
import { emailSchema } from "../../core/validators/authSchema.js";
import { createRef } from "jsx-dom";
import { sendResetPasswordEmail } from "../../core/auth/passwordReset.js";

export function forgotPasswordPage(container) {
  const inputsRef = {
    email: createRef(),
  };

  function render(successMsg = "") {
    container.replaceChildren(
      <PageBackground>
        <AuthLayout headingId="forgot-heading">
          <ForgotPasswordForm
            onSubmitForgotPassword={handleSubmitForgotPassword}
            onNavigateToLogin={handleNavigateToLogin}
            inputsRef={inputsRef}
            successMessage={successMsg}
          />
        </AuthLayout>
      </PageBackground>,
    );
  }

  async function handleSubmitForgotPassword(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const result = emailSchema.safeParse(data);

    inputsRef.email.current?.setError(null);

    if (!result.success) {
      const errorMessage =
        result.error.issues[0]?.message || "E-mail inválido.";
      inputsRef.email.current?.setError(errorMessage);
      return;
    }

    try {
      await sendResetPasswordEmail(data.email);
      render("E-mail de recuperação enviado com sucesso!");
    } catch (error) {
      inputsRef.email.current?.setError(error);
    }
  }

  function handleNavigateToLogin(e) {
    e.preventDefault();
    navigateTo("/login");
  }
  render();

  return function desmontar() {
    container.innerHTML = "";
  };
}
