import { LoginForm } from "../../components/auth/LoginForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";
import { loginSchema } from "../../core/validators/authSchema.js";
import { z } from "zod";
import { createRef } from "jsx-dom";

export function loginPage(container) {
  const inputsRef = {
    email: createRef(),
    password: createRef(),
  };

  function handleSubmitLogin(e) {
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
    }
  }

  function handleNavigateToRegister(e) {
    e.preventDefault();
    navigateTo("/cadastro");
  }

  container.replaceChildren(
    <PageBackground>
      <AuthLayout headingId="login-heading">
        <LoginForm
          onSubmitLogin={handleSubmitLogin}
          onNavigateToRegister={handleNavigateToRegister}
          inputsRef={inputsRef}
        />
      </AuthLayout>
    </PageBackground>,
  );

  return function desmontar() {
    container.innerHTML = "";
  };
}
