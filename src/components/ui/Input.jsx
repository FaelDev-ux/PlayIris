const gerarIdUnico = () => `input-${Math.random().toString(36).substring(2, 9)}`;

export function createInput({
  label,
  type = "text",
  placeholder = "",
  id = gerarIdUnico(),
  required = false,
  name = id,
  autocomplete = "",
  minLength,
  topLink = false,
  onInputCallback,
}) {
  
  let inputElement;
  let spanErro;

  const wrapper = (
    <div className="flex flex-col gap-1 mb-4 w-full">
      {type === "password" && topLink && (
        <span className="text-azul-iris text-xs flex-end font-bold cursor-pointer z-1 -mb-5 flex justify-end">
          Esqueceu a senha?
        </span>
      )}

      <label
        htmlFor={id}
        className="text-azul-meia-noite text-xs font-black uppercase tracking-wide"
      >
        {label}
      </label>

      <input
        ref={(el) => inputElement = el}
        className="w-full max-w-100 bg-branco-porcelana text-azul-meia-noite border-neo rounded-neo px-4 py-3 min-h-touch-target placeholder:text-cinza-ardosia placeholder:font-semibold focus:outline-none focus:ring-4 focus:ring-azul-iris/30 focus:border-azul-iris transition-all border-azul-meia-noite"
        type={type}
        id={id}
        placeholder={placeholder}
        name={name}
        autoComplete={autocomplete}
        minLength={minLength}
        required={required}
        onInput={(event) => { 
            if (onInputCallback && typeof onInputCallback === "function") {
                onInputCallback(event.target.value, event);
            }
        }}
      />

      <span
        ref={(el) => spanErro = el}
        className="text-coral-suave text-xs font-semibold hidden"
        id={`${id}-erro`}
        aria-live="polite"
      ></span>
    </div>
  );

  wrapper.getValue = () => inputElement.value;

  wrapper.setError = (mensagem) => {
    if (mensagem) {
      spanErro.textContent = mensagem;
      spanErro.classList.remove("hidden");
      
      inputElement.setAttribute("aria-invalid", "true");
      inputElement.setAttribute("aria-describedby", spanErro.id);
      inputElement.classList.replace("border-azul-meia-noite", "border-coral-suave");
    } else {
      spanErro.textContent = "";
      spanErro.classList.add("hidden");
      
      inputElement.removeAttribute("aria-invalid");
      inputElement.removeAttribute("aria-describedby");
      inputElement.classList.replace("border-coral-suave", "border-azul-meia-noite");
    }
  };

  return wrapper;
}