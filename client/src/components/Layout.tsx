import { ReactNode } from "react";
import Navigation from "./Navigation";
import MatrixBackground from "./MatrixBackground";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-deep-blue-900 text-slate-200 font-inter">
      <MatrixBackground />
      <div className="scanline"></div>
      <Navigation />
      <main className="pt-16">{children}</main>
      <footer className="bg-deep-blue-800/50 border-t border-slate-700 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-bold text-electric-400 mb-4">Hacker's Blog</h4>
              <p className="text-slate-400">
                Exploring the depths of cybersecurity through reverse engineering, exploit development, and security research.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-electric-400 mb-4">Categories</h4>
              <ul className="space-y-2 text-slate-400">
                <li><a href="#" className="hover:text-electric-400">Reverse Engineering</a></li>
                <li><a href="#" className="hover:text-electric-400">Exploit Development</a></li>
                <li><a href="#" className="hover:text-electric-400">Malware Analysis</a></li>
                <li><a href="#" className="hover:text-electric-400">Web Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold text-electric-400 mb-4">Connect</h4>
              <div className="flex space-x-4">
                <a href="#" className="social-icon"><i className="fab fa-github"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-linkedin"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-twitter"></i></a>
                <a href="#" className="social-icon"><i className="fab fa-discord"></i></a>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Hacker's Blog. All rights reserved. | Built with security in mind.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
