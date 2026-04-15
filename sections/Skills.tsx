import React from 'react';
import SkillBadge from '../components/SkillBadge';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaServer } from 'react-icons/fa';
import { SiNextdotjs, SiTailwindcss, SiTypescript, SiJavascript, SiMongodb, SiPostgresql, SiVercel } from 'react-icons/si';

const skills = [
  { name: 'JavaScript', icon: SiJavascript },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'React', icon: FaReact },
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'Node.js', icon: FaNodeJs },
  { name: 'Express.js', icon: FaServer }, // Using FaServer for backend/APIs
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'HTML5', icon: FaHtml5 },
  { name: 'CSS3', icon: FaCss3Alt },
  { name: 'MongoDB', icon: SiMongodb },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Git', icon: FaGitAlt },
  { name: 'Vercel', icon: SiVercel }, // Using SiVercel for Vercel
];

const Skills: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-light text-center mb-12">
        My <span className="text-primary">Skills</span>
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} icon={skill.icon} />
        ))}
      </div>
    </div>
  );
};

export default Skills;
