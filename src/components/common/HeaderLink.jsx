import React from 'react';

export default function HeaderLink({ href, children, className = '', ...props }) {
  return (
    <a
      href={href}
      className={`no-underline text-main hover:underline ${className}`}
      tabIndex={0}
      {...props}
    >
      {children}
    </a>
  );
}
