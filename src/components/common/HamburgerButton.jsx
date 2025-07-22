import { useState, useEffect } from 'react';

export default function HamburgerButton() {
  const [isOpen, setIsOpen] = useState(false);

  // Listen for sidebar-closed event
  useEffect(() => {
    function handleSidebarClosed() {
      setIsOpen(false);
    }
    window.addEventListener('sidebar-closed', handleSidebarClosed);
    return () => window.removeEventListener('sidebar-closed', handleSidebarClosed);
  }, []);

  const handleClick = () => {
    // Dispatch custom event to open sidebar
    window.dispatchEvent(new CustomEvent('open-sidebar', {
      detail: { type: 'open-sidebar' }
    }));
    setIsOpen(!isOpen);
  };

  return (
    <button 
      onClick={handleClick}
      className="md:hidden flex items-center justify-center w-8 h-8 group"
      aria-label="Toggle menu"
      data-hamburger
    >
      <div className="relative w-6 h-6 flex items-center justify-center">
        {isOpen ? (
          // X state
          <>
            <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out rotate-45 group-hover:rotate-[225deg]"></span>
            <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out -rotate-45 group-hover:-rotate-[225deg]"></span>
          </>
        ) : (
          // Hamburger state
          <>
            <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out -translate-y-1.5"></span>
            <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out"></span>
            <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out translate-y-1.5"></span>
          </>
        )}
      </div>
    </button>
  );
}
