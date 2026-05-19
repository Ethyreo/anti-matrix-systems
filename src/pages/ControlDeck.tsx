import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import AnimatedBackground from "@/components/AnimatedBackground";
import { Button } from "@/components/ui/button";
import BlogModal, { mapTitleToId } from "@/components/BlogModal";
import founderPortrait from "@/assets/founder-portrait.jpg";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Briefcase,
  Cpu,
  ExternalLink,
  Layers,
  Music,
  Play,
  Pause,
  SkipForward,
  Sparkles,
  Terminal,
  Volume2,
  X,
  Database,
  Server,
  Network,
  Activity,
} from "lucide-react";

// Track metadata for the blogs/articles
const blogs = [
  {
    title: "The 4 Frameworks Every Startup Should Build Before Hiring",
    description: "Before onboarding another employee, discover how to construct standardized handoffs, metric scorecards, unified wiki docs, and operating cadences that keep your team aligned.",
    readTime: "6 min read",
    systemTag: "SYS/HR-01",
    date: "May 2026",
    points: [
      "Standardized role documentation (The Operating Blueprint)",
      "Daily/Weekly operational check-in cadences",
      "Direct cross-department handoff metrics",
      "Single-source database of role dependencies",
    ],
  },
  {
    title: "How Post-Investment Founders Can Build Reporting Systems Investors Love",
    description: "Transition from chaotic, manual reporting to a unified telemetry system. Keep your board happy, reduce report prep by 70%, and lock in data integrity without massive effort.",
    readTime: "8 min read",
    systemTag: "SYS/FIN-02",
    date: "April 2026",
    points: [
      "Automated pipeline data ingest using lightweight micro-scripts",
      "Normalized net burn calculations matching actual cash schedules",
      "Interactive Google Sheet and dashboard architectures",
      "Pre-templated board slides built with absolute data precision",
    ],
  },
  {
    title: "Why Every Startup Needs an Internal Knowledge Base Before Scaling",
    description: "Chaos thrives when knowledge resides only in founder heads. Learn the step-by-step layout of building an Obsidian or Notion second brain that captures institutional logic.",
    readTime: "5 min read",
    systemTag: "SYS/OPS-03",
    date: "March 2026",
    points: [
      "The 'One-Topic-Per-Note' information mapping rule",
      "Bi-directional wiki links connecting strategies to execution code",
      "Standard Operating Procedures (SOPs) for key client loops",
      "Continuous automated syncing protocols between team repos",
    ],
  },
];

// Music playlist
const tracks = [
  { title: "Operator Frequencies (Ambient Deep)", bpm: "110 BPM", type: "Focus Soundscape" },
  { title: "Shimla Dusk (Lo-Fi Hums)", bpm: "88 BPM", type: "Chilled Mountain Beats" },
  { title: "Asymmetric Orchestration (Cyber Synth)", bpm: "128 BPM", type: "Late Night Build Beats" },
];

// Detailed Apps data with Modal Details
interface AppSpec {
  title: string;
  description: string;
  tag: string;
  status: string;
  icon: JSX.Element;
  stats: string;
  tech: string[];
  specs: {
    overview: string;
    techStack: string[];
    infrastructure: string;
    architecture: {
      name: string;
      description: string;
    }[];
  };
}

