import React from 'react';
import { IconType } from 'react-icons';

interface SkillBadgeProps {
  name: string;
  icon: IconType;
}

const SkillBadge: React.FC<SkillBadgeProps> = ({ name, icon: Icon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md dark:shadow-xl hover:shadow-lg dark:hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
      <Icon size={40} className="text-primary mb-3" />
      <p className="text-gray-800 dark:text-light font-medium text-sm text-center">{name}</p>
    </div>
  );
};

export default SkillBadge;
