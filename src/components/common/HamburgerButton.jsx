import { useState } from 'react';

export default function HamburgerButton() {
  const [isOpen, setIsOpen] = useState(false);

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
      className="md:hidden flex flex-col justify-center items-center w-8 h-8"
      aria-label="Toggle menu"
      data-hamburger
    >
      <span className={`block w-6 h-0.5 bg-current transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
      <span className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
      <span className={`block w-6 h-0.5 bg-current transition-all duration-300 mt-1.5 ${isOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
    </button>
  );
}
