const colorClasses = [
  'bg-verde-salvia',
  'bg-ciano-fluido',
  'bg-azul-iris',
  'bg-lilas-cognitivo',
  'bg-coral-suave'
];

export function createColorBar() {
  return (
    <div
      className="grid h-2 grid-cols-5"
      aria-hidden="true"
    >
      {colorClasses.map((colorClass) => (
        <span className={colorClass}/>
      ))}
    </div>
  );
}