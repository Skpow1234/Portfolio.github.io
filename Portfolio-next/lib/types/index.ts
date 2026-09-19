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