const appsData: AppSpec[] = [
  {
    title: "Tenant Management System",
    description: "An internal operations dashboard built to replace physical tenant ledger registers. Designed for precise layout-guided utility, bill calculation, ledger updates, and receipt exports.",
    tag: "APP/TMS-01",
    status: "Beta Active",
    icon: <Briefcase className="h-6 w-6 text-primary" />,
    stats: "Mashobra & Shimla Units Active",
    tech: ["Antigravity", "Supabase", "React", "PostgreSQL"],
    specs: {
      overview: "A custom property operating application engineered to automate visual tenancy charting and utility ledger auditing. Built explicitly to replace complex manual logs in Himachali real-estate and booking workflows.",
      techStack: [
        "Frontend: React 18 with TypeScript, Tailwind CSS, Vite compilation framework.",
        "Backend: Supabase Cloud client authentication, session storage handles, JWT authorization.",
        "Database: PostgreSQL managed tables, complex view bindings for utility split ratios.",
        "Development Suite: Constructed through Antigravity agent CLI instructions, git version-control.",
      ],
      infrastructure: "Runs on a localized high-performance Node.js environment with cloud replication. Production pipeline automatically pushes client assets to highly available edge-CDNs via Supabase serverless bindings.",
      architecture: [
        { name: "Visual Grid Reception Map", description: "Enables operators to visually navigate building plans, click specific flat boundaries, and retrieve live occupancy data schemas." },
        { name: "Billing Ingest Service", description: "Performs utility split operations (electricity units, water allocations, security rates) and logs proportional splits into the database." },
        { name: "Receipt & Invoice Engine", description: "Parses payment states, calculates outstanding arrears, and generates printable PDF receipts and invoice sheets dynamically." },
      ],
    },
  },
  {
    title: "PDF App",
    description: "A secure, air-gapped document processor that extracts high-value business metrics, tax items, and land records safely.",
    tag: "APP/PDF-02",
    status: "Active Use",
    icon: <Database className="h-6 w-6 text-primary" />,
    stats: "100% Secure Offline Extraction",
    tech: ["Python", "OCR Tesseract", "Node.js", "PyPDF2"],
    specs: {
      overview: "An offline, privacy-hardened document parsing application designed to process sensitive startup paperwork, vendor contracts, and land documents (including Himachali Khasra, Khata, and Fard indexes) without remote leak risk.",
      techStack: [
        "Engine: Python 3.11 local runtime.",
        "Libraries: PyPDF2 raw character crawler, pdfplumber layout analyst.",
        "OCR Stack: Tesseract OCR integration for physical paper scan text extraction.",
        "Client UI: Lightweight Node.js local client bridge with secure browser-rendered file input.",
      ],
      infrastructure: "Hosted entirely on offline local machine workspaces. Features air-gapped configuration to ensure zero data flows outside the local system workspace.",
      architecture: [
        { name: "PDF Text Stripper Service", description: "Ingests local PDF streams, analyzes geometric character spacing, and extracts structured text sequences." },
        { name: "OCR Character Daemon", description: "Triggers automated Tesseract parsing on physical scans to extract text tables from unsearchable images." },
        { name: "Metadata Data Classifier", description: "Regular-expression parser that automatically maps extracted text data to unified JSON templates (e.g. tax totals, land coords)." },
      ],
    },
  },
  {
    title: "Dev Squad",
    description: "A persistent multi-agent execution squad that automates developer workflows, task schedules, and auto-syncs with your Obsidian Second Brain.",
    tag: "APP/DEVS-03",
    status: "Beta Active",
    icon: <Network className="h-6 w-6 text-primary" />,
    stats: "Obsidian Auto-Sync Active",
    tech: ["Node.js", "GitHub MCP", "Obsidian API", "Markdown Sync"],
    specs: {
      overview: "A background coordination agent system running on-demand or chronologically. Automates regular git backups, creates remote PR branches, and mirrors documentation directly into your Obsidian Second Brain to preserve system alignment.",
      techStack: [
        "Platform: Node.js ESModules server runtime.",
        "Integrations: GitHub MCP (Model Context Protocol) API client, local git CLI wrappers.",
        "Database: Filesystem-based Markdown repository sync mapping.",
        "Sync Protocols: Auto-sync Obsidian Vault hooks via custom shell synchronizers.",
      ],
      infrastructure: "Monitored as an active background terminal daemon (e.g., codex runtime scheduler) within the local workspace project folders.",
      architecture: [
        { name: "Obsidian Vault Mirror Daemon", description: "Intercepts file modifications in the coding workspace and mirrors README, context, and plan files directly to Obsidian." },
        { name: "Git PR Automation service", description: "Auto-creates commit scopes, tags branches, creates GitHub Pull Requests, and queries PR checks automatically." },
        { name: "Live Progress Logger", description: "Appends cron-based execution timelines to daily notes in Obsidian, automatically prepending the [Anti Matrix] prefix to entries." },
      ],
    },
  },
  {
    title: "MAOS (Multi-Agent Operating System)",
    description: "The parent coordinating OS routing prompts between cost-free local models and high-reasoning cloud APIs based on task complexity.",
    tag: "APP/MAOS-04",
    status: "Active Engineering",
    icon: <Cpu className="h-6 w-6 text-primary" />,
    stats: "Asymmetric Token Routing Online",
    tech: ["FastAPI", "Ollama", "Claude API", "Python Proxy"],
    specs: {
      overview: "The primary orchestrator and router governing your multi-agent company. Optimizes token spend and execution speed by intercepting assistant prompts and routing them dynamically between local models and advanced cloud APIs.",
      techStack: [
        "Core: Python FastAPI server interface.",
        "Local Models: Ollama API runner loading DeepSeek Coder and Gemma 2 models.",
        "Cloud APIs: Anthropic Claude 3.5 Sonnet, Google Gemini 1.5 Pro, OpenAI GPT-4o.",
        "Storage: Local Redis cache database to store prompt embeddings and redundant replies.",
      ],
      infrastructure: "Deploys as a local Docker container cluster utilizing GPU hardware acceleration inside the workstation workspace.",
      architecture: [
        { name: "Asymmetric Prompts Router", description: "Parses incoming tasks, calculates token complexity weights, and dynamically decides the optimal model (Local vs Cloud)." },
        { name: "API Rate Limit Trapdoor", description: "Tracks external API credits, queues calls, and smoothly falls back to local models when third-party quotas are reached." },
        { name: "Context Compiler service", description: "Aggregates project dashboard memory and Obsidian knowledge links to feed active agents complete, unified schemas." },
      ],
    },
  },
  {
    title: "Restaurant Android POS",
    description: "An offline-resilient tablet billing and tables layout terminal designed for smooth service operations, bluetooth printing, and cloud ledger sync.",
    tag: "APP/RPOS-05",
    status: "Beta Deploy",
    icon: <Terminal className="h-6 w-6 text-primary" />,
    stats: "Offline-First SQLite Cache Active",
    tech: ["Kotlin Android SDK", "SQLite", "React Native", "ESC/POS Printers"],
    specs: {
      overview: "A native smart POS billing application optimized for restaurant staff. Features visual dining-room grid layout tracking, offline-first transaction logging, and direct thermal paper print protocols.",
      techStack: [
        "Mobile: Native Android SDK utilizing Kotlin and Jetpack Compose UI.",
        "Admin Portal: React Native cross-platform web panel.",
        "Database: Local Room SQLite database, synchronizing with remote PostgreSQL database.",
        "Printer Driver: Custom ESC/POS binary printing library.",
      ],
      infrastructure: "Installs as an air-gapped Android APK on portable handheld smart-terminals. Automatically pairs with local bluetooth thermal receipt printers.",
      architecture: [
        { name: "Offline Sales Ledger service", description: "Logs transactions, billing splits, and seat changes immediately inside local SQLite, ensuring zero service halts during offline intervals." },
        { name: "Bluetooth Printer hardware socket", description: "Creates direct RFCOMM socket connections to transmit raw ESC/POS command sequences to receipt printers." },
        { name: "Batched Synchronization Relay", description: "Auto-checks internet state, fetches cached offline transactions, and batches ledger updates to the central accounting database." },
      ],
    },
  },
];

