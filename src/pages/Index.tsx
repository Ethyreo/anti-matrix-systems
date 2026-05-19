import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import DiagonalFlowBackground from "@/components/DiagonalFlowBackground";
import { useParallax } from "@/hooks/use-parallax";
import ServiceCard from "@/components/ServiceCard";
import ProcessStep from "@/components/ProcessStep";
import CaseStudyCard from "@/components/CaseStudyCard";
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
    icon: <Target size={36} />,
    title: "Startup Growth Systems",
    description: "Internal processes, documentation, operating rhythms, and team flows built to scale sustainably.",
  },
  {
    icon: <TrendingUp size={36} />,
    title: "Investor Strategy & Fundraising",
    description: "Pitch decks, financial models, investor dashboards, and reporting systems founders can trust.",
  },
  {
    icon: <Briefcase size={36} />,
    title: "Business & Revenue Operations",
    description: "Performance dashboards, pricing models, revenue logic, and decision systems for clearer execution.",
  },
  {
    icon: <Users size={36} />,
    title: "Hiring & Team Expansion",
    description: "Org plans, hiring pipelines, onboarding documentation, and OKR systems for growing teams.",
  },
  {
    icon: <Zap size={36} />,
    title: "Product & Process Alignment",
    description: "A practical bridge between strategy, product, operations, and growth so work moves cleanly.",
  },
  {
    icon: <Brain size={36} />,
    title: "Automation & AI Stack Integration",
    description: "No-code and AI-assisted workflows that remove repeated manual work without adding complexity.",
  },
  {
    icon: <Shield size={36} />,
    title: "Post-Investment Scaling",
    description: "Department structure, board reporting, operating metrics, and efficiency systems after funding.",
  },
  {
    icon: <Sparkles size={36} />,
    title: "AI Evangelism & Intelligence",
    description: "Strategic AI adoption across operational, creative, and decision-making layers.",
  },
];

const processSteps = [
  ["01", "Discovery & Diagnosis", "Map the team, tools, bottlenecks, investor expectations, and recurring decisions."],
  ["02", "System Design", "Create the operating blueprint for workflows, automation, ownership, and data flow."],
  ["03", "Implementation", "Build the dashboards, docs, cadences, and handoffs with your team in the loop."],
  ["04", "Integration & Training", "Equip the team to run the system independently instead of depending on constant founder intervention."],
  ["05", "Review & Scale", "Tune the system as the company grows, new departments form, and priorities change."],
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
            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Startup consulting for founders who need the operating system behind growth: strategy, structure,
              investor readiness, automation, and team clarity.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button
                onClick={scrollToContact}
                size="lg"
                className="h-14 bg-primary px-7 text-base text-primary-foreground glow-cyber hover:bg-primary/90"
              >
                Build Your Growth System
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
              {["Ops", "Capital", "AI Stack"].map((item) => (
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
                <h2 className="mt-2 text-2xl font-semibold text-foreground">Turn founder chaos into an operating system.</h2>
              </div>
              <CircuitBoard className="h-9 w-9 text-primary" aria-hidden="true" />
            </div>
            <div className="space-y-4 py-6">
              {[
                ["Founder bottleneck", "Decisions, approvals, and context still live in your head."],
                ["Investor signal", "Progress exists, but the story is not packaged for confidence."],
                ["Team drift", "People are moving, but ownership, cadence, and visibility are blurry."],
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
                {["Operating map", "Automation backlog", "90-day execution rhythm"].map((item) => (
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
            title="From funding to function, build what founders need to grow."
            copy="Each engagement turns messy growth into visible workflows, measurable ownership, and repeatable execution."
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
            title="Clarity in every layer."
            copy="A practical sequence from diagnosis to implementation, designed so the system survives after the project ends."
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
            copy="Gurman Singh's path across brands, hospitality, creator operations, and high-growth tech shapes how Anti Matrix designs practical systems."
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
            eyebrow="Field reports"
            title="Stories of systems that scaled."
            copy="Representative transformations across reporting, hiring, data visibility, and operating cadence."
          />
          <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            <CaseStudyCard
              title="SaaS Startup"
              preview="A fast-growing SaaS company needed to connect operations with investor updates. Automated reporting dashboards reduced weekly chaos by 70%."
              challenge="The company had rapid growth but lacked structured communication between operations teams and investors. Weekly reports were manual, time-consuming, and inconsistent."
              approach="We audited the data sources, stakeholder needs, and reporting requirements, then designed an automated dashboard system for internal and investor use."
              system="A centralized reporting dashboard with automated data pipelines, standardized KPI definitions, weekly investor update templates, and internal alignment tools."
              impact="Reduced report preparation time by 70%, improved data accuracy, increased investor confidence, and helped leadership make faster decisions."
            />
            <CaseStudyCard
              title="Cybersecurity Startup"
              preview="A cybersecurity firm entering a growth phase needed structure across hiring and operations. We built pipelines, OKRs, and onboarding."
              challenge="The company was scaling rapidly with no formal hiring process, inconsistent onboarding, and unclear performance metrics."
              approach="We created a talent operations framework covering role definitions, interview scorecards, onboarding paths, and OKR alignment."
              system="Complete hiring pipelines, automated workflows, onboarding documentation, and OKR systems aligned across departments."
              impact="Doubled team size while maintaining quality, reduced time-to-productivity by 40%, and clarified performance expectations."
            />
            <CaseStudyCard
              title="Lifestyle Brand"
              preview="A D2C brand post-funding was losing operational and creative alignment. A tiered operations framework improved decision turnaround by 40%."
              challenge="Post-funding growth created operational chaos, slow decisions, and unclear accountability across creative and operations teams."
              approach="We separated strategic, tactical, and operational decisions, then created review cadences and decision authorities."
              system="Weekly operational reviews, monthly strategic planning, decision frameworks, process docs, and cross-functional alignment tools."
              impact="Improved decision turnaround by 40%, reduced creative-operations conflict, and created a scalable foundation for growth."
            />
            <CaseStudyCard
              title="Consumer Platform"
              preview="A regional platform faced fragmented data and unclear metrics. We built a unified data wheel and operating structure."
              challenge="Expansion created fragmented data, inconsistent metrics, and no centralized view of performance across markets."
              approach="We standardized metrics across regions, built centralized dashboards, and established operational processes for multi-market teams."
              system="A unified data platform with standardized KPIs, regional dashboards, automated reporting, and operational playbooks."
              impact="Created market-wide visibility, improved strategic decisions, and built a foundation for sustainable expansion."
            />
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
          <div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2 lg:grid-cols-3">
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
            title="Design your growth system."
            copy="Share where the chaos is showing up. The first step is mapping what needs structure."
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
            <p className="mt-1 text-sm text-muted-foreground">Startup consulting by Gurman Singh. All rights reserved.</p>
          </div>
          <div className="flex gap-6">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              LinkedIn
            </a>
            <a href="mailto:contact@antimatrixproject.com" className="text-muted-foreground hover:text-primary">
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
