import { RegisterForm } from "../../components/auth/RegisterForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";
import { registerSchema } from "../../core/validators/authSchema.js";
import { createRef } from "jsx-dom";

export function registerPage(container) {
  const inputsRef = {
    fullName: createRef(),
    email: createRef(),
    password: createRef(),
    confirmPassword: createRef(),
  };

  function handleSubmitRegister(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const dataFormatted = {
      ...data,
      password: {
        password: data.password,
        confirmPassword: data.passwordConfirmation,
      },
    };
    delete dataFormatted.passwordConfirmation;
    const result = registerSchema.safeParse(dataFormatted);

    Object.values(inputsRef).forEach((ref) => ref.current?.setError(null));

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        const [firstLevel, secondLevel] = issue.path;

        let inputName = firstLevel;

        if (firstLevel === "password" && secondLevel) {
          inputName = secondLevel; //caso o erro seja dentro do obj password(ou seja, erro no confirmPassword)
        }

        const inputRefObject = inputsRef[inputName];

        if (inputRefObject && inputRefObject.current) {
          inputRefObject.current.setError(issue.message);
        }
      });
    }
  }

  function handleNavigateToLogin(e) {
    e.preventDefault();
    navigateTo("/login");
  }

  function handleNavigateToPrivacity(e) {
    e.preventDefault();
    navigateTo("/privacidade");
  }

  function handleNavigateToTerms(e) {
    e.preventDefault();
    navigateTo("/termos");
  }

  container.replaceChildren(
    <PageBackground>
      <AuthLayout headingId="register-heading">
        <RegisterForm
          onSubmitRegister={handleSubmitRegister}
          onNavigateToLogin={handleNavigateToLogin}
          onNavigateToPrivacity={handleNavigateToPrivacity}
          onNavigateToTerms={handleNavigateToTerms}
          inputsRef={inputsRef}
        />
      </AuthLayout>
    </PageBackground>,
  );

  return function desmontar() {
    container.innerHTML = "";
  };
}
