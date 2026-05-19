import { X, BookOpen, Clock, Calendar, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BlogArticle {
  id: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  eyebrow: string;
  content: JSX.Element;
}

const articlesData: Record<string, BlogArticle> = {
  "hiring-frameworks": {
    id: "hiring-frameworks",
    title: "The 4 Frameworks Every Startup Should Build Before Hiring",
    tag: "SYS/HR-01",
    date: "May 2026",
    readTime: "6 min read",
    eyebrow: "ORGANIZATIONAL CLARITY",
    content: (
      <div className="space-y-6 text-foreground/90 leading-relaxed font-body">
        <p className="lede text-lg text-muted-foreground font-light">
          Scale breeds complexity, and complexity is the quiet killer of high-growth startups. Founders often treat hiring as a universal solvent: if the pipeline is clogged or customer support is lagging, they put a new head in the seat. This is a costly mistake.
        </p>
        <p>
          Hiring without established operating frameworks is simply outsourcing chaos. Instead of resolving bottleneck constraints, you multiply communication overhead and accelerate capital burn. Before you draft your next job description, you must construct these four structural pillars.
        </p>

        <hr className="border-border/40 my-6" />

        <h3 className="text-xl font-display font-medium text-primary">1. The Role Operating Blueprint (SOP Boundaries)</h3>
        <p>
          Standard job descriptions are performance theatre—vague lists of aspirations like &ldquo;own the marketing channel&rdquo; or &ldquo;drive growth.&rdquo; An Operating Blueprint specifies exact inputs, processes, and outputs.
        </p>
        <div className="border border-border/80 bg-background/55 p-4 rounded-sm font-mono text-xs space-y-2">
          <div className="text-primary font-bold">// REPRESENTATIVE STRUCTURE:</div>
          <div>• INPUTS: Where does their raw data, task log, or request arrive from? (e.g. n8n intake queue).</div>
          <div>• PROTOCOLS: The exact standard operating sequences they run to process inputs.</div>
          <div>• OUTPUTS: The exact destination and format of their completed deliverables.</div>
          <div>• HANDOFFS: Who acts immediately on their outputs, and what is the quality threshold?</div>
        </div>

        <h3 className="text-xl font-display font-medium text-primary">2. The Bi-Weekly Metric Scorecard</h3>
        <p>
          If a role cannot be evaluated numerically inside a 10-minute check-in, the role is poorly defined. You must establish 2-3 leading indicators (effort metrics) and 1 lagging indicator (outcome metric) before onboarding.
        </p>
        <p>
          For example, an outbound sales development representative scorecard shouldn't just track closed contracts. It must track weekly target lists compiled, custom video intros recorded, and lead qualified discovery calls completed.
        </p>

        <h3 className="text-xl font-display font-medium text-primary">3. The Cross-Department Handoff Protocol</h3>
        <p>
          Startups slow down at the interfaces between teams. When product hands over a release to sales, or sales hands a closed contract to customer success, information leaks. Handoff protocols define the mandatory checklist required to pass ownership.
        </p>
        <p>
          This includes unified data schemas in HubSpot or custom Supabase tables, automated Slack notifications via n8n webhook triggers, and a strict SLA (Service Level Agreement) specifying response speed.
        </p>

        <h3 className="text-xl font-display font-medium text-primary">4. The OKR Execution Rhythm</h3>
        <p>
          A new hire needs to understand how their daily actions influence quarterly objectives. Map out your team's operational cadence. We recommend a simple 3-tiered rhythm:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Daily Standup (15 min):</strong> Monospace Slack logs documenting: What was completed yesterday, focus for today, and blocks.</li>
          <li><strong>Weekly Sync (45 min):</strong> Scorecard metric reviews, bottleneck triage, and strategic alignment checks.</li>
          <li><strong>Quarterly Retrospective (Half-Day):</strong> Performance evaluation, process auditing, and OKR setting.</li>
        </ul>

        <div className="border-l-2 border-primary bg-primary-soft p-4 mt-6">
          <p className="font-mono text-xs text-primary font-semibold mb-1">THE OPERATIONAL TAKEAWAY:</p>
          <p className="text-sm text-foreground/80 font-light">
            If you cannot document the role, define its metrics, map its handoffs, and schedule its cadences, you are not ready to hire. Build the system first, then hire an operator to execute it.
          </p>
        </div>
      </div>
    ),
  },
  "reporting-systems": {
    id: "reporting-systems",
    title: "How Post-Investment Founders Can Build Reporting Systems Investors Love",
    tag: "SYS/FIN-02",
    date: "April 2026",
    readTime: "8 min read",
    eyebrow: "CAPITAL MANAGEMENT",
    content: (
      <div className="space-y-6 text-foreground/90 leading-relaxed font-body">
        <p className="lede text-lg text-muted-foreground font-light">
          Post-funding operational reality is brutal. Investors wrote a check because they trusted your growth trajectory—but now, they demand data-backed confirmation. If your investor updates are delayed, manual, or highly defensive, trust evaporates.
        </p>
        <p>
          Most founders lose 2-3 working days every single month compiling metrics, stitching together spreadsheets, and polishing slide decks. This is lost runway. A premium, automated reporting telemetry system restores trust and saves your sanity.
        </p>

        <hr className="border-border/40 my-6" />

        <h3 className="text-xl font-display font-medium text-primary">1. Establishing Your Single Source of Truth (SSOT)</h3>
        <p>
          Investors get nervous when metrics change between conversations. You need a centralized ledger where financial, pipeline, and product usage data are consolidated. Avoid fragmented SaaS platforms. Maintain a unified ledger inside a robust PostgreSQL / Supabase server.
        </p>
        <p>
          By connecting Stripe webhooks, Salesforce CRM endpoints, and your database schema directly to a secure dashboard, you ensure your numbers are auditable and consistent.
        </p>

        <h3 className="text-xl font-display font-medium text-primary">2. The Core Financial Telemetry Wheel</h3>
        <p>
          Every premium investor update must lead with three critical metrics:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Net Burn Rate:</strong> Exactly how much cash is exiting your bank account every month, adjusted for deferred revenue.</li>
          <li><strong>Runway Horizon:</strong> Your cash balance divided by your average 3-month net burn rate—expressed clearly as the absolute calendar date of your capital constraint.</li>
          <li><strong>LTV to CAC Ratio:</strong> The unit economic signal proving that scaling customer acquisition is mathematically profitable.</li>
        </ul>

        <h3 className="text-xl font-display font-medium text-primary">3. Automated n8n Data Ingestion Pipelines</h3>
        <p>
          Stop copy-pasting numbers. We design automated micro-integrations using n8n to ingest Stripe metrics, payroll expenditures, and active marketing budgets on a daily loop.
        </p>
        <div className="border border-border/80 bg-background/55 p-4 rounded-sm font-mono text-xs space-y-2">
          <div className="text-[var(--data)] font-bold">// AUTOMATION DIAGRAM:</div>
          <div>Stripe Invoice Paid Webhook → n8n Filter → Append to Supabase Ledger</div>
          <div>Google Ads API Sync (Midnight) → Ingest Ad Spend → Calculate CAC in Real-Time</div>
          <div>Supabase Daily Aggregation → Trigger Slack Alert & Update Investor Sheet</div>
        </div>

        <h3 className="text-xl font-display font-medium text-primary">4. Constructing Defensive Board Reporting Decks</h3>
        <p>
          Do not hide bad news. Investors are operations specialists—they expect hurdles. When presenting updates, use a simple 3-slide framework:
        </p>
        <ul className="list-decimal pl-5 space-y-2">
          <li><strong>Slide 1 (The Numbers):</strong> Clean table showing actual vs. forecasted cash, revenue, and customer counts.</li>
          <li><strong>Slide 2 (The Bottlenecks):</strong> Transparent list of operational challenges (e.g. churn increase in enterprise tier).</li>
          <li><strong>Slide 3 (The Action Plan):</strong> Dynamic 90-day execution sprints to bypass the identified bottlenecks.</li>
        </ul>

        <div className="border-l-2 border-primary bg-primary-soft p-4 mt-6">
          <p className="font-mono text-xs text-primary font-semibold mb-1">THE OPERATIONAL TAKEAWAY:</p>
          <p className="text-sm text-foreground/80 font-light">
            Investors don't want beautiful stories; they want predictable numbers. By automating your financial pipelines, you demonstrate operational maturity and position your startup for the next round of capital.
          </p>
        </div>
      </div>
    ),
  },
  "knowledge-bases": {
    id: "knowledge-bases",
    title: "Why Every Startup Needs an Internal Knowledge Base Before Scaling",
    tag: "SYS/OPS-03",
    date: "March 2026",
    readTime: "5 min read",
    eyebrow: "OPERATING RYHTHMS",
    content: (
      <div className="space-y-6 text-foreground/90 leading-relaxed font-body">
        <p className="lede text-lg text-muted-foreground font-light">
          In the early days of a startup, communication is organic. You sit in the same room (or Slack huddle), make decisions on the fly, and share context dynamically. But as soon as you scale past 8-10 people, this organic network breaks down.
        </p>
        <p>
          Without a structured system, institutional knowledge quickly evaporates. New hires waste hours asking repetitive questions, critical configurations are lost in message history, and decision-making cycles drag. Your startup needs a Second Brain.
        </p>

        <hr className="border-border/40 my-6" />

        <h3 className="text-xl font-display font-medium text-primary">1. The Single Source of Truth Constraint</h3>
        <p>
          If information lives in multiple places—some in Notion, some in Google Docs, some in private Slack channels—it doesn't exist. You must enforce a single, highly structured knowledge repository.
        </p>
        <p>
          We build structured, local-first wikis in Obsidian. By storing all documentation as standard Markdown files inside your repository, you guarantee zero platform lock-in, enable bi-directional links, and allow git-based automated synchronization.
        </p>

        <h3 className="text-xl font-display font-medium text-primary">2. The Bi-Directional Linking Architecture</h3>
        <p>
          Traditional folders are static tombs where documentation goes to die. Bi-directional linking connects notes dynamically. If you document a custom API service config, link it directly to the customer success onboarding SOP and the strategic roadmap.
        </p>
        <div className="border border-border/80 bg-background/55 p-4 rounded-sm font-mono text-xs space-y-2">
          <div className="text-primary font-bold">// OBSIDIAN MARKDOWN ARCHITECTURE:</div>
          <div># [[03 - Technical Builds/Supabase Setup]]</div>
          <div>- Linked in: [[01 - Projects/Tenant Management App]]</div>
          <div>- Associated with: [[02 - Strategy/Data Compliance Guidelines]]</div>
        </div>

        <h3 className="text-xl font-display font-medium text-primary">3. The 3 Pillars of a Scalable Wiki Note</h3>
        <p>
          Every single note inside your organizational Second Brain must follow a consistent, strict semantic structure:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Metadata Block:</strong> Frontmatter declaring the note type, active status, area owner, priority, and bi-directional relationships.</li>
          <li><strong>The Playbook (SOP):</strong> A step-by-step checklist written so clearly that a junior operator or an AI agent can execute it without calling a meeting.</li>
          <li><strong>Telemetry / Verification:</strong> How to test that the playbook was completed successfully (e.g. build logs, terminal outputs).</li>
        </ul>

        <h3 className="text-xl font-display font-medium text-primary">4. Enforcing an Documentation Culture</h3>
        <p>
          A knowledge base is only as good as the team's commitment to maintain it. Enforce the &ldquo;Documentation First&rdquo; rule: if a system update, strategic change, or hiring pipeline is not documented in the wiki, it doesn't exist.
        </p>
        <p>
          Whenever a team member asks a repeating question on Slack, reply with the corresponding bi-directional wiki link. If the link doesn't exist, build it together.
        </p>

        <div className="border-l-2 border-primary bg-primary-soft p-4 mt-6">
          <p className="font-mono text-xs text-primary font-semibold mb-1">THE OPERATIONAL TAKEAWAY:</p>
          <p className="text-sm text-foreground/80 font-light">
            A highly organized internal wiki is a massive leverage point. It reduces onboarding time by 50%, removes founder bottlenecks, and allows future AI agents to immediately understand your startup's operations.
          </p>
        </div>
      </div>
    ),
  },
};

interface BlogModalProps {
  articleId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogModal = ({ articleId, isOpen, onClose }: BlogModalProps) => {
  if (!isOpen || !articleId || !articlesData[articleId]) return null;

  const article = articlesData[articleId];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-end overflow-hidden">
      {/* Scrim Overlay */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-background/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
      />

      {/* Slide-out Drawer */}
      <div 
        className="relative z-10 h-full w-full max-w-3xl border-l border-border bg-card shadow-2xl flex flex-col animate-in slide-in-from-right duration-350"
      >
        {/* Animated Scan line */}
        <div className="absolute inset-0 scanline-mask opacity-15 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-border p-5 bg-background/60 backdrop-blur relative z-20">
          <div className="flex items-center gap-3">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted-foreground">
              {article.tag} // Core Registry
            </span>
          </div>
          <button
            onClick={onClose}
            className="border border-border p-2 text-muted-foreground hover:text-foreground hover:border-border-strong transition-all duration-300 rounded-sm"
            aria-label="Close article"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="flex-1 overflow-y-auto px-6 py-8 md:px-10 relative z-10 scrollbar-thin">
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Meta details */}
            <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
              <span className="text-primary font-semibold tracking-widest">{article.eyebrow}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar size={12} />
                <span>{article.date}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Clock size={12} />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Display Title */}
            <h2 className="font-display text-3xl font-semibold leading-tight text-foreground md:text-4xl pt-2">
              {article.title}
            </h2>

            {/* Visual separating line */}
            <div className="flex items-center gap-1 py-2" aria-hidden="true">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              <span className="h-px flex-grow bg-gradient-to-r from-border to-transparent" />
            </div>

            {/* Complete Article Content */}
            <div className="pt-2">
              {article.content}
            </div>

          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-border p-5 bg-background/40 backdrop-blur relative z-20 flex justify-between items-center">
          <span className="font-mono text-[10px] text-muted-foreground">
            ANTI/MATRIX SYSTEMS — SECURE STORAGE DOCUMENT
          </span>
          <Button 
            onClick={onClose}
            size="sm" 
            className="h-9 bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono gap-1"
          >
            Close Document
            <X size={12} />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Help map standard titles to their internal IDs
export const mapTitleToId = (title: string): string => {
  const t = title.toLowerCase();
  if (t.includes("hiring") || t.includes("frameworks")) return "hiring-frameworks";
  if (t.includes("reporting") || t.includes("investment")) return "reporting-systems";
  if (t.includes("knowledge") || t.includes("internal")) return "knowledge-bases";
  return "";
};

export default BlogModal;
