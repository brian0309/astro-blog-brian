import React from 'react';

export default function HeaderLink({ href, children, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`no-underline text-black dark:text-gray-100 hover:underline ${className}`}
      tabIndex={0}
      {...props}
    >
      {children}
    </a>
  );
}
