export function GameArea({ children }) {
  return (
    <section aria-label="Área do jogo" className="min-h-0 flex-1 overflow-hidden">
      <div className="relative h-full w-full">
        {children}
      </div>
    </section>
  );
}
