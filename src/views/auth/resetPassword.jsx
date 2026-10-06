import { ResetPassWordForm } from "../../components/auth/ResetPasswordForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";
import { passwordSchema } from "../../core/validators/authSchema.js";
import { createRef } from "jsx-dom";
import { confirmNewPassword } from "../../core/auth/passwordReset.js";

export function resetPasswordPage(container) {
  const inputsRef = {
    password: createRef(),
    confirmPassword: createRef(),
  };

  let redirectTimer;
  const urlParams = new URLSearchParams(window.location.search);
  const oobCode = urlParams.get("oobCode");

  function render(successMsg = "") {
    container.replaceChildren(
      <PageBackground>
        <AuthLayout headingId="reset-heading">
          <ResetPassWordForm
            onSubmitResetPassword={handleSubmitResetPassword}
            onNavigateToLogin={handleNavigateToLogin}
            inputsRef={inputsRef}
            successMessage={successMsg}
          />
        </AuthLayout>
      </PageBackground>,
    );
  }

  async function handleSubmitResetPassword(e) {
    e.preventDefault();

    if (!oobCode) {
      inputsRef.password.current?.setError(
        "Código de redefinição de senha está ausente",
      );
      return;
    }

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const result = passwordSchema.safeParse(data);

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] || "confirmPassword";
        if (inputsRef[field]?.current) {
          inputsRef[field].current.setError(issue.message);
        }
      });
      return;
    }
    try {
      await confirmNewPassword(oobCode, data.password);
      render(
        "Senha redefinida com sucesso! Redirencionando para a pagina de login...",
      );

      redirectTimer = setTimeout(() => {
        navigateTo("/login");
      }, 3000);
    } catch (error) {
      inputsRef.password.current?.setError(error);
    }
  }

  function handleNavigateToLogin(e) {
    e.preventDefault();
    navigateTo("/login");
  }

  render();

  return function desmontar() {
    clearTimeout(redirectTimer);
    container.innerHTML = "";
  };
}
