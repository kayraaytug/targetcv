import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/login-form";

export default function Hero() {
  const navigate = useNavigate();

  const handleCreateNewClick = () => {
    navigate("/create");
  };

  const handelImportJSONClick = () => {
    navigate("/create");
  };

  return (
    <>
      {/* Hero */}
      <div>
        <div className="container mx-auto px-4 py-24 md:px-6 lg:py-32 2xl:max-w-[1400px]">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Centered Text & Buttons */}
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

              {/* Buttons */}
              <div className="mt-8 flex gap-3">
                <Button size="lg" onClick={handleCreateNewClick}>
                  Create New
                </Button>
                <Button size="lg" onClick={handelImportJSONClick} variant="outline">
                  Upload JSON
                </Button>
              </div>
            </div>

            {/* LoginForm aligned right */}
            <div className="mt-12 lg:mt-0 lg:ml-12">
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}
