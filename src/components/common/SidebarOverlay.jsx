import { useEffect } from 'react';

export default function SidebarOverlay({ onClick }) {
  useEffect(() => {
    // Prevent scrolling when overlay is active
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden pointer-events-none"
      aria-label="Close sidebar overlay"
      tabIndex={-1}
      role="presentation"
    >
      <button
        className="absolute top-4 left-4 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white bg-opacity-80 hover:bg-opacity-100 text-black text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pointer-events-auto"
        onClick={onClick}
        aria-label="Close sidebar"
        type="button"
      >
        &#10005;
      </button>
      {/* Overlay click area */}
      <div
        className="absolute inset-0 pointer-events-auto"
        onClick={onClick}
        tabIndex={-1}
        role="presentation"
      />
    </div>
  );
}
