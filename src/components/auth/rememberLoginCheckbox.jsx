import { Checkbox } from "../ui/Checkbox.jsx";
export function RememberLoginCheckbox() {
  return (
    <div className="my-5">
      {}
      <Checkbox id="remember" name="remember">
        <span className="text-sm font-extrabold text-azul-meia-noite">
          Lembrar de mim neste dispositivo
        </span>
      </Checkbox>
    </div>
  );
}
