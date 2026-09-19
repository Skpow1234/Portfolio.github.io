import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

const ChatbotMessageSchema = z.object({
  message: z
    .string()
    .trim()
    .min(1, 'Message is required')
    .max(500, 'Message is too long'),
});

const COMMON_QUESTIONS: Record<string, string> = {
  'who are you':
    "I'm Juan Hurtado, a Senior Software Engineer with 8 years of experience. I currently work at Microsoft as a Software Engineer II on the Copilot platform infrastructure team.",
  'what do you do':
    "I'm a Senior Software Engineer specializing in full-stack development, cloud architecture, and team leadership. I work with technologies like Go, Node.js, .NET, and Java to build scalable, reliable systems.",
  'where are you located': "I'm based in Cali, Colombia, but I work with teams globally.",
  'what is your current role':
    "I'm currently a Software Engineer II at Microsoft, working on the MS365 Copilot platform within the infrastructure team. I focus on developing reliable, scalable, and secure code that powers Microsoft's AI-driven productivity solutions.",
  'what technologies do you use':
    'I work with a wide range of technologies including Go, Node.js, C# (.NET), Java, React, Angular, TypeScript, AWS, Azure, Kubernetes, Docker, and many more. I also have experience with AI/ML technologies and prompt engineering.',
  'do you have github':
    'Yes! You can find my GitHub profile at https://github.com/Skpow1234 where I showcase my projects and contributions.',
  'how can i contact you':
    'The best way to reach me is on LinkedIn at https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/ — you can also browse my work on GitHub at https://github.com/Skpow1234.',
  'what projects have you worked on':
    "I've worked on various projects including PeerVault (secure P2P file sharing), Streamlens (real-time streaming analytics), and Router_Microservices (testing framework for distributed apps). You can see more details in the repositories section.",
  'do you do freelance work':
    "Yes, I've been doing freelance development work since 2020, designing and implementing tailored technological solutions for various companies.",
  'what is your experience with ai':
    'I have extensive experience with AI/ML technologies including prompt engineering, generative AI, machine learning, natural language processing, and LLM integration. I currently work on AI infrastructure at Microsoft\'s Copilot platform.',
};

function findBestResponse(question: string): string {
  const normalizedQuestion = question.toLowerCase().trim();

  for (const [key, response] of Object.entries(COMMON_QUESTIONS)) {
    if (normalizedQuestion.includes(key)) {
      return response;
    }
  }

  if (normalizedQuestion.includes('microsoft') || normalizedQuestion.includes('current job')) {
    return COMMON_QUESTIONS['what is your current role'];
  }

  if (
    normalizedQuestion.includes('skill') ||
    normalizedQuestion.includes('technology') ||
    normalizedQuestion.includes('tech stack')
  ) {
    return COMMON_QUESTIONS['what technologies do you use'];
  }

  if (
    normalizedQuestion.includes('project') ||
    normalizedQuestion.includes('work') ||
    normalizedQuestion.includes('built')
  ) {
    return COMMON_QUESTIONS['what projects have you worked on'];
  }

  if (
    normalizedQuestion.includes('contact') ||
    normalizedQuestion.includes('reach') ||
    normalizedQuestion.includes('linkedin')
  ) {
    return COMMON_QUESTIONS['how can i contact you'];
  }

  if (
    normalizedQuestion.includes('ai') ||
    normalizedQuestion.includes('artificial intelligence') ||
    normalizedQuestion.includes('machine learning')
  ) {
    return COMMON_QUESTIONS['what is your experience with ai'];
  }

  return "I'm Juan Hurtado, a Senior Software Engineer. I'd be happy to help answer your questions about my experience, skills, or projects. Feel free to ask me about my work at Microsoft, my technical expertise, or how to get in touch!";
}

export async function POST(req: NextRequest) {
  const { response: rateLimitResponse, headers, allowed } = await checkRateLimit(req, 'chatbot');
  if (!allowed && rateLimitResponse) {
    return rateLimitResponse;
  }

  try {
    const body: unknown = await req.json();
    const parsed = ChatbotMessageSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? 'Invalid message' },
        { status: 400, headers },
      );
    }

    const response = findBestResponse(parsed.data.message);

    return NextResponse.json(
      {
        response,
        timestamp: new Date().toISOString(),
      },
      { headers },
    );
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500, headers },
    );
  }
}
