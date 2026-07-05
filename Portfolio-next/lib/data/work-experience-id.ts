export function getWorkExperienceId(entry: {
  company: string;
  title: string;
  period: string;
}): string {
  return `${entry.company}::${entry.title}::${entry.period}`;
}
