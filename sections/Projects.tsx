import React from 'react';
import ProjectCard from '../components/ProjectCard';

const projects = [
  {
    title: 'Project Alpha',
    description: 'A full-stack e-commerce platform built with Next.js, Node.js, and MongoDB. Features user authentication, product catalog, and payment integration.',
    imageUrl: '/images/project1.png',
    technologies: ['Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    liveLink: 'https://projectalpha.example.com',
    githubLink: 'https://github.com/yourusername/project-alpha',
  },
  {
    title: 'Project Beta',
    description: 'A real-time chat application using WebSockets, React, and a custom Node.js backend. Supports private and group chats, emoji support, and user presence.',
    imageUrl: '/images/project2.png',
    technologies: ['React', 'Node.js', 'Socket.IO', 'PostgreSQL', 'CSS Modules'],
    liveLink: 'https://projectbeta.example.com',
    githubLink: 'https://github.com/yourusername/project-beta',
  },
  // Add more projects here
  {
    title: 'Project Gamma',
    description: 'A personal blogging platform with Markdown support, server-side rendering, and a robust admin panel for content management.',
    imageUrl: '/images/project1.png',
    technologies: ['Next.js', 'TypeScript', 'Strapi CMS', 'GraphQL', 'Tailwind CSS'],
    liveLink: 'https://projectgamma.example.com',
    githubLink: 'https://github.com/yourusername/project-gamma',
  },
];

const Projects: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-6xl animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-light text-center mb-12">
        My <span className="text-primary">Projects</span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default Projects;
