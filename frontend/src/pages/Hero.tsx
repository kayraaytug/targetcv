import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

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

          {/* Title */}
          <div className="mx-auto mt-5 max-w-2xl text-center">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
              TargetCV
            </h1>
          </div>
          {/* End Title */}
          <div className="mx-auto mt-5 max-w-3xl text-center">
            <p className="text-muted-foreground text-xl">
                Tired of sending out countless job applications with no response?
            </p>
            <p className="text-muted-foreground text-xl">TargetCV is here with the AI powered CV matcher!</p>
          </div>
          
          {/* Buttons */}
          <div className="mt-8 flex justify-center gap-3">
            <Button size={"lg"} className="hover:cursor-pointer" onClick={handleCreateNewClick}>Create New</Button>
            <Button size={"lg"} className="hover:cursor-pointer" onClick={handelImportJSONClick} variant={"outline"}>
              Upload JSON
            </Button>
          </div>
        </div>
      </div>
      {/* End Hero */}
    </>
  );
}