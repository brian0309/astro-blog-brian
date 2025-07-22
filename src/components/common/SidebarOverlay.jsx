import { useEffect, useState } from 'react';

export default function SidebarOverlay({ onClick }) {
  const [fading, setFading] = useState(false);
  useEffect(() => {
    // Prevent scrolling when overlay is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Handler for fade-out and then close
  const handleClose = () => {
    setFading(true);
    setTimeout(() => {
      onClick();
    }, 300); // match transition duration
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden pointer-events-none w-screen h-screen flex flex-col justify-start"
      aria-label="Close sidebar overlay"
      tabIndex={-1}
      role="presentation"
    >
      <div className="relative w-full h-full flex flex-col items-start pt-8 pb-4 px-5">
        <button
          className={`z-50 w-12 h-12 flex items-center justify-center rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-black text-3xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pointer-events-auto transition-opacity transition-transform duration-300 ${fading ? 'opacity-0 scale-75' : 'opacity-100 scale-100'}`}
          onClick={handleClose}
          aria-label="Close sidebar"
          type="button"
        >
          &#10005;
        </button>
        <div className="w-full mt-6 mb-2 border-b border-gray-300" />
      </div>
      {/* Overlay click area */}
      <div
        className="absolute inset-0 w-screen h-screen pointer-events-auto"
        onClick={handleClose}
        tabIndex={-1}
        role="presentation"
      />
    </div>
  );
}
