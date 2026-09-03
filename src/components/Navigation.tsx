import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import ampLogo from "@/assets/amp-logo-white.png";
import { useNavigate, useLocation, Link } from "react-router-dom";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const progress = scrollHeight > 0 ? (scrolled / scrollHeight) * 100 : 0;
      setScrollProgress(progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setIsMobileMenuOpen(false);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        setIsMobileMenuOpen(false);
      }
    }
  };

  const navItems = [
    { label: "Services", id: "services" },
    { label: "Process", id: "process" },
    { label: "About", id: "about" },
    { label: "Stories", id: "stories" },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className="fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/90 shadow-lg backdrop-blur-xl transition-all duration-300 animate-fade-in"
    >
      <div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-amber transition-all duration-200 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            onClick={(e) => {
              if (location.pathname === "/") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-3 text-left transition-all duration-300 hover:text-primary"
            aria-label="Go to home"
          >
            <span className="flex h-10 w-10 items-center justify-center border border-border bg-card/70 transition-colors duration-300 group-hover:border-primary">
              <img src={ampLogo} alt="" className="h-8 w-8 object-contain" aria-hidden="true" />
            </span>
            <span className="hidden sm:block">
              <span className="block font-display text-base font-semibold leading-none text-foreground group-hover:text-primary">
                Anti Matrix
              </span>
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                Startup systems
              </span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="group relative font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-all duration-300 hover:text-foreground animate-fade-in"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                {item.label}
                <span className="absolute -bottom-2 left-0 h-px w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}

            {/* Custom Link: Control Deck */}
            <Link
              to="/control-deck"
              className={`group relative font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 animate-fade-in ${
                location.pathname === "/control-deck" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${navItems.length * 0.08}s` }}
            >
              Control Deck
              <span className={`absolute -bottom-2 left-0 h-px bg-primary transition-all duration-300 ${
                location.pathname === "/control-deck" ? "w-full" : "w-0 group-hover:w-full"
              }`} />
            </Link>

            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 animate-fade-in"
              style={{ animationDelay: `${(navItems.length + 1) * 0.08}s` }}
            >
              Start Diagnostic
            </a>
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="border border-border p-2 text-foreground transition-colors duration-300 hover:border-primary md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-4 border border-border bg-card/95 p-4 shadow-xl animate-fade-in md:hidden">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={`/#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.id);
                }}
                className="block w-full border-b border-border py-3 text-left font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground transition-all duration-300 last:border-b-0 hover:text-foreground animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.label}
              </a>
            ))}

            <Link
              to="/control-deck"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`block w-full border-b border-border py-3 text-left font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 animate-fade-in ${
                location.pathname === "/control-deck" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground hover:text-foreground"
              }`}
              style={{ animationDelay: `${navItems.length * 0.05}s` }}
            >
              Control Deck
            </Link>

            <a
              href="/#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("contact");
              }}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 mt-4 w-full bg-primary text-primary-foreground transition-all duration-300 hover:bg-primary/90 animate-fade-in"
              style={{ animationDelay: `${(navItems.length + 1) * 0.05}s` }}
            >
              Start Diagnostic
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
