import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Lightbulb, Rocket, Target, TrendingUp, Users } from "lucide-react";

const journeyData = [
  {
    icon: <Lightbulb className="w-8 h-8" />,
    title: "The Beginning",
    description: "Started as a founder exploring the chaos of building systems from scratch — learning that structure is the foundation of sustainable growth.",
    year: "Early Days"
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: "Zelto (AdPushup)",
    description: "Joined the CEO's team at Zelto, designing scalable business operations, data systems, and strategic frameworks for a growing tech company.",
    year: "Growth Phase"
  },
  {
    icon: <Users className="w-8 h-8" />,
    title: "Operations Strategist",
    description: "Helped startups build hiring systems, internal knowledge bases, and team alignment frameworks — turning confusion into clarity.",
    year: "Scaling"
  },
  {
    icon: <TrendingUp className="w-8 h-8" />,
    title: "Investor Relations",
    description: "Designed automated reporting dashboards and investor communication systems that transformed how startups present their progress.",
    year: "Fundraising"
  },
  {
    icon: <Rocket className="w-8 h-8" />,
    title: "AI Evangelist",
    description: "Exploring the intersection of human creativity and artificial intelligence — building systems that think alongside people, not replace them.",
    year: "Innovation"
  },
  {
    icon: <Target className="w-8 h-8" />,
    title: "The Anti Matrix Project",
    description: "Founded a consulting practice helping startups worldwide bridge the gap between ideas, investment, and intelligent execution.",
    year: "Present"
  }
];

const JourneyCards = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;

    let animationFrameId: number;
    let scrollPosition = 0;
    const scrollSpeed = 0.5;

    const animate = () => {
      scrollPosition += scrollSpeed;
      
      if (scrollContainer.scrollWidth > 0) {
        const maxScroll = scrollContainer.scrollWidth / 2;
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        scrollContainer.scrollLeft = scrollPosition;
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleMouseEnter = () => {
      cancelAnimationFrame(animationFrameId);
    };

    const handleMouseLeave = () => {
      animationFrameId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const doubledData = [...journeyData, ...journeyData];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-hidden pb-4"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {doubledData.map((item, index) => (
          <Card
            key={index}
            className="flex-shrink-0 w-[380px] h-[280px] bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-500 hover:scale-105 hover:shadow-elegant group"
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-primary group-hover:text-primary-glow transition-colors duration-300 group-hover:rotate-12 transform transition-transform">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-primary/70 group-hover:text-primary transition-colors duration-300">
                  {item.year}
                </span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed flex-grow">
                {item.description}
              </p>
            </div>
          </Card>
        ))}
      </div>
      
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-background to-transparent pointer-events-none z-10" />
      <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-background to-transparent pointer-events-none z-10" />
    </div>
  );
};

export default JourneyCards;
