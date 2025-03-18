import { Card } from "@/components/ui/card";
import { workExperience } from "@/lib/data/work-experience";

export function WorkExperienceSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          Work Experience
        </h2>
        <div className="timeline-container">
          {workExperience.map((experience, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <Card className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-semibold">{experience.title}</h3>
                  <p className="text-muted-foreground mb-1 sm:mb-2">{experience.company}</p>
                  <p className="text-sm text-muted-foreground">{experience.period}</p>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}