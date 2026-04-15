import React from 'react';

const About: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl text-center animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-light mb-8">
        About <span className="text-primary">Me</span>
      </h2>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        Hello! I'm Your Name, a dedicated full-stack developer with a passion for building innovative and efficient web solutions.
        My journey in technology began with a curiosity for how things work, evolving into a commitment to creating impactful digital experiences.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        With a strong foundation in both front-end and back-end development, I specialize in crafting responsive user interfaces
        and robust server-side logic. I thrive on solving complex problems and continuously learning new technologies to stay at the forefront of the industry.
      </p>
      <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
        Outside of coding, I enjoy [Your Hobby 1, e.g., hiking, reading, gaming] and [Your Hobby 2, e.g., exploring new cafes, photography].
        I believe in a balanced approach to life and work, which fuels my creativity and problem-solving skills.
      </p>
    </div>
  );
};

export default About;
