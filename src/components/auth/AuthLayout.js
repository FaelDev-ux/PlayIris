import { createAuthPresentation } from './AuthPresentation.js';

export function createAuthLayout(formElement, headingId) {
  const layout = document.createElement('main');
  const formPanel = document.createElement('section');

  layout.className = `
    mx-auto
    grid
    min-h-[calc(100vh-8px)]
    max-w-7xl
    grid-cols-1
    lg:grid-cols-[1.15fr_0.85fr]
  `;

  formPanel.className = 'flex items-center justify-center px-8 py-4';
  formPanel.setAttribute('aria-labelledby', headingId);

  formPanel.append(formElement);

  layout.append(
    createAuthPresentation(),
    formPanel
  );

  return layout;
}