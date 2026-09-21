import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { Button } from "@/components/ui/button";
import { useEnquiryDialog } from "@/components/EnquiryDialogContext";
import { cn } from "@/lib/utils";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { openEnquiryDialog } = useEnquiryDialog();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Track scroll for header background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-shadow duration-200",
        isScrolled ? "shadow-md" : "shadow-none"
      )}
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-hotel flex items-center justify-between h-16 md:h-[72px]">
        {/* Logo */}
        <Link
          to="/"
          className="font-[Fraunces] text-[22px] md:text-[24px] font-semibold text-[#0F3D3E] tracking-tight hover:opacity-80 transition-opacity"
        >
          {siteConfig.name}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-[16px] font-medium transition-colors hover:text-[#0F3D3E]",
                location.pathname === item.href
                  ? "text-[#0F3D3E]"
                  : "text-[#4A5553]"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <Button size="default" onClick={() => openEnquiryDialog()}>
            Book now
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 rounded-[10px] text-[#0F3D3E] hover:bg-[#EDE8DC] transition-colors"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile slide-in menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-40 md:hidden transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <nav className="flex flex-col items-center justify-start gap-2 pt-8 px-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "w-full text-center py-4 text-[18px] font-medium rounded-[10px] transition-colors min-h-[48px] flex items-center justify-center",
                location.pathname === item.href
                  ? "text-[#0F3D3E] bg-[#EDE8DC]"
                  : "text-[#4A5553] hover:bg-[#EDE8DC]"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-full mt-6 px-4">
            <Button
              size="lg"
              className="w-full"
              onClick={() => openEnquiryDialog()}
            >
              Book now
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
