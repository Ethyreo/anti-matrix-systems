// Source: Gurman's first-person brief, 26 September 2026. Outcomes are owner-supplied.
import type { Detail } from './content';

export const identityDetails: Record<string, Detail> = {
  about: {
    kicker:'GURMAN SINGH / STARTUP OPERATOR',title:'Comfortable in the messy middle.',
    lead:'I work with founders when the business has momentum, but the systems behind it are starting to crack.',
    paragraphs:[
      'I’m a Business Operations & AI Strategy consultant and a hands-on Founder’s Office partner. I turn strategy into priorities, ownership, dashboards, workflows, and follow-through.',
      'At AdPushup / Zelto, I worked in the CEO’s Office across revenue, sales, marketing, finance, legal, and operations. Since October 2024, The Anti-Matrix Project has brought that discipline to founder-led startups.',
      'Pine & Thatch, InfluCreate, and Rogue Liberation have taught me what the tracker cannot: how sourcing, guest experience, creator partnerships, margins, and daily execution fit together.',
      'Before that came knowledge services and a Solutions Architect internship at Teleperformance, leadership with AIESEC, and a B.Tech in Computer Science at Amity University, Manesar. Engineer by heart. Operator by practice. Musician whenever I can be.'
    ],
    tags:['Founder’s Office','Business operations','AI strategy'],
    bullets:['AdPushup / Zelto · Apr 2022–Oct 2024','The Anti-Matrix Project · Oct 2024–present','InfluCreate · Mar 2025–present','adops.space · Jul 2025–present','Pine & Thatch · Jul 2025–present','Rogue Liberation · 2023–2025'],
    note:'Several ventures run in parallel. This is a map of the work, not consecutive jobs.'
  },
  operations:{
    kicker:'ADPUSHUP / ZELTO · APR 2022–OCT 2024',title:'Inside the CEO’s Office.',
    lead:'Senior Business Operations & Strategy Analyst. Connecting revenue, people, decisions, and the work between teams.',
    paragraphs:['I owned a $2.5M client payout cycle end-to-end: reporting, discrepancies, approvals, banking coordination, and execution.','I redesigned workflows, built company-wide OKR/KPI operating sheets, and created Marketing Ops and Sales Ops systems. Revenue-drop alerts brought changes into view earlier.','Alongside execution reviews, I managed data-room operations and supported Dubai entity setup and contract negotiations. I was promoted from Analyst to Senior Analyst in 14 months.'],
    tags:['CEO’s Office','BizOps','RevOps','AdTech SaaS'],
    bullets:['$2.5M client payout cycle owned end-to-end','SLA turnaround reduced: marketing 30%, sales 25%, operations 40%','Approximately $10.5K/month saved through SaaS and tool audits within one quarter','Selected vendor/tool costs reduced by 20–80%']
  },
  pine:{
    kicker:'PINE & THATCH / FOUNDER & OPERATOR',title:'The work behind the stay.',
    lead:'An 18-room hill hotel. A turnaround built through sales, guest experience, and everyday operating discipline.',
    paragraphs:['The property was loss-making. I connected OTA workflows, local sales, digital marketing, creator campaigns, staff processes, SOPs, and owner visibility. It became profitable in five months.','The broader Pine & Thatch brand is building boutique hospitality across two BnBs, with repeatable operations that reduce daily dependence on the owner.'],
    tags:['Hospitality','Turnaround','Founder-led operations'],
    bullets:['18-room property profitable in 5 months','Revenue improved by 130%','OTA impressions increased by 1,200%','Average occupancy: 33%','Conversion improved by 50%'],
    note:'Results refer to the hotel turnaround. The reception artwork is illustrative.'
  },
  adops:{
    kicker:'ADOPS.SPACE · JUL 2025–PRESENT',title:'Translate the technical into the operational.',
    lead:'Business & AI Strategy consulting for publisher operations, AdTech delivery, and expansion.',
    paragraphs:['I work across business strategy, AI workflows, client operations, and publisher outreach. I identify automation opportunities and turn monetization needs into execution plans.','SDK and header-bidding initiatives need reporting, onboarding, communication, documentation, and ownership to connect.'],
    tags:['Publisher operations','AdTech','GTM','AI workflows']
  },
  rogue:{
    kicker:'ROGUE LIBERATION · 2023–2025',title:'Margins meet the real world.',
    lead:'Building a clothing brand from scratch means owning the details behind the idea.',
    paragraphs:['I worked across sourcing, vendor coordination, buying, pricing, inventory, brand positioning, and online sales.','Customer communication, fulfillment, procurement, and quality checks built a practical understanding of D2C and small-brand execution.'],
    tags:['Founder','D2C','Sourcing','Small-brand execution']
  },
  influcreate:{
    kicker:'INFLUCREATE · MAR 2025–PRESENT',title:'Creativity needs a delivery system.',
    lead:'A creator–brand matching operation, built from zero.',
    paragraphs:['I built discovery systems, campaign structures, content workflows, performance tracking, and payout architecture while owning commercial, partnerships, and operations.','Repeatable delivery reduces the need for the founder to coordinate every moving part every day.'],
    tags:['Founder','Creator economy','Partnerships','Delivery systems']
  },
  consulting:{
    kicker:'THE ANTI-MATRIX PROJECT · OCT 2024–PRESENT',title:'Build the business behind the idea.',
    lead:'Founder-level execution across business systems, AI workflows, and startup readiness.',
    paragraphs:['Work ranges from hiring systems and tech-team expansion for cybersecurity startups to pitch decks, market research, and investor narratives with Tutubi.','For a Canada-based peace-promoting company, I built the business system across website structure, store setup, operating processes, and execution workflows.','The common thread is ambiguous founder intent becoming a usable operating model: dashboards, SOPs, investor materials, AI workflows, and handover documentation.'],
    tags:['Founder support','Investor readiness','Hiring','Operating models']
  },
  'service-founder':{
    kicker:'01 / FRACTIONAL FOUNDER’S OFFICE',title:'Stop being the operating system.',
    lead:'Senior execution support before a full-time COO or Chief of Staff hire makes sense.',
    paragraphs:['I work as a strategic right hand: turn founder conversations into priorities, decisions, owners, and work that moves.','A Fractional Founder’s Office engagement brings a weekly rhythm and ownership of initiatives that fall between teams.'],
    bullets:['Weekly founder sync and briefing notes','Priority tracking and cross-functional project ownership','Leadership reviews, decision follow-ups, and escalation tracking','Founder dashboards and execution planning'],
    tags:['Fractional partnership','Founder bandwidth','Follow-through']
  },
  'service-ops':{
    kicker:'02 / BUSINESS OPERATIONS & STARTUP SYSTEMS',title:'Make the work repeatable.',
    lead:'Turn scattered workflows and institutional memory into a system the team can use.',
    paragraphs:['A Startup Operating System Sprint starts with how work moves, where ownership breaks down, and which decisions keep returning to the founder.','A focused Cost & Tool Audit reviews SaaS spend, utilization, overlapping tools, vendor costs, and renewals. Cut the fat without cutting the muscle.'],
    bullets:['Ops audit, process mapping, and workflow redesign','Ownership maps, SOPs, and escalation paths','Knowledge base, handover documentation, and review cadence','Founder visibility and a practical cost-saving plan'],
    tags:['Operating system sprint','Cost & tool audit','Less founder dependency']
  },
  'service-ai':{
    kicker:'03 / AI WORKFLOWS & AUTOMATION',title:'Give AI a real job.',
    lead:'Use AI where it saves time, improves decisions, or reduces repetitive coordination.',
    paragraphs:['The AI Operating Layer starts with an opportunity map. We look at the work, design the workflow, and decide where a person needs to review the result.','I build reusable prompts and workflows for research, reporting, documentation, hiring, and founder support. Multi-agent workflows and internal tools serve the operating problem.'],
    bullets:['Workflow audit and AI opportunity map','Reusable prompts, research, and document workflows','Meeting notes → decisions → owners → follow-ups','Human review, team adoption, and a manual-hour savings map'],
    tags:['AI operating layer','Human review','Reusable workflows']
  },
  'service-gtm':{
    kicker:'04 / GTM & REVENUE OPERATIONS',title:'Give momentum a direction.',
    lead:'Move from random outreach to a clear sales process and a pipeline you can read.',
    paragraphs:['GTM & Revenue Cleanup connects ICP, offer, outreach, qualification, follow-ups, and reporting.','I work on founder-led sales systems and the handoffs between sales and marketing, then diagnose where conversion gets stuck.'],
    bullets:['ICP, segmentation, and offer clarity','Founder-led sales playbook and outreach strategy','CRM workflows, qualification, and follow-up systems','Pipeline reviews, revenue dashboards, and GTM experiments'],
    tags:['GTM cleanup','Founder-led sales','Revenue visibility']
  },
  'service-funding':{
    kicker:'05 / FUNDRAISING & INVESTOR READINESS',title:'Show the business behind the vision.',
    lead:'A stronger narrative, organized evidence, and a clearer explanation of how the company works.',
    paragraphs:['A Fundraising Readiness Sprint connects the pitch deck to market research, investor fit, the data room, and the operating plan behind it.'],
    bullets:['Pitch deck and investor narrative','Thesis-matched investor research and VC mapping','Market, competition, and use-of-funds narrative','Data room, investor FAQ, and update templates'],
    tags:['Fundraising readiness sprint','Investor research','Data room']
  },
  'service-team':{
    kicker:'06 / HIRING, DASHBOARDS & EXECUTION SYSTEMS',title:'Hire with clarity. Lead with visibility.',
    lead:'Know which roles you need, how to evaluate them, and what the team should look at each week.',
    paragraphs:['Clear roles need clear responsibilities, useful measures, and an onboarding path. I build the trackers, evaluation frameworks, dashboards, and reporting rhythm that make leadership decisions easier to act on.'],
    bullets:['Role scoping, hiring plans, and job descriptions','Candidate evaluation, interview workflows, and hiring trackers','Onboarding, ownership maps, and reporting structures','KPI/OKR, revenue, SLA, project, and leadership dashboards'],
    tags:['Hiring systems','Leadership dashboards','Decision support']
  },
  maos:{
    kicker:'INTERNAL SYSTEM / MAOS',title:'A working system behind the work.',
    lead:'A Multi-Agent Operating System for research, strategy, documentation, outreach, analysis, and execution planning.',
    paragraphs:['MAOS connects specialized agents and reusable workflows, routing tasks across local and cloud models.','It supports the consulting practice: carry context through the work, reduce repeated setup, and give research and execution planning a repeatable structure.'],
    tags:['Multi-agent workflows','Local + cloud models','Operating context'],note:'An evolving internal system.'
  }
};
export const services = [
 ['service-founder','Fractional Founder’s Office','Senior execution before the full-time hire'],
 ['service-ops','Business operations & startup systems','Operating system sprints · cost & tool audits'],
 ['service-ai','AI workflows & automation','An AI operating layer with a practical purpose'],
 ['service-gtm','GTM & revenue operations','ICP · pipeline · sales playbooks · follow-ups'],
 ['service-funding','Fundraising & investor readiness','Narrative · investor research · data room'],
 ['service-team','Hiring, dashboards & execution','Role clarity · useful measures · team rhythm']
];
export const currentToolkit = [
 {label:'01 / THINK',title:'Understand the problem.',tools:['ChatGPT · Claude · Gemini','Research workflows','Google Sheets · Excel','Notion · knowledge systems']},
 {label:'02 / BUILD',title:'Make the work usable.',tools:['Cursor · Claude Code · Codex','Lovable · UI prototyping','React · Python · FastAPI','Supabase · internal tools']},
 {label:'03 / CONNECT',title:'Give it a rhythm.',tools:['n8n · workflow automation','MAOS · multi-agent workflows','Prompt systems','Human review · team adoption']}
];
