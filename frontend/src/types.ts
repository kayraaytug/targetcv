export type SectionId =
  | "template"
  | "profile"
  | "work"
  | "education"
  | "awards"
  | "skills"
  | "projects"
  | "languages"
  | "references";

  export const templateList = [
    "jsonresume-theme-even",
    "jsonresume-theme-bufferbloat",
    "jsonresume-theme-one",
  ] as const;

export type Template = (typeof templateList)[number];


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

export type ProfileLocation = {
  address: string
  postalCode: string
  city: string
  countryCode: string
  region: string
}

export type SocialProfile = {
  network: string
  username: string
  url: string
}

export interface Volunteer {
  organization: string;
  position: string;
  url: string;
  startDate: string;
  endDate: string;
  summary: string;
  highlights: string[];
}

export interface Certificate {
  name: string;
  date: string;
  issuer: string;
  url: string;
}

export interface Publication {
  name: string;
  publisher: string;
  releaseDate: string;
  url: string;
  summary: string;
}

export interface Interest {
  name: string;
  keywords: string[];
}


export interface ResumeData {
  template: Template;
  basics: Basics;
  work: Work[];
  volunteer: Volunteer[];
  education: Education[];
  awards: Award[];
  certificates: Certificate[];
  publications: Publication[];
  skills: Skill[];
  languages: Language[];
  interests: Interest[];
  references: Reference[];
  projects: Project[];
}

