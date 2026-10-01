import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebase.js'; 

export async function registerUser(fullname, email, password) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        
        await setDoc(doc(db, 'users', user.uid), {
            fullname: fullname,
            email: email,
            type: 'family',
            created: new Date().toISOString()
        });
        
        return user;
    } catch (error) {
        throw formatError(error.code);
    }
}

function formatError(codigo) {
    switch (codigo) {
        case 'auth/email-already-in-use':
            return 'Este email já está cadastrado.';
        case 'auth/weak-password':
            return 'A senha deve ter pelo menos 6 caracteres.';
        case 'auth/invalid-email':
            return 'Por favor, insira um endereço de email válido.';
        case 'auth/popup-closed-by-user':
            return 'O login com o Google foi cancelado.';
        default:
            return 'Ocorreu um erro na autenticação. Tente novamente.';
    }
}