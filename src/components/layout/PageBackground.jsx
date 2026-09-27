import { createColorBar } from '../ui/ColorBar.jsx';

export function PageBackground({ children }) {
  return (
    <div className="min-h-screen bg-gelo-artico flex flex-col">
      {createColorBar()}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
}