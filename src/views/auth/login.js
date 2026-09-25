import { createLoginForm } from '../../components/auth/LoginForm.js';
import { createPageBackground } from '../../components/layout/PageBackground.js';
import { createAuthLayout } from '../../components/auth/AuthLayout.js';

export function loginPage(container, navigateTo) {
    const { page, content } = createPageBackground();
    const loginForm = createLoginForm(navigateTo);

    const authLayout = createAuthLayout(
        loginForm,
        'login-heading'
    );

    content.append(authLayout);
    container.replaceChildren(page);

    return function desmontar() {
        container.innerHTML = '';
    };
}