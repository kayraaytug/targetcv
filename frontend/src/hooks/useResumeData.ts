// src/hooks/useResumeData.ts
import { useState } from "react";
import {
  Basics,
  Work,
  Education,
  Award,
  Skill,
  Project,
  Language,
  Reference,
  ResumeData
} from "@/types";


const initialResumeData: ResumeData = {
  basics: {
    name: "",
    label: "",
    email: "",
    phone: "",
    url: "",
    summary: "",
    image: "",
    location: {
      address: "",
      postalCode: "",
      city: "",
      countryCode: "",
      region: "",
    },
    profiles: [],
  },
  work: [],
  education: [],
  awards: [],
  skills: [],
  projects: [],
  languages: [],
  references: []
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);

  // Update functions for each section
  const updateBasics = (basics: Basics) => {
    setResumeData(prev => ({ ...prev, basics }));
  };

  const updateWork = (work: Work[]) => {
    setResumeData(prev => ({ ...prev, work }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateAwards = (awards: Award[]) => {
    setResumeData(prev => ({ ...prev, awards }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData(prev => ({ ...prev, languages }));
  };

  const updateReferences = (references: Reference[]) => {
    setResumeData(prev => ({ ...prev, references }));
  };

  // Export resume data as JSON
  const exportToJSON = () => {
    const jsonResume = {
      ...resumeData,
      projects: resumeData.projects.map((p) => ({
        ...p,
        keywords: [], // optional: JSON Resume includes this
        roles: [], // optional: from your schema
        entity: "", // optional
        type: "application", // optional
      })),
      meta: {
        version: "v1.0.0",
        lastModified: new Date().toISOString(),
      },
    };

    const blob = new Blob([JSON.stringify(jsonResume, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "resume.json";
    link.click();
  };

  // Load previously saved data from localStorage
  const loadSavedData = () => {
    const stored = localStorage.getItem("resumeJson");
    if (!stored) return;

    try {
      const json = JSON.parse(stored);
      const newData = { ...initialResumeData };

      // Only update fields that exist in the saved data
      if (json.basics) newData.basics = json.basics;
      if (json.work) newData.work = json.work;
      if (json.education) newData.education = json.education;
      if (json.awards) newData.awards = json.awards;
      if (json.skills) newData.skills = json.skills;
      
      if (json.projects) {
        newData.projects = json.projects.map((p: any) => ({
          name: p.name,
          startDate: p.startDate,
          endDate: p.endDate,
          description: p.description,
          highlights: p.highlights,
          url: p.url,
        }));
      }
      
      if (json.languages) newData.languages = json.languages;
      if (json.references) newData.references = json.references;

      setResumeData(newData);

    } catch (error) {
      console.error("Error loading saved resume data:", error);
    }
  };

  return {
    resumeData,
    updateBasics,
    updateWork,
    updateEducation,
    updateAwards,
    updateSkills,
    updateProjects,
    updateLanguages,
    updateReferences,
    exportToJSON,
    loadSavedData
  };
}