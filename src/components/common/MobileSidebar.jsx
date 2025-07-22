import React, { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import HeaderLink from './HeaderLink.jsx';

export default function MobileSidebar() {
  const [open, setOpen] = useState(false);

  // Open sidebar when hamburger is clicked (event-based for decoupling)
  useEffect(() => {
    function handleOpenSidebar(e) {
      if (e.detail && e.detail.type === 'open-sidebar') setOpen(true);
    }
    window.addEventListener('open-sidebar', handleOpenSidebar);
    return () => window.removeEventListener('open-sidebar', handleOpenSidebar);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    function handleOutsideClick(e) {
      const sidebar = document.getElementById('mobile-sidebar');
      if (open && sidebar && !sidebar.contains(e.target) && 
          !e.target.closest('[data-hamburger]')) {
        setOpen(false);
        // Dispatch event to notify hamburger button
        window.dispatchEvent(new CustomEvent('sidebar-closed', {
          detail: { type: 'sidebar-closed' }
        }));
      }
    }
    
    if (open) {
      // Add event listener with a slight delay to prevent immediate triggering
      const timer = setTimeout(() => {
        document.addEventListener('click', handleOutsideClick);
      }, 10);
      return () => {
        clearTimeout(timer);
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [open]);

  // Handle close button click
  const handleClose = (e) => {
    e.stopPropagation();
    setOpen(false);
    // Dispatch event to notify hamburger button
    window.dispatchEvent(new CustomEvent('sidebar-closed', {
      detail: { type: 'sidebar-closed' }
    }));
  };

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 w-screen h-screen bg-gray-900 bg-opacity-40 z-40 md:hidden"
          onClick={() => {
            setOpen(false);
            window.dispatchEvent(new CustomEvent('sidebar-closed', {
              detail: { type: 'sidebar-closed' }
            }));
          }}
          aria-label="Close sidebar overlay"
          tabIndex={-1}
          role="presentation"
        />
      )}
      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed inset-0 w-screen h-screen bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full relative">
          {/* Top Center Title */}
          <div className="w-full pt-20 pb-2 flex items-center justify-center">
            <span className="text-2xl font-bold tracking-wide text-gray-800 dark:text-white">BRIAN CARLO</span>
          </div>
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 w-9 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 pointer-events-auto transition-opacity transition-transform duration-300"
            onClick={handleClose}
            aria-label="Close sidebar"
          >
            &#10005;
          </button>
          <div className="flex-1 flex flex-col items-center justify-center gap-0 pt-0 w-full">
            <div className="w-full flex flex-col items-center">
              <HeaderLink href="/" className="text-xl font-medium w-full py-4 text-center" onClick={() => setOpen(false)}>Home</HeaderLink>
              <div className="w-3/4 mx-auto border-b border-gray-200 dark:border-gray-700" />
            </div>
            <div className="w-full flex flex-col items-center">
              <HeaderLink href="/blog" className="text-xl font-medium w-full py-4 text-center" onClick={() => setOpen(false)}>Blog</HeaderLink>
              <div className="w-3/4 mx-auto border-b border-gray-200 dark:border-gray-700" />
            </div>
            <div className="w-full flex flex-col items-center">
              <HeaderLink href="/about" className="text-xl font-medium w-full py-4 text-center" onClick={() => setOpen(false)}>About</HeaderLink>
              <div className="w-3/4 mx-auto border-b border-gray-200 dark:border-gray-700" />
            </div>
          </div>
          <div className="pb-10 flex justify-center">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
