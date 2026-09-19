import { createRegisterForm } from '../../components/auth/RegisterForm.js';
import { createPageBackground } from '../../components/layout/PageBackground.js';
import { createAuthLayout } from '../../components/auth/AuthLayout.js';

export function registerPage(container) {
    const { page, content } = createPageBackground();
    const registerForm = createRegisterForm();

    const authLayout = createAuthLayout(
        registerForm,
        'register-heading'
    );

    content.append(authLayout);
    container.replaceChildren(page);

    return function desmontar() {
        container.innerHTML = '';
    };
}