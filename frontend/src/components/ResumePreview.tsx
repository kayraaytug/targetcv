import { useState, useRef } from "react";
import { useResumeStore } from "@/store/resumeStore";
import { useCallback } from "react";
import { Button } from "./ui/button";
import { Download, Play } from "lucide-react";
import { Loader2 } from "lucide-react"; // Spinner icon

export default function ResumeHTMLPreview() {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const makeHTMLPreview = useResumeStore((state) => state.makeHTMLPreview);
  const exportToJSON = useResumeStore(useCallback((state) => state.exportToJSON, []));
  const exportToPDF = useResumeStore(useCallback((state) => state.exportToPDF, []));
  const [isLoading, setIsLoading] = useState(false);

  const handlePreviewClick = async () => {
    setIsLoading(true);
    const html = await makeHTMLPreview();
    if (html && iframeRef.current?.contentDocument) {
      iframeRef.current.contentDocument.open();
      iframeRef.current.contentDocument.write(html);
      iframeRef.current.contentDocument.close();
    }
    setIsLoading(false);
  };

  const handleExport = async (exportFunc: () => Promise<void>) => {
    setIsLoading(true);
    await exportFunc();
    setIsLoading(false);
  };

  return (
    <div className="w-full h-screen flex flex-col relative">
      {isLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-50">
          <Loader2 className="animate-spin w-8 h-8" />
        </div>
      )}

      <div className="flex justify-between items-center p-4 border-b z-10">
        <Button
          variant="default"
          className="bg-green-500 hover:bg-green-600"
          onClick={handlePreviewClick}
          disabled={isLoading}
        >
          <Play className="w-4 h-4 mr-2" />
          Preview
        </Button>

        <div className="flex gap-2">
          <Button variant="outline" onClick={() => handleExport(exportToPDF)} disabled={isLoading}>
            <Download className="w-4 h-4 mr-2" />
            PDF
          </Button>
          <Button variant="outline" onClick={exportToJSON}>
            <Download className="w-4 h-4 mr-2" />
            JSON
          </Button>
        </div>
      </div>

      <iframe
        ref={iframeRef}
        className="w-full flex-1 border"
        title="HTML Resume Preview"
      />
    </div>
  );
}
