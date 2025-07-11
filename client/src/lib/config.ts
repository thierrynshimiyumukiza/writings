export const config = {
  site: {
    name: "Hacker's Blog",
    description: "Security research and reverse engineering blog",
    url: import.meta.env.VITE_SITE_URL || "https://hackerblog.example.com",
  },
  author: {
    name: "Hacker",
    email: "hacker@example.com",
    bio: "Security researcher specializing in reverse engineering and exploit development",
  },
  socialLinks: [
    {
      name: "GitHub",
      url: "https://github.com/username",
      icon: "fab fa-github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/username",
      icon: "fab fa-linkedin",
    },
    {
      name: "Instagram",
      url: "https://instagram.com/username",
      icon: "fab fa-instagram",
    },
    {
      name: "Facebook",
      url: "https://facebook.com/username",
      icon: "fab fa-facebook",
    },
  ],
  skills: [
    "Reverse Engineering",
    "Ghidra",
    "x64dbg",
    "IDA",
    "Web Exploits",
    "Assembly",
    "Malware Analysis",
    "Exploit Dev",
    "Network Forensics",
    "Linux Debugging",
    "Cryptography",
    "Python Automation",
  ],
};
