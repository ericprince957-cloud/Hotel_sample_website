import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-[16px] font-medium font-[Manrope] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8893B] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-[#0F3D3E] text-[#FAF8F3] hover:bg-[#0a2e2f] active:bg-[#072021]",
        outline:
          "border border-[#0F3D3E] bg-transparent text-[#0F3D3E] hover:bg-[#0F3D3E] hover:text-[#FAF8F3]",
        ghost:
          "bg-transparent text-[#0F3D3E] hover:bg-[#EDE8DC]",
        accent:
          "bg-[#B8893B] text-[#14211F] hover:bg-[#a07a33] active:bg-[#8a6a2c]",
        link:
          "text-[#0F3D3E] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-[14px]",
        lg: "h-12 px-8 text-[18px]",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
