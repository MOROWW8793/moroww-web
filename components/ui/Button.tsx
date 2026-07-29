import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "orange" | "black" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({ variant = "orange", size = "md", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-full font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-moroww-orange",
        variant === "orange" && "bg-moroww-orange hover:bg-moroww-orange/85 text-white",
        variant === "black"  && "bg-moroww-black hover:bg-moroww-black/80 text-white",
        variant === "ghost"  && "border-2 border-moroww-black text-moroww-black hover:bg-moroww-black hover:text-white",
        size === "sm" && "px-5 py-2 text-sm",
        size === "md" && "px-7 py-3 text-base",
        size === "lg" && "px-9 py-4 text-lg",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
