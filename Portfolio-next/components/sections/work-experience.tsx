"use client";

import { Card } from "@/components/ui/card";
import { workExperience } from "@/lib/data/work-experience";
import { motion } from "framer-motion";

export function WorkExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center">
          Work Experience
        </h2>
        <div className="space-y-6">
          {workExperience.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Card className="p-6 transform transition-all duration-300 hover:scale-105">
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <p className="text-muted-foreground mb-1">{experience.company}</p>
                <p className="text-sm text-muted-foreground mb-3">{experience.period}</p>
                {experience.description && (
                  <p className="mb-3 text-base text-foreground">{experience.description}</p>
                )}
                {experience.skills && experience.skills.length > 0 && (
                  <div className="mb-2">
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
          ))}
        </div>
      </div>
    </section>
  );
}