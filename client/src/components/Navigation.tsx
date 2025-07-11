import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import hackerImage from "@assets/hacker-25926_1752222934684.png";

export default function Navigation() {
  const [location] = useLocation();
  const { isAuthenticated, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/archive", label: "Archive" },
    ...(isAuthenticated ? [{ href: "/admin", label: "Admin" }] : []),
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-deep-blue-900/95 backdrop-blur-md border-b border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <img 
                className="h-8 w-8 rounded-full avatar-glow" 
                src={hackerImage} 
                alt="Hacker Logo" 
              />
              <span className="ml-2 text-xl font-bold text-electric-400">Hacker's Blog</span>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link px-3 py-2 text-sm font-medium transition-colors ${
                    location === item.href
                      ? "text-electric-400"
                      : "text-slate-200 hover:text-electric-400"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {!isAuthenticated && (
                <Button
                  onClick={() => window.location.href = "/api/login"}
                  className="bg-electric-500 hover:bg-electric-600 text-white"
                >
                  Login
                </Button>
              )}
              {isAuthenticated && (
                <Button
                  onClick={() => window.location.href = "/api/logout"}
                  variant="outline"
                  className="border-electric-400 text-electric-400 hover:bg-electric-400/10"
                >
                  Logout
                </Button>
              )}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-200 hover:text-electric-400"
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-deep-blue-900/95 backdrop-blur-md border-t border-slate-700">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium transition-colors ${
                  location === item.href
                    ? "text-electric-400"
                    : "text-slate-200 hover:text-electric-400"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {!isAuthenticated && (
              <Button
                onClick={() => window.location.href = "/api/login"}
                className="w-full bg-electric-500 hover:bg-electric-600 text-white mt-2"
              >
                Login
              </Button>
            )}
            {isAuthenticated && (
              <Button
                onClick={() => window.location.href = "/api/logout"}
                variant="outline"
                className="w-full border-electric-400 text-electric-400 hover:bg-electric-400/10 mt-2"
              >
                Logout
              </Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
