import { registerPage } from './views/auth/register.jsx';
import { loginPage } from './views/auth/login.jsx';

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

  const protectedRoutes = ['/adult-dashboard', '/child-path'];

  if (protectedRoutes.includes(rota) && !isUserLoggedIn) {
    rota = '/login';
  }

  if ((rota === '/login' || rota === '/cadastro') && isUserLoggedIn) {
    rota = '/adult-dashboard';
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
    default:
      appContainer.innerHTML = '<h1 class="p-8">404 - Página não encontrada</h1>';
      UnmountFunction = null;
  }
}

window.addEventListener('popstate', () => {
  navigateTo(window.location.pathname);
});