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
    name: "PeerVault",
    description: "A secure peer-to-peer file sharing and storage solution with end-to-end encryption.",
    url: "https://github.com/Skpow1234/PeerVault",
    language: "Go",
  },
  {
    name: "Streamlens-backend",
    description: "Backend API for Streamlens, a real-time streaming analytics platform.",
    url: "https://github.com/Skpow1234/Streamlens-backend",
    language: "Python",
  },
  {
    name: "PruebaCoordinadora",
    description: "A comprehensive testing framework and coordination system for distributed applications.",
    url: "https://github.com/Skpow1234/PruebaCoordinadora",
    language: "TypeScript",
  },
];
