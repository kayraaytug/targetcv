export type SectionId =
  | "profile"
  | "work"
  | "education"
  | "awards"
  | "skills"
  | "projects"
  | "languages"
  | "references";

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Location {
  address: string;
  postalCode: string;
  city: string;
  countryCode: string;
  region: string;
}

export interface Basics {
  name: string;
  label: string;
  image: string;
  email: string;
  phone: string;
  url: string;
  summary: string;
  location: Location;
  profiles: Profile[];
}

export interface Work {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Education {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  startDate: string;
  endDate: string;
  score: string;
  courses: string[];
}

export interface Award {
  title: string;
  date: string;
  awarder: string;
  summary: string;
}

export interface Skill {
  name: string;
  level: string;
  keywords: string[];
}

export interface Project {
  name: string;
  startDate: string;
  endDate: string;
  description: string;
  highlights: string[];
  url: string;
}

export interface Language {
  language: string;
  fluency: string;
}

export interface Reference {
  name: string;
  reference: string;
}

export interface ResumeData {
  basics: Basics;
  work: Work[];
  education: Education[];
  awards: Award[];
  skills: Skill[];
  projects: Project[];
  languages: Language[];
  references: Reference[];
}

export const defaultBasics: Basics = {
  name: "John Doe",
  label: "Programmer",
  image: "",
  email: "john@gmail.com",
  phone: "(912) 555-4321",
  url: "https://johndoe.com",
  summary: "A summary of John Doe…",
  location: {
    address: "2712 Broadway St",
    postalCode: "CA 94115",
    city: "San Francisco",
    countryCode: "US",
    region: "California",
  },
  profiles: [
    {
      network: "Twitter",
      username: "john",
      url: "https://twitter.com/john",
    },
  ],
};

export const defaultWork: Work[] = [
  {
    name: "Company",
    position: "President",
    url: "https://company.com",
    startDate: "2013-01-01",
    endDate: "2014-01-01",
    summary: "Description…",
    highlights: ["Started the company"],
  },
];

export const defaultReferences: Reference[] = [
  {
    name: "Jane Doe",
    reference: "Reference…",
  },
];

export const defaultLanguages: Language[] = [
  {
    language: "English",
    fluency: "Native speaker",
  },
];

export const defaultProjects: Project[] = [
  {
    name: "Project",
    startDate: "2019-01-01",
    endDate: "2021-01-01",
    description: "Description...",
    highlights: ["Won award at AIHacks 2016"],
    url: "https://project.com/",
  },
];

export const defaultSkills: Skill[] = [
  {
    name: "Web Development",
    level: "Master",
    keywords: ["HTML", "CSS", "JavaScript"],
  },
];

export const defaultAwards: Award[] = [
  {
    title: "Award",
    date: "2014-11-01",
    awarder: "Company",
    summary: "There is no spoon.",
  },
];

export const defaultEducation: Education[] = [
  {
    institution: "University",
    url: "https://institution.com/",
    area: "Software Development",
    studyType: "Bachelor",
    startDate: "2011-01-01",
    endDate: "2013-01-01",
    score: "4.0",
    courses: ["DB1101 - Basic SQL"],
  },
];
