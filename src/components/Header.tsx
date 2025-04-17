
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Menu, X } from "lucide-react";
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-8 flex items-center justify-between border-b">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-bold text-primary">
          Ricto
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        <Link to="/explore" className="font-medium hover:text-primary transition-colors">
          Explorar
        </Link>
        <Link to="/chat" className="font-medium hover:text-primary transition-colors">
          Hablar con Jamito
        </Link>
        <Link to="/favorites" className="font-medium hover:text-primary transition-colors flex items-center gap-1">
          <Heart size={18} />
          Favoritos
        </Link>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu size={24} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[80%] sm:w-[350px]">
            <div className="flex flex-col h-full">
              <div className="flex justify-end mb-6">
                <Button variant="ghost" size="icon">
                  <X size={24} />
                </Button>
              </div>
              <nav className="flex flex-col gap-6">
                <Link to="/explore" className="text-xl font-medium hover:text-primary transition-colors">
                  Explorar
                </Link>
                <Link to="/chat" className="text-xl font-medium hover:text-primary transition-colors">
                  Hablar con Jamito
                </Link>
                <Link to="/favorites" className="text-xl font-medium hover:text-primary transition-colors flex items-center gap-2">
                  <Heart size={20} />
                  Favoritos
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;
