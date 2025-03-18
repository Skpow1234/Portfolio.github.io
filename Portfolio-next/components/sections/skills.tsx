import { Card } from "@/components/ui/card";
import { skills } from "@/lib/data/skills";

export function SkillsSection() {
  const categories = Array.from(new Set(skills.map(skill => skill.category)));

  return (
    <section className="py-16 sm:py-20 bg-secondary/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {categories.map((category, index) => (
            <div key={index} className="transform transition-all duration-300 hover:rotate-2 hover:scale-105">
              <h3 className="text-xl font-semibold mb-4 text-center">{category}</h3>
              <Card className="p-4 h-[280px] overflow-y-auto">
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {skills
                    .filter(skill => skill.category === category)
                    .map((skill, skillIndex) => (
                      <li key={skillIndex}>{skill.name}</li>
                    ))}
                </ul>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}