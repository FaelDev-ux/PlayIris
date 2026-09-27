import { createRegisterForm } from '../../components/auth/RegisterForm.jsx';
import { PageBackground } from '../../components/layout/PageBackground.jsx';
import { createAuthLayout } from '../../components/auth/AuthLayout.jsx';

export function registerPage(container, navigateTo) {
    const page = (
        <PageBackground>
            {createAuthLayout(createRegisterForm(navigateTo), 'register-heading')}
        </PageBackground>
    );

    container.replaceChildren(page);

    return function desmontar() {
        container.innerHTML = '';
    };
}