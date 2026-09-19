import irisMascot from '../../assets/images/iris-gamepad.webp';

export function createAuthPresentation() {

  const presentation = document.createElement('section');

  presentation.className = 'flex flex-col items-center justify-center p-8';

  presentation.setAttribute('aria-labelledby', 'iris-heading');

  presentation.innerHTML = `
    <div class="inline-flex items-center gap-2 rounded-full border-neo-thin bg-branco-porcelana px-4 py-2 text-xs font-bold uppercase">
        <span class="h-3 w-3 border rounded-full bg-azul-iris" aria-hidden="true"></span>
        Plataforma íris • Apoio ao neurodesenvolvimento
    </div>
    
    <img
        src="${irisMascot}"
        alt="Mascote urso segurando um controle colorido"
        class="mt-8 w-48 sm:w-56 lg:w-64"
    />
    <h1 id="iris-heading" class="mt-4 text-4xl font-extrabold lowercase tracking-tight">
        Íris
    </h1>
      <p class=" text-center mt-2 max-w-lg text-base font-semibold leading-relaxed text-cinza-ardosia">
        Apoiando o desenvolvimento no ritmo de cada criança, com carinho, tecnologia e acolhimento.
    </p>
    
    <ul class="mt-5 grid w-full max-w-md grid-cols-1 gap-3 sm:grid-cols-2" aria-label="Benefícios da Plataforma Íris">
        <li class="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin bg-branco-porcelana px-3 py-2 text-xs font-bold">
            <span class="h-3 w-3 border shrink-0 rounded-full bg-lilas-cognitivo " aria-hidden="true"></span>
            Ambiente Seguro & LGPD
        </li>
        <li class="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin bg-branco-porcelana px-3 py-2 text-xs font-bold">
            <span class="h-3 w-3 border shrink-0 rounded-full bg-verde-salvia" aria-hidden="true"></span>
            Metodologia Lúdica & Neuro
        </li>
        <li class="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin bg-branco-porcelana px-3 py-2 text-xs font-bold">
            <span class="h-3 w-3 border shrink-0 rounded-full bg-coral-suave" aria-hidden="true"></span>
            Gamificação Acolhedora
        </li>
        <li class="flex min-h-touch-target items-center gap-2 rounded-neo border-neo-thin bg-branco-porcelana px-3 py-2 text-xs font-bold">
          <span class="h-3 w-3 border shrink-0 rounded-full bg-ciano-fluido" aria-hidden="true"></span>
          Suporte TEA Individualizado
        </li>
    </ul>
    
    <p class="mb-0 mt-8 text-xs font-medium text-cinza-ardosia">
        © 2026 Plataforma Íris. Todos os direitos reservados.
    </p>
  `;

  return presentation;
}