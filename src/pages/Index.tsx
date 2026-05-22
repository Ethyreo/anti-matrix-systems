import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import DiagonalFlowBackground from "@/components/DiagonalFlowBackground";
import { useParallax } from "@/hooks/use-parallax";
import ServiceCard from "@/components/ServiceCard";
import ProcessStep from "@/components/ProcessStep";
import ResourceCard from "@/components/ResourceCard";
import ContactForm from "@/components/ContactForm";
import JourneyCards from "@/components/JourneyCards";
import BlogModal from "@/components/BlogModal";
import ampLogo from "@/assets/amp-logo-white.png";
import {
  Activity,
  ArrowRight,
  Brain,
  Briefcase,
  CheckCircle2,
  CircuitBoard,
  Shield,
  Sparkles,
  Target,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: <Brain size={36} />,
    title: "Rapid AI Prototyping",
    description: "Turn messy startup ideas, complex workflows, and half-formed founder PRDs into functional, client-ready MVPs at lightspeed.",
  },
  {
    icon: <CircuitBoard size={36} />,
    title: "System and Business Ops Architecture",
    description: "Stitch together frontends, localized databases, secure APIs, workflows, budgets, hiring rhythms, and operating logic into resilient systems that scale.",
  },
  {
    icon: <TrendingUp size={36} />,
    title: "Biz Ops & Revenue Logic",
    description: "Create a single source of truth with high-fidelity performance dashboards, automated payouts, and custom operational data structures.",
  },
  {
    icon: <Zap size={36} />,
    title: "Agentic Workflows & Stacks",
    description: "Build custom multi-agent pipelines and background automations that solve real-world bottlenecks and eliminate manual operational overhead.",
  },
];

const processSteps = [
  ["01", "PRD Scoping & Context", "Extract the exact problem statement, walk through real-life bottleneck examples, and isolate the core business logic."],
  ["02", "System and Business Ops Architecture", "Map out the technical and operating blueprint, matching frontends, databases, workflows, budgets, and AI agent logic for robust connectivity."],
  ["03", "Rapid Prototyping", "Move from layout concepts to a functional MVP, vibe coding the operational parts in close, continuous feedback loops."],
  ["04", "Troubleshooting & Tuning", "Relentlessly chomp down on edge cases, polish the interface, optimize prompt reliability, and fix integration friction."],
  ["05", "Launch & Handover", "Deploy the compiled code to high-speed global edge networks and hand over an independent system you own completely."],
];

const industries = ["SaaS", "Cybersecurity", "Creator Economy", "D2C & E-commerce", "Hospitality", "Lifestyle"];

