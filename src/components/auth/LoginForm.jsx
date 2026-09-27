import { createInput } from '../ui/Input.jsx';
import { createAccountTypeSelector } from './AccountTypeSelector.jsx';
import { createRememberLoginCheckbox } from './rememberLoginCheckbox.jsx';
import { createButton } from '../ui/Button.jsx';
import googleIcon from '../../assets/images/google.svg';

export function createLoginForm(navigateTo) {
  const inputEmail = createInput({
    id: 'email',
    name: 'email',
    label: 'E-MAIL',
    type: 'email',
    placeholder: 'seuemail@exemplo.com',
    autocomplete: 'email',
    required: true
  });

  const inputSenha = createInput({
    id: 'password',
    name: 'password',
    label: 'SENHA',
    type: 'password',
    placeholder: 'Digite sua senha',
    autocomplete: 'password',
    minLength: 8,
    topLink: true,
    required: true
  });

  return (
    <form 
      id="form-login"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit={(event) => {
        event.preventDefault();
        console.log('Dados:', inputEmail.getValue(), inputSenha.getValue());
      }}
      >
      <header className="mb-6">
        <h2 id="login-heading" className="text-2xl font-bold">
          Entrar
        </h2>

        <p className="mb-0 text-sm text-cinza-ardosia">
          Acesse sua conta para continuar acompanhando as atividades.
        </p>
      </header>
      {createAccountTypeSelector()}
      
      {inputEmail}
      {inputSenha}

      {createRememberLoginCheckbox()}

      {createButton({
        text: 'Entrar',
        type: 'submit',
        variant: 'primary'
      })}

      <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase text-cinza-ardosia">
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
        <span>ou</span>
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
      </div>

      {createButton({
        text: 'Continuar com o google',
        variant: 'outline',
        iconSrc: googleIcon
      })}

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Ainda não tem uma conta Íris?{' '}
        <a
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2" 
          href="/cadastro"
          onClick={(event) => {
            event.preventDefault();
            navigateTo('/cadastro');
          }}>
          Criar Conta
        </a>
      </p>
    </form>
  )
}