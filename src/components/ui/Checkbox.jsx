export function Checkbox({ id, name, required = false, children}) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-start gap-3 text-xs leading-relaxed text-cinza-ardosia">
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center mt-0.5">
        <input
          id={id}
          name={name}
          type="checkbox"
          required={required}
          className="peer absolute h-full w-full cursor-pointer opacity-0"
        />

        <div className="pointer-events-none h-full w-full rounded border-neo-thin bg-branco-porcelana transition-colors peer-checked:bg-azul-iris peer-focus-visible:ring-2 peer-focus-visible:ring-azul-iris/50"></div>

        <svg
          className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="4"
        >
          <path
            strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      <div className="flex-1">
        {children}      
      </div>
    </label>
  );
}