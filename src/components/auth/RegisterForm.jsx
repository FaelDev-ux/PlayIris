import { createInput } from '../ui/Input.jsx';
import { createAccountTypeSelector } from './AccountTypeSelector.jsx';
import { createButton } from '../ui/Button.jsx';
import googleIcon from '../../assets/images/google.svg';
import { createTermsCheckbox } from './TermsCheckbox.jsx';

export function createRegisterForm(navigateTo) {

  const inputNome = createInput({
    id: 'full-name',
    name: 'fullName',
    label: 'NOME COMPLETO',
    placeholder: 'Ex: Dra. Mariana Costa',
    autocomplete: 'name',
    required: true
  });

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
    placeholder: 'Crie uma senha (min. 8 caracteres)',
    autocomplete: 'new-password',
    minLength: 8,
    required: true
  });

  const inputConfirmarSenha = createInput({
    id: 'password-confirmation',
    name: 'passwordConfirmation',
    label: 'CONFIRMAR SENHA',
    type: 'password',
    placeholder: 'Repita sua senha',
    autocomplete: 'new-password',
    minLength: 8,
    required: true
  });

  const googleButton = createButton({
    text: 'Criar conta com o Google',
    variant: 'outline',
    iconSrc: googleIcon
  });

  const submitButton = createButton({
    text: 'Criar Conta',
    type: 'submit',
    variant: 'primary'
  });

  return (
    <form 
      id="form-registro"
      className="w-full max-w-md rounded-neo border-neo bg-branco-porcelana p-card-p shadow-neo-soft"
      onSubmit = {(event) => {
        event.preventDefault();
        console.log('Dados:', inputNome.value(), inputEmail.value());
      }}
    >
      <header className="mb-6">
        <h2 className="text-2xl font-bold" id="register-heading">
          Criar conta
        </h2>

        <p className="mb-0 text-sm text-cinza-ardosia">
          Cadastre-se para acessar o painel de atividades e suporte personalizado.
        </p>
      </header>

      {createAccountTypeSelector()}

      {inputNome}
      {inputEmail}
      {inputSenha}
      {inputConfirmarSenha}

      {createTermsCheckbox(navigateTo)}

      {createButton({
        text: 'Criar conta',
        type: 'submit',
        variant: 'primary',
      })}

      <div className="my-4 flex items-center gap-3 text-xs font-bold uppercase text-cinza-ardosia">
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
        <span>ou</span>
        <span className="h-px flex-1 bg-cinza-nuvem"></span>
      </div>

      {createButton({
        text: 'Criar conta com o Google',
        variant: 'outline',
        iconSrc: googleIcon,
      })}

      <p className="mb-0 mt-6 text-center text-xs text-cinza-ardosia">
        Já tem uma conta no Íris? {' '}
        <a
          href="/login"
          className="cursor-pointer font-bold text-azul-iris underline underline-offset-2"
          onCLick={(event) => {
            event.preventDefault();
            navigateTo('/login');
          }}
        >
          Entrar
        </a>
      </p>
    </form>
  );
}
