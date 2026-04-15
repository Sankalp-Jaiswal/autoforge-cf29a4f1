import React, { ReactNode } from 'react';
import Navbar from './Navbar';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-dark dark:text-light transition-colors duration-300">
      <Navbar />
      {children}
      {/* Optional: Add a Footer component here */}
      <footer className="w-full py-6 text-center text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()} Your Name. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
