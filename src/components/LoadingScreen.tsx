import { useEffect, useState } from "react";
import DiagonalFlowBackground from "./DiagonalFlowBackground";
import ampLogo from "@/assets/amp-logo-white.png";

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

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
          setIsFadingOut(true);
          setTimeout(onComplete, 750); // Half of 1.5s for fade out
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[9999] bg-background transition-opacity duration-700 ${isFadingOut ? 'opacity-0' : 'opacity-100'}`}>
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
            {Array.from({ length: 15 }).map((_, index) => {
              const segmentAngle = 360 / 15; // 15 segments
              const gapAngle = 8; // Gap between segments
              const arcAngle = segmentAngle - gapAngle;
              const startAngle = index * segmentAngle;
              const endAngle = startAngle + arcAngle;
              const radius = 88;
              const centerX = 96;
              const centerY = 96;
              
              // Calculate if this segment should be filled
              const segmentProgress = ((index + 1) / 15) * 100;
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
                  stroke={isFilled ? "hsl(var(--primary))" : "hsl(var(--border))"}
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
              alt="The Anti Matrix Project logo - startup consulting services" 
              width="128"
              height="128"
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
