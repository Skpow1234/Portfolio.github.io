import { Card } from "@/components/ui/card";
import { education } from "@/lib/data/education";

export function EducationSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          Education
        </h2>
        <div className="space-y-6">
          {education.map((edu, index) => (
            <Card key={index} className="p-6 transform transition-all duration-300 hover:scale-105">
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <p className="text-muted-foreground">{edu.degree}</p>
              <p className="text-sm text-muted-foreground">{edu.period}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}