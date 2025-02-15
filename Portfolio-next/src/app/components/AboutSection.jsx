"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <ul className="list-disc pl-2">
        <li>Java (Spring Boot)</li>
        <li>Node.js (NestJS, Express.js)</li>
        <li>React.js</li>
        <li>TypeScript & JavaScript</li>
        <li>PostgreSQL, MySQL, SQL Server, MongoDB</li>
        <li>AWS, Azure, GCP</li>
        <li>Docker, Kubernetes</li>
        <li>Microservices Architecture</li>
        <li>GraphQL & RESTful APIs</li>
        <li>ETL & Data Engineering</li>
      </ul>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <ul className="list-disc pl-2">
        <li>Universidad de San Buenaventura – Software Engineering Bachelor (2017-2025)</li>
        <li>Colombo Americano – English School (2012-2019)</li>
      </ul>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <ul className="list-disc pl-2">
        <li>AWS Fundamentals</li>
        <li>Scrum Methodologies</li>
      </ul>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} alt="Description of the image"/>
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a software engineer with over 5 years of experience, specializing in backend and full-stack development.
            My expertise spans across Java, Spring Boot, Node.js, React, and cloud computing with AWS, Azure, and GCP.
            I have a strong background in microservices, database management, and containerization using Docker and Kubernetes.
            Passionate about delivering high-quality, scalable solutions, I thrive in Agile environments and enjoy collaborating 
            with cross-functional teams to create impactful software applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
