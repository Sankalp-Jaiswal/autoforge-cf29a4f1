import React from 'react';

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, subtitle, date, description }) => {
  return (
    <div className="mb-8 flex justify-between items-center w-full right-timeline">
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full"></div>
      <div className="order-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-xl w-5/12 px-6 py-4 transform hover:scale-105 transition-transform duration-300">
        <h3 className="mb-2 font-bold text-lg text-gray-900 dark:text-light">{title}</h3>
        <p className="mb-1 text-sm font-medium text-primary dark:text-primary-light">{subtitle}</p>
        <time className="mb-3 text-xs text-gray-500 dark:text-gray-400">{date}</time>
        <p className="text-sm leading-snug tracking-wide text-gray-700 dark:text-gray-300 mt-2">{description}</p>
      </div>
    </div>
  );
};

export default TimelineItem;
