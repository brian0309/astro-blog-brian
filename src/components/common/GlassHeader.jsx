import { useState, useEffect } from 'react';

const GlassHeader = ({ children }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full">
      <header 
        className={`m-0 px-6 py-4 fixed w-full top-0 z-50 rounded-lg transition-all duration-300 ${
          scrolled 
            ? 'bg-white/75 backdrop-blur-md dark:bg-gray-900/75 shadow-lg'
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        {children}
      </header>
      <div className="h-[72px]" /> {/* Spacer to prevent content jump */}
    </div>
  );
};

export default GlassHeader;
