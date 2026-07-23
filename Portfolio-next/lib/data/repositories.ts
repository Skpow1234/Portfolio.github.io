export interface Repository {
  name: string;
  description: string;
  impact: string;
  url: string;
  language: string;
  stars?: number;
  forks?: number;
  topics?: string[];
}

export const repositories: Repository[] = [
  {
    name: "Sip-Happens",
    description:
      "Terminal-first beer shop for Colombia — SSH into a Bubble Tea TUI, browse catalog, build a cart, and check out off-terminal.",
    impact:
      "Go core API with PostgreSQL, Stripe-hosted payments (no card data in SSH), inventory reservations, and Docker-only ops.",
    url: "https://github.com/Skpow1234/Sip-Happens",
    language: "Go",
    stars: 1,
    topics: ["ssh", "tui", "ecommerce", "stripe", "golang"],
  },
  {
    name: "Squad-Finder",
    description:
      "Matchmaking platform for gamers who find teammates by game, rank, region, language, schedule, role, and playstyle.",
    impact:
      "Next.js + FastAPI stack with PostgreSQL, Redis, Socket.IO realtime, JWT auth, and Dockerized local API.",
    url: "https://github.com/Skpow1234/Squad-Finder",
    language: "Python",
    stars: 0,
    topics: ["matchmaking", "fastapi", "nextjs", "realtime", "gaming"],
  },
  {
    name: "Kurae",
    description:
      "Social commerce platform for limited product drops, waitlists, checkout, inventory limits, referrals, and campaign analytics.",
    impact:
      "Next.js storefront with Go API, Redis workers, multi-provider payments, and OpenAPI-backed BFF architecture.",
    url: "https://github.com/Skpow1234/Kurae",
    language: "TypeScript",
    stars: 0,
    topics: ["ecommerce", "drops", "go", "nextjs", "payments"],
  },
  {
    name: "LP-climb",
    description:
      "League-inspired Ranked Climb visualizations from GitHub contribution data — tier cards and animated ladders as SVG/PNG/WebP/GIF.",
    impact:
      "Hosted render API, GitHub Action for profile READMEs, themes, 1v1/team ladders, and OpenAPI docs.",
    url: "https://github.com/Skpow1234/LP-climb",
    language: "TypeScript",
    stars: 1,
    topics: ["github", "svg", "visualization", "api", "readme"],
  },
  {
    name: "TheWindowsTunning",
    description: "WinTune — native Windows performance doctor with CLI, TUI, and safe reversible fixes.",
    impact: "89+ commits, phased CLI/TUI delivery, GitHub Actions CI and portable releases.",
    url: "https://github.com/Skpow1234/TheWindowsTunning",
    language: "C",
    stars: 0,
    topics: ["windows", "performance", "cli", "diagnostics", "cmake"],
  },
  {
    name: "Vaultpack",
    description: "Cross-platform encryption CLI that packages data into portable .vpack bundles.",
    impact: "Post-quantum modes, KMS integration, Sigstore signing, and multi-platform releases.",
    url: "https://github.com/Skpow1234/Vaultpack",
    language: "Go",
    stars: 2,
    topics: ["encryption", "cryptography", "security", "cli", "golang"],
  },
  {
    name: "ChainForge",
    description: "Production-grade blockchain client skeleton in modern C++20/23.",
    impact: "RocksDB, PostgreSQL, Redis, Prometheus, and Kubernetes-ready architecture.",
    url: "https://github.com/Skpow1234/ChainForge",
    language: "C++",
    stars: 1,
    topics: ["blockchain", "c++20", "cryptocurrency", "distributed-systems"],
  },
  {
    name: "ShardForge",
    description: "Distributed database in Rust with ACID transactions and SQL compatibility.",
    impact: "RAFT consensus, intelligent sharding, and horizontal scalability design.",
    url: "https://github.com/Skpow1234/ShardForge",
    language: "Rust",
    topics: ["rust", "distributed-database", "raft-consensus", "sql"],
  },
  {
    name: "PeerVault",
    description: "Secure peer-to-peer file sharing with end-to-end encryption.",
    impact: "Go-based P2P storage focused on privacy and encrypted transfers.",
    url: "https://github.com/Skpow1234/PeerVault",
    language: "Go",
    topics: ["p2p", "encryption", "file-sharing", "golang"],
  },
  {
    name: "Streamlens-backend",
    description: "Backend API for real-time streaming analytics.",
    impact: "Python services designed for live data ingestion and analytics workloads.",
    url: "https://github.com/Skpow1234/Streamlens-backend",
    language: "Python",
    topics: ["analytics", "streaming", "backend", "python"],
  },
];
