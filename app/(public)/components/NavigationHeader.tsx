"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CurrentDate from "./CurrentDate";

const NavigationHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    { label: "Inicio", href: "/" },
    { label: "Consultar Estado", href: "/document-tracking" },
  ];

  return (
    <nav className="flex items-center">
      <div className="hidden md:flex items-center space-x-6">
        {navigationItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`text-sm font-semibold transition-colors ${
              pathname === item.href
                ? "text-amber-400 border-b-2 border-amber-400"
                : "text-gray-200"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className="md:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:text-blue-200"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              {/* 
        <div className="sm:hidden mt-3 text-center">
          <h1 className="text-lg font-bold">Mesa de Partes Virtual</h1>
          <CurrentDate />
        </div>
         */}
              <SheetTitle>Mesa de Partes Virtual</SheetTitle>
              <SheetDescription>
                <CurrentDate />
              </SheetDescription>
            </SheetHeader>
            <div className="flex flex-col space-y-4 mt-6 items-center">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`text-sm font-semibold transition-colors ${
                    pathname === item.href
                      ? "text-amber-600 border-b-2 border-amber-600"
                      : "text-gray-900"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default NavigationHeader;
