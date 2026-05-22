import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
  Layers,
  Music,
  Sparkles,
  Terminal,
  X,
  Database,
  Network,
  Brain,
  Wand2,
  Hammer,
  Monitor,
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
  {
    title: "Pine & Thatch: Building Hospitality Demand in a Seasonal Hill Market",
    description: "A founder-grade breakdown of market research, seasonal demand mapping, renovation choices, launch events, booking operations, and SOP design in a Shimla tourism market.",
    readTime: "7 min read",
    systemTag: "SYS/HOSP-04",
    date: "May 2026",
    points: [
      "Local market research across seasonal tourist cycles",
      "Marketing budgets, launch events, and booking channel logic",
      "Hiring and internal SOPs inspired by 5-star hotel chains",
      "Renovation priorities tied to guest experience and revenue timing",
    ],
  },
];

interface AiMusicTrack {
  title: string;
  period: string;
  duration: string;
  model: string;
  genre: string;
  language: string;
  slug: string;
  evolution: string;
  summary: string;
  motif: string;
  files: {
    label: string;
    fileName: string;
    note: string;
  }[];
  lyrics: string[];
}

const originalCompositionNote = {
  title: "Original Compositions",
  status: "Reserved",
  copy:
    "This shelf stays intentionally empty for live-played instrument work and fully non-AI recordings. When those pieces are ready, they can live here as a separate body of work.",
};

