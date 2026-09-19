const colorClasses = [
  'bg-verde-salvia',
  'bg-ciano-fluido',
  'bg-azul-iris',
  'bg-lilas-cognitivo',
  'bg-coral-suave'
];

export function createColorBar() {
  const colorBar = document.createElement('div');

  colorBar.className = 'grid h-2 grid-cols-5';
  colorBar.setAttribute('aria-hidden', 'true');

  colorClasses.forEach((colorClass) => {
    const colorStripe = document.createElement('span');

    colorStripe.className = colorClass;

    colorBar.append(colorStripe);
  });

  return colorBar;
}