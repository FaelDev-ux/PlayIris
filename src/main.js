import { auth } from './config/firebase.js';
import { onAuthStateChanged } from 'firebase/auth';
import { navigateTo } from './router.js';

onAuthStateChanged(auth, (user) => {
    const authEvent = new CustomEvent('authStateChanged', { //customEvent sobre o estado de logado/deslogado
        detail: { isAuthenticated: !!user, uid: user?.uid }
    });
    window.dispatchEvent(authEvent);
});

navigateTo(window.location.href);