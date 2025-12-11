import { Shield, Menu, X } from "lucide-react";
import { useState } from "react";

export const ShowroomHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 animate-fade-in">
      <div className="glass-panel mx-4 mt-4 px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-primary flex items-center justify-center shadow-glow">
              <Shield className="w-4 h-4 md:w-5 md:h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display font-bold text-base md:text-lg text-foreground">
                Safety<span className="text-primary">Guard</span>
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Virtual Showroom Experience</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solutions
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <button className="btn-primary-glow text-sm py-2 px-4">
              Request Quote
            </button>
          </nav>

          <button 
            className="md:hidden p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-border/30 mt-4 space-y-2 animate-fade-in">
            <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Products
            </a>
            <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Solutions
            </a>
            <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Resources
            </a>
            <a href="#" className="block py-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </a>
            <button className="btn-primary-glow text-sm py-2 w-full mt-2">
              Request Quote
            </button>
          </nav>
        )}
      </div>
    </header>
  );
};
