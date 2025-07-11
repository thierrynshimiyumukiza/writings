import { useEffect, useRef } from "react";

export default function MatrixBackground() {
  const matrixRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!matrixRef.current) return;

    const matrixBg = matrixRef.current;
    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    // Clear existing chars
    matrixBg.innerHTML = '';
    
    for (let i = 0; i < 50; i++) {
      const char = document.createElement('div');
      char.className = 'matrix-char';
      char.textContent = chars[Math.floor(Math.random() * chars.length)];
      char.style.left = Math.random() * 100 + '%';
      char.style.animationDelay = Math.random() * 20 + 's';
      char.style.animationDuration = (Math.random() * 10 + 10) + 's';
      matrixBg.appendChild(char);
    }
  }, []);

  return <div ref={matrixRef} className="matrix-bg" />;
}
