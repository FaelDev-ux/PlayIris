import { createInput } from '../ui/Input.jsx';
import { createAccountTypeSelector } from './AccountTypeSelector.jsx';
import { createRememberLoginCheckbox } from './rememberLoginCheckbox.js';
import { createButton } from '../ui/Button.jsx';
import googleIcon from '../../assets/images/google.svg';

export function createLoginForm(navigateTo) {
  const form = document.createElement('form');

  form.id = 'form-login';

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
        Entrar
      </h2>

      <p class="mb-0 text-sm text-cinza-ardosia">
        Acesse sua conta para continuar acompanhando as atividades.
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

  const registerPrompt = document.createElement('p');
  registerPrompt.className = `
    mb-0
    mt-6
    text-center
    text-xs
    text-cinza-ardosia
  `;

  registerPrompt.innerHTML = `
    Ainda não tem uma conta no Íris? 

    <a href="/cadastro" class="cursor-pointer font-bold text-azul-iris underline underline-offset-2">
      Criar conta
    </a>
  `;

  registerPrompt.querySelector("a").addEventListener("click", e => {
    e.preventDefault();
    navigateTo("/cadastro");
  });

  const accountTypeSelector = createAccountTypeSelector();
  const rememberLoginCheckbox = createRememberLoginCheckbox();

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

  const googleButton = createButton({
    text: 'Continuar com o Google',
    variant: 'outline',
    iconSrc: googleIcon
  });

  const submitButton = createButton({
    text: 'Entrar',
    type: 'submit',
    variant: 'primary'
  });

  form.append(accountTypeSelector, inputEmail, inputSenha, rememberLoginCheckbox, submitButton, divider, googleButton, registerPrompt);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    console.log(
      'Dados:',
      inputEmail.getValue(),
      inputSenha.getValue()
    );
  });
  return form;
}