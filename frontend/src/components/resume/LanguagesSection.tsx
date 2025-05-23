import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Language } from "@/types"
import { useResumeStore } from "@/store/resumeStore"

export function LanguagesSection() {
  const { data, updateSection } = useResumeStore()
  
  const handleChange = (index: number, field: keyof Language, value: string) => {
    const updated = [...data.languages]
    updated[index] = { ...updated[index], [field]: value }
    updateSection('languages', updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Languages</h3>
      {data.languages.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.language || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...data.languages]
                updated.splice(i, 1)
                updateSection('languages', updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Language" value={item.language} onChange={(e) => handleChange(i, "language", e.target.value)} />
          <Input placeholder="Fluency (e.g. Native speaker)" value={item.fluency} onChange={(e) => handleChange(i, "fluency", e.target.value)} />
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          updateSection('languages', [
            ...data.languages,
            { language: "", fluency: "" },
          ])
        }
      >
        + Add Language
      </Button>
    </section>
  )
}
