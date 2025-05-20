import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { ChevronDown } from "lucide-react";
import { Download } from "lucide-react";

import { useResumeStore } from "@/store/resumeStore";
import { useCallback } from "react";

export default function ExportButtons() {
    const exportToJSON = useResumeStore(useCallback((state) => state.exportToJSON, []));
    const exportToPDF = useResumeStore(useCallback((state) => state.exportToPDF, []));
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="border mr-2 rounded-md px-2 py-2 flex items-center gap-2 hover:bg-gray-100 transition">
                <Download className="w-4 h-4" />
                <span>Export</span>
                <ChevronDown className="w-4 h-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem onClick={exportToPDF}><Download/>PDF</DropdownMenuItem>
                <DropdownMenuItem onClick={exportToJSON}><Download/>JSON</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
