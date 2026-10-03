import { sendPasswordResetEmail, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../config/firebase.js";

export async function sendResetPasswordEmail(email) {

  const actionCodeSettings = {
    url: `${window.location.origin}/redefinir-senha`,
  }
  try {await sendPasswordResetEmail(auth, email, actionCodeSettings);
  return true;
  } catch (error) {
    throw formatResetError(error.code);
  }
}

export async function confirmNewPassword(oobCode, newPassword) {
  try {
    await confirmPasswordReset(auth, oobCode, newPassword);
    return true;
  } catch (error) {
    throw formatResetError(error.code);
  }
}

function formatResetError(code) {
  switch (code) {
    case 'auth/user-not-found':
      return 'Não encontramos nenhuma conta com esse email';
    case 'auth/invalid-email':
      return 'E-mail inválido. Por favor, insira um endereço de e-mail válido.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas falhas. Tente novamente mais tarde.';
    case 'auth/expired-action-code':
      return 'O link de redefinição de senha expirou. Solicite um novo e-mail de redefinição de senha.';
    case 'auth/invalid-action-code':
      return 'O link de redefinição de senha é inválido. Solicite um novo e-mail de redefinição de senha.';
    case 'auth/weak-password':
      return 'A senha deve ter pelo menos 8 caracteres.';
    default:
      return 'Ocorreu um erro ao tentar enviar o e-mail de redefinição de senha. Tente novamente.';
  }
}