export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      repositories: 'Repositories',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      title: 'Juan Hurtado',
      subtitle: 'Senior Software Engineer who ships reliable, performant platforms',
      description: 'Focused on Go, Node.js, Dotnet and Java, delivering measurable outcomes like faster delivery, lower latency, and resilient systems.',
      cta: 'Get in Touch',
      scrollToExplore: 'Scroll to explore',
    },
    about: {
      title: 'About Me',
      description: 'I am a Senior Software Engineer with extensive experience in full-stack development, cloud architecture, and team leadership.',
      yearsExperience: '7+ Years Experience',
      softwareDevelopment: 'Software development',
      highPerformance: 'High Performance',
      scalableSolutions: 'Scalable solutions',
      resultsDriven: 'Results Driven',
      measurableOutcomes: 'Measurable outcomes',
      coreStrengths: 'Core Strengths',
      backendDevelopment: 'Backend Development',
      frontendDevelopment: 'Frontend Development',
      devopsCloud: 'DevOps & Cloud',
      paragraph1: 'Dedicated and results-driven software engineer with 7 years of experience in software development. Highly skilled in backend development using Spring Boot, Node.js, Go and .NET technologies. Demonstrated capacity for effective teamwork and adaptability to changing project requirements.',
      paragraph2: 'A self-taught individual who is passionate about continuous learning and staying up-to-date with the latest industry trends and technologies. Committed to delivering high-quality solutions that meet client requirements and exceed expectations.',
    },
    repositories: {
      title: 'Highlighted Repositories',
    },
    experience: {
      title: 'Work Experience',
      skillsLabel: 'Skills: ',
      methodologiesLabel: 'Methodologies: ',
    },
    skills: {
      title: 'Skills',
      all: 'All',
    },
    education: {
      title: 'Education',
    },
    contact: {
      title: 'Contact',
      description: "Let's work together on your next project.",
      sendMessage: 'Send me a message',
    },
    footer: {
      copyright: '© 2024 Juan Hurtado',
    },
    github: {
      title: 'GitHub Statistics',
      subtitle: 'My coding activity and contributions on GitHub',
      stats: 'GitHub Stats',
      profileReadme: 'Profile README',
      mostCommits: 'Most Commits',
      reposPerLanguage: 'Repos per Language',
      productiveTime: 'Productive Time',
      snakeAnimation: 'GitHub Snake Animation',
      topLanguages: 'Top Languages',
      contributionActivity: 'Contribution Activity',
      unableToLoad: 'Unable to load GitHub statistics',
      errorMessage: 'There was an issue loading the GitHub data. Please try again.',
      retry: 'Retry',
      loading: 'Loading GitHub statistics...',
    },
    chatbot: {
      title: 'AI Assistant',
      placeholder: 'Ask me anything about Juan...',
      suggestedQuestions: 'Suggested questions:',
      error: 'Failed to get response. Please try again.',
    },
    common: {
      loading: 'Loading...',
      error: 'Error',
      retry: 'Retry',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      repositories: 'Repositorios',
      experience: 'Experiencia',
      skills: 'Habilidades',
      education: 'Educación',
      contact: 'Contacto',
    },
    hero: {
      title: 'Juan Hurtado',
      subtitle: 'Ingeniero de Software Senior que entrega plataformas confiables y de alto rendimiento',
      description: 'Enfocado en Go, Node.js, Dotnet y Java, entregando resultados medibles como entrega más rápida, menor latencia y sistemas resilientes.',
      cta: 'Ponte en Contacto',
      scrollToExplore: 'Desplázate para explorar',
    },
    about: {
      title: 'Acerca de Mí',
      description: 'Soy un Ingeniero de Software Senior con amplia experiencia en desarrollo full-stack, arquitectura en la nube y liderazgo de equipos.',
      yearsExperience: '7+ Años de Experiencia',
      softwareDevelopment: 'Desarrollo de software',
      highPerformance: 'Alto Rendimiento',
      scalableSolutions: 'Soluciones escalables',
      resultsDriven: 'Orientado a Resultados',
      measurableOutcomes: 'Resultados medibles',
      coreStrengths: 'Fortalezas Principales',
      backendDevelopment: 'Desarrollo Backend',
      frontendDevelopment: 'Desarrollo Frontend',
      devopsCloud: 'DevOps y Cloud',
      paragraph1: 'Ingeniero de software dedicado y orientado a resultados con 7 años de experiencia en desarrollo de software. Altamente capacitado en desarrollo backend usando tecnologías Spring Boot, Node.js, Go y .NET. Capacidad demostrada para el trabajo en equipo efectivo y adaptabilidad a los cambios en los requisitos del proyecto.',
      paragraph2: 'Un individuo autodidacta que es apasionado por el aprendizaje continuo y mantenerse al día con las últimas tendencias y tecnologías de la industria. Comprometido a entregar soluciones de alta calidad que cumplan con los requisitos del cliente y superen las expectativas.',
    },
    repositories: {
      title: 'Repositorios Destacados',
    },
    experience: {
      title: 'Experiencia Laboral',
      skillsLabel: 'Habilidades: ',
      methodologiesLabel: 'Metodologías: ',
    },
    skills: {
      title: 'Habilidades',
      all: 'Todas',
    },
    education: {
      title: 'Educación',
    },
    contact: {
      title: 'Contacto',
      description: 'Trabajemos juntos en tu próximo proyecto.',
      sendMessage: 'Envíame un mensaje',
    },
    footer: {
      copyright: '© 2024 Juan Hurtado',
    },
    github: {
      title: 'Estadísticas de GitHub',
      subtitle: 'Mi actividad de programación y contribuciones en GitHub',
      stats: 'Estadísticas',
      profileReadme: 'README del Perfil',
      mostCommits: 'Más Commits',
      reposPerLanguage: 'Repos por Lenguaje',
      productiveTime: 'Tiempo Productivo',
      snakeAnimation: 'Animación de Serpiente de GitHub',
      topLanguages: 'Lenguajes Principales',
      contributionActivity: 'Actividad de Contribuciones',
      unableToLoad: 'No se pudieron cargar las estadísticas de GitHub',
      errorMessage: 'Hubo un problema al cargar los datos de GitHub. Por favor, inténtalo de nuevo.',
      retry: 'Reintentar',
      loading: 'Cargando estadísticas de GitHub...',
    },
    chatbot: {
      title: 'Asistente IA',
      placeholder: 'Pregúntame cualquier cosa sobre Juan...',
      suggestedQuestions: 'Preguntas sugeridas:',
      error: 'Error al obtener respuesta. Por favor, inténtalo de nuevo.',
    },
    common: {
      loading: 'Cargando...',
      error: 'Error',
      retry: 'Reintentar',
    },
  },
} as const;

// Type that represents the structure of translations (with string values, not literal types)
export type TranslationKeys = {
  [K in keyof typeof translations.en]: {
    [P in keyof typeof translations.en[K]]: string;
  };
};

export function getTranslation(locale: Locale): TranslationKeys {
  return translations[locale] || translations[defaultLocale];
}
