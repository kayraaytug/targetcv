// src/hooks/useResumeData.ts
import { useState, useEffect } from "react";
import {
  Basics,
  Work,
  Education,
  Award,
  Skill,
  Project,
  Language,
  Reference,
  ResumeData,
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
  references: [],
};

export function useResumeData() {
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    const stored = localStorage.getItem("resumeJson");
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return initialResumeData;
      }
    }
    return initialResumeData;
  });

  // Update functions for each section
  const updateBasics = (basics: Basics) => {
    setResumeData((prev) => ({ ...prev, basics }));
  };

  const updateWork = (work: Work[]) => {
    setResumeData((prev) => ({ ...prev, work }));
  };

  const updateEducation = (education: Education[]) => {
    setResumeData((prev) => ({ ...prev, education }));
  };

  const updateAwards = (awards: Award[]) => {
    setResumeData((prev) => ({ ...prev, awards }));
  };

  const updateSkills = (skills: Skill[]) => {
    setResumeData((prev) => ({ ...prev, skills }));
  };

  const updateProjects = (projects: Project[]) => {
    setResumeData((prev) => ({ ...prev, projects }));
  };

  const updateLanguages = (languages: Language[]) => {
    setResumeData((prev) => ({ ...prev, languages }));
  };

  const updateReferences = (references: Reference[]) => {
    setResumeData((prev) => ({ ...prev, references }));
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

  const exportToPDF = async () => {
    try {
      const response = await fetch("http://localhost:8000/export-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) throw new Error("Failed to export PDF");

      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = "resume.pdf";
      link.click();
    } catch (err) {
      console.error("Error exporting PDF:", err);
    }
  };

  const makeHTMLPreview = async () => {
    await fetch("http://localhost:8000/make", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resumeData),
    });
  };

  useEffect(() => {
    localStorage.setItem("resumeJson", JSON.stringify(resumeData));
  }, [resumeData]);

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
    exportToPDF,
    makeHTMLPreview,
    loadSavedData,
  };
}
