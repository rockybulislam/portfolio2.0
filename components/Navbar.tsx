"use client";

import Link from "next/link";
import {
  Moon,
  Sun,
  LayoutDashboard,
  Home,
  ShoppingBag,
  Settings,
  Terminal,
  Boxes,
  Phone,
} from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const ThemeToggle = () => {
  const { setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:text-primary">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default function Navbar() {
  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Projects", href: "/products", icon: Boxes },
    { name: "Contact", href: "/dashboard", icon: Phone },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  // Theme Switcher Component (Reuse for Web & Mobile)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/40">
      <div
        className="
        mx-auto grid h-16 w-full max-w-7xl grid-cols-[1fr_1fr] md:grid-cols-[1fr_auto_1fr] items-center px-4"
      >
        {/* --- LEFT SECTION: LOGO --- */}
        <Link
          href="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <span className="text-xl font-bold tracking-tighter text-foreground">
            ROCKY<span className="text-primary">DEV</span>
          </span>
        </Link>

        {/* --- CENTER SECTION: WEB MENU --- */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="transition-colors hover:text-primary text-muted-foreground"
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* --- RIGHT SECTION: WEB THEME TOGGLE --- */}
        <div className="hidden md:block ml-auto pr-4">
          <ThemeToggle />
        </div>

        {/* --- MOBILE SECTION: HUMBURGER --- */}
        <div className="md:hidden justify-self-end">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Terminal className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-75 bg-background">
              <SheetHeader className="text-left border-b pb-4">
                <SheetTitle className="flex items-center gap-2 text-primary">
                  <LayoutDashboard className="h-6 w-6" />
                  Menu
                </SheetTitle>
              </SheetHeader>

              <div className="flex flex-col gap-4 py-6">
                {/* Theme Toggle (Mobile view তে বামে থাকবে) */}
                <div className="flex items-center justify-between px-2 py-2 bg-accent/20 rounded-lg">
                  <span className="text-sm font-medium">Switch Theme</span>
                  <ThemeToggle />
                </div>

                {/* Nav Links */}
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
