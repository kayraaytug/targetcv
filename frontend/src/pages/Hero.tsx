import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";
import { useRef } from "react";
import { Plus, Upload } from "lucide-react";
import { useResumeStore } from "@/store/resumeStore";
import { ResumeData } from "@/types";
import { useEffect, useState } from "react";
import { onAuthChange } from "@/hooks/useAuth";
import Layout from "@/components/Layout";

export default function Hero() {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const resumeData = useResumeStore((state) => state.data);
  const updateSection = useResumeStore((state) => state.updateSection);
  const updateBasics = useResumeStore((state) => state.updateBasics);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const resetData = useResumeStore((state) => state.resetData);
  const isResumeStored = useResumeStore((state) => state.isResumeStored());

  const handleCreateNewClick = () => {
    resetData(); // ✅ Reset entire resume state
    navigate("/create");
  };

  const handelImportJSONClick = async () => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) return;

    const text = await file.text();
    const json = JSON.parse(text) as ResumeData;

    // Apply each section using the store's setters
    Object.entries(json).forEach(([key, value]) => {
      if (key === "basics") {
        updateBasics(value);
      } else {
        updateSection(key as keyof typeof resumeData, value);
      }
    });

    navigate("/create");
  };

  const handleContinue = () => {
    navigate("/create");
  }

  return (

    <Layout>
      <div className="container mx-auto px-4 py-12 md:px-6 2xl:max-w-[1400px] lg:min-h-screen lg:flex lg:items-center lg:justify-center">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="flex-1 text-center lg:text-left flex flex-col items-center lg:items-start justify-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              TargetCV
            </h1>

            <div className="mt-5 max-w-xl">
              <p className="text-muted-foreground text-xl">
                Tired of sending out countless job applications with no response?
              </p>
              <p className="text-muted-foreground text-xl">
                TargetCV is here with the AI powered CV matcher!
              </p>
            </div>

            <div className="mt-8 flex gap-3 pb-4">
              <Button size="lg" onClick={handleCreateNewClick}>
                <Plus /> Create New
              </Button>

              <input
                ref={fileInputRef}
                type="file"
                accept="application/json"
                className="hidden"
                onChange={handelImportJSONClick}
              />
              <Button
                size="lg"
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                <Upload /> Upload JSON
              </Button>
            </div>

            {isResumeStored && (
              <Button size="lg" onClick={handleContinue}>
                Continue last session
              </Button>
            )}
          </div>

          {!user && (
            <div className="mt-12 lg:mt-0 lg:ml-12">
              <LoginForm />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
