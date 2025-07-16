"use client";

import { Card } from "@/components/ui/card";
import { workExperience } from "@/lib/data/work-experience";
import { motion } from "framer-motion";

export function WorkExperienceSection() {
  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          Work Experience
        </h2>
        <div className="timeline-container">
          <div className="timeline-items">
            {workExperience.map((experience, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div className="timeline-dot"></div>
                <motion.div
                  className="timeline-content"
                  initial={{ scale: 0.95, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 0.1 }}
                >
                  <Card className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-semibold">{experience.title}</h3>
                    <p className="text-muted-foreground mb-1 sm:mb-2">{experience.company}</p>
                    <p className="text-sm text-muted-foreground mb-2">{experience.period}</p>
                    {experience.description && (
                      <p className="mb-2 text-base text-foreground">{experience.description}</p>
                    )}
                    {experience.skills && experience.skills.length > 0 && (
                      <div className="mb-1">
                        <span className="font-semibold">Skills: </span>
                        <span className="text-sm text-muted-foreground">{experience.skills.join(", ")}</span>
                      </div>
                    )}
                    {experience.methodologies && experience.methodologies.length > 0 && (
                      <div>
                        <span className="font-semibold">Methodologies: </span>
                        <span className="text-sm text-muted-foreground">{experience.methodologies.join(", ")}</span>
                      </div>
                    )}
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}