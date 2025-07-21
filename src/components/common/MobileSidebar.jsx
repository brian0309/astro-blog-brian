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
          className="fixed inset-0 bg-gray-900 bg-opacity-40 z-40 md:hidden"
          onClick={() => {
            setOpen(false);
            // Dispatch event to notify hamburger button
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
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full relative">
          {/* Close Button */}
          <button 
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white focus:outline-none group"
            onClick={handleClose}
            aria-label="Close sidebar"
          >
            <div className="relative w-6 h-6 flex items-center justify-center overflow-hidden">
              <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out group-hover:rotate-[225deg] rotate-45"></span>
              <span className="absolute w-5 h-0.5 bg-current transform transition-all duration-300 ease-in-out group-hover:-rotate-[225deg] -rotate-45"></span>
            </div>
          </button>
          <div className="flex-1 flex flex-col gap-4 pt-8">
            <HeaderLink href="/" className="text-lg" onClick={() => setOpen(false)}>Home</HeaderLink>
            <HeaderLink href="/blog" className="text-lg" onClick={() => setOpen(false)}>Blog</HeaderLink>
            <HeaderLink href="/about" className="text-lg" onClick={() => setOpen(false)}>About</HeaderLink>
          </div>
          <div className="pb-8">
            <ThemeToggle />
          </div>
        </div>
      </aside>
    </>
  );
}
