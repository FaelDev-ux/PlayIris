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

  const currentUrl = new URL(window.location.href);

  if (currentUrl.pathname === "/") {
    currentUrl.pathname = "/login";
  }

  navigateTo(currentUrl.href, { history: "replace" });
});

function clearContainer() {
  if (UnmountFunction) {
    UnmountFunction();
    UnmountFunction = null;
  }
  appContainer.innerHTML = '';
}

function navigateTo(rota, { historyMode = "push" } = {}) {
  const url = new URL(rota, window.location.origin);
  clearContainer();

  if (historyMode === "push") {
    window.history.pushState(null, "", url.href);
  } else if (historyMode === "replace") {
    window.history.replaceState(null, "", url.href);
  }

  // const protectedRoutes = ['/adult-dashboard', '/child-path', '/games'];

  // if (protectedRoutes.includes(rota) && !isUserLoggedIn) {
  //   rota = '/login';
  // }

  // if ((rota === '/login' || rota === '/cadastro') && isUserLoggedIn) {
  //   rota = '/games';
  // }


  switch (url.pathname) {
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
  navigateTo(window.location.href, { history: "none" });
});