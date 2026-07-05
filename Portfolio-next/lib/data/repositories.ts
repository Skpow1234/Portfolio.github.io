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
