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
        className={`m-0 px-4 py-4 fixed w-full top-0 z-50 rounded-lg transition-all duration-300 md:px-12 ${
          scrolled 
            ? 'bg-main/75 backdrop-blur-md shadow-lg'
            : 'bg-main'
        }`}
      >
        {children}
      </header>
      <div className="h-[72px]" /> {/* Spacer to prevent content jump */}
    </div>
  );
};

export default GlassHeader;
