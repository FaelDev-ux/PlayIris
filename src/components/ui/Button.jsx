import cn from "../../utils/cn";

const buttonVariants = {
  primary: "bg-azul-iris text-white shadow-neo-solid hover:bg-blue-600",
  outline: "bg-branco-porcelana text-azul-meia-noite shadow-neo-solid hover:bg-gelo-artico",
};

export function Button({
  text,
  type = "button",
  variant = "primary",
  iconSrc = "",
  onClick,
  className,
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={cn(
        "flex min-h-touch-target w-full items-center justify-center gap-2",
        "rounded-neo border-neo-thin px-4 py-3 mb-2",
        "text-sm font-bold cursor-pointer transition-all",
        "hover:-translate-y-0.5 active:translate-y-0",
        buttonVariants[variant],
        className,
      )}
    >
      {iconSrc && (
        <img src={iconSrc} alt="" className="h-4 w-4" aria-hidden="true" />
      )}

      {text && <span>{text}</span>}
    </button>
  );
}
