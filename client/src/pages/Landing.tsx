import { Button } from "@/components/ui/button";
import TerminalWindow from "@/components/TerminalWindow";

export default function Landing() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <TerminalWindow className="p-8 max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="typewriter-text text-electric-400">Welcome to Hacker's Blog</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-400 mb-8 font-mono">
            <span className="terminal-prompt">Reverse Engineering • Exploit Development • Security Research</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.location.href = "/api/login"}
              className="btn-primary"
            >
              <i className="fas fa-user-secret mr-2"></i>
              Login to Continue
            </Button>
            <Button 
              variant="outline"
              className="btn-secondary"
            >
              <i className="fas fa-info-circle mr-2"></i>
              Learn More
            </Button>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
}
