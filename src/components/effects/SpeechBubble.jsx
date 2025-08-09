import { useState } from 'react';

export default function SpeechBubble() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Stickman SVG Image */}
      <img 
        src="/images/homepage/man-with-pc-stickman.svg" 
        alt="Brian hehe" 
        draggable="false"
        onDragStart={() => false}
        onMouseDown={() => false}
        style={{WebkitUserDrag: 'none', userDrag: 'none'}}
        className="stickman-svg w-full max-w-md sm:max-w-lg lg:max-w-xl xl:max-w-2xl h-auto rounded-lg shadow-none select-none pointer-events-auto cursor-pointer transition-transform duration-300 hover:scale-105"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      />
      
      {/* Speech Bubble */}
      <div 
        className={`absolute top-[8%] left-[15%] sm:top-[10%] sm:left-[18%] md:top-[12%] md:left-[5%] lg:top-[12%] lg:left-[15%] xl:top-[18%] xl:left-[15%] transform transition-all duration-300 ${
          isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-2 pointer-events-none'
        }`}
      >
        <div className="relative bg-main text-main border-2 border-main px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 lg:px-4 lg:py-2 xl:px-5 xl:py-2.5 rounded-md sm:rounded-lg shadow-lg min-w-max">
          <span className="text-xs sm:text-sm md:text-sm lg:text-base xl:text-base font-medium">Hello! 👋</span>
          
          {/* Speech bubble tail */}
          <div className="absolute bottom-0 left-3 sm:left-4 md:left-6 lg:left-6 xl:left-8 transform translate-y-full">
            {/* Tail border (outer) - matches bubble border using utility classes */}
            <div className="w-0 h-0 border-l-[9px] border-r-[9px] border-t-[9px] sm:border-l-[10px] sm:border-r-[10px] sm:border-t-[10px] md:border-l-[11px] md:border-r-[11px] md:border-t-[11px] lg:border-l-[12px] lg:border-r-[12px] lg:border-t-[12px] xl:border-l-[13px] xl:border-r-[13px] xl:border-t-[13px] border-l-transparent border-r-transparent speech-tail-border"></div>
            {/* Tail fill (inner) - matches bubble background using utility classes */}
            <div className="absolute top-0 left-[2px] w-0 h-0 border-l-[6px] border-r-[6px] border-t-[6px] sm:border-l-[7px] sm:border-r-[7px] sm:border-t-[7px] md:border-l-[8px] md:border-r-[8px] md:border-t-[8px] lg:border-l-[9px] lg:border-r-[9px] lg:border-t-[9px] xl:border-l-[10px] xl:border-r-[10px] xl:border-t-[10px] border-l-transparent border-r-transparent speech-tail-fill"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
