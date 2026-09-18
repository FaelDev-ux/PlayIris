import { createRegisterForm } from '../../components/auth/RegisterForm.js';
import irisMascot from '../../assets/images/iris-gamepad.webp';

export function registerPage(container) {
    container.innerHTML = `
        <div class="min-h-screen bg-gelo-artico">
            <!--Faxia colorida do topo-->
            <div class="grid h-2 grid-cols-5" aria-hidden="true">
                <span class="bg-verde-salvia"></span>
                <span class="bg-ciano-fluido"></span>
                <span class="bg-azul-iris"></span>
                <span class="bg-lilas-cognitivo"></span>
                <span class="bg-coral-suave"></span>
            </div>

            <!--Corpo principal-->
            <div class="mx-auto grid min-h-[calc(100vh-8px)] max-w-7xl grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
                <section class="flex flex-col items-center justify-center p-8" aria-labelledby="iris-heading">
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
                </section>

                <section
                    id="register-panel"
                    class="flex items-center justify-center p-8"
                    aria-labelledby="register-heading"
                    >
                </section>
            </div>
        </div>
    `;
    const registerPanel = container.querySelector('#register-panel');
    const registerForm = createRegisterForm();

    registerPanel.append(registerForm);

    return function desmontar() {
        container.innerHTML = '';
    };
}