export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface WorkExperience {
  title: string;
  company: string;
  period: string;
  description?: string;
  skills?: string[];
  methodologies?: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
}

export interface Skill {
  name: string;
  category: 'Backend' | 'Frontend' | 'Databases' | 'Cloud & DevOps' | 'APIs' | 'Automation' | 'Methodologies'| 'AI/ML' | 'Tools' | 'CMS/CRM' | 'Operating Systems';
}