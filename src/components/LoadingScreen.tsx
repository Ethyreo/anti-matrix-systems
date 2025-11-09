import { useEffect, useState } from "react";
import DiagonalFlowBackground from "./DiagonalFlowBackground";
import ampLogo from "@/assets/amp-logo-white.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 100);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[9999] bg-background">
      <DiagonalFlowBackground />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-8">
        {/* Circular Progress with Logo */}
        <div className="relative w-48 h-48">
          {/* Segmented Progress */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <defs>
              <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
            {Array.from({ length: 20 }).map((_, index) => {
              const segmentAngle = 360 / 20; // 20 segments
              const gapAngle = 4; // Gap between segments
              const arcAngle = segmentAngle - gapAngle;
              const startAngle = index * segmentAngle;
              const endAngle = startAngle + arcAngle;
              const radius = 88;
              const centerX = 96;
              const centerY = 96;
              
              // Calculate if this segment should be filled
              const segmentProgress = ((index + 1) / 20) * 100;
              const isFilled = progress >= segmentProgress;
              
              // Convert angles to radians and calculate arc path
              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;
              
              const x1 = centerX + radius * Math.cos(startRad);
              const y1 = centerY + radius * Math.sin(startRad);
              const x2 = centerX + radius * Math.cos(endRad);
              const y2 = centerY + radius * Math.sin(endRad);
              
              return (
                <path
                  key={index}
                  d={`M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`}
                  fill="none"
                  stroke={isFilled ? "url(#loading-gradient)" : "hsl(var(--border))"}
                  strokeWidth="8"
                  strokeLinecap="round"
                  className="transition-all duration-200"
                />
              );
            })}
          </svg>
          
          {/* Logo in Center - fills the entire circle */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <img 
              src={ampLogo} 
              alt="AMP Logo" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-xl md:text-2xl font-semibold text-foreground animate-pulse">
          Loading your Growth Story
        </p>
      </div>
    </div>
  );
};

export default LoadingScreen;
