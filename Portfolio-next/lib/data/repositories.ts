export interface Repository {
  name: string;
  description: string;
  url: string;
  language: string;
  stars?: number;
  forks?: number;
  topics?: string[];
}

export const repositories: Repository[] = [
  {
    name: "ChainForge",
    description: "Production-grade crypto/blockchain client skeleton in modern C++ (C++20/23). Features RocksDB, PostgreSQL, Redis, Prometheus, and Kubernetes deployment.",
    url: "https://github.com/Skpow1234/ChainForge",
    language: "C++",
    stars: 1,
    topics: ["blockchain", "c++20", "cryptocurrency", "distributed-systems"],
  },
  {
    name: "ShardForge",
    description: "Distributed database system built in Rust with ACID transactions, SQL compatibility, and horizontal scalability through RAFT consensus and intelligent sharding.",
    url: "https://github.com/Skpow1234/ShardForge",
    language: "Rust",
    topics: ["rust", "distributed-database", "raft-consensus", "sql"],
  },
  {
    name: "PeerVault",
    description: "A secure peer-to-peer file sharing and storage solution with end-to-end encryption.",
    url: "https://github.com/Skpow1234/PeerVault",
    language: "Go",
    topics: ["p2p", "encryption", "file-sharing", "golang"],
  },
  {
    name: "Streamlens-backend",
    description: "Backend API for Streamlens, a real-time streaming analytics platform.",
    url: "https://github.com/Skpow1234/Streamlens-backend",
    language: "Python",
    topics: ["analytics", "streaming", "backend", "python"],
  },
  {
    name: "Router_Microservices",
    description: "A comprehensive testing framework and coordination system for distributed applications.",
    url: "https://github.com/Skpow1234/Router_Microservices",
    language: "TypeScript",
    topics: ["microservices", "testing", "distributed", "typescript"],
  },
];