// Expanded AI Tech Stack data - Organized for futuristic high-fidelity neural visualizer
const techStack = {
  brain: [
    { name: "Claude 3.5 Sonnet", role: "Agentic reasoning & multi-step coding", status: "PRIMARY" },
    { name: "DeepSeek R1", role: "Deep logic & complex reasoning swarms", status: "ONLINE" },
    { name: "Gemini 1.5 Pro", role: "2M Context ingestion & complete audits", status: "ONLINE" },
    { name: "OpenAI o1-pro", role: "Strategic GTM & enterprise logic maps", status: "STANDBY" },
    { name: "Qwen 2.5 Coder", role: "Local offline autocomplete & inference", status: "ONLINE" },
  ],
  spine: [
    { name: "LangGraph", role: "Stateful swarms & cyclical agent loops", status: "ACTIVE" },
    { name: "Exa & Tavily AI", role: "High-signal real-time web searches", status: "ACTIVE" },
    { name: "CrewAI", role: "Role-playing multi-agent task execution", status: "ACTIVE" },
    { name: "Mem0", role: "Persistent profile memory across sessions", status: "ACTIVE" },
    { name: "Phidata", role: "Semantic tool & server function calling", status: "STANDBY" },
  ],
  workshop: [
    { name: "Cursor & Windsurf", role: "Agent-in-the-loop developer workspaces", status: "SYNCED" },
    { name: "Lovable & Bolt", role: "Fullstack rapid web app compilers", status: "SYNCED" },
    { name: "v0.dev", role: "Component UI layouts & web frameworks", status: "SYNCED" },
    { name: "Supabase Vector", role: "PGVector retrieval embeddings & RAG", status: "SYNCED" },
    { name: "Copilot Workspace", role: "Large-scale codebase refactoring", status: "STANDBY" },
  ],
  studio: [
    { name: "ElevenLabs", role: "High-fidelity neural voice synthesis", status: "ACTIVE" },
    { name: "Midjourney v6", role: "Cinematic concept asset creation", status: "ONLINE" },
    { name: "HeyGen Avatars", role: "AI-driven professional avatar video", status: "STANDBY" },
    { name: "Runway Gen-3", role: "Generative motion B-roll videography", status: "ACTIVE" },
    { name: "Udio & Suno", role: "Focus soundtrack soundwave synthesis", status: "ONLINE" },
  ],
};

const ControlDeck = () => {
  const [activeTab, setActiveTab] = useState("blogs");
  
  // Active operational pipeline state
  const [activePipeline, setActivePipeline] = useState("growth");

  // Music Player Simulation
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playProgress, setPlayProgress] = useState(35);
  const audioPlayerRef = useRef<HTMLAudioElement | null>(null);

  // App Modal State
  const [activeApp, setActiveApp] = useState<AppSpec | null>(null);
  const [isAppModalOpen, setIsAppModalOpen] = useState(false);
  const [activeAppTab, setActiveAppTab] = useState<"overview" | "stack" | "infra" | "architecture">("overview");

  // Blog Modal State
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sync state with HTML5 audio player
  useEffect(() => {
    if (audioPlayerRef.current) {
      if (isPlaying) {
        audioPlayerRef.current.play().catch(() => {
          // Fallback if browser blocks autoplay
          setIsPlaying(false);
        });
      } else {
        audioPlayerRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  // Simulate progress bar when track is playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        if (audioPlayerRef.current) {
          const duration = audioPlayerRef.current.duration || 180;
          const current = audioPlayerRef.current.currentTime || 0;
          setPlayProgress((current / duration) * 100);
        } else {
          setPlayProgress((prev) => (prev >= 100 ? 0 : prev + 0.5));
        }
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleNextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % tracks.length);
    setPlayProgress(0);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    if (audioPlayerRef.current) {
      const duration = audioPlayerRef.current.duration || 180;
      const current = audioPlayerRef.current.currentTime || 0;
      setPlayProgress((current / duration) * 100);
      if (audioPlayerRef.current.ended) {
        handleNextTrack();
      }
    }
  };

  const currentTrack = tracks[currentTrackIndex];

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />

      {/* Simulated Audio Tag for real file uploads later */}
      <audio 
        ref={audioPlayerRef}
        src="" // User can upload / assets / local music here
        onTimeUpdate={handleTimeUpdate}
        className="hidden"
        preload="auto"
      />

      {/* Background system decoration */}
      <div className="absolute inset-0">
        <AnimatedBackground />
      </div>
      <div className="absolute inset-0 scanline-mask opacity-25 pointer-events-none" />

      <main className="container relative z-10 mx-auto px-6 py-24 md:py-32">
        {/* Breadcrumb back navigation */}
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground transition-all duration-300 hover:text-primary mb-8"
        >
          <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Terminal
        </Link>

        {/* Header Block — Two-column hero with portrait */}
        <header className="mb-12 border border-border bg-card/60 backdrop-blur-md panel-edge scan-sweep overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            {/* Left: Text Content */}
            <div className="flex-1 p-6 md:p-8 lg:p-10">
              <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-primary">
                  SYS/DECK-01 // OPERATIONAL MONITOR
                </span>
                <div className="flex gap-1.5" aria-hidden="true">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="h-2 w-2 rounded-full bg-[var(--data)]" />
                </div>
              </div>
              
              <h1 className="font-display text-4xl font-semibold leading-tight text-foreground md:text-5xl lg:text-6xl">
                The Control Deck
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground md:text-xl">
                Gurman Singh — A founder, operations specialist, and AI orchestration architect. This is the centralized system control center mapping active software products, tactical writings, focus frequencies, and advanced agent frameworks.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
                <div className="flex items-center gap-2 border border-border bg-background/50 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--data)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Focus: Startup Systems Architecture</span>
                </div>
                <div className="flex items-center gap-2 border border-border bg-background/50 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Orchestrator: Multi-Agent Coordination</span>
                </div>
              </div>
            </div>

            {/* Right: Founder Portrait */}
            <div className="relative w-full lg:w-[380px] xl:w-[440px] shrink-0">
              {/* Gradient overlay blending image into the dark card */}
              <div className="absolute inset-0 bg-gradient-to-r from-card/90 via-card/40 to-transparent z-10 pointer-events-none hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent z-10 pointer-events-none lg:hidden" />
              {/* Decorative corner accents */}
              <div className="absolute top-3 right-3 z-20 flex gap-1" aria-hidden="true">
                <span className="h-1.5 w-1.5 bg-primary opacity-80 animate-pulse" />
                <span className="h-1.5 w-6 bg-[var(--data)] opacity-50" />
              </div>
              <div className="absolute bottom-3 right-3 z-20 h-px w-12 bg-gradient-cyber opacity-60" aria-hidden="true" />
              <img
                src={founderPortrait}
                alt="Gurman Singh — Founder, Anti Matrix Project"
                className="w-full h-48 sm:h-64 lg:h-full object-cover object-top"
                loading="eager"
              />
              {/* Scanline overlay on the image */}
              <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none z-10" />
            </div>
          </div>
        </header>

        {/* Navigation Tabs */}
        <section className="mb-10 flex flex-wrap gap-2 border-b border-border pb-4">
          {[
            { id: "blogs", label: "Blogs & Frameworks", icon: <BookOpen size={16} /> },
            { id: "music", label: "Music Station", icon: <Music size={16} /> },
            { id: "apps", label: "Apps Created", icon: <Layers size={16} /> },
            { id: "stack", label: "AI & Tech Stack", icon: <Cpu size={16} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 border px-4 py-3 font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                activeTab === tab.id
                  ? "border-primary bg-primary-soft text-primary font-medium"
                  : "border-border bg-card/40 text-muted-foreground hover:border-border-strong hover:text-foreground hover:bg-card/75"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </section>

        {/* Active Content Showcase */}
        <section className="animate-fade-in min-h-[400px]">
          {activeTab === "blogs" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, idx) => (
                <article
                  key={idx}
                  className="panel-edge flex flex-col border border-border bg-card/65 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/50 group cursor-pointer"
                  onClick={() => {
                    setSelectedArticleId(mapTitleToId(blog.title));
                    setIsBlogModalOpen(true);
                  }}
                >
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--data)] border border-border/80 px-2 py-0.5">
                      {blog.systemTag}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground">{blog.date}</span>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary mb-3">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                    {blog.description}
                  </p>

                  <div className="border-t border-border pt-4 mt-auto">
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Key Framework Elements:</p>
                    <ul className="space-y-1">
                      {blog.points.map((pt, pidx) => (
                        <li key={pidx} className="text-xs text-foreground/80 flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-6 flex justify-between items-center pt-2">
                    <span className="font-mono text-[10px] text-muted-foreground">{blog.readTime}</span>
                    <Button variant="ghost" size="sm" className="h-8 text-xs font-mono text-primary gap-1 group-hover:bg-primary-soft">
                      Open Document
                      <ArrowRight size={12} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {activeTab === "music" && (
            <div className="max-w-2xl mx-auto">
              <div className="panel-edge border border-border bg-card/85 backdrop-blur-md p-6 md:p-8 scan-sweep">
                <div className="flex justify-between items-center border-b border-border pb-4 mb-6">
                  <div className="flex items-center gap-3">
                    <Music className="h-5 w-5 text-primary" />
                    <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Music Station Playlist</span>
                  </div>
                  <span className="font-mono text-[10px] text-[var(--data)]">SYS/AUDIO-DECK</span>
                </div>

                <div className="border border-border bg-background/80 p-5 rounded font-mono mb-6 relative overflow-hidden">
                  <div className="absolute right-4 top-4 flex gap-1 animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    <span className="h-2 w-2 rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                    <span className="h-2 w-2 rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
                  </div>

                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest mb-1">Active Track:</div>
                  <div className="text-xl font-medium text-foreground tracking-wide mb-1 flex items-center gap-2">
                    {currentTrack.title}
                    {isPlaying && <span className="text-xs text-primary animate-pulse">[PLAYING]</span>}
                  </div>
                  <div className="text-xs text-[var(--data)] flex justify-between border-t border-border/40 pt-2 mt-2">
                    <span>{currentTrack.type}</span>
                    <span>{currentTrack.bpm}</span>
                  </div>

                  {/* Equalizer animation simulation */}
                  <div className="h-10 flex items-end gap-1 mt-4">
                    {Array.from({ length: 24 }).map((_, i) => {
                      const height = isPlaying 
                        ? [20, 35, 10, 40, 15, 30, 25, 12, 38, 22, 18, 32, 28, 14, 36, 16, 26, 30, 8, 34, 18, 24, 12, 22][(i + currentTrackIndex * 4) % 24]
                        : 4;
                      return (
                        <div
                          key={i}
                          className="w-full bg-primary transition-all duration-300"
                          style={{
                            height: `${height}px`,
                            opacity: isPlaying ? 0.8 : 0.2,
                            background: i % 2 === 0 ? 'var(--signal)' : 'var(--data)'
                          }}
                        />
                      );
                    })}
                  </div>
                </div>

                {/* Audio Progress Slider */}
                <div className="mb-6">
                  <div className="h-1 w-full bg-border rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-amber transition-all duration-1000 ease-linear"
                      style={{ width: `${playProgress}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-muted-foreground mt-2">
                    <span>{isPlaying ? `0:${Math.floor(playProgress * 0.03).toString().padStart(2, '0')}` : '0:00'}</span>
                    <span>3:00</span>
                  </div>
                </div>

                {/* Audio Control Panel */}
                <div className="flex items-center justify-between border-t border-border pt-6">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/95 transition-all duration-300 glow-cyber"
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} className="ml-1" />}
                    </button>
                    <button 
                      onClick={handleNextTrack}
                      className="flex h-10 w-10 items-center justify-center border border-border bg-card/60 text-muted-foreground hover:text-foreground hover:border-border-strong transition-all duration-300"
                    >
                      <SkipForward size={16} />
                    </button>
                  </div>

                  <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
                    <Volume2 size={16} className="text-primary" />
                    <span>AUDIO STATION INTAKE READY</span>
                  </div>
                </div>
              </div>

              {/* Tracks List */}
              <div className="mt-6 border border-border bg-card/45 p-4 rounded">
                <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-3">Soundtrack Queue (User MP3 Files Loadable):</p>
                <div className="space-y-1">
                  {tracks.map((t, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                        setPlayProgress(0);
                      }}
                      className={`w-full flex items-center justify-between p-3 text-left transition-all duration-300 font-mono text-xs ${
                        currentTrackIndex === idx 
                          ? "border border-primary/50 bg-primary-soft text-primary" 
                          : "border border-transparent text-muted-foreground hover:text-foreground hover:bg-card/40"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-primary">{currentTrackIndex === idx && isPlaying ? "▊" : `${idx + 1}.`}</span>
                        <span>{t.title}</span>
                      </span>
                      <span className="text-[10px] text-muted-foreground/80">{t.bpm} // {t.type}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === "apps" && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {appsData.map((app, idx) => (
                <div
                  key={idx}
                  onClick={() => {
                    setActiveApp(app);
                    setActiveAppTab("overview");
                    setIsAppModalOpen(true);
                  }}
                  className="panel-edge flex flex-col border border-border bg-card/65 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/50 group cursor-pointer"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="p-2 border border-border/80 bg-background/50 rounded group-hover:border-primary/30">
                      {app.icon}
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-primary border border-primary-soft bg-primary-soft px-2 py-0.5">
                      {app.status}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary mb-3">
                    {app.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-grow mb-6">
                    {app.description}
                  </p>

                  <div className="border-t border-border pt-4 mt-auto">
                    <div className="flex justify-between items-center text-[10px] font-mono text-muted-foreground mb-3">
                      <span>MONITOR SYSTEM:</span>
                      <span className="text-[var(--data)] uppercase">{app.tag}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {app.tech.slice(0, 3).map((t, tidx) => (
                        <span
                          key={tidx}
                          className="font-mono text-[10px] bg-background/80 border border-border px-2 py-0.5 rounded text-foreground/80"
                        >
                          {t}
                        </span>
                      ))}
                      {app.tech.length > 3 && (
                        <span className="font-mono text-[10px] text-muted-foreground px-1.5 py-0.5">+{app.tech.length - 3}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end text-xs font-mono text-primary group-hover:underline">
                    Access Tech Specs
                    <ArrowRight size={12} className="ml-1" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "stack" && (
            <div className="space-y-8 max-w-6xl mx-auto w-full">
              {/* Strategic Intro Banner */}
              <div className="border border-border/60 bg-card/40 p-6 md:p-8 rounded-sm panel-edge relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none" />
                <div className="relative z-10 max-w-3xl animate-in fade-in duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">// Operational Strategy</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    Deploying the Sovereign AI Stack
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    Anti Matrix is built on a modular ecosystem of foundation models, stateful agent networks, and autonomous execution pipelines. Rather than relying on rigid, monolithic software suites, we coordinate these tools dynamically to orchestrate zero-touch client acquisitions, autonomous product development labs, and brand scaling content factories.
                  </p>
                </div>
              </div>

              {/* Two-Column Core Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Interactive Operations & Pipelines (Saves 7 columns for deep showcase) */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border border-border bg-card/60 backdrop-blur-sm p-6 rounded-sm panel-edge">
                    {/* Pipeline Navigation Header */}
                    <div className="border-b border-border pb-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Network className="h-4.5 w-4.5 text-primary" />
                        <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                          // ACTIVE OPERATIONAL PIPELINES
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Select a pipeline to visualize how Anti Matrix coordinates model reasoning and automated orchestrators to run critical systems.
                      </p>
                    </div>

                    {/* Pipeline Selector Tabs */}
                    <div className="grid grid-cols-3 gap-2 mb-6">
                      <button
                        onClick={() => setActivePipeline("growth")}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          activePipeline === "growth"
                            ? "border-primary bg-primary-soft text-primary font-semibold shadow-[0_0_12px_rgba(var(--primary-rgb),0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>Growth & SDR</span>
                        <span className="text-[8px] opacity-75 font-normal">Acquisition</span>
                      </button>
                      <button
                        onClick={() => setActivePipeline("engineering")}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          activePipeline === "engineering"
                            ? "border-primary bg-primary-soft text-primary font-semibold shadow-[0_0_12px_rgba(var(--primary-rgb),0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>Engineering Lab</span>
                        <span className="text-[8px] opacity-75 font-normal">Builds</span>
                      </button>
                      <button
                        onClick={() => setActivePipeline("media")}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          activePipeline === "media"
                            ? "border-primary bg-primary-soft text-primary font-semibold shadow-[0_0_12px_rgba(var(--primary-rgb),0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>Content Engine</span>
                        <span className="text-[8px] opacity-75 font-normal">Brand Synthesis</span>
                      </button>
                    </div>

                    {/* Render Active Pipeline Content */}
                    {activePipeline === "growth" && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Summary */}
                        <div className="bg-background/60 border border-border/40 p-4 rounded-sm">
                          <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                            The Client Acquisition Growth Engine
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Integrates targeted lead discovery with dynamic system auditing and contextual outreach pipelines, running autonomously to find high-fit B2B partners.
                          </p>
                        </div>

                        {/* Flowchart Steps */}
                        <div className="relative pl-6 border-l border-border/80 space-y-6">
                          {/* Step 1 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">1</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Target Intake & Discovery</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">Exa AI</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Queries semantic indexes to identify high-growth B2B startups compliant with specialized technical protocols.
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">2</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Contextual System Auditing</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-primary uppercase bg-primary-soft">Claude 3.5 Sonnet</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Evaluates target site codebases and APIs to identify structural architectural bottlenecks and optimization rooms.
                              </p>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">3</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Personalized Cadence Dispatch</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">n8n.io / Loops</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Triggers webhooks to assemble custom, highly specific value reports and dispatches tailored outreach cadences.
                              </p>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">4</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Memory Persistence Loop</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-amber-500 uppercase bg-amber-500/10">Mem0 / Tavily</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Retains outreach logs and target parameters to maintain client context across all future pipeline iterations.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePipeline === "engineering" && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Summary */}
                        <div className="bg-background/60 border border-border/40 p-4 rounded-sm">
                          <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                            The Autonomous Software Engineering Lab
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Bridges full-stack UI compiler frontends with agent-in-the-loop developer reasoning tools, ensuring fast feature cycles with static integrity controls.
                          </p>
                        </div>

                        {/* Flowchart Steps */}
                        <div className="relative pl-6 border-l border-border/80 space-y-6">
                          {/* Step 1 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">1</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Interactive Mockups & UI Layouts</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">v0 / Lovable</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Generates clean, aesthetic UI layouts and web modules based on curated Design Aesthetic tokens.
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">2</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Business Logic & Hooks</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-primary uppercase bg-primary-soft">Cursor / Windsurf</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Compiles system handlers, asynchronous logic controllers, and custom hooks directly inside the workspace.
                              </p>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">3</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Relational Schema & Semantic RAG</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">Supabase Vector</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Indexes technical documentation and libraries, embedding them into Postgres vector tables for rapid semantic RAG retrieval.
                              </p>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">4</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">API Schema Integrity Audit</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-amber-500 uppercase bg-amber-500/10">db_api_integrity</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Asserts static validation locks on data objects and checks API payloads to block schema leaks or routing regressions.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {activePipeline === "media" && (
                      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                        {/* Summary */}
                        <div className="bg-background/60 border border-border/40 p-4 rounded-sm">
                          <h4 className="font-display text-sm font-semibold text-foreground mb-1">
                            The Generative Content & Brand Engine
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Converts long-form insights into multi-format, rich creative assets to scale brand authority automatically across professional channels.
                          </p>
                        </div>

                        {/* Flowchart Steps */}
                        <div className="relative pl-6 border-l border-border/80 space-y-6">
                          {/* Step 1 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">1</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Value Extraction Parsing</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">GPT-4o</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Extracts architectural frameworks, strategic timelines, and core topics from longform audio scripts and client notes.
                              </p>
                            </div>
                          </div>

                          {/* Step 2 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">2</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">High-Fidelity Vocal Synthesis</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-primary uppercase bg-primary-soft">ElevenLabs</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Transcribes strategic articles into lifelike professional voiceovers, maintaining clear narrative authority.
                              </p>
                            </div>
                          </div>

                          {/* Step 3 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">3</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Visual Asset Concepts</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-muted-foreground uppercase bg-card/60">Midjourney v6</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Compiles gorgeous, dark-mode glassmorphic visual assets matching the signature design system.
                              </p>
                            </div>
                          </div>

                          {/* Step 4 */}
                          <div className="relative">
                            <span className="absolute -left-[31px] top-0 flex items-center justify-center w-4.5 h-4.5 rounded-full bg-primary text-primary-foreground font-mono text-[9px] font-bold">4</span>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-mono text-[10px] uppercase font-bold text-foreground">Dynamic Motion Loops</span>
                                <span className="font-mono text-[8px] border border-border px-1 text-amber-500 uppercase bg-amber-500/10">Runway Gen-3</span>
                              </div>
                              <p className="text-xs text-muted-foreground">
                                Assembles abstract atmospheric motion loops and cinematic B-rolls to back key narrative clips.
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column: Dynamic Tool Directory (A clean, elegant directory of what tools make it up) */}
                <div className="lg:col-span-5 space-y-6">
                  {/* Category Filter Selector or Direct Accordion List */}
                  <div className="border border-border bg-card/60 backdrop-blur-sm p-6 rounded-sm panel-edge">
                    <div className="border-b border-border pb-4 mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4.5 w-4.5 text-primary" />
                        <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                          // SOVEREIGN MODEL STACK
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase">20 ONLINE</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      The core architecture of verified models, libraries, and generative runtimes integrated within our pipelines.
                    </p>

                    <div className="space-y-4">
                      {/* Brain Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-foreground font-bold">1. Neural Processing (The Brain)</span>
                          <span className="font-mono text-[8px] text-primary bg-primary-soft px-1 rounded-sm">REASONING</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {techStack.brain.slice(0, 4).map((t, idx) => (
                            <div key={idx} className="bg-background/40 border border-border/40 hover:border-primary/20 p-2 rounded-sm transition-colors duration-300">
                              <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">{t.name}</p>
                              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{t.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Spine Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-foreground font-bold">2. Agentic Matrix (The Spine)</span>
                          <span className="font-mono text-[8px] text-green-500 bg-green-500/10 px-1 rounded-sm">MEM & RAG</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {techStack.spine.slice(0, 4).map((t, idx) => (
                            <div key={idx} className="bg-background/40 border border-border/40 hover:border-primary/20 p-2 rounded-sm transition-colors duration-300">
                              <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">{t.name}</p>
                              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{t.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Workshop Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-foreground font-bold">3. Engineering Labs (The Workshop)</span>
                          <span className="font-mono text-[8px] text-primary bg-primary-soft px-1 rounded-sm">COMPILERS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {techStack.workshop.slice(0, 4).map((t, idx) => (
                            <div key={idx} className="bg-background/40 border border-border/40 hover:border-primary/20 p-2 rounded-sm transition-colors duration-300">
                              <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">{t.name}</p>
                              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{t.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Studio Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-foreground font-bold">4. Generative Studio (The Studio)</span>
                          <span className="font-mono text-[8px] text-amber-500 bg-amber-500/10 px-1 rounded-sm">CREATIVE</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {techStack.studio.slice(0, 4).map((t, idx) => (
                            <div key={idx} className="bg-background/40 border border-border/40 hover:border-primary/20 p-2 rounded-sm transition-colors duration-300">
                              <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">{t.name}</p>
                              <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">{t.role}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          )}
        </section>
      </main>

      {/* Global Blog Article Modal Drawer */}
      <BlogModal
        articleId={selectedArticleId}
        isOpen={isBlogModalOpen}
        onClose={() => {
          setIsBlogModalOpen(false);
          setSelectedArticleId(null);
        }}
      />

      {/* Interactive Cyber-Console Modal Dialog for App Specifications */}
      {isAppModalOpen && activeApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Scrim Overlay */}
          <div 
            onClick={() => setIsAppModalOpen(false)}
            className="absolute inset-0 bg-background/90 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
          />

          {/* Dialog Container */}
          <div className="relative z-10 w-full max-w-2xl border border-border bg-card/95 p-6 md:p-8 shadow-2xl rounded-sm panel-edge overflow-hidden animate-in zoom-in-95 duration-200">
            {/* Scansweep animation */}
            <div className="absolute inset-0 scanline-mask opacity-20 pointer-events-none" />

            {/* Close Button */}
            <button
              onClick={() => setIsAppModalOpen(false)}
              className="absolute right-4 top-4 border border-border p-2 text-muted-foreground hover:text-foreground hover:border-strong transition-all duration-300"
              aria-label="Close dialog"
            >
              <X size={16} />
            </button>

            {/* App Heading */}
            <div className="border-b border-border pb-4 mb-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="font-mono text-[10px] text-primary tracking-widest uppercase">{activeApp.tag} // METRIC LOCK</span>
                <span className="h-1 w-5 bg-[var(--data)]" />
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight text-foreground flex items-center gap-3">
                {activeApp.title}
                <span className="font-mono text-xs text-primary border border-primary-soft bg-primary-soft px-2 py-0.5 rounded-sm">
                  {activeApp.status}
                </span>
              </h2>
              <p className="font-mono text-[10px] text-[var(--data)] mt-2 uppercase">{activeApp.stats}</p>
            </div>

            {/* Specification Tabs inside modal */}
            <div className="flex border-b border-border pb-3 mb-5 gap-2 overflow-x-auto">
              {[
                { id: "overview", label: "System Overview" },
                { id: "stack", label: "Tech Stack" },
                { id: "infra", label: "Infrastructure" },
                { id: "architecture", label: "Services & Architecture" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAppTab(tab.id as any)}
                  className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-all duration-300 rounded-sm ${
                    activeAppTab === tab.id
                      ? "border-primary bg-primary-soft text-primary font-medium"
                      : "border-border bg-background/40 text-muted-foreground hover:text-foreground hover:border-strong"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Spec Tab Content */}
            <div className="min-h-[200px] overflow-y-auto max-h-[300px] pr-2 scrollbar-thin">
              {activeAppTab === "overview" && (
                <div className="space-y-4">
                  <div className="flex gap-2 text-primary font-mono text-xs uppercase">// SYNOPIS:</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {activeApp.specs.overview}
                  </p>
                </div>
              )}

              {activeAppTab === "stack" && (
                <div className="space-y-3">
                  <div className="flex gap-2 text-primary font-mono text-xs uppercase">// LIBRARIES & ENGINES:</div>
                  <ul className="space-y-2">
                    {activeApp.specs.techStack.map((item, index) => (
                      <li key={index} className="text-xs text-foreground/80 flex items-start gap-2">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeAppTab === "infra" && (
                <div className="space-y-4">
                  <div className="flex gap-2 text-primary font-mono text-xs uppercase">// DEPLOYMENT & COMPLIANCE:</div>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {activeApp.specs.infrastructure}
                  </p>
                </div>
              )}

              {activeAppTab === "architecture" && (
                <div className="space-y-4">
                  <div className="flex gap-2 text-primary font-mono text-xs uppercase">// SERVICES BOUNDARIES:</div>
                  <div className="space-y-3">
                    {activeApp.specs.architecture.map((serv, index) => (
                      <div key={index} className="border border-border/80 bg-background/50 p-3 rounded-sm font-mono">
                        <div className="text-xs text-[var(--data)] font-bold mb-1">// {serv.name}:</div>
                        <p className="text-xs text-muted-foreground leading-normal">{serv.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="border-t border-border pt-4 mt-6 flex justify-between items-center">
              <span className="font-mono text-[9px] text-muted-foreground uppercase">CONTROL CONSOLE ACCESS: SECURE LOG</span>
              <Button 
                onClick={() => setIsAppModalOpen(false)}
                size="sm"
                className="h-8 bg-primary hover:bg-primary/95 text-primary-foreground font-mono text-xs px-4"
              >
                Close Spec Console
              </Button>
            </div>
          </div>
        </div>
      )}

      <footer className="border-t border-border py-10 mt-16 relative z-10">
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

export default ControlDeck;
