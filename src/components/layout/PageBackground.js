import { createColorBar } from '../ui/ColorBar.js';

export function createPageBackground() {
  const page = document.createElement('div');
  const content = document.createElement('div');

  page.className = 'min-h-screen bg-gelo-artico';

  page.append(
    createColorBar(),
    content
  );

  return {
    page,
    content
  };
}