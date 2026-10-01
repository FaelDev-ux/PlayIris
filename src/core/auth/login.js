import { signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../config/firebase";


export async function loginWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw formatError(error.code)
  }
}

export async function loginWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, {
        fullname: user.displayName || "Usuário",
        email: user.email,
        type: 'family',
        created: new Date().toISOString()
      });
    }

    return user;
  } catch (error) {
    throw formatError(error.code);
  }
}

export async function logout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log("Erro ao deslogar:", error.code);
  }
}

window.document.logout = logout; //expondo método de logout provisório

function formatError(code) {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou senha incorretos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas falhas. Tente novamente mais tarde.';
    case 'auth/popup-closed-by-user':
      return 'O login com o Google foi cancelado.';
    default:
      return code;
  }
}