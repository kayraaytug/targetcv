import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Award } from "@/types"

type AwardsSectionProps = {
  awards: Award[]
  onChange: (updated: Award[]) => void
}

export const AwardsSection: React.FC<AwardsSectionProps> = ({ awards, onChange }) => {
  const handleChange = (index: number, field: keyof Award, value: string) => {
    const updated = [...awards]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Awards</h3>
      {awards.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.title || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...awards]
                updated.splice(i, 1)
                onChange(updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Title" value={item.title} onChange={(e) => handleChange(i, "title", e.target.value)} />
          <Input placeholder="Date" value={item.date} onChange={(e) => handleChange(i, "date", e.target.value)} />
          <Input placeholder="Awarder" value={item.awarder} onChange={(e) => handleChange(i, "awarder", e.target.value)} />
          <Textarea placeholder="Summary" value={item.summary} onChange={(e) => handleChange(i, "summary", e.target.value)} />
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          onChange([
            ...awards,
            {
              title: "",
              date: "",
              awarder: "",
              summary: "",
            },
          ])
        }
      >
        + Add Award
      </Button>
    </section>
  )
}
