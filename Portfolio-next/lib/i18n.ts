export const locales = ['en', 'es'] as const;
export type Locale = typeof locales[number];

export const defaultLocale: Locale = 'en';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      skills: 'Skills',
      education: 'Education',
      contact: 'Contact',
    },
    hero: {
      title: 'Juan Hurtado',
      subtitle: 'Senior Software Engineer',
      description: 'Passionate about creating innovative software solutions and building scalable applications.',
      cta: 'Get in Touch',
    },
    about: {
      title: 'About Me',
      description: 'I am a Senior Software Engineer with extensive experience in full-stack development, cloud architecture, and team leadership.',
    },
    experience: {
      title: 'Work Experience',
    },
    skills: {
      title: 'Skills',
    },
    education: {
      title: 'Education',
    },
    contact: {
      title: 'Contact',
      description: 'Let\'s work together on your next project.',
    },
    footer: {
      copyright: '© 2024 Juan Hurtado',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      experience: 'Experiencia',
      skills: 'Habilidades',
      education: 'Educación',
      contact: 'Contacto',
    },
    hero: {
      title: 'Juan Hurtado',
      subtitle: 'Ingeniero de Software Senior',
      description: 'Apasionado por crear soluciones de software innovadoras y construir aplicaciones escalables.',
      cta: 'Ponte en Contacto',
    },
    about: {
      title: 'Acerca de Mí',
      description: 'Soy un Ingeniero de Software Senior con amplia experiencia en desarrollo full-stack, arquitectura en la nube y liderazgo de equipos.',
    },
    experience: {
      title: 'Experiencia Laboral',
    },
    skills: {
      title: 'Habilidades',
    },
    education: {
      title: 'Educación',
    },
    contact: {
      title: 'Contacto',
      description: 'Trabajemos juntos en tu próximo proyecto.',
    },
    footer: {
      copyright: '© 2024 Juan Hurtado',
    },
  },
} as const;

export function getTranslation(locale: Locale) {
  return translations[locale] || translations[defaultLocale];
}
