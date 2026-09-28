import { LoginForm } from "../../components/auth/LoginForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";

export function loginPage(container, navigateTo) {
  const page = (
    <PageBackground>
      {AuthLayout(LoginForm(navigateTo), "login-heading")}
    </PageBackground>
  );

  container.replaceChildren(page);

  return function desmontar() {
    container.innerHTML = "";
  };
}
