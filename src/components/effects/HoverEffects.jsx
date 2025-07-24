import React, { useState, useEffect, useRef } from 'react';

const HoverEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circles, setCircles] = useState([]);
  const animationFrameRef = useRef();
  const containerRef = useRef();

  // Initialize circles with random positions and velocities
  useEffect(() => {
    const initializeCircles = () => {
      const newCircles = [];
      const sizes = [300, 200, 200]; // Different sizes for the 3 moving circles
      const colors = ['bg-purple-500/50', 'bg-pink-500/50', 'bg-cyan-500/50']; // Increased opacity from /30 to /50
      
      for (let i = 0; i < 3; i++) {
        const size = sizes[i];
        const radius = size / 2;
        
        newCircles.push({
          id: i,
          x: Math.random() * (window.innerWidth - size) + radius,
          y: Math.random() * (window.innerHeight - size) + radius,
          vx: (Math.random() - 0.5) * 4, // Increased velocity range from 2 to 4
          vy: (Math.random() - 0.5) * 4,
          size: size,
          radius: radius,
          baseColor: colors[i],
          isReacting: false,
          reactionIntensity: 0,
        });
      }
      setCircles(newCircles);
    };

    initializeCircles();
    
    // Add console log to verify component mounting
    console.log('HoverEffects component mounted with 4 circles (1 mouse-following + 3 moving)');

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Handle mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Animation loop for moving circles and chain reactions
  useEffect(() => {
    const animate = () => {
      setCircles(prevCircles => {
        return prevCircles.map(circle => {
          // Update position
          let newX = circle.x + circle.vx;
          let newY = circle.y + circle.vy;

          // Bounce off walls
          const radius = circle.radius;
          if (newX <= radius || newX >= window.innerWidth - radius) {
            circle.vx *= -1;
            newX = Math.max(radius, Math.min(window.innerWidth - radius, newX));
          }
          if (newY <= radius || newY >= window.innerHeight - radius) {
            circle.vy *= -1;
            newY = Math.max(radius, Math.min(window.innerHeight - radius, newY));
          }

          // Check distance to mouse for chain reaction
          const distanceToMouse = Math.sqrt(
            Math.pow(mousePosition.x - newX, 2) + Math.pow(mousePosition.y - newY, 2)
          );

          // Chain reaction when mouse is within 200px
          const isReacting = distanceToMouse < 200;
          const reactionIntensity = isReacting ? Math.max(0, 1 - distanceToMouse / 200) : 0;

          // Apply repulsion force when reacting
          if (isReacting) {
            const angle = Math.atan2(newY - mousePosition.y, newX - mousePosition.x);
            const force = reactionIntensity * 0.5;
            circle.vx += Math.cos(angle) * force;
            circle.vy += Math.sin(angle) * force;
            
            // Limit velocity
            const maxVelocity = 5; // Increased from 3 to 5 for more dynamic movement
            const currentSpeed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            if (currentSpeed > maxVelocity) {
              circle.vx = (circle.vx / currentSpeed) * maxVelocity;
              circle.vy = (circle.vy / currentSpeed) * maxVelocity;
            }
          } else {
            // Maintain constant movement - reduce friction
            circle.vx *= 0.995; // Reduced friction from 0.99 to 0.995
            circle.vy *= 0.995;
            
            // Higher minimum movement to ensure constant motion
            const minSpeed = 1.5; // Increased from 0.5 to 1.5
            const currentSpeed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            if (currentSpeed < minSpeed) {
              const angle = Math.random() * Math.PI * 2;
              circle.vx = Math.cos(angle) * minSpeed;
              circle.vy = Math.sin(angle) * minSpeed;
            }
          }

          return {
            ...circle,
            x: newX,
            y: newY,
            isReacting,
            reactionIntensity,
          };
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    if (circles.length > 0) {
      animate();
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [circles.length, mousePosition]);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
      {/* Original mouse-following circle */}
      <div
        className="absolute w-[300px] h-[300px] rounded-full bg-blue-500/30 transition-transform duration-100 ease-out"
        style={{
          transform: `translate(${mousePosition.x - 150}px, ${mousePosition.y - 150}px)`,
          filter: 'blur(150px)',
          willChange: 'transform',
        }}
      />
      
      {/* Moving circles with different sizes */}
      {circles.map(circle => (
        <div
          key={circle.id}
          className={`absolute rounded-full transition-all duration-200 ease-out ${circle.baseColor}`}
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            transform: `translate(${circle.x - circle.radius}px, ${circle.y - circle.radius}px) scale(${1 + circle.reactionIntensity * 0.3})`,
            filter: `blur(${Math.max(80, (circle.size / 3)) + circle.reactionIntensity * 50}px)`, // Reduced blur for better visibility
            opacity: 0.5 + circle.reactionIntensity * 0.4, // Increased base opacity from 0.3 to 0.5
            willChange: 'transform, filter, opacity',
          }}
        />
      ))}
    </div>
  );
};

export default HoverEffects;
