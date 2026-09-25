import { createInput } from '../ui/Input.jsx';
import { createAccountTypeSelector } from './AccountTypeSelector.jsx';
import { createButton } from '../ui/Button.jsx';
import googleIcon from '../../assets/images/google.svg';
import { createTermsCheckbox } from './TermsCheckbox.jsx';

export function createRegisterForm(navigateTo) {
  const form = document.createElement('form');

  form.id = 'form-registro';

  form.className = `
    w-full
    max-w-md
    rounded-neo
    border-neo
    bg-branco-porcelana
    p-card-p
    shadow-neo-soft
  `;

  form.innerHTML = `
    <header class="mb-6">
      <h2 id="register-heading" class="text-2xl font-bold">
        Criar conta
      </h2>

      <p class="mb-0 text-sm text-cinza-ardosia">
        Cadastre-se para acessar o painel de atividades e suporte personalizado.
      </p>
    </header>
  `;

  const divider = document.createElement('div');
  divider.className = `
    my-4
    flex
    items-center
    gap-3
    text-xs
    font-bold
    uppercase
    text-cinza-ardosia
  `;

  divider.innerHTML = `
    <span class="h-px flex-1 bg-cinza-nuvem"></span>
      <span>ou</span>
    <span class="h-px flex-1 bg-cinza-nuvem"></span>
  `;

  const loginPrompt = document.createElement('p');
  loginPrompt.className = `
    mb-0
    mt-6
    text-center
    text-xs
    text-cinza-ardosia
  `;

  loginPrompt.innerHTML = `
    Já tem uma conta no Íris? 

    <a href="/login" class="cursor-pointer font-bold text-azul-iris underline underline-offset-2">
      Entrar
    </a>
  `;

  loginPrompt.querySelector("a").addEventListener("click", e => {
    e.preventDefault();
    navigateTo("/login");
  });

  const accountTypeSelector = createAccountTypeSelector();
  const termsCheckbox = createTermsCheckbox(navigateTo);

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

  form.append(accountTypeSelector, inputNome, inputEmail, inputSenha, inputConfirmarSenha, termsCheckbox, submitButton, divider, googleButton, loginPrompt);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(
      'Dados:',
      inputNome.getValue(),
      inputEmail.getValue()
    );
  });
  return form;
}