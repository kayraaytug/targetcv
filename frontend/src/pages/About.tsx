// src/pages/About.tsx
import Layout from "@/components/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16 md:px-6 lg:py-24 2xl:max-w-[1400px]">
        <h1 className="text-4xl font-bold mb-6">About TargetCV</h1>
        <p className="text-lg text-muted-foreground mb-4">
          TargetCV is an AI-powered resume builder and job matching platform designed to help job seekers create optimized resumes that align with specific job descriptions.
        </p>
        <p className="text-lg text-muted-foreground mb-4">
          Our mission is to increase your chances of landing your dream job by offering tools that tailor your CV to match recruiter expectations using modern AI techniques.
        </p>
        <p className="text-lg text-muted-foreground">
          Built with passion for developers, creatives, and professionals who are tired of the resume black hole. We’re here to make sure your resume gets noticed.
        </p>
      </div>
    </Layout>
  );
}
