import { Shield, Github, Heart } from "lucide-react";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
    <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="w-6 h-6 text-neon-cyan" />
        <span className="font-bold text-lg text-foreground">
          CHAKRAVYUH<span className="text-neon-cyan">-SVAS</span>
        </span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
        <a href="#dashboard" className="hover:text-foreground transition-colors">About</a>
        <a href="#guide" className="hover:text-foreground transition-colors">Services</a>
        <a
          href="#dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-glow-cyan bg-neon-cyan/5 text-neon-cyan text-sm font-medium hover:bg-neon-cyan/10 transition-colors"
        >
          Dashboard
        </a>
      </div>
    </div>
  </nav>
);

export default Navbar;
