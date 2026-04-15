import React from 'react';
import Image from 'next/image';
import { Link } from 'react-scroll';
import Button from '../components/Button';
import SocialLinks from '../components/SocialLinks';

const Hero: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center justify-center text-center md:text-left gap-12">
      <div className="flex-1 animate-fadeInUp delay-100">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-light leading-tight mb-4">
          Hi, I'm <span className="text-primary">Your Name</span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8">
          A passionate Full-Stack Developer crafting robust and scalable web applications.
        </p>
        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-8">
          <Link to="projects" smooth={true} duration={500} offset={-70}>
            <Button variant="primary" size="lg">View My Work</Button>
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg">Download Resume</Button>
          </a>
        </div>
        <SocialLinks />
      </div>
      <div className="flex-1 flex justify-center animate-fadeInUp delay-200">
        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden shadow-xl dark:shadow-2xl border-4 border-primary">
          <Image
            src="/images/profile.jpg"
            alt="Your Name's Profile Picture"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
