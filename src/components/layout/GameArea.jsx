export function GameArea({ children }) {
  return (
    <main className="flex-1 p-5 pt-0 pl-0">
      <div className="relative flex h-full w-full items-center justify-center rounded-3xl overflow-hidden">
        {children}
      </div>
    </main>
  );
}