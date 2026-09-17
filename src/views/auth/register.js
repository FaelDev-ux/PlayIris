import { createInput } from '../../components/ui/Input.js';

export function registerPage(container) {
    container.innerHTML = `
        <div class="min-h-screen bg-gelo-artico flex items-center justify-center p-8">
            <form id="form-registro" class="bg-branco-porcelana border-neo shadow-neo-soft rounded-neo p-card-p w-full max-w-md flex flex-col gap-4">
                <h1 class="text-azul-meia-noite text-2xl font-bold mb-2">Criar Conta</h1>
                <!-- Componentes dinâmicos entram aqui -->
            </form>
        </div>
    `;

    const form = container.querySelector('#form-registro');

    const inputNome = createInput({ 
        label: 'NOME COMPLETO', 
        placeholder: 'Ex: Dra. Mariana Costa' 
    });
    
    const inputEmail = createInput({ 
        label: 'E-MAIL', 
        type: 'email', 
        placeholder: 'seuemail@exemplo.com' 
    });

    form.append(inputNome, inputEmail);

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Dados:', inputNome.getValue(), inputEmail.getValue());
    });

    return function desmontar() {
        container.innerHTML = '';
    };
}