const gerarIdUnico = () => `input-${Math.random().toString(36).substring(2, 9)}`; //para conectar input e label

export function createInput({
    label,
    type = 'text',
    placeholder = '',
    id = gerarIdUnico(),
    required = false,
    name = id,
    autocomplete = '',
    minLength,
    onInputCallback
}) {
    const wrapper = document.createElement('div');
    wrapper.className = 'flex flex-col gap-1 mb-4 w-full';

    const labelElement = document.createElement('label');
    labelElement.htmlFor = id; // Liga o rótulo ao input
    labelElement.textContent = label;
    labelElement.className = 'text-azul-meia-noite text-xs font-black uppercase tracking-wide'; 

    const inputElement = document.createElement('input');
    inputElement.id = id;
    inputElement.type = type;
    inputElement.placeholder = placeholder;
    inputElement.name = name;

    if (autocomplete) {
        inputElement.autocomplete = autocomplete;
    }

    if (minLength) {
        inputElement.minLength = minLength;
    }
    
    if (required) inputElement.required = true;

    inputElement.className = `
        w-full
        max-w-100 
        bg-branco-porcelana 
        text-azul-meia-noite
        border-neo 
        rounded-neo
        px-4 py-3 
        min-h-touch-target 
        placeholder:text-cinza-ardosia
        placeholder:font-semibold
        focus:outline-none focus:ring-4 focus:ring-azul-iris/30 focus:border-azul-iris
        transition-all
    `;

   
    const errorSpan = document.createElement('span');  //span para possíveis erros
    errorSpan.id = `${id}-erro`;
    errorSpan.className = 'text-coral-suave text-xs font-semibold hidden';
    // errorSpan.setAttribute('aria-live', 'polite'); // o leitor de tela avisa quando o texto muda

    if (onInputCallback && typeof onInputCallback === 'function') {
        inputElement.addEventListener('input', (event) => {
            onInputCallback(event.target.value, event);
        });
    }

    wrapper.appendChild(labelElement);
    wrapper.appendChild(inputElement);
    wrapper.appendChild(errorSpan);

    wrapper.getValue = () => inputElement.value; // metodo para pegar o valor do input
    
    
    wrapper.setError = (mensagem) => { // metodo para exibir erros
        if (mensagem) {
            errorSpan.textContent = mensagem;
            errorSpan.classList.remove('hidden');
            // inputElement.setAttribute('aria-invalid', 'true');
            // inputElement.setAttribute('aria-describedby', errorSpan.id);
            inputElement.classList.replace('border-azul-meia-noite', 'border-coral-suave');
        } else {
            errorSpan.classList.add('hidden');
            // inputElement.removeAttribute('aria-invalid');
            // inputElement.removeAttribute('aria-describedby');
            inputElement.classList.replace('border-coral-suave', 'border-azul-meia-noite');
        }
    };

    return wrapper;
}