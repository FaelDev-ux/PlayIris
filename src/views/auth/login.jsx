import { createLoginForm } from '../../components/auth/LoginForm.jsx';
import { PageBackground } from '../../components/layout/PageBackground.jsx';
import { createAuthLayout } from '../../components/auth/AuthLayout.jsx';

export function loginPage(container, navigateTo) {
    const page = (
        <PageBackground>
            {createAuthLayout(createLoginForm(navigateTo), 'login-heading')}
        </PageBackground>
    );

    container.replaceChildren(page);

    return function desmontar() {
        container.innerHTML = '';
    };
}