import { RegisterForm } from "../../components/auth/RegisterForm.jsx";
import { PageBackground } from "../../components/layout/PageBackground.jsx";
import { AuthLayout } from "../../components/auth/AuthLayout.jsx";

export function registerPage(container, navigateTo) {
  const page = (
    <PageBackground>
      {AuthLayout(RegisterForm(navigateTo), "register-heading")}
    </PageBackground>
  );

  container.replaceChildren(page);

  return function desmontar() {
    container.innerHTML = "";
  };
}
