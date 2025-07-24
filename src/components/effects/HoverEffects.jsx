import React, { useState, useEffect, useRef } from 'react';

const HoverEffects = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [circles, setCircles] = useState([]);
  const [isMobile, setIsMobile] = useState(false);
  const animationFrameRef = useRef();
  const containerRef = useRef();

  // Handle window resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Set initial state
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize circles with random positions and velocities
  useEffect(() => {
    const initializeCircles = () => {
      const newCircles = [];
      const sizeMultiplier = isMobile ? 0.5 : 1; // 2x smaller on mobile
      
      const baseSizes = [300, 200, 200]; // Base sizes for desktop
      const sizes = baseSizes.map(size => size * sizeMultiplier); // Apply mobile scaling
      const colors = ['bg-purple-500/50', 'bg-pink-500/50', 'bg-cyan-500/50']; // Increased opacity from /30 to /50
      
      for (let i = 0; i < 3; i++) {
        const size = sizes[i];
        const radius = size / 2;
        
        newCircles.push({
          id: i,
          x: Math.random() * (window.innerWidth - size) + radius,
          y: Math.random() * (window.innerHeight - size) + radius,
          vx: (Math.random() - 0.5) * 4, // Initial random direction
          vy: (Math.random() - 0.5) * 4,
          size: size,
          radius: radius,
          baseColor: colors[i],
          isReacting: false,
          reactionIntensity: 0,
        });
      }
      
      // Normalize initial velocities to constant speed
      setCircles(newCircles.map(circle => {
        const currentSpeed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
        const targetSpeed = 2;
        return {
          ...circle,
          vx: (circle.vx / currentSpeed) * targetSpeed,
          vy: (circle.vy / currentSpeed) * targetSpeed,
        };
      }));
    };

    initializeCircles();
    
    // Add console log to verify component mounting
    console.log('HoverEffects component mounted with 4 circles (1 mouse-following + 3 moving)');

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isMobile]); // Re-initialize when mobile state changes

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
        return prevCircles.map((circle, index) => {
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

          // Mouse chain reaction when within 200px
          const isReactingToMouse = distanceToMouse < 200;
          const mouseReactionIntensity = isReactingToMouse ? Math.max(0, 1 - distanceToMouse / 200) : 0;

          // Check distance to other circles for inter-circle chain reactions
          let maxCircleReactionIntensity = 0;
          let totalCircleForceX = 0;
          let totalCircleForceY = 0;

          prevCircles.forEach((otherCircle, otherIndex) => {
            if (index !== otherIndex) {
              const distanceToOther = Math.sqrt(
                Math.pow(otherCircle.x - newX, 2) + Math.pow(otherCircle.y - newY, 2)
              );

              // Chain reaction when circles are within 250px of each other
              const reactionDistance = 250;
              if (distanceToOther < reactionDistance) {
                const circleReactionIntensity = Math.max(0, 1 - distanceToOther / reactionDistance);
                maxCircleReactionIntensity = Math.max(maxCircleReactionIntensity, circleReactionIntensity);

                // Apply repulsion force from other circle
                const angle = Math.atan2(newY - otherCircle.y, newX - otherCircle.x);
                const force = circleReactionIntensity * 0.3; // Gentler force between circles
                totalCircleForceX += Math.cos(angle) * force;
                totalCircleForceY += Math.sin(angle) * force;
              }
            }
          });

          // Combine mouse and circle reaction intensities
          const totalReactionIntensity = Math.max(mouseReactionIntensity, maxCircleReactionIntensity);

          // Apply forces
          if (isReactingToMouse || maxCircleReactionIntensity > 0) {
            // Mouse repulsion force
            if (isReactingToMouse) {
              const mouseAngle = Math.atan2(newY - mousePosition.y, newX - mousePosition.x);
              const mouseForce = mouseReactionIntensity * 0.5;
              circle.vx += Math.cos(mouseAngle) * mouseForce;
              circle.vy += Math.sin(mouseAngle) * mouseForce;
            }

            // Circle-to-circle repulsion forces
            circle.vx += totalCircleForceX;
            circle.vy += totalCircleForceY;
            
            // Limit velocity
            const maxVelocity = 5;
            const currentSpeed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            if (currentSpeed > maxVelocity) {
              circle.vx = (circle.vx / currentSpeed) * maxVelocity;
              circle.vy = (circle.vy / currentSpeed) * maxVelocity;
            }
          } else {
            // Maintain absolutely constant speed - no friction at all
            const currentSpeed = Math.sqrt(circle.vx * circle.vx + circle.vy * circle.vy);
            const targetSpeed = 2; // Constant speed for all circles
            
            // Normalize velocity to maintain constant speed
            if (currentSpeed > 0) {
              circle.vx = (circle.vx / currentSpeed) * targetSpeed;
              circle.vy = (circle.vy / currentSpeed) * targetSpeed;
            } else {
              // If somehow stopped, give it a random direction at target speed
              const angle = Math.random() * Math.PI * 2;
              circle.vx = Math.cos(angle) * targetSpeed;
              circle.vy = Math.sin(angle) * targetSpeed;
            }
          }

          return {
            ...circle,
            x: newX,
            y: newY,
            isReacting: totalReactionIntensity > 0,
            reactionIntensity: totalReactionIntensity,
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
        className="absolute rounded-full bg-blue-500/30 transition-transform duration-100 ease-out"
        style={{
          width: isMobile ? '150px' : '300px', // 2x smaller on mobile
          height: isMobile ? '150px' : '300px',
          transform: `translate(${mousePosition.x - (isMobile ? 75 : 150)}px, ${mousePosition.y - (isMobile ? 75 : 150)}px)`,
          filter: `blur(${isMobile ? 75 : 150}px)`, // Proportional blur
          willChange: 'transform',
        }}
      />
      
      {/* Moving circles with different sizes */}
      {circles.map(circle => {
        const mobileBlurBase = Math.max(40, (circle.size / 3)); // Smaller base blur for mobile
        const desktopBlurBase = Math.max(80, (circle.size / 3));
        const blurBase = isMobile ? mobileBlurBase : desktopBlurBase;
        
        return (
          <div
            key={circle.id}
            className={`absolute rounded-full transition-all duration-200 ease-out ${circle.baseColor}`}
            style={{
              width: `${circle.size}px`,
              height: `${circle.size}px`,
              transform: `translate(${circle.x - circle.radius}px, ${circle.y - circle.radius}px) scale(${1 + circle.reactionIntensity * 0.3})`,
              filter: `blur(${blurBase + circle.reactionIntensity * 50}px)`,
              opacity: 0.5 + circle.reactionIntensity * 0.4,
              willChange: 'transform, filter, opacity',
            }}
          />
        );
      })}
    </div>
  );
};

export default HoverEffects;
