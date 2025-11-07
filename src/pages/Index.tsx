import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import ServiceCard from "@/components/ServiceCard";
import ProcessStep from "@/components/ProcessStep";
import CaseStudyCard from "@/components/CaseStudyCard";
import ResourceCard from "@/components/ResourceCard";
import ContactForm from "@/components/ContactForm";
import { Target, TrendingUp, Users, Briefcase, Zap, Brain, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        <AnimatedBackground />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            We build systems that help startups
            <span className="text-gradient-cyber"> scale with clarity</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            The Anti Matrix Project Startup Consultant helps founders bring order to growth — combining strategy, structure, and intelligent automation.
          </p>
          <Button
            onClick={scrollToContact}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 py-6 glow-cyber"
          >
            Let's Build Your System
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              From Funding to Function — We Build What Founders Need to Grow
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ServiceCard
              icon={<Target size={40} />}
              title="Startup Growth Systems"
              description="Designing internal processes, documentation, and team flows that scale sustainably."
            />
            <ServiceCard
              icon={<TrendingUp size={40} />}
              title="Investor Strategy & Fundraising"
              description="Building pitch decks, financial models, and investor reporting systems."
            />
            <ServiceCard
              icon={<Briefcase size={40} />}
              title="Business & Revenue Operations"
              description="Structuring performance dashboards, pricing models, and revenue logic."
            />
            <ServiceCard
              icon={<Users size={40} />}
              title="Hiring & Team Expansion"
              description="Building org plans, hiring pipelines, onboarding documentation, and OKR systems."
            />
            <ServiceCard
              icon={<Zap size={40} />}
              title="Product & Process Alignment"
              description="Converting strategy into actionable systems across product, ops, and growth teams."
            />
            <ServiceCard
              icon={<Brain size={40} />}
              title="Automation & AI Stack Integration"
              description="Embedding no-code and AI-driven tools to simplify recurring workflows."
            />
            <ServiceCard
              icon={<Shield size={40} />}
              title="Post-Investment Scaling"
              description="Helping startups structure departments, board reporting, and efficiency metrics."
            />
            <ServiceCard
              icon={<Sparkles size={40} />}
              title="AI Evangelism & Intelligence"
              description="Exploring how startups can integrate AI in strategic, operational, and creative layers."
            />
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Process: Clarity in Every Layer</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <ProcessStep
              number="01"
              title="Discovery & Diagnosis"
              description="Understanding your team, systems, and bottlenecks."
            />
            <ProcessStep
              number="02"
              title="System Design"
              description="Building a blueprint for operations, automation, and data flow."
            />
            <ProcessStep
              number="03"
              title="Implementation"
              description="Executing with your team and creating an internal knowledge base."
            />
            <ProcessStep
              number="04"
              title="Integration & Training"
              description="Equipping your team to run independently with clarity."
            />
            <ProcessStep
              number="05"
              title="Review & Scale"
              description="Continuous optimization to evolve your startup systems as you grow."
              isLast
            />
          </div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section id="stories" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Stories of Systems That Scaled</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            <CaseStudyCard
              title="SaaS Startup"
              preview="A fast-growing SaaS company was struggling to connect operations with investor updates. We built automated reporting dashboards and structured internal alignment tools, reducing weekly chaos by 70%."
              challenge="The company had rapid growth but lacked structured communication between operations teams and investors. Weekly reports were manual, time-consuming, and inconsistent, leading to confusion and missed opportunities."
              approach="We conducted a comprehensive audit of their data sources, stakeholder needs, and reporting requirements. Then designed an automated dashboard system that pulled real-time metrics and formatted them for both internal and investor consumption."
              system="Implemented a centralized reporting dashboard with automated data pipelines, standardized KPI definitions, weekly investor update templates, and internal alignment tools that connected product, sales, and operations metrics."
              impact="Reduced report preparation time by 70%, improved data accuracy, increased investor confidence, and enabled the leadership team to make faster, more informed decisions."
            />
            <CaseStudyCard
              title="Cybersecurity Startup"
              preview="A cybersecurity firm entering a growth phase needed structure across hiring and operations. We designed an end-to-end system — from job pipelines to OKRs and cross-department onboarding."
              challenge="The company was scaling rapidly but had no formal hiring process, inconsistent onboarding, and unclear performance metrics. This led to mis-hires, slow ramp-up times, and team misalignment."
              approach="We created a comprehensive talent operations framework that covered the entire employee lifecycle — from job description templates to structured interview processes, department-specific onboarding paths, and OKR frameworks."
              system="Built complete hiring pipelines with role definitions, interview scorecards, automated workflows, comprehensive onboarding documentation, and OKR systems aligned to company objectives across all departments."
              impact="Successfully doubled team size while maintaining quality, reduced time-to-productivity by 40%, improved employee retention, and created clarity in performance expectations across the organization."
            />
            <CaseStudyCard
              title="Lifestyle Brand"
              preview="A D2C brand post-funding was losing track of operations and creative alignment. We introduced a tiered operations framework and reporting rhythm — improving decision turnaround by 40%."
              challenge="Post-funding growth created operational chaos — creative, operations, and leadership teams were misaligned, decisions took weeks, and there was no clear accountability or process documentation."
              approach="We designed a tiered operations framework that separated strategic, tactical, and operational decisions, implemented regular review cadences, and created clear decision-making authorities and communication channels."
              system="Established weekly operational reviews, monthly strategic planning sessions, decision-making frameworks, process documentation, and cross-functional alignment tools that connected creative vision with operational execution."
              impact="Improved decision turnaround time by 40%, reduced creative-operations conflicts by 60%, increased team satisfaction, and created a scalable foundation for continued growth."
            />
            <CaseStudyCard
              title="Consumer Platform"
              preview="A digital platform scaling across regions faced data fragmentation and unclear performance metrics. We built a unified data wheel and operational structure that aligned leadership."
              challenge="The platform was expanding into new markets but had fragmented data across regions, inconsistent metrics, and no centralized view of performance. Leadership struggled to make strategic decisions with confidence."
              approach="We created a unified data architecture that standardized metrics across regions, built centralized dashboards for multi-market visibility, and established operational processes that worked across different geographies and teams."
              system="Implemented a unified data platform with standardized KPIs, regional performance dashboards, automated reporting systems, and operational playbooks that ensured consistency while allowing for local adaptation."
              impact="Achieved complete visibility across all markets, standardized performance measurement, improved strategic decision-making, and created a foundation for sustainable multi-market expansion."
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">The Mind Behind the Systems</h2>
            </div>
            <div className="prose prose-invert max-w-none space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                Gurman Singh is a founder and business operations strategist who has spent years inside founder's offices, building clarity from chaos.
              </p>
              <p>
                Formerly part of the CEO's team at Zelto (AdPushup), Gurman has helped startups design scalable systems across business operations, data, hiring, and strategy.
              </p>
              <p>
                Today, through The Anti Matrix Project Startup Consultant, he works with founders worldwide — helping them bridge the gap between ideas, investment, and intelligent execution.
              </p>
              <p>
                As an AI evangelist, Gurman explores how human creativity and artificial intelligence can co-build smarter companies — not by replacing people, but by empowering them with systems that think alongside them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section id="clients" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Who We Work With</h2>
            <p className="text-xl text-muted-foreground">
              Startups and businesses across industries that believe in building systems before scaling.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-4xl mx-auto">
            {["SaaS", "Cybersecurity", "Creator Economy", "D2C & E-commerce", "Hospitality", "Lifestyle"].map((industry) => (
              <div
                key={industry}
                className="bg-card border border-border rounded-lg p-6 text-center hover:border-primary transition-colors"
              >
                <p className="font-medium text-foreground">{industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Resources Section */}
      <section id="resources" className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Frameworks, Systems & Playbooks</h2>
            <p className="text-xl text-muted-foreground">
              From startup dashboards to investor-ready checklists — insights from our work, published openly.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <ResourceCard title="The 4 Frameworks Every Startup Should Build Before Hiring" />
            <ResourceCard title="How Post-Investment Founders Can Build Reporting Systems Investors Love" />
            <ResourceCard title="Why Every Startup Needs an Internal Knowledge Base Before Scaling" />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Let's Design Your Growth System</h2>
            <p className="text-xl text-muted-foreground">
              Every startup deserves clarity. Let's build yours.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <p className="text-lg font-semibold">The Anti Matrix Project Startup Consultant</p>
            <p className="text-sm text-muted-foreground">© Gurman Singh — All Rights Reserved</p>
            <div className="flex justify-center gap-6 pt-4">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a
                href="mailto:contact@antimatrixproject.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Email
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
