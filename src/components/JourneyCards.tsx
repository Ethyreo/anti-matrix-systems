import { useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Briefcase, Building2, Lightbulb, Rocket, Shirt, Target, TrendingUp, Users, Video } from "lucide-react";

const journeyData = [
  {
    icon: <Lightbulb className="h-8 w-8" />,
    title: "The Beginning",
    description: "Started as a founder exploring the chaos of building systems from scratch, learning that structure is the foundation of sustainable growth.",
    year: "Early Days",
  },
  {
    icon: <Shirt className="h-8 w-8" />,
    title: "Rogue Liberation",
    description: "Founded a clothing brand, navigating design, production, and brand identity while learning the fundamentals of building from zero.",
    year: "Founder",
  },
  {
    icon: <Building2 className="h-8 w-8" />,
    title: "Pine and Thatch Hotels and Homestays",
    description: "Built an end-to-end service for hotels in tourism, from marketing and analytics to growth strategies and booking systems.",
    year: "Founder",
  },
  {
    icon: <Video className="h-8 w-8" />,
    title: "Influcreate",
    description: "Founded a creator marketing firm, connecting brands with creators and building systems for influencer collaboration at scale.",
    year: "Founder",
  },
  {
    icon: <Briefcase className="h-8 w-8" />,
    title: "Zelto (AdPushup)",
    description: "Joined the CEO's team at Zelto, designing scalable business operations, data systems, and strategic frameworks for a growing tech company.",
    year: "Growth Phase",
  },
  {
    icon: <Users className="h-8 w-8" />,
    title: "Operations Strategist",
    description: "Helped startups build hiring systems, internal knowledge bases, and team alignment frameworks that turn confusion into clarity.",
    year: "Scaling",
  },
  {
    icon: <TrendingUp className="h-8 w-8" />,
    title: "Investor Relations",
    description: "Designed automated reporting dashboards and investor communication systems that transformed how startups present progress.",
    year: "Fundraising",
  },
  {
    icon: <Rocket className="h-8 w-8" />,
    title: "AI Evangelist",
    description: "Exploring the intersection of human creativity and artificial intelligence by building systems that think alongside people.",
    year: "Innovation",
  },
  {
    icon: <Target className="h-8 w-8" />,
    title: "The Anti Matrix Project",
    description: "Founded a systems-building studio helping founders bridge the gap between messy business ideas and functional, AI-driven software prototypes.",
    year: "Present",
  },
];

const JourneyCards = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

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

    scrollContainer.addEventListener("mouseenter", handleMouseEnter);
    scrollContainer.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      scrollContainer.removeEventListener("mouseenter", handleMouseEnter);
      scrollContainer.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const doubledData = [...journeyData, ...journeyData];

  return (
    <div className="relative w-full overflow-hidden">
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-hidden pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {doubledData.map((item, index) => (
          <Card
            key={`${item.title}-${index}`}
            className="panel-edge h-[300px] w-[min(380px,82vw)] flex-shrink-0 border-border/70 bg-card/75 backdrop-blur-sm transition-all duration-500 hover:border-primary/70 group"
          >
            <div className="flex h-full flex-col p-7">
              <div className="mb-4 flex items-center gap-4">
                <div className="text-primary transition-colors duration-300 group-hover:text-[var(--data)]">{item.icon}</div>
                <span className="font-mono text-xs uppercase tracking-[0.14em] text-primary/80 transition-colors duration-300 group-hover:text-primary">
                  {item.year}
                </span>
              </div>
              <h3 className="mb-3 font-display text-2xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {item.title}
              </h3>
              <p className="flex-grow text-sm leading-relaxed text-muted-foreground">{item.description}</p>
            </div>
          </Card>
        ))}
      </div>

      <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-background to-transparent pointer-events-none md:w-32" />
      <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-background to-transparent pointer-events-none md:w-32" />
    </div>
  );
};

export default JourneyCards;
