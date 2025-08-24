"use client";

import React from "react";
import { cn } from "@/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardCard({ className, children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border border-gray-700 bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