const Index = () => {
  const parallaxOffset = useParallax(0.3);
  const location = useLocation();

  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 120);
        return () => clearTimeout(timer);
      }
    }
  }, [location]);

  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen overflow-hidden">
      <Navigation />

      <section id="hero" className="relative min-h-screen overflow-hidden pt-24">
        <div
          className="absolute inset-0"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            transition: "transform 0.1s ease-out",
          }}
        >
          <AnimatedBackground />
        </div>
        <div className="absolute inset-0 scanline-mask opacity-30" aria-hidden="true" />
        
        {/* Ambient bottom transition glow */}
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent via-[var(--bg-void)]/45 to-[var(--bg-void)] pointer-events-none z-10" />
        
        {/* Glow Divider (anti-matter theme transition seam) */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-[20%] right-[20%] h-[3px] bg-gradient-to-r from-transparent via-[var(--data)] to-transparent opacity-20 blur-[2px] z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-[30%] right-[30%] h-[5px] bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-30 blur-[4px] z-20 pointer-events-none" />
        <div className="container relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] items-center gap-12 px-6 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-4xl animate-fade-in text-left">
            <div className="mb-8 inline-flex items-center gap-3 border border-border bg-card/70 px-4 py-3 backdrop-blur-md panel-edge">
              <img src={ampLogo} alt="" className="h-9 w-9 object-contain" aria-hidden="true" />
              <span className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                Founder operating systems
              </span>
            </div>
            <h1 className="font-display text-5xl font-semibold leading-[1.02] text-foreground md:text-7xl">
              The Anti Matrix Project
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl animate-text-gradient bg-gradient-to-r from-foreground via-muted-foreground to-foreground bg-clip-text text-transparent">
              I build the tech your strategy needs and strategies your tech needs. AI-driven prototyping, system design, and business ops architecture for modern startups.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="h-14 bg-primary px-7 text-base text-primary-foreground glow-cyber hover:bg-primary/90"
              >
                Launch Your AI MVP
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
                size="lg"
                variant="outline"
                className="h-14 border-border bg-card/70 px-7 text-base text-foreground hover:bg-secondary"
              >
                Explore Systems
              </Button>
            </div>
            <div className="mt-10 grid max-w-2xl grid-cols-3 border border-border bg-card/50 backdrop-blur-sm">
              {["AI Stack", "Biz Ops", "Prototypes"].map((item) => (
                <div key={item} className="border-r border-border px-4 py-4 last:border-r-0">
                  <p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--data)]">{item}</p>
                  <p className="mt-1 text-sm text-muted-foreground">System layer</p>
                </div>
              ))}
            </div>
          </div>

          <aside className="animate-fade-in panel-edge surface-grid border border-border p-5 shadow-2xl lg:p-6" style={{ animationDelay: "0.18s" }}>
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">Anti Matrix scan</p>
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Turn messy problem statements into code.</h2>
              </div>
              <CircuitBoard className="h-9 w-9 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-4 py-6">
              {[
                ["Messy PRD", "Half-formed ideas, workflows, and operational context trapped in your head."],
                ["Product Friction", "Need custom AI tools and rapid software prototypes but don't want to hire a bloated dev team."],
                ["Systems Drift", "Manual processes and disconnected tools draining team energy without scalable automation."],
              ].map(([label, description]) => (
                <div key={label} className="border border-border bg-background/55 p-4">
                  <div className="mb-2 flex items-center gap-3">
                    <CheckCircle2 className="h-4 w-4 text-primary" aria-hidden="true" />
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-primary">{label}</span>
                  </div>
                  <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-5">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">What gets built</p>
              <div className="grid gap-3 sm:grid-cols-3">
                {["Functional AI MVP", "Automated Workflows", "System and Business Ops Architecture"].map((item) => (
                  <div key={item} className="border border-border bg-card/70 p-3">
                    <Activity className="mb-3 h-4 w-4 text-[var(--data)]" aria-hidden="true" />
                    <p className="text-sm font-medium leading-snug text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section id="services" className="relative bg-muted/30 py-24">
        <DiagonalFlowBackground />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="System modules"
            title="I build the tech your strategy needs and strategies your tech needs."
            copy="Bypass traditional development bottlenecks. Turn your ideas into functional, edge-deployed software models built for execution."
          />
          <div className="grid auto-rows-fr gap-5 md:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <div key={service.title} className="animate-fade-in flex" style={{ animationDelay: `${index * 0.08}s` }}>
                <ServiceCard {...service} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="process" className="relative py-24">
        <DiagonalFlowBackground reverse />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Operating protocol"
            title="From PRD to Edge Deployment."
            copy="A rigorous step-by-step sequence built to turn abstract operational concepts into working system architectures."
          />
          <div className="mx-auto max-w-3xl">
            {processSteps.map(([number, title, description], index) => (
              <div key={number} className="animate-fade-in" style={{ animationDelay: `${(index + 1) * 0.08}s` }}>
                <ProcessStep number={number} title={title} description={description} isLast={index === processSteps.length - 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="relative bg-muted/30 py-24">
        <DiagonalFlowBackground />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Founder pattern"
            title="The mind behind the systems."
            copy="Gurman Singh's path as an AI Prototyper and Biz Ops Analyst across startups, boutique hospitality, and marketing operations shapes how Anti Matrix designs high-velocity systems."
          />
          <JourneyCards />
          <div className="mt-12 flex justify-center animate-fade-in">
            <Link to="/control-deck">
              <Button
                size="lg"
                className="h-14 border border-primary bg-primary-soft hover:bg-primary/95 text-foreground hover:text-primary-foreground font-mono text-xs uppercase tracking-[0.16em] px-8 glow-cyber transition-all duration-300 gap-2"
              >
                Access Operator Console // SYS-DECK
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section id="clients" className="relative py-24">
        <DiagonalFlowBackground reverse />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Sector signals"
            title="Industries we have worked with."
            copy="Practical operating systems shaped across startup, consumer, creator, and service-led business environments."
          />
          <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {industries.map((industry, index) => (
              <div
                key={industry}
                className="panel-edge group relative flex min-h-[118px] items-center justify-center overflow-hidden border border-border bg-card/75 p-5 text-center transition-all duration-300 hover:border-primary hover:bg-secondary"
                style={{ animationDelay: `${index * 0.08}s` }}
              >
                <div className="absolute inset-0 scanline-mask opacity-0 transition-opacity duration-500 group-hover:opacity-40" aria-hidden="true" />
                <div className="absolute left-3 top-3 flex gap-1" aria-hidden="true">
                  <span className="h-1.5 w-1.5 bg-primary opacity-70 group-hover:animate-pulse" />
                  <span className="h-1.5 w-5 bg-[var(--data)] opacity-40" />
                </div>
                <div className="absolute bottom-3 right-3 h-px w-10 bg-gradient-cyber opacity-40 transition-all duration-500 group-hover:w-14 group-hover:opacity-90" aria-hidden="true" />
                <p className="relative z-10 font-medium leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                  {industry}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="stories" className="relative bg-muted/30 py-24">
        <DiagonalFlowBackground />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Personal project vault"
            title="Explore the systems I have built, tested, and learned from."
            copy="The deeper app archive lives inside the Control Deck: experiments, internal tools, operating systems, and technical builds that shaped the way I think about execution."
          />
          <div className="panel-edge surface-grid mx-auto max-w-4xl border border-border p-6 text-center shadow-2xl md:p-10">
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              I do not want to overstate these as scaled client case studies. They are personal builds and operating experiments: useful, real, and honest about the stage they reached.
            </p>
            <div className="mt-8 flex justify-center">
              <Link to="/control-deck#apps">
                <Button
                  size="lg"
                  className="h-14 bg-primary px-7 text-base text-primary-foreground glow-cyber hover:bg-primary/90"
                >
                  Explore Personal Projects
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="resources" className="relative py-24">
        <DiagonalFlowBackground reverse />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Open source thinking"
            title="Frameworks, systems, and playbooks."
            copy="Founder-ready writing on dashboards, investor reporting, knowledge bases, and practical operating design."
          />
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-4">
            <ResourceCard 
              title="The 4 Frameworks Every Startup Should Build Before Hiring" 
              onClick={() => {
                setSelectedArticleId("hiring-frameworks");
                setIsBlogModalOpen(true);
              }}
            />
            <ResourceCard 
              title="How Post-Investment Founders Can Build Reporting Systems Investors Love" 
              onClick={() => {
                setSelectedArticleId("reporting-systems");
                setIsBlogModalOpen(true);
              }}
            />
            <ResourceCard 
              title="Pine & Thatch: Building Hospitality Demand in a Seasonal Hill Market" 
              onClick={() => {
                setSelectedArticleId("pine-thatch-hospitality");
                setIsBlogModalOpen(true);
              }}
            />
            <ResourceCard 
              title="Why Every Startup Needs an Internal Knowledge Base Before Scaling" 
              onClick={() => {
                setSelectedArticleId("knowledge-bases");
                setIsBlogModalOpen(true);
              }}
            />
          </div>
        </div>
      </section>

      <section id="contact" className="relative bg-muted/30 py-24">
        <DiagonalFlowBackground />
        <div className="container relative z-10 mx-auto px-6">
          <SectionHeader
            eyebrow="Initiate diagnostic"
            title="Submit Your Problem Statement."
            copy="Share where the bottleneck is showing up. Provide your context, a real-life example, and how you are solving it today."
          />
          <ContactForm />
        </div>
      </section>

      <BlogModal
        articleId={selectedArticleId}
        isOpen={isBlogModalOpen}
        onClose={() => {
          setIsBlogModalOpen(false);
          setSelectedArticleId(null);
        }}
      />

      <footer className="border-t border-border py-10">
        <div className="container mx-auto flex flex-col items-center justify-between gap-6 px-6 text-center md:flex-row md:text-left">
          <div>
            <p className="font-display text-lg font-semibold text-foreground">The Anti Matrix Project</p>
            <p className="mt-1 text-sm text-muted-foreground">AI Prototyping, Systems, and Business Ops Architecture by Gurman Singh. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://www.linkedin.com/in/gs2799/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              LinkedIn
            </a>
            <a href="mailto:admin@theantimatrixproject.com" className="text-muted-foreground hover:text-primary">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) => (
  <div className="mx-auto mb-14 max-w-3xl text-center animate-fade-in">
    <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-primary">{eyebrow}</p>
    <h2 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl">{title}</h2>
    <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{copy}</p>
  </div>
);

export default Index;
