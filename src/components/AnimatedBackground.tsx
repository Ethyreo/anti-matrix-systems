const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity="0.6" />
            <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="line-gradient-amber" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(35, 85%, 60%)" stopOpacity="0.5" />
            <stop offset="100%" stopColor="hsl(35, 85%, 60%)" stopOpacity="0.1" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Main network lines */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="40%" y1="60%" x2="70%" y2="30%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="70%" y1="30%" x2="90%" y2="70%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="20%" y1="80%" x2="60%" y2="40%" stroke="url(#line-gradient-amber)" strokeWidth="2" />
          <line x1="60%" y1="40%" x2="85%" y2="20%" stroke="url(#line-gradient)" strokeWidth="2" />
          <line x1="30%" y1="15%" x2="50%" y2="45%" stroke="url(#line-gradient)" strokeWidth="1.5" />
          <line x1="80%" y1="50%" x2="55%" y2="75%" stroke="url(#line-gradient-amber)" strokeWidth="1.5" />
        </g>

        {/* Node points with glow */}
        <circle cx="10%" cy="20%" r="4" fill="hsl(200, 80%, 55%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="40%" cy="60%" r="4" fill="hsl(200, 80%, 55%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="30%" r="4" fill="hsl(200, 80%, 55%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="90%" cy="70%" r="5" fill="hsl(35, 85%, 60%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20%" cy="80%" r="4" fill="hsl(35, 85%, 60%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="60%" cy="40%" r="4" fill="hsl(200, 80%, 55%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="85%" cy="20%" r="4" fill="hsl(35, 85%, 60%)" opacity="0.8" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="30%" cy="15%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.7" filter="url(#glow)">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.7s" repeatCount="indefinite" />
        </circle>
        <circle cx="50%" cy="45%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.7" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.9s" repeatCount="indefinite" />
        </circle>
        <circle cx="80%" cy="50%" r="3" fill="hsl(35, 85%, 60%)" opacity="0.7" filter="url(#glow)">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4.1s" repeatCount="indefinite" />
        </circle>
        <circle cx="55%" cy="75%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.7" filter="url(#glow)">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
