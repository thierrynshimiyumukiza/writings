interface SkillBadgeProps {
  skill: string;
  className?: string;
}

export default function SkillBadge({ skill, className = "" }: SkillBadgeProps) {
  return (
    <span className={`skill-badge ${className}`}>
      {skill}
    </span>
  );
}
