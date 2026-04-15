import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from 'react-icons/fa';

interface SocialLink {
  name: string;
  icon: React.ElementType;
  url: string;
}

const socialLinks: SocialLink[] = [
  { name: 'GitHub', icon: FaGithub, url: 'https://github.com/yourusername' },
  { name: 'LinkedIn', icon: FaLinkedin, url: 'https://linkedin.com/in/yourusername' },
  { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com/yourusername' },
  { name: 'Email', icon: FaEnvelope, url: 'mailto:your.email@example.com' },
];

const SocialLinks: React.FC = () => {
  return (
    <div className="flex space-x-6">
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-700 dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-300"
          aria-label={link.name}
        >
          <link.icon size={28} />
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;
