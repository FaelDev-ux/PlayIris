import { LoginForm } from "../../components/auth/LoginForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";
import { navigateTo } from "../../router.js";

export function loginPage(container) {

  function handleSubmitLogin(e) {
    e.preventDefault();
    console.log(e)
  }

  function handleNavigateToRegister(e) {
    e.preventDefault();
    navigateTo("/cadastro")
  }

  container.replaceChildren(
    <PageBackground>
      <AuthLayout headingId="login-heading">
        <LoginForm onSubmitLogin={handleSubmitLogin} onNavigateToRegister={handleNavigateToRegister} />
      </AuthLayout>
    </PageBackground>
  );

  return function desmontar() {
    container.innerHTML = "";
  };
}