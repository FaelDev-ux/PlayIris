const buttonVariants = {
  primary: `
    bg-azul-iris
    text-white
    shadow-neo-solid
    hover:bg-blue-600
  `,

  outline: `
    bg-branco-porcelana
    text-azul-meia-noite
    shadow-neo-solid
    hover:bg-gelo-artico
  `
};

export function createButton({
  text,
  type = 'button',
  variant = 'primary',
  iconSrc = ''
}) {
  const button = document.createElement('button');

  button.type = type;

  button.className = `
    flex
    min-h-touch-target
    w-full
    items-center
    justify-center
    gap-2
    rounded-neo
    border-neo-thin
    px-4
    py-3
    mb-2
    text-sm
    font-bold
    cursor-pointer
    transition-all
    hover:-translate-y-0.5
    active:translate-y-0
    ${buttonVariants[variant]}
  `;

  if (iconSrc) {
    const icon = document.createElement('img');

    icon.src = iconSrc;
    icon.alt = '';
    icon.className = 'h-4 w-4';
    icon.setAttribute('aria-hidden', 'true');

    button.append(icon);
  }

  const textElement = document.createElement('span');
  textElement.textContent = text;

  button.append(textElement);

  return button;
}