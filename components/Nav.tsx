"use client";

import { Button } from "./ui/button";
import { Moon, Sun, BarChart3, Home } from "lucide-react";
import Github from "./logos/GitHub";
import pkg from "@/package.json";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Nav = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  return (
    <div
      className={"fixed top-0 w-full px-4 py-2 flex items-center justify-between h-14 z-50 backdrop-blur-sm bg-background/80 border-b border-border/40"}
    >
      <div className={"flex items-center gap-4"}>
        <Link href="/">
          <Button
            variant={pathname === "/" ? "secondary" : "ghost"}
            className={"flex items-center gap-1.5 rounded-full"}
          >
            <Home className="size-4" />
            <span>Home</span>
          </Button>
        </Link>
        <Link href="/dashboard">
          <Button
            variant={pathname === "/dashboard" ? "secondary" : "ghost"}
            className={"flex items-center gap-1.5 rounded-full"}
          >
            <BarChart3 className="size-4" />
            <span>Dashboard</span>
          </Button>
        </Link>
      </div>
      <div className={"flex items-center gap-1"}>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          variant={"ghost"}
          className={"flex items-center gap-1.5 rounded-full"}
        >
          <span>
            {theme === "dark" ? (
              <Sun className={"size-4"} />
            ) : (
              <Moon className={"size-4"} />
            )}
          </span>
          <span>{theme === 'dark' ? "Light" : "Dark"} Mode</span>
        </Button>
      </div>
    </div>
  );
};
