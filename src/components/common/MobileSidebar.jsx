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



  // Hide sidebar on overlay click
  const handleOverlayClick = () => setOpen(false);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"
          onClick={handleOverlayClick}
          aria-label="Close sidebar overlay"
          tabIndex={-1}
          role="presentation"
        />
      )}
      {/* Sidebar */}
      <aside
        id="mobile-sidebar"
        className={`fixed inset-y-0 right-0 w-64 bg-white bg-opacity-100 dark:bg-gray-900 dark:bg-opacity-100 border-l border-gray-200 dark:border-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out z-50 md:hidden ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-4 flex flex-col h-full">
          <div className="flex-1 flex flex-col gap-4 pt-8">
            <HeaderLink href="/" className="text-lg" onClick={() => setOpen(false)}>Home</HeaderLink>
            <HeaderLink href="/blog" className="text-lg" onClick={() => setOpen(false)}>Blog</HeaderLink>
            <HeaderLink href="/about" className="text-lg" onClick={() => setOpen(false)}>About</HeaderLink>
          </div>
          <div className="pb-8">
            <ThemeToggle client:load />
          </div>
        </div>
      </aside>
    </>
  );
}
