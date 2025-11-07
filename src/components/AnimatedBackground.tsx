const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
      <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(200, 80%, 55%)" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(200, 80%, 55%)" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* Animated connecting lines */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <line x1="10%" y1="20%" x2="40%" y2="60%" stroke="url(#line-gradient)" strokeWidth="1" />
          <line x1="40%" y1="60%" x2="70%" y2="30%" stroke="url(#line-gradient)" strokeWidth="1" />
          <line x1="70%" y1="30%" x2="90%" y2="70%" stroke="url(#line-gradient)" strokeWidth="1" />
          <line x1="20%" y1="80%" x2="60%" y2="40%" stroke="url(#line-gradient)" strokeWidth="1" />
          <line x1="60%" y1="40%" x2="85%" y2="20%" stroke="url(#line-gradient)" strokeWidth="1" />
        </g>

        {/* Node points */}
        <circle cx="10%" cy="20%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="40%" cy="60%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="70%" cy="30%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="90%" cy="70%" r="3" fill="hsl(35, 85%, 60%)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle cx="20%" cy="80%" r="3" fill="hsl(35, 85%, 60%)" opacity="0.5">
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle cx="60%" cy="40%" r="3" fill="hsl(200, 80%, 55%)" opacity="0.5">
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.3s" repeatCount="indefinite" />
        </circle>
        <circle cx="85%" cy="20%" r="3" fill="hsl(35, 85%, 60%)" opacity="0.5">
          <animate attributeName="opacity" values="0.3;0.7;0.3" dur="4.2s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
