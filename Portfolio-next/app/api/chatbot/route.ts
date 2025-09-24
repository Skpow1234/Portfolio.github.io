import { NextRequest, NextResponse } from 'next/server';
import { createRateLimitMiddleware, getClientIP, createRateLimitHeaders } from '../../../lib/middleware/rate-limit';
import { rateLimit } from '../../../lib/rate-limit';

// Knowledge base for the chatbot
const KNOWLEDGE_BASE = {
  about: {
    name: "Juan Hurtado",
    title: "Senior Software Engineer",
    experience: "7+ years of experience in full-stack development, cloud architecture, and team leadership",
    location: "Cali, Colombia",
    currentRole: "Software Engineer II at Microsoft, working on the Copilot platform within the infrastructure team",
    specialties: ["Go", "Node.js", ".NET", "Java", "Cloud Architecture", "AI/ML Infrastructure", "Distributed Systems"]
  },
  experience: {
    microsoft: "Software Engineer II at Microsoft (September 2024 – Present) - Working on MS365 Copilot platform infrastructure",
    oortech: "Senior Software Engineer at OORTech LLC (May 2025 – June 2025) - Datahub platform development with Web3 technologies",
    innovatech: "Full Stack .NET Engineer at Innovatech Consulting (March 2025 – May 2025) - Workdynamics after-sale service platform",
    visbl: "Senior Software Engineer at Visbl Inc (February 2025 – June 2025) - Mortgage technology platform",
    shokworks: "Full Stack Engineer at Shokworks Inc (November 2024 – February 2025) - Modern web applications with React.js and Next.js"
  },
  skills: {
    backend: ["Java (Spring Boot)", "Go", "PHP (Laravel)", "Node.js", "C# (.NET Core)", "Scala", "Nest.js", "Quarkus"],
    frontend: ["Angular", "React.js", "React Native", "Vue.js", "TypeScript", "Next.js", "JavaScript"],
    databases: ["PostgreSQL", "MySQL", "SQL Server", "Oracle Database", "MongoDB", "Redis", "Elasticsearch"],
    cloud: ["AWS", "Azure", "Google Cloud (GCP)", "Kubernetes", "Docker", "Terraform", "CI/CD Pipelines"],
    ai: ["Prompt Engineering", "Generative AI", "Machine Learning", "Natural Language Processing", "LLM Integration"]
  },
  projects: {
    peervault: "PeerVault - A secure peer-to-peer file sharing and storage solution with end-to-end encryption (Go)",
    streamlens: "Streamlens-backend - Backend API for real-time streaming analytics platform (Python)",
    router: "Router_Microservices - Comprehensive testing framework for distributed applications (TypeScript)"
  },
  contact: {
    email: "Available through contact form",
    github: "https://github.com/Skpow1234",
    linkedin: "https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/",
    location: "Cali, Colombia"
  }
};

// Common questions and their responses
const COMMON_QUESTIONS = {
  "who are you": "I'm Juan Hurtado, a Senior Software Engineer with 7+ years of experience. I currently work at Microsoft as a Software Engineer II on the Copilot platform infrastructure team.",
  "what do you do": "I'm a Senior Software Engineer specializing in full-stack development, cloud architecture, and team leadership. I work with technologies like Go, Node.js, .NET, and Java to build scalable, reliable systems.",
  "where are you located": "I'm based in Cali, Colombia, but I work with teams globally.",
  "what is your current role": "I'm currently a Software Engineer II at Microsoft, working on the MS365 Copilot platform within the infrastructure team. I focus on developing reliable, scalable, and secure code that powers Microsoft's AI-driven productivity solutions.",
  "what technologies do you use": "I work with a wide range of technologies including Go, Node.js, C# (.NET), Java, React, Angular, TypeScript, AWS, Azure, Kubernetes, Docker, and many more. I also have experience with AI/ML technologies and prompt engineering.",
  "do you have github": "Yes! You can find my GitHub profile at https://github.com/Skpow1234 where I showcase my projects and contributions.",
  "how can i contact you": "You can contact me through the contact form on this website, or connect with me on LinkedIn at https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/",
  "what projects have you worked on": "I've worked on various projects including PeerVault (secure P2P file sharing), Streamlens (real-time streaming analytics), and Router_Microservices (testing framework for distributed apps). You can see more details in the repositories section.",
  "do you do freelance work": "Yes, I've been doing freelance development work since 2020, designing and implementing tailored technological solutions for various companies.",
  "what is your experience with ai": "I have extensive experience with AI/ML technologies including prompt engineering, generative AI, machine learning, natural language processing, and LLM integration. I currently work on AI infrastructure at Microsoft's Copilot platform."
};

function findBestResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase().trim();
  
  // Check for exact matches first
  for (const [key, response] of Object.entries(COMMON_QUESTIONS)) {
    if (normalizedQuestion.includes(key)) {
      return response;
    }
  }
  
  // Check for keyword matches
  if (normalizedQuestion.includes('microsoft') || normalizedQuestion.includes('current job')) {
    return COMMON_QUESTIONS["what is your current role"];
  }
  
  if (normalizedQuestion.includes('skill') || normalizedQuestion.includes('technology') || normalizedQuestion.includes('tech stack')) {
    return COMMON_QUESTIONS["what technologies do you use"];
  }
  
  if (normalizedQuestion.includes('project') || normalizedQuestion.includes('work') || normalizedQuestion.includes('built')) {
    return COMMON_QUESTIONS["what projects have you worked on"];
  }
  
  if (normalizedQuestion.includes('contact') || normalizedQuestion.includes('reach') || normalizedQuestion.includes('email')) {
    return COMMON_QUESTIONS["how can i contact you"];
  }
  
  if (normalizedQuestion.includes('ai') || normalizedQuestion.includes('artificial intelligence') || normalizedQuestion.includes('machine learning')) {
    return COMMON_QUESTIONS["what is your experience with ai"];
  }
  
  // Default response
  return "I'm Juan Hurtado, a Senior Software Engineer. I'd be happy to help answer your questions about my experience, skills, or projects. Feel free to ask me about my work at Microsoft, my technical expertise, or how to get in touch!";
}

export async function POST(req: NextRequest) {
  // Apply rate limiting middleware
  const rateLimitMiddleware = createRateLimitMiddleware('chatbot');
  const rateLimitResponse = rateLimitMiddleware(req);
  if (rateLimitResponse) {
    return rateLimitResponse;
  }

  // Get rate limit info for response headers
  const ip = getClientIP(req);
  const limiter = rateLimit({ interval: 60000, limit: 20 });
  const rateLimitResult = limiter(ip);

  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const response = findBestResponse(message);
    
    return NextResponse.json(
      { 
        response,
        timestamp: new Date().toISOString()
      },
      {
        headers: createRateLimitHeaders(20, rateLimitResult.remaining, rateLimitResult.resetTime)
      }
    );
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
}
