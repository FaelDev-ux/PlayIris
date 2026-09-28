import { RegisterForm } from "../../components/auth/RegisterForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";

export function registerPage(container) {
  
  function handleSubmitRegister(e) {
    e.preventDefault();
    console.log(e);
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
        />
      </AuthLayout>
    </PageBackground>,
  );

  return function desmontar() {
    container.innerHTML = "";
  };
}
