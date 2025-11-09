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
          {/* Background Circle */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="8"
            />
            {/* Progress Circle */}
            <circle
              cx="96"
              cy="96"
              r="88"
              fill="none"
              stroke="url(#loading-gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 88}`}
              strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
              className="transition-all duration-100 ease-linear"
            />
            <defs>
              <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
              </linearGradient>
            </defs>
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
