import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";

const variantClasses: Record<ButtonVariant, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    ghost: "btn-ghost",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
};

type LinkButtonProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    variant?: ButtonVariant;
    href: string;
};

export function Button({
    variant = "primary",
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            type="button"
            className={cn(variantClasses[variant], className)}
            {...props}
        >
            {children}
        </button>
    );
}

export function LinkButton({
    variant = "primary",
    href,
    className,
    children,
    ...props
}: LinkButtonProps) {
    const isExternal = href.startsWith("http");
    const Comp = isExternal ? "a" : Link;
    return (
        <Comp
            href={href}
            className={cn(variantClasses[variant], className)}
            {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
            {...props}
        >
            {children}
        </Comp>
    );
}
