import { ReactNode } from "react";

interface TerminalWindowProps {
  children: ReactNode;
  className?: string;
}

export default function TerminalWindow({ children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`terminal-window ${className}`}>
      <div className="terminal-dots"></div>
      <div className="pt-8">
        {children}
      </div>
    </div>
  );
}
