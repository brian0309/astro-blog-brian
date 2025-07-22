import React, { useState, useEffect } from 'react';

const HoverEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      requestAnimationFrame(() => {
        setMousePosition({ x: e.clientX, y: e.clientY });
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    // Add console log to verify component mounting
    console.log('HoverEffects component mounted');

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      <div
        className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/30 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 150}px, ${mousePosition.y - 150}px)`,
          filter: 'blur(150px)', // Increased blur from 100px to 200px
          willChange: 'transform',
        }}
      />
    </div>
  );
};

export default HoverEffects;
