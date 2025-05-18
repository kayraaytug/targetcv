// src/store/resumeStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ResumeData } from "@/types";

interface ResumeStore {
  data: ResumeData;
  resetData: () => void;
  updateSection: <K extends keyof ResumeData>(
    section: K,
    value: ResumeData[K]
  ) => void;
  updateBasics: (basics: ResumeData["basics"]) => void;
  exportToJSON: () => void;
  exportToPDF: () => Promise<void>;
  makeHTMLPreview: () => Promise<string | null>;
  isResumeStored: () => boolean;
}

const initialResumeData: ResumeData = {
  template: "jsonresume-theme-even",
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
  interests: [],
  volunteer: [],
  publications: [],
  certificates: [],
};

export const useResumeStore = create<ResumeStore>()(
  persist(
    (set, get) => ({
      data: initialResumeData,
      resetData: () => set({ data: initialResumeData }),
      updateSection: (section, value) =>
        set((state) => ({
          data: { ...state.data, [section]: value },
        })),
      updateBasics: (basics) =>
        set((state) => ({
          data: { ...state.data, basics },
        })),
      exportToJSON: () => {
        const { data } = get();
        const jsonString = JSON.stringify(data, null, 2);
        const blob = new Blob([jsonString], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "resume.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      exportToPDF: async () => {
        const { data } = get();
        try {
          const response = await fetch("https://kayraaytug-targetcv-backend.hf.space/export-pdf", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error("Failed to export PDF");

          const blob = await response.blob();
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob);
          link.download = "resume.pdf";
          link.click();
          URL.revokeObjectURL(link.href);
        } catch (err) {
          console.error("Error exporting PDF:", err);
        }
      },
      isResumeStored: () => {
        const { data } = get();
        return JSON.stringify(data) !== JSON.stringify(initialResumeData);
      },
      makeHTMLPreview: async () => {
        const { data } = get();
        try {
          const response = await fetch("https://kayraaytug-targetcv-backend.hf.space/make", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) throw new Error("Failed to generate preview");

          const html = await response.text();
          return html;
        } catch (err) {
          console.error("Error generating preview:", err);
          return null;
        }
      },
    }),

    {
      name: "resume-storage",
    }
  )
);
