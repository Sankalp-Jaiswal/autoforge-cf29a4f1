import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navItems = [
    { name: 'Home', to: 'home' },
    { name: 'About', to: 'about' },
    { name: 'Skills', to: 'skills' },
    { name: 'Projects', to: 'projects' },
    { name: 'Experience', to: 'experience' },
    { name: 'Contact', to: 'contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-white dark:bg-dark shadow-md dark:shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="home" smooth={true} duration={500} className="text-2xl font-bold text-primary cursor-pointer">
          YourName
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70} // Adjust offset for fixed header
              className="text-gray-700 dark:text-light hover:text-primary dark:hover:text-primary transition-colors duration-300 cursor-pointer text-lg font-medium"
              activeClass="text-primary dark:text-primary border-b-2 border-primary"
              spy={true}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-700 dark:text-light focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-dark pb-4 shadow-inner">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.to}
              smooth={true}
              duration={500}
              offset={-70}
              onClick={toggleMenu} // Close menu on item click
              className="block px-4 py-2 text-gray-700 dark:text-light hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300 cursor-pointer text-base font-medium"
              activeClass="text-primary dark:text-primary bg-gray-100 dark:bg-gray-700"
              spy={true}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
