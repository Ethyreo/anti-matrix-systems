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
        
        {/* Animated network lines */}
        <line stroke="url(#line-gradient)" strokeWidth="2">
          <animate attributeName="x1" values="10%;12%;10%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="y1" values="20%;18%;20%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="x2" values="40%;42%;40%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="y2" values="60%;58%;60%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient)" strokeWidth="2">
          <animate attributeName="x1" values="40%;42%;40%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="y1" values="60%;58%;60%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="x2" values="70%;68%;70%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="y2" values="30%;32%;30%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="5s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient)" strokeWidth="2">
          <animate attributeName="x1" values="70%;68%;70%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="y1" values="30%;32%;30%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="x2" values="90%;92%;90%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="y2" values="70%;68%;70%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4.5s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient-amber)" strokeWidth="2">
          <animate attributeName="x1" values="20%;18%;20%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="y1" values="80%;82%;80%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="x2" values="60%;62%;60%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="y2" values="40%;38%;40%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="5.5s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient)" strokeWidth="2">
          <animate attributeName="x1" values="60%;62%;60%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="y1" values="40%;38%;40%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="x2" values="85%;87%;85%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="y2" values="20%;22%;20%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="4s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient)" strokeWidth="1.5">
          <animate attributeName="x1" values="30%;32%;30%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="y1" values="15%;17%;15%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="x2" values="50%;48%;50%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="y2" values="45%;43%;45%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite" />
        </line>
        <line stroke="url(#line-gradient-amber)" strokeWidth="1.5">
          <animate attributeName="x1" values="80%;78%;80%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="y1" values="50%;52%;50%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="x2" values="55%;57%;55%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="y2" values="75%;73%;75%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.9;0.4" dur="5s" repeatCount="indefinite" />
        </line>

        {/* Animated node points with motion */}
        <circle r="4" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="10%;12%;10%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20%;18%;20%" dur="8s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="40%;42%;40%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="cy" values="60%;58%;60%" dur="10s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="70%;68%;70%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="cy" values="30%;32%;30%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle r="5" fill="hsl(35, 85%, 60%)" filter="url(#glow)">
          <animate attributeName="cx" values="90%;92%;90%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="cy" values="70%;68%;70%" dur="9s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;1;0.5" dur="3.2s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="hsl(35, 85%, 60%)" filter="url(#glow)">
          <animate attributeName="cx" values="20%;18%;20%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="cy" values="80%;82%;80%" dur="11s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="60%;62%;60%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="cy" values="40%;38%;40%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.6;1;0.6" dur="3.3s" repeatCount="indefinite" />
        </circle>
        <circle r="4" fill="hsl(35, 85%, 60%)" filter="url(#glow)">
          <animate attributeName="cx" values="85%;87%;85%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="cy" values="20%;22%;20%" dur="7s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="4.2s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="30%;32%;30%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cy" values="15%;17%;15%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3.7s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="50%;48%;50%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="cy" values="45%;43%;45%" dur="12s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.9s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="hsl(35, 85%, 60%)" filter="url(#glow)">
          <animate attributeName="cx" values="80%;78%;80%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="cy" values="50%;52%;50%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.8;0.4" dur="4.1s" repeatCount="indefinite" />
        </circle>
        <circle r="3" fill="hsl(200, 80%, 55%)" filter="url(#glow)">
          <animate attributeName="cx" values="55%;57%;55%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="cy" values="75%;73%;75%" dur="13s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0.9;0.5" dur="3.4s" repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

export default AnimatedBackground;
