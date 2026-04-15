import React from 'react';
import Image from 'next/image';
import Button from './Button';

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  technologies: string[];
  liveLink?: string;
  githubLink?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, imageUrl, technologies, liveLink, githubLink }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-light mb-2">{title}</h3>
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
        <div className="flex space-x-4">
          {liveLink && (
            <Button variant="primary" size="sm" onClick={() => window.open(liveLink, '_blank')} rel="noopener noreferrer">
              Live Demo
            </Button>
          )}
          {githubLink && (
            <Button variant="outline" size="sm" onClick={() => window.open(githubLink, '_blank')} rel="noopener noreferrer">
              GitHub
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
