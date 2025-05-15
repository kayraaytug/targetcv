import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Skill } from "@/types"

type SkillsSectionProps = {
  skills: Skill[]
  onChange: (updated: Skill[]) => void
}

export const SkillsSection: React.FC<SkillsSectionProps> = ({ skills, onChange }) => {
  const handleChange = (index: number, field: keyof Skill, value: string) => {
    const updated = [...skills]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  const handleKeywordChange = (index: number, kIndex: number, value: string) => {
    const updated = [...skills]
    updated[index].keywords[kIndex] = value
    onChange(updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Skills</h3>
      {skills.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.name || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...skills]
                updated.splice(i, 1)
                onChange(updated)
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
                  const updated = [...skills]
                  updated[i].keywords.splice(j, 1)
                  onChange(updated)
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
              const updated = [...skills]
              updated[i].keywords.push("")
              onChange(updated)
            }}
          >
            + Add Keyword
          </Button>
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          onChange([
            ...skills,
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
