import { registerPage } from './views/auth/register.jsx';
import { loginPage } from './views/auth/login.jsx';

const appContainer = document.getElementById('app');
let UnmountFunction = null; 

export function navigateTo(rota) {
    if (UnmountFunction) {
      UnmountFunction(); 
    }
    
    appContainer.innerHTML = ''; 

    switch (rota) {
        case '/cadastro':
            UnmountFunction = registerPage(appContainer, navigateTo);
            break;
        case '/login':
            UnmountFunction = loginPage(appContainer, navigateTo);
            break;
        default:
            appContainer.innerHTML = '<h1 class="p-8">404 - Página não encontrada</h1>';
            UnmountFunction = null;
    }
}

navigateTo('/cadastro');