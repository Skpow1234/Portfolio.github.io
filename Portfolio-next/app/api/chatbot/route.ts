import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { checkRateLimit } from '../../../lib/middleware/rate-limit';

const ChatbotMessageSchema = z.object({
  message: z.string().trim().min(1, 'Message is required').max(500, 'Message is too long'),
  locale: z.enum(['en', 'es']).optional(),
});

type AnswerLocale = 'en' | 'es';

const ANSWERS: Record<string, Record<AnswerLocale, string>> = {
  who: {
    en: "I'm Juan Hurtado, a Senior Software Engineer with 8 years of experience. I currently work at Microsoft as a Software Engineer II on the Copilot platform infrastructure team.",
    es: 'Soy Juan Hurtado, ingeniero de software senior con 8 años de experiencia. Hoy trabajo en Microsoft como Software Engineer II, en la infraestructura de la plataforma Copilot.',
  },
  role: {
    en: "I'm a Senior Software Engineer focused on full-stack development, cloud architecture, and team leadership. On this page the stack called out is Go, Node.js, .NET, and Java.",
    es: 'Soy ingeniero de software senior, enfocado en desarrollo full stack, arquitectura en la nube y liderazgo técnico. En esta página el stack destacado es Go, Node.js, .NET y Java.',
  },
  location: {
    en: "I'm based in Cali, Colombia, and I work with teams in other countries.",
    es: 'Vivo en Cali, Colombia, y trabajo con equipos en otros países.',
  },
  current: {
    en: "I'm a Software Engineer II at Microsoft, on the MS365 Copilot platform infrastructure team. The role is building reliable, scalable, and secure code for that platform.",
    es: 'Soy Software Engineer II en Microsoft, en el equipo de infraestructura de la plataforma MS365 Copilot. El rol es construir código confiable, escalable y seguro para esa plataforma.',
  },
  tech: {
    en: 'The page lists Go, Node.js, .NET, Java, React, Angular, TypeScript, AWS, Azure, Kubernetes, and Docker, plus AI work on the Copilot platform.',
    es: 'La página lista Go, Node.js, .NET, Java, React, Angular, TypeScript, AWS, Azure, Kubernetes y Docker, además del trabajo de IA en la plataforma Copilot.',
  },
  github: {
    en: 'GitHub: https://github.com/Skpow1234',
    es: 'GitHub: https://github.com/Skpow1234',
  },
  contact: {
    en: 'LinkedIn: https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/ — GitHub: https://github.com/Skpow1234',
    es: 'LinkedIn: https://www.linkedin.com/in/juan-felipe-h-3a3b3b13b/ — GitHub: https://github.com/Skpow1234',
  },
  projects: {
    en: 'Projects on this page include Sip-Happens, Squad-Finder, Kurae, LP-climb, Shinrai-Trade, Vaultpack, ChainForge, PeerVault, and Streamlens-backend. Details are in the repositories section.',
    es: 'Los proyectos de esta página incluyen Sip-Happens, Squad-Finder, Kurae, LP-climb, Shinrai-Trade, Vaultpack, ChainForge, PeerVault y Streamlens-backend. El detalle está en la sección de repositorios.',
  },
  freelance: {
    en: 'Yes. Freelance development has been ongoing since January 2019, building systems such as inventory, e-commerce, and CRMs for private companies.',
    es: 'Sí. El trabajo independiente sigue desde enero de 2019, con sistemas como inventarios, comercio electrónico y CRM para empresas privadas.',
  },
  ai: {
    en: 'The current role is infrastructure for Microsoft’s Copilot platform. Earlier roles on this page also list OpenAI APIs, prompt engineering, and LLM integration.',
    es: 'El rol actual es infraestructura de la plataforma Copilot de Microsoft. Roles anteriores en esta página también mencionan las APIs de OpenAI, prompt engineering e integración de modelos de lenguaje.',
  },
  fallback: {
    en: 'I can answer from this page: current role at Microsoft, experience since January 2019, the projects in the repositories section, and LinkedIn or GitHub for contact.',
    es: 'Puedo responder con lo que está en esta página: el rol actual en Microsoft, la experiencia desde enero de 2019, los proyectos de la sección de repositorios, y LinkedIn o GitHub para contacto.',
  },
};

function findBestResponse(question: string, locale: AnswerLocale): string {
  const q = question.toLowerCase();
  const pick = (key: string) => ANSWERS[key][locale];

  if (q.includes('who are you') || q.includes('quién eres') || q.includes('quien eres')) return pick('who');
  if (q.includes('where') || q.includes('located') || q.includes('dónde') || q.includes('donde')) {
    return pick('location');
  }
  if (q.includes('current role') || q.includes('current job') || q.includes('microsoft') || q.includes('rol actual')) {
    return pick('current');
  }
  if (q.includes('what do you do') || q.includes('a qué te dedicas') || q.includes('a que te dedicas')) {
    return pick('role');
  }
  if (q.includes('technolog') || q.includes('tech stack') || q.includes('skill') || q.includes('tecnolog')) {
    return pick('tech');
  }
  if (q.includes('github')) return pick('github');
  if (q.includes('freelance') || q.includes('independiente')) return pick('freelance');
  if (q.includes('contact') || q.includes('linkedin') || q.includes('reach')) return pick('contact');
  if (q.includes('project') || q.includes('proyecto') || q.includes('built')) return pick('projects');
  if (q.includes('artificial intelligence') || q.includes('machine learning') || /\bia\b/.test(q) || q.includes('inteligencia artificial')) {
    return pick('ai');
  }
  if (q.includes('qué haces') || q.includes('que haces')) return pick('role');

  return pick('fallback');
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

    const response = findBestResponse(parsed.data.message, parsed.data.locale ?? 'en');

    return NextResponse.json(
      {
        response,
        timestamp: new Date().toISOString(),
      },
      { headers },
    );
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Failed to process message' }, { status: 500, headers });
  }
}
