import React from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Reference } from "@/types"

type ReferencesSectionProps = {
  references: Reference[]
  onChange: (updated: Reference[]) => void
}

export const ReferencesSection: React.FC<ReferencesSectionProps> = ({ references, onChange }) => {
  const handleChange = (index: number, field: keyof Reference, value: string) => {
    const updated = [...references]
    updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">References</h3>
      {references.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.name || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...references]
                updated.splice(i, 1)
                onChange(updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Name" value={item.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <Textarea placeholder="Reference" value={item.reference} onChange={(e) => handleChange(i, "reference", e.target.value)} />
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          onChange([
            ...references,
            { name: "", reference: "" },
          ])
        }
      >
        + Add Reference
      </Button>
    </section>
  )
}
