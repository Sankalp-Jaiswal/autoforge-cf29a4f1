import React from 'react';
import TimelineItem from '../components/TimelineItem';

const experiences = [
  {
    title: 'Senior Software Engineer',
    subtitle: 'Tech Innovators Inc.',
    date: 'Jan 2022 - Present',
    description: 'Led a team of 5 engineers in developing and deploying scalable microservices using Node.js and AWS. Implemented CI/CD pipelines and improved system reliability by 30%.',
  },
  {
    title: 'Software Developer',
    subtitle: 'Web Solutions Co.',
    date: 'Jul 2019 - Dec 2021',
    description: 'Developed and maintained full-stack web applications using React, Express, and PostgreSQL. Contributed to significant feature rollouts and bug fixes, enhancing user experience. ',
  },
  {
    title: 'Junior Developer',
    subtitle: 'Startup X',
    date: 'Aug 2018 - Jun 2019',
    description: 'Assisted in the development of front-end components and RESTful APIs. Gained hands-on experience with modern JavaScript frameworks and agile methodologies.',
  },
];

const Experience: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl animate-fadeInUp">
      <h2 className="text-4xl font-bold text-gray-900 dark:text-light text-center mb-12">
        My <span className="text-primary">Experience</span>
      </h2>
      <div className="relative wrap overflow-hidden p-10 h-full">
        <div className="border-2-2 absolute border-opacity-20 border-primary h-full border left-1/2 transform -translate-x-1/2"></div>
        {experiences.map((item, index) => (
          <TimelineItem key={index} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Experience;
