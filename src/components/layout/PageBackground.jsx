import { ColorBar } from "../ui/ColorBar.jsx";
import cn from "../../utils/cn.js";

export function PageBackground({ children, className, contentClassName }) {
  return (
    <div className={cn('relative isolate min-h-screen bg-gelo-artico flex flex-col', className)}>
      <ColorBar />
      <div className={cn('flex-1', contentClassName)}>{children}</div>
    </div>
  );
}
