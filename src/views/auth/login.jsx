import { LoginForm } from "../../components/auth/LoginForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";
import { loginSchema } from "../../core/validators/authSchema.js";
import { z } from "zod";
import { createRef } from "jsx-dom";
import { loginWithEmail, loginWithGoogle } from "../../core/auth/login.js";

export function loginPage(container) {
  const inputsRef = {
    email: createRef(),
    password: createRef(),
  };

  async function handleSubmitLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const result = loginSchema.safeParse(data);

    Object.values(inputsRef).forEach((ref) => ref.current?.setError(null));

    if (!result.success) {
      const { fieldErrors } = z.flattenError(result.error);
      Object.entries(fieldErrors).forEach(([field, messages]) => {
        if (!messages) return;
        const inputRefObject = inputsRef[field];

        if (inputRefObject && inputRefObject.current) {
          inputRefObject.current.setError(messages[0]);
        }
      });

      return;
    }

    try {
      await loginWithEmail(data.email, data.password);
    } catch (error) {
      inputsRef.password.current?.setError(String(error));
    }
  }

  async function handleLoginGoogle() {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.log(error);
    }
  }

  function handleNavigateToRegister(e) {
    e.preventDefault();
    navigateTo("/cadastro");
  }

  function handleNavigateToForgotPassword(e) {
    e.preventDefault();
    navigateTo("/recuperar-senha");
  }

  container.replaceChildren(
    <PageBackground>
      <AuthLayout headingId="login-heading">
        <LoginForm
          onSubmitLogin={handleSubmitLogin}
          onLoginGoogle={handleLoginGoogle}
          onNavigateToRegister={handleNavigateToRegister}
          onNavigateToForgotPassword={handleNavigateToForgotPassword}
          inputsRef={inputsRef}
        />
      </AuthLayout>
    </PageBackground>,
  );

  return function desmontar() {
    container.innerHTML = "";
  };
}
