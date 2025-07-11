import TerminalWindow from "@/components/TerminalWindow";
import SkillBadge from "@/components/SkillBadge";
import { config } from "@/lib/config";
import hackerImage from "@assets/hacker-25926_1752222934684.png";

export default function About() {
  const skills = {
    "Reverse Engineering": ["Ghidra", "IDA Pro", "x64dbg", "Radare2", "Assembly"],
    "Exploit Development": ["Buffer Overflows", "ROP Chains", "Shellcoding", "Heap Exploitation"],
    "Security Research": ["Malware Analysis", "Network Forensics", "Cryptography", "Web Exploits", "Linux Debugging"],
    "Programming": ["Python", "C/C++", "JavaScript", "Bash", "PowerShell"]
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-electric-400 mb-4">About Me</h2>
          <p className="text-slate-400 text-lg">Security researcher specializing in reverse engineering and exploit development</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="mb-8">
              <img 
                className="w-48 h-48 rounded-full mx-auto md:mx-0 avatar-glow object-cover" 
                src={hackerImage} 
                alt="Hacker Profile" 
              />
            </div>
            
            <h3 className="text-2xl font-bold text-electric-400 mb-4">Security Researcher</h3>
            <p className="text-slate-300 mb-6 leading-relaxed">
              Passionate about uncovering vulnerabilities and understanding complex systems. 
              With years of experience in <span className="highlight">reverse engineering</span>, 
              <span className="highlight">malware analysis</span>, and <span className="highlight">exploit development</span>, 
              I help organizations strengthen their security posture.
            </p>
            
            <div className="flex justify-center md:justify-start space-x-6 mb-8">
              {config.socialLinks.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url} 
                  className="social-icon hover:text-electric-400"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className={link.icon}></i>
                </a>
              ))}
            </div>
          </div>
          
          <TerminalWindow className="p-6">
            <h4 className="text-xl font-bold text-neon-400 mb-6 font-mono">$ ./skills --list</h4>
            <div className="space-y-4">
              {Object.entries(skills).map(([category, skillList]) => (
                <div key={category} className="skill-category">
                  <h5 className="text-electric-400 font-semibold mb-2">{category}</h5>
                  <div className="flex flex-wrap">
                    {skillList.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>
    </section>
  );
}
