import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[12px] font-medium transition-colors",
  {
    variants: {
      variant: {
        default: "bg-[#0F3D3E] text-[#FAF8F3]",
        secondary: "bg-[#EDE8DC] text-[#0F3D3E]",
        accent: "bg-[#B8893B] text-[#14211F]",
        muted: "bg-[#E2DBC9] text-[#4A5553]",
        outline: "border border-[#E2DBC9] text-[#0F3D3E]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
