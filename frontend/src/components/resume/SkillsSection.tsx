import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Skill } from "@/types"
import { useResumeStore } from "@/store/resumeStore"

export function SkillsSection() {
  const { data, updateSection } = useResumeStore();
  
  const handleChange = (index: number, field: keyof Skill, value: string) => {
    const updated = [...data.skills];
    updated[index] = { ...updated[index], [field]: value };
    updateSection('skills', updated);
  };

  const handleKeywordChange = (index: number, kIndex: number, value: string) => {
    const updated = [...data.skills]
    updated[index].keywords[kIndex] = value
    updateSection('skills', updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Skills</h3>
      {data.skills.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.name || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...data.skills]
                updated.splice(i, 1)
                updateSection('skills', updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Skill Name" value={item.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <Input placeholder="Level (e.g. Master, Intermediate)" value={item.level} onChange={(e) => handleChange(i, "level", e.target.value)} />
          <h4 className="font-medium mt-2">Keywords</h4>
          {item.keywords.map((k, j) => (
            <div key={j} className="flex items-center space-x-2">
              <Input
                placeholder={`Keyword ${j + 1}`}
                value={k}
                onChange={(e) => handleKeywordChange(i, j, e.target.value)}
              />
              <Button
                className="h-6 w-6"
                variant="destructive"
                size="icon"
                onClick={() => {
                  const updated = [...data.skills]
                  updated[i].keywords.splice(j, 1)
                  updateSection('skills', updated)
                }}
              >
                <X />
              </Button>
            </div>
          ))}
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              const updated = [...data.skills]
              updated[i].keywords.push("")
              updateSection('skills', updated)
            }}
          >
            + Add Keyword
          </Button>
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          updateSection('skills', [
            ...data.skills,
            {
              name: "",
              level: "",
              keywords: [],
            },
          ])
        }
      >
        + Add Skill
      </Button>
    </section>
  )
}
