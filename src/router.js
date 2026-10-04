import { registerPage } from './views/auth/register.jsx';
import { loginPage } from './views/auth/login.jsx';
import { forgotPasswordPage } from './views/auth/forgotPassword.jsx';
import { resetPasswordPage } from './views/auth/resetPassword.jsx';
import { playGamePage } from './views/child-path/games/playGamePage.jsx';

const appContainer = document.getElementById('app');

let UnmountFunction = null;
let isUserLoggedIn = false;

window.addEventListener('authStateChanged', (event) => {
  isUserLoggedIn = event.detail.isAuthenticated;

  const currentPath = window.location.pathname === '/' ? '/login' : window.location.pathname;
  navigateTo(currentPath);
});

function clearContainer() {
  if (UnmountFunction) {
    UnmountFunction();
    UnmountFunction = null;
  }
  appContainer.innerHTML = '';
}

export function navigateTo(rota) {

  const protectedRoutes = ['/adult-dashboard', '/child-path', '/games'];

  if (protectedRoutes.includes(rota) && !isUserLoggedIn) {
    rota = '/login';
  }

  if ((rota === '/login' || rota === '/cadastro') && isUserLoggedIn) {
    rota = '/games';
  }

  clearContainer();

  window.history.pushState(null, '', rota);

  switch (rota) {
    case '/cadastro':
      UnmountFunction = registerPage(appContainer);
      break;
    case '/login':
      UnmountFunction = loginPage(appContainer);
      break;
    case '/recuperar-senha':
      UnmountFunction = forgotPasswordPage(appContainer);
      break;
    case '/redefinir-senha':
      UnmountFunction = resetPasswordPage(appContainer);
      break;
    case '/games':
      UnmountFunction = playGamePage(appContainer);
      break;
    default:
      appContainer.innerHTML = '<h1 class="p-8">404 - Página não encontrada</h1>';
      UnmountFunction = null;
  }
}

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname);
});