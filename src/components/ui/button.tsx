"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  /**
   * Render the single child element (misalnya <Link>) alih-alih <button>,
   * dengan seluruh styling tombol diteruskan ke child tersebut.
   */
  asChild?: boolean;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink text-paper hover:bg-ink/85 disabled:bg-ink/40 dark:bg-paper dark:text-ink dark:hover:bg-paper/85",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/70",
  outline:
    "border border-border bg-transparent hover:bg-muted",
  ghost: "hover:bg-muted",
  danger: "bg-destructive text-destructive-foreground hover:bg-destructive/85",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const baseClasses =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:focus:ring-offset-background";

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      children,
      disabled,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const classes = cn(baseClasses, variants[variant], sizes[size], className);
    const isInactive = Boolean(disabled || loading);

    if (asChild && React.isValidElement(children)) {
      const child = children as React.ReactElement<Record<string, any>>;
      const childProps = (child.props ?? {}) as {
        className?: string;
        children?: React.ReactNode;
      };

      return React.cloneElement(child, {
        ...props,
        ref: ref as unknown as React.Ref<any>,
        "aria-disabled": isInactive ? true : undefined,
        className: cn(
          classes,
          childProps.className,
          isInactive && "pointer-events-none opacity-50"
        ),
        children: (
          <>
            {loading && <Spinner />}
            {childProps.children}
          </>
        ),
      } as any);
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Spinner />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";

export { Button };
