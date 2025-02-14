"use client";
import React, { useState, useRef } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";

const projectsData = [
  {
    id: 1,
    title: "Title example #1",
    description: "Description example #1",
    image: "/images/projects/project-1.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
  {
    id: 2,
    title: "Title example #2",
    description: "Description example #2",
    image: "/images/projects/project-2.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
  {
    id: 3,
    title: "Title example #3",
    description: "Description example #3",
    image: "/images/projects/project-3.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
  {
    id: 4,
    title: "Title example #4",
    description: "Description example #4",
    image: "/images/projects/project-4.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
  {
    id: 5,
    title: "Title example #5",
    description: "Description example #5",
    image: "/images/projects/project-5.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
  {
    id: 6,
    title: "Title example #6",
    description: "Description example #6",
    image: "/images/projects/project-6.png",
    tag: ["All"],
    gitUrl: "",
    previewUrl: "",
  },
];


const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const handleTagChange = (newTag) => {
    setTag(newTag);
  };

  const filteredProjects = projectsData.filter((project) =>
    project.tag.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row justify-center items-center gap-2 py-6">
        <ProjectTag
          onClick={handleTagChange}
          name="All"
          isSelected={tag === "All"}
        />
        <ProjectTag
          onClick={handleTagChange}
          name="Web"
          isSelected={tag === "Web"}
        />
      </div>
      <ul ref={ref} className="grid md:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={index}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.4 }}
          >
            <ProjectCard
              key={project.id}
              title={project.title}
              description={project.description}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              previewUrl={project.previewUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