const aiMusicTracks: AiMusicTrack[] = [
  {
    title: "Pahaadon Ki Yaadein",
    period: "1 year, 8 months ago",
    duration: "2:59 / 2:40 variants",
    model: "v3.5",
    genre: "Acoustic Hindi / Himachali folk",
    language: "Hinglish",
    slug: "pahaadon-ki-yaadein",
    evolution:
      "An early AI music milestone where the nostalgia and regional emotionality already landed, even if the generation style was simpler and more fragile.",
    summary:
      "A memory-soaked return to mountain roads, childhood rituals, village scent, and the ache of distance from home.",
    motif: "Mountain memory, village roads, childhood rituals.",
    files: [
      {
        label: "Primary",
        fileName: "pahaadon-ki-yaadein.mp3",
        note: "Original Suno export",
      },
      {
        label: "Alternate",
        fileName: "pahaadon-ki-yaadein-alt.mp3",
        note: "Alternate render",
      },
    ],
    lyrics: [
      "[Verse]",
      "Kaanon mein baaji woh purani dhune",
      "Phir se yaad aayein woh bachpan ke sapne",
      "Gaon ke raste, woh mitti ki khushboo",
      "Aankhen nam ho jaayein, kasme thi jo sach yahin",
      "",
      "[Verse 2]",
      "Woh baaghaan ke phool dhoop mein chamakte",
      "Ghar ke aangan mein hansiyon se bharte",
      "Woh purane peepal jismein lakeerein thi likhi",
      "Unn palon ko yaad kar man mein kasak si uthi",
      "",
      "[Chorus]",
      "Wapas le chal mujhe apne gaon ke raastein",
      "Jahan sukoon mile yaadon ke saath se",
      "Jahan jeewan ki har dor dosti ke rang mein",
      "Wahin dil hai mera pahaadon ke ang mein",
    ],
  },
  {
    title: "The Light",
    period: "6 months ago",
    duration: "2:32",
    model: "v4.5-all",
    genre: "Nu metal / rap / soft chorus rock",
    language: "English",
    slug: "the-light",
    evolution:
      "A clear jump in emotional control and genre fusion. The newer model held introspective rap writing, tension, and chorus payoff with much more confidence.",
    summary:
      "A confrontation with self-sabotage, self-worth, and the brutal distance between survival mode and becoming who you are meant to be.",
    motif: "Self-conflict, survival mode, unreachable light.",
    files: [
      {
        label: "Primary",
        fileName: "the-light.mp3",
        note: "Suno export",
      },
    ],
    lyrics: [
      "[Verse]",
      "It's a mystery how we get through this life",
      "Trapped in the corner, you either do or you die",
      "We fight the good fight, all hands on deck",
      "It's your own fate, it's you versus you",
      "",
      "[Verse 2]",
      "It's the greatest fight you'll ever fight",
      "When you're looking at yourself trying to see what's wrong",
      "Trying to see what's right, trying to see if you can ever love yourself",
      "How you gonna get to the light?",
      "",
      "[Chorus]",
      "The light is far",
      "So far away",
      "From here",
    ],
  },
  {
    title: "Chhota Sa Tan",
    period: "3 months, 3 weeks ago",
    duration: "4:50",
    model: "v4.5-all",
    genre: "Heavy metal with Indian classical vocals",
    language: "Hinglish",
    slug: "chhota-sa-tan",
    evolution:
      "This phase proved the models could handle aggressive instrumentation while preserving a soft, classically inflected Indian vocal line without collapsing the contrast.",
    summary:
      "A defiant underdog anthem about surviving violent currents, finding internal force, and becoming ruler of the water instead of its victim.",
    motif: "Small body, violent current, impossible resilience.",
    files: [
      {
        label: "Primary",
        fileName: "chhota-sa-tan.mp3",
        note: "Suno export",
      },
    ],
    lyrics: [
      "[Intro]",
      "Chhota sa tan, saara samandar saamne",
      "Upar se lehrein, neeche andhera gehra",
      "",
      "[Verse]",
      "Dhaar ke aage tinke sa main",
      "Aankhon mein jalta darr bhi tha",
      "Thandi chattanon ke beecho beech",
      "Raasta apna dhoondhta tha",
      "",
      "[Chorus]",
      "Main paani ka badshah hoon",
      "Dhaar munh khole, main muskaata",
      "Jo doobe, doobe, main to tairun",
      "Patthar cheer ke rasta paata",
    ],
  },
  {
    title: "Oonchai Pe Thandi Hawa",
    period: "3 months, 1 week ago",
    duration: "5:09",
    model: "v4.5-all",
    genre: "Heavy metal with Indian classical vocals",
    language: "Hinglish",
    slug: "oonchai-pe-thandi-hawa",
    evolution:
      "The writing grows more cinematic here. The model is no longer just generating a song; it is helping shape character psychology, symbolism, and emotional contradiction.",
    summary:
      "A lonely sky-king narrative about power, hunger, altitude, and the unseen suffering beneath visible majesty.",
    motif: "Altitude, loneliness, power that still hurts.",
    files: [
      {
        label: "Primary",
        fileName: "oonchai-pe-thandi-hawa.mp3",
        note: "Suno export",
      },
    ],
    lyrics: [
      "[Verse]",
      "Oonchai pe thandi hawa",
      "Neeche har saans hai saza",
      "Patthar jaise ye par, lekin",
      "Andar kaampati si dua",
      "",
      "[Chorus]",
      "Raja hoon aasman ka",
      "Par neend hai be-awaaz",
      "Tu dekhe shaan, main dekhun bas agla aaj",
      "Ye baaz ki rajgaddi, aag pe chalta har pankh har dam",
    ],
  },
  {
    title: "Floors of the Same Church",
    period: "1 month, 3 weeks ago",
    duration: "3:53",
    model: "v4.5-all",
    genre: "Folk / indie folk / ambient",
    language: "English",
    slug: "floors-of-the-same-church",
    evolution:
      "A mature stage in the journey. The model now supports subtler imagery, restraint, and literary structure, making the collaboration feel closer to co-writing than prompting.",
    summary:
      "A tender misalignment ballad about two lovers haunting the same sacred structure while never quite reaching one another.",
    motif: "Sacred distance, architectural longing, misaligned timing.",
    files: [
      {
        label: "Primary",
        fileName: "floors-of-the-same-church.mp3",
        note: "Suno export",
      },
    ],
    lyrics: [
      "[Verse]",
      "He kneels where the candles bruise the stone",
      "You stand where the faded frescoes glow",
      "You hear his name in the creak of the pews",
      "He feels your breath in the dust on his shoes",
      "",
      "[Chorus]",
      "Two lovers on different floors of the same church",
      "Close as a heartbeat, far as the sky",
      "Your footsteps echo right over his sorrow",
      "But the stairs never meet your eyes",
    ],
  },
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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("blogs");
  const [selectedAiSongSlug, setSelectedAiSongSlug] = useState(aiMusicTracks[0]?.slug ?? "");
  const [activeSongView, setActiveSongView] = useState<"overview" | "lyrics">("overview");
  const [selectedAudioFileName, setSelectedAudioFileName] = useState(aiMusicTracks[0]?.files[0]?.fileName ?? "");
  
  // Retro 8-bit cognitive pipeline phase state
  const [retroPhase, setRetroPhase] = useState<"thinking" | "building" | "orchestrating">("thinking");
  const [isAutoCycle, setIsAutoCycle] = useState(true);

  useEffect(() => {
    if (!isAutoCycle) return;
    const phases: ("thinking" | "building" | "orchestrating")[] = ["thinking", "building", "orchestrating"];
    const interval = setInterval(() => {
      setRetroPhase((current) => {
        const nextIndex = (phases.indexOf(current) + 1) % phases.length;
        return phases[nextIndex];
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycle]);

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

  useEffect(() => {
    const hash = location.hash.replace("#", "");
    if (["blogs", "music", "apps", "stack"].includes(hash)) {
      setActiveTab(hash);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  const selectedAiSong =
    aiMusicTracks.find((track) => track.slug === selectedAiSongSlug) ?? aiMusicTracks[0];
  const selectedAudioFile =
    selectedAiSong.files.find((file) => file.fileName === selectedAudioFileName) ?? selectedAiSong.files[0];

  return (
    <div className="min-h-screen overflow-hidden bg-background text-foreground">
      <Navigation />

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

        {/* Header Block - Two-column hero with portrait */}
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
                Gurman Singh - A founder, operations specialist, and AI orchestration architect. This is the centralized system control center mapping active software products, tactical writings, focus frequencies, and advanced agent frameworks.
              </p>

              <div className="mt-6 flex flex-wrap gap-4 border-t border-border pt-6">
                <div className="flex items-center gap-2 border border-border bg-background/50 px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--data)]" />
                  <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Focus: Startup Systems & Business Ops</span>
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
                alt="Gurman Singh - Founder, Anti Matrix Project"
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
                          <span className="text-primary mt-0.5">+</span>
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
            <div className="mx-auto max-w-6xl space-y-6">
              <div className="panel-edge border border-border bg-card/85 p-6 md:p-8 backdrop-blur-md scan-sweep">
                <div className="flex flex-col gap-4 border-b border-border pb-5 md:flex-row md:items-end md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <Music className="h-5 w-5 text-primary" />
                      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">Music Station Archive</span>
                    </div>
                    <h3 className="mt-3 font-display text-3xl font-semibold text-foreground">
                      Two shelves: one for instrument-first work, one for AI collaboration.
                    </h3>
                    <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                      The original-compositions shelf stays empty by design. The AI shelf becomes a living archive of the songs, the model generations behind them, and the way the collaboration matured over time.
                    </p>
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--data)]">
                    SYS/AUDIO-DECK
                  </span>
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                  <article className="panel-edge border border-border bg-background/60 p-5">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Shelf A</p>
                        <h4 className="mt-2 font-display text-2xl font-semibold text-foreground">
                          {originalCompositionNote.title}
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                        {originalCompositionNote.status}
                      </span>
                    </div>

                    <div className="mt-5 border border-dashed border-border bg-card/50 p-6 text-center">
                      <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
                        Intentionally Empty
                      </p>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        {originalCompositionNote.copy}
                      </p>
                    </div>
                  </article>

                  <article className="panel-edge border border-border bg-background/60 p-5">
                    <div className="flex items-center justify-between border-b border-border pb-3">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Shelf B</p>
                        <h4 className="mt-2 font-display text-2xl font-semibold text-foreground">
                          Music With AI
                        </h4>
                      </div>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--data)]">
                        {aiMusicTracks.length} releases logged
                      </span>
                    </div>

                    <div className="mt-5 border border-border bg-card/55 p-4">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Evolution Note
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                        The arc starts with early v3.5-era nostalgia work and sharpens into v4.5-era songs with stronger genre control, deeper imagery, and cleaner emotional tension. The page should feel like a creative timeline, not just a playlist.
                      </p>
                    </div>
                  </article>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <section className="space-y-4">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Chronological AI Timeline</p>
                    <h4 className="mt-2 font-display text-2xl font-semibold text-foreground">
                      From first experiments to co-written worlds
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {aiMusicTracks.map((track, idx) => (
                      <button
                        key={track.slug}
                        onClick={() => {
                          setSelectedAiSongSlug(track.slug);
                          setSelectedAudioFileName(track.files[0]?.fileName ?? "");
                          setActiveSongView("overview");
                        }}
                        className={`panel-edge w-full overflow-hidden border p-5 text-left transition-all duration-300 ${
                          selectedAiSong.slug === track.slug
                            ? "border-primary bg-primary-soft/40"
                            : "border-border bg-card/65 hover:border-primary/40"
                        }`}
                      >
                        <div className="grid gap-4 md:grid-cols-[120px_1fr]">
                          <div className="border border-border bg-background/55 p-3">
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                              Step {idx + 1}
                            </p>
                            <p className="mt-2 font-display text-base font-semibold text-foreground">
                              {track.period}
                            </p>
                            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.14em] text-primary">
                              {track.model}
                            </p>
                          </div>

                          <div>
                            <div className="flex flex-col gap-3 border-b border-border pb-3 md:flex-row md:items-start md:justify-between">
                              <div>
                                <h5 className="font-display text-2xl font-semibold leading-tight text-foreground">
                                  {track.title}
                                </h5>
                                <p className="mt-2 text-sm text-muted-foreground">
                                  {track.genre}
                                </p>
                              </div>
                              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--data)]">
                                {track.duration}
                              </span>
                            </div>

                            <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                              {track.summary}
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </section>

                <section className="panel-edge border border-border bg-card/75 p-5 md:p-6">
                  <div className="grid gap-5 border-b border-border pb-5 md:grid-cols-[150px_1fr]">
                    <div className="relative aspect-square overflow-hidden border border-border bg-background/70">
                      <div className="absolute inset-0 surface-grid opacity-80" aria-hidden="true" />
                      <div className="absolute inset-0 scanline-mask opacity-30" aria-hidden="true" />
                      <div className="absolute left-4 top-4 h-10 w-10 border-l border-t border-primary" aria-hidden="true" />
                      <div className="absolute bottom-4 right-4 h-10 w-10 border-b border-r border-[var(--data)]" aria-hidden="true" />
                      <div className="relative z-10 flex h-full flex-col justify-between p-4">
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--data)]">
                          {selectedAiSong.model}
                        </span>
                        <div>
                          <Music className="mb-3 h-7 w-7 text-primary" aria-hidden="true" />
                          <p className="font-display text-lg font-semibold leading-tight text-foreground">
                            {selectedAiSong.title}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between gap-4">
                      <div>
                        <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                          <div>
                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">Selected Song</p>
                            <h4 className="mt-2 font-display text-3xl font-semibold text-foreground">
                              {selectedAiSong.title}
                            </h4>
                          </div>
                          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--data)]">
                            /assets/music/ai/{selectedAudioFile.fileName}
                          </span>
                        </div>
                        <p className="mt-3 text-sm text-muted-foreground">
                          {selectedAiSong.genre} // {selectedAiSong.language} // {selectedAiSong.duration}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-foreground/85">
                          {selectedAiSong.motif}
                        </p>
                      </div>

                      {selectedAiSong.files.length > 1 && (
                        <div className="flex flex-wrap gap-2">
                          {selectedAiSong.files.map((file) => (
                            <button
                              key={file.fileName}
                              onClick={() => setSelectedAudioFileName(file.fileName)}
                              className={`border px-3 py-2 text-left font-mono text-[10px] uppercase tracking-[0.14em] transition-all duration-300 ${
                                selectedAudioFile.fileName === file.fileName
                                  ? "border-primary bg-primary-soft text-primary"
                                  : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                              }`}
                            >
                              {file.label}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-b border-border pb-4">
                    {[
                      { id: "overview", label: "Song Story" },
                      { id: "lyrics", label: "Lyrics" },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveSongView(tab.id as "overview" | "lyrics")}
                        className={`border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-all duration-300 ${
                          activeSongView === tab.id
                            ? "border-primary bg-primary-soft text-primary"
                            : "border-border bg-background/40 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-5 border border-border bg-background/55 p-4">
                    <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                        Listening Console
                      </p>
                      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                        Suno source synced
                      </span>
                    </div>
                    <audio
                      key={selectedAudioFile.fileName}
                      controls
                      preload="none"
                      className="mt-4 w-full"
                      src={`/assets/music/ai/${selectedAudioFile.fileName}`}
                    >
                      Your browser does not support the audio element.
                    </audio>
                  </div>

                  {activeSongView === "overview" && (
                    <div className="mt-5 space-y-4">
                      <div className="border border-border bg-background/55 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Song Summary
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-foreground/85">
                          {selectedAiSong.summary}
                        </p>
                      </div>

                      <div className="border border-border bg-background/55 p-4">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                          How the collaboration evolved here
                        </p>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                          {selectedAiSong.evolution}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeSongView === "lyrics" && (
                    <div className="mt-5 border border-border bg-background/65 p-4">
                      <div className="flex items-center justify-between border-b border-border pb-3">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                          Lyrics Deck
                        </p>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                          Hinglish display where applicable
                        </span>
                      </div>
                      <div className="mt-4 space-y-1 font-mono text-sm leading-7 text-foreground/90">
                        {selectedAiSong.lyrics.map((line, idx) => (
                          <p
                            key={`${selectedAiSong.slug}-${idx}`}
                            className={line.startsWith("[") ? "pt-3 text-xs uppercase tracking-[0.16em] text-[var(--data)]" : ""}
                          >
                            {line || "\u00A0"}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                </section>
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
              {/* Retro Style Block for custom 8-bit animations */}
              <style>{`
                @keyframes pixel-pulse {
                  0%, 100% { opacity: 0.7; transform: scale(0.98); }
                  50% { opacity: 1; transform: scale(1.02); }
                }
                @keyframes scanline-anim {
                  0% { transform: translateY(-100%); }
                  100% { transform: translateY(100%); }
                }
                @keyframes rain-fall {
                  0% { transform: translateY(-10px); opacity: 0; }
                  50% { opacity: 1; }
                  100% { transform: translateY(80px); opacity: 0; }
                }
                .animate-pixel-pulse { animation: pixel-pulse 2s infinite ease-in-out; }
                .animate-scanline { animation: scanline-anim 6s infinite linear; }
                .animate-rain-1 { animation: rain-fall 1.5s infinite linear; }
                .animate-rain-2 { animation: rain-fall 2s infinite linear; animation-delay: 0.5s; }
                .animate-rain-3 { animation: rain-fall 1.8s infinite linear; animation-delay: 1s; }
              `}</style>

              {/* Strategic Intro Banner about Gurman */}
              <div className="border border-border/60 bg-card/40 p-6 md:p-8 rounded-sm panel-edge relative overflow-hidden backdrop-blur-sm">
                <div className="absolute inset-0 scanline-mask opacity-10 pointer-events-none" />
                <div className="relative z-10 max-w-3xl animate-in fade-in duration-500">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
                    <span className="font-mono text-xs text-primary uppercase tracking-widest">// Cognitive Workspace</span>
                  </div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight mb-3">
                    Gurman's Sovereign AI Stack
                  </h2>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    This is my day-to-day stack. I operate across three cognitive tiers - Thinking deeply with reasoning models, Building agentic pipelines, and Orchestrating robust systems at scale.
                  </p>
                </div>
              </div>

              {/* Two-Column Core Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: 8-Bit Emulator Monitor */}
                <div className="lg:col-span-7 space-y-6">
                  <div className="border border-border bg-card/60 backdrop-blur-sm p-6 rounded-sm panel-edge">
                    {/* Pipeline Navigation Header */}
                    <div className="border-b border-border pb-4 mb-6">
                      <div className="flex items-center gap-2 mb-2">
                        <Monitor className="h-4.5 w-4.5 text-primary" />
                        <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                          // COGNITIVE PIPELINE EMULATOR
                        </h3>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Select a phase to override auto-cycling and explore my cognitive lifecycle from conceptual thought to prompt speed down to hard production builds.
                      </p>
                    </div>

                    {/* Retro 8-bit CRT monitor block */}
                    <div className={`relative w-full aspect-[16/10] border-8 bg-neutral-950 p-4 rounded-md shadow-2xl flex flex-col justify-between overflow-hidden select-none transition-colors duration-500 ${
                      retroPhase === "thinking" ? "border-amber-900/60 shadow-[inset_0_0_30px_rgba(245,158,11,0.25)]" : 
                      retroPhase === "building" ? "border-purple-900/60 shadow-[inset_0_0_30px_rgba(168,85,247,0.25)]" : 
                      "border-emerald-900/60 shadow-[inset_0_0_30px_rgba(16,185,129,0.25)]"
                    }`}>
                      {/* CRT Curve Mask overlay */}
                      <div className="absolute inset-0 bg-transparent pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.85)]" />
                      
                      {/* Scanline Sweep overlay */}
                      <div className="absolute top-0 left-0 w-full h-[3px] bg-white/10 pointer-events-none z-20 animate-scanline" />
                      
                      {/* Glass Reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none z-20" />

                      {/* Active CRT Visual Layout */}
                      <div className="flex-1 flex flex-col justify-between relative z-10 font-mono text-[10px]">
                        {/* CRT Header */}
                        <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2">
                          <div className="flex items-center gap-1.5">
                            <span className={`h-2 w-2 rounded-full animate-pulse ${
                              retroPhase === "thinking" ? "bg-amber-500" : retroPhase === "building" ? "bg-purple-500" : "bg-emerald-500"
                            }`} />
                            <span className="uppercase text-[9px] font-bold text-neutral-400 tracking-wider">
                              GURMAN-CRT-V1 // COGNITIVE_STATE
                            </span>
                          </div>
                          <span className={`text-[8px] px-1 border rounded-sm font-bold uppercase ${
                            retroPhase === "thinking" ? "bg-amber-500/10 border-amber-500/30 text-amber-500" : 
                            retroPhase === "building" ? "bg-purple-500/10 border-purple-500/30 text-purple-400" : 
                            "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          }`}>
                            {retroPhase === "thinking" ? "THINKING" : retroPhase === "building" ? "BUILDING" : "ORCHESTRATING"}
                          </span>
                        </div>

                        {/* Center 8-Bit Pixel Animation Graphic */}
                        <div className="flex-1 flex items-center justify-center py-2">
                          {retroPhase === "thinking" && (
                            <div className="flex flex-col items-center justify-center space-y-2 animate-pixel-pulse">
                              <svg viewBox="0 0 16 16" className="w-20 h-20 text-amber-500">
                                <rect x="5" y="2" width="6" height="1" fill="currentColor" />
                                <rect x="3" y="3" width="10" height="1" fill="currentColor" />
                                <rect x="2" y="4" width="12" height="1" fill="currentColor" />
                                <rect x="1" y="5" width="14" height="1" fill="currentColor" />
                                <rect x="1" y="6" width="6" height="3" fill="currentColor" />
                                <rect x="9" y="6" width="6" height="3" fill="currentColor" />
                                <rect x="2" y="9" width="12" height="1" fill="currentColor" />
                                <rect x="3" y="10" width="10" height="1" fill="currentColor" />
                                <rect x="4" y="11" width="8" height="1" fill="currentColor" />
                                <rect x="6" y="12" width="4" height="2" fill="currentColor" />
                                <rect x="5" y="5" width="2" height="2" fill="#fff" className="animate-pulse" />
                                <rect x="9" y="5" width="2" height="2" fill="#fff" className="animate-pulse" />
                              </svg>
                              <div className="text-[9px] text-amber-400/90 font-bold uppercase tracking-widest text-center mt-1">
                                * DEEP REASONING CYCLES ACTIVE *
                              </div>
                            </div>
                          )}

                          {retroPhase === "building" && (
                            <div className="flex flex-col items-center justify-center space-y-2 relative">
                              <div className="absolute left-[-30px] top-0 text-purple-500/40 text-[8px] animate-rain-1">1010</div>
                              <div className="absolute right-[-30px] top-4 text-purple-500/40 text-[8px] animate-rain-2">0101</div>
                              <div className="absolute left-0 top-6 text-purple-500/30 text-[8px] animate-rain-3">BUILD</div>
                              
                              <svg viewBox="0 0 16 16" className="w-20 h-20 text-purple-400 animate-bounce">
                                <rect x="2" y="2" width="2" height="12" fill="currentColor" />
                                <rect x="4" y="2" width="2" height="2" fill="currentColor" />
                                <rect x="4" y="12" width="2" height="2" fill="currentColor" />
                                <rect x="12" y="2" width="2" height="12" fill="currentColor" />
                                <rect x="10" y="2" width="2" height="2" fill="currentColor" />
                                <rect x="10" y="12" width="2" height="2" fill="currentColor" />
                                <rect x="5" y="5" width="6" height="2" fill="#fff" className="animate-pulse" />
                                <rect x="5" y="8" width="4" height="2" fill="currentColor" />
                                <rect x="5" y="11" width="3" height="1" fill="#fff" />
                                <rect x="1" y="5" width="1" height="1" fill="#c084fc" className="animate-ping" />
                                <rect x="14" y="9" width="1" height="1" fill="#c084fc" className="animate-ping" />
                              </svg>
                              <div className="text-[9px] text-purple-400 font-bold uppercase tracking-widest text-center mt-1">
                                * ACTIVE AGENT COMPILATION ONLINE *
                              </div>
                            </div>
                          )}

                          {retroPhase === "orchestrating" && (
                            <div className="flex flex-col items-center justify-center space-y-2">
                              <svg viewBox="0 0 16 16" className="w-20 h-20 text-emerald-400">
                                <rect x="2" y="10" width="12" height="4" fill="currentColor" />
                                <rect x="3" y="5" width="10" height="4" fill="currentColor" opacity="0.8" />
                                <rect x="5" y="1" width="6" height="3" fill="currentColor" opacity="0.6" />
                                <rect x="4" y="11" width="1" height="1" fill="#fff" className="animate-pulse" />
                                <rect x="6" y="11" width="1" height="1" fill="#22c55e" />
                                <rect x="5" y="6" width="1" height="1" fill="#fff" className="animate-pulse" />
                                <rect x="7" y="6" width="1" height="1" fill="#22c55e" />
                                <rect x="7" y="2" width="1" height="1" fill="#22c55e" className="animate-pulse" />
                              </svg>
                              <div className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest text-center mt-1">
                                * ORCHESTRATION PIPELINES ONLINE *
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Console Output Terminal */}
                        <div className="bg-black/60 border border-white/5 p-2 rounded font-mono text-[9px] text-neutral-400 mt-2 select-text">
                          {retroPhase === "thinking" && (
                            <div className="space-y-1">
                              <p className="text-amber-500 font-semibold">&gt; GURMAN@THINK: ~ reasoning_paths --cloud --local</p>
                              <p className="text-[8px] text-amber-500/75 animate-pulse">Consulting OpenAI, Anthropic, Gemini & local swarms...</p>
                              <p className="text-[8px] text-neutral-500">&gt; Status: 247 logic nodes simulated. GTM strategy ready.</p>
                            </div>
                          )}

                          {retroPhase === "building" && (
                            <div className="space-y-1">
                              <p className="text-purple-400 font-semibold">&gt; GURMAN@BUILD: ~ agentic_stack --antigravity --codex</p>
                              <p className="text-[8px] text-purple-400/75 animate-pulse">Antigravity & Codex writing layout templates and tests...</p>
                              <p className="text-[8px] text-neutral-500">&gt; Status: 12 subagent workers active. Write cycles solid.</p>
                            </div>
                          )}

                          {retroPhase === "orchestrating" && (
                            <div className="space-y-1">
                              <p className="text-emerald-400 font-semibold">&gt; GURMAN@ORCHESTRATE: ~ maos_router --supabase --n8n</p>
                              <p className="text-[8px] text-emerald-400/75 animate-pulse">Routing token complexities & database locks...</p>
                              <p className="text-[8px] text-neutral-500">&gt; Status: Syncing Obsidian second brain. 0 failures detected.</p>
                            </div>
                          )}
                        </div>

                        {/* Progress Bar / Velocity Dial */}
                        <div className="mt-2.5">
                          <div className="flex justify-between text-[8px] text-neutral-400 uppercase mb-1">
                            <span>Processing Velocity</span>
                            <span className={
                              retroPhase === "thinking" ? "text-amber-500" : retroPhase === "building" ? "text-purple-400" : "text-emerald-400"
                            }>
                              {retroPhase === "thinking" ? "35% (THINKING)" : retroPhase === "building" ? "100% (AGENT VELOCITY)" : "75% (SYSTEM SCALE)"}
                            </span>
                          </div>
                          <div className="w-full h-2 bg-neutral-900 border border-neutral-800 rounded-sm overflow-hidden flex p-0.5">
                            {retroPhase === "thinking" && (
                              <div className="w-[35%] h-full bg-amber-500" />
                            )}
                            {retroPhase === "building" && (
                              <div className="w-full h-full bg-purple-500 animate-pulse" />
                            )}
                            {retroPhase === "orchestrating" && (
                              <div className="w-[75%] h-full bg-emerald-500" />
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Override Selectors Under CRT */}
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <button
                        onClick={() => {
                          setRetroPhase("thinking");
                          setIsAutoCycle(false);
                        }}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          retroPhase === "thinking"
                            ? "border-amber-500 bg-amber-500/10 text-amber-500 font-semibold shadow-[0_0_12px_rgba(245,158,11,0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Brain size={14} className="mb-0.5" />
                        <span>Thinking</span>
                        <span className="text-[8px] opacity-75 font-normal">OpenAI / Gemini / Anthropic</span>
                      </button>
                      <button
                        onClick={() => {
                          setRetroPhase("building");
                          setIsAutoCycle(false);
                        }}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          retroPhase === "building"
                            ? "border-purple-500 bg-purple-500/10 text-purple-400 font-semibold shadow-[0_0_12px_rgba(168,85,247,0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Hammer size={14} className="mb-0.5" />
                        <span>Building</span>
                        <span className="text-[8px] opacity-75 font-normal">Antigravity / Codex / Claude</span>
                      </button>
                      <button
                        onClick={() => {
                          setRetroPhase("orchestrating");
                          setIsAutoCycle(false);
                        }}
                        className={`font-mono text-[10px] md:text-xs py-2 px-3 border transition-all duration-300 flex flex-col items-center justify-center gap-1 uppercase rounded-sm text-center ${
                          retroPhase === "orchestrating"
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                            : "border-border/60 bg-background/40 hover:bg-background/80 text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <Network size={14} className="mb-0.5" />
                        <span>Orchestrating</span>
                        <span className="text-[8px] opacity-75 font-normal">MAOS / Supabase / n8n</span>
                      </button>
                    </div>

                    {/* Explanatory phase summary card */}
                    <div className="mt-6 bg-background/60 border border-border/40 p-4 rounded-sm transition-all duration-500">
                      {retroPhase === "thinking" && (
                        <div className="animate-in fade-in duration-300">
                          <h4 className="font-display text-sm font-semibold text-amber-500 mb-1 flex items-center gap-1.5">
                            <Brain size={14} /> Tier 1: Deep Thinking & Reasoning
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Before writing any code, I coordinate deep-reasoning layers to sketch architecture logic. OpenAI (o1/o3-mini), Anthropic Claude 3.5, and Gemini 1.5 Pro analyze context windows and structure complete, bug-free specifications, assisted by local swarms.
                          </p>
                        </div>
                      )}
                      {retroPhase === "building" && (
                        <div className="animate-in fade-in duration-300">
                          <h4 className="font-display text-sm font-semibold text-purple-400 mb-1 flex items-center gap-1.5">
                            <Hammer size={14} /> Tier 2: Agentic Coding & Building
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Where thoughts become executable code. I operate top-tier developer agents including Antigravity, Codex, and Anthropic's Claude Code CLI to command files, compile apps, and build clean structures at hyper-speed.
                          </p>
                        </div>
                      )}
                      {retroPhase === "orchestrating" && (
                        <div className="animate-in fade-in duration-300">
                          <h4 className="font-display text-sm font-semibold text-emerald-400 mb-1 flex items-center gap-1.5">
                            <Network size={14} /> Tier 3: Multi-Agent Orchestration & Scale
                          </h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Where systems scale. Using my custom Multi-Agent Operating System (MAOS), I route tasks dynamically between local and cloud layers, maintain vector records and transactional ledgers in Supabase, hook up n8n webhook automation, and audit migrations.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Gurman's Tool Arsenal */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="border border-border bg-card/60 backdrop-blur-sm p-6 rounded-sm panel-edge">
                    <div className="border-b border-border pb-4 mb-5 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-4.5 w-4.5 text-primary" />
                        <h3 className="font-mono text-xs font-semibold tracking-wider uppercase text-foreground">
                          // GURMAN'S COGNITIVE ARSENAL
                        </h3>
                      </div>
                      <span className="font-mono text-[10px] text-muted-foreground uppercase">12 CORE TOOLS</span>
                    </div>

                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                      My personal everyday tool deck, categorized by cognitive layer. Gated with active pinging indicators.
                    </p>

                    <div className="space-y-4">
                      {/* Thinking Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-amber-500 font-bold">1. Thinking Core</span>
                          <span className="font-mono text-[8px] text-amber-500 bg-amber-500/10 px-1 rounded-sm">REASONING</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-background/40 border border-border/40 hover:border-amber-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">OpenAI o1 / o3-pro</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">GTM & Strategic Logic</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-amber-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Anthropic Claude</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Complex Prompt Design</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-amber-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Gemini 1.5 Pro</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">2M Context Ingestion</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-amber-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">DeepSeek R1 (Local)</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Offline Logic Cycles</p>
                          </div>
                        </div>
                      </div>

                      {/* Building Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-purple-400 font-bold">2. Building Tools</span>
                          <span className="font-mono text-[8px] text-purple-400 bg-purple-500/10 px-1 rounded-sm">AGENTS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-background/40 border border-border/40 hover:border-purple-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Antigravity CLI</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Pair-Programming Coder</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-purple-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Codex CLI</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Workspace Orchestrator</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-purple-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Claude Code</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Command Line Agent</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-purple-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Cursor / Windsurf</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Agent-in-Loop IDEs</p>
                          </div>
                        </div>
                      </div>

                      {/* Orchestration Category */}
                      <div>
                        <div className="flex items-center justify-between border-b border-border/40 pb-1 mb-2">
                          <span className="font-mono text-[10px] uppercase text-emerald-400 font-bold">3. Orchestration & Scale</span>
                          <span className="font-mono text-[8px] text-emerald-400 bg-emerald-500/10 px-1 rounded-sm">SYSTEMS</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-background/40 border border-border/40 hover:border-emerald-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">MAOS Router</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Asymmetric Token Proxy</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-emerald-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">Supabase Cloud</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Database & Vector Ledger</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-emerald-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">n8n.io</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Webhook Operations</p>
                          </div>
                          <div className="bg-background/40 border border-border/40 hover:border-emerald-500/20 p-2 rounded-sm transition-colors duration-300">
                            <p className="font-display font-semibold text-foreground text-[11px] leading-tight truncate">db_api_integrity</p>
                            <p className="text-[9px] text-muted-foreground leading-tight mt-0.5 truncate">Static Migration Locks</p>
                          </div>
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
                  onClick={() => setActiveAppTab(tab.id as "overview" | "stack" | "infra" | "architecture")}
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
                        <span className="text-primary font-bold mt-0.5">+</span>
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

