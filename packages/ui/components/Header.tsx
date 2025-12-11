import { ReactNode } from "react";
import { cn } from "../lib/utils";

type HeaderProps = {
  logo: ReactNode;
  children?: ReactNode;
  className?: string;
};

export function Header({ logo, children, className = "" }: HeaderProps) {
  return (
    <header
      className={cn(
        `flex flex-row items-center justify-between min-h-24 w-full max-w-2xl`,
        className,
      )}
    >
      <div className="font-bold text-2xl">{logo}</div>
      <nav className="flex items-center gap-4">{children}</nav>
    </header>
  );
}
