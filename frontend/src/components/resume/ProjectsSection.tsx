import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Project } from "@/types"
import { useResumeStore } from "@/store/resumeStore"

export function ProjectsSection() {
  const { data, updateSection } = useResumeStore()
  
  const handleChange = (index: number, field: keyof Project, value: string) => {
    const updated = [...data.projects]
    updated[index] = { ...updated[index], [field]: value }
    updateSection('projects', updated)
  }

  const handleHighlightChange = (index: number, hIndex: number, value: string) => {
    const updated = [...data.projects]
    updated[index].highlights[hIndex] = value
    updateSection('projects', updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Projects</h3>
      {data.projects.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.name || ">"}</h4>
            <Button
              className="h-6 w-6"
              variant="destructive"
              size="icon"
              onClick={() => {
                const updated = [...data.projects]
                updated.splice(i, 1)
                updateSection('projects', updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Project Name" value={item.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
          <Input placeholder="Start Date" value={item.startDate} onChange={(e) => handleChange(i, "startDate", e.target.value)} />
          <Input placeholder="End Date" value={item.endDate} onChange={(e) => handleChange(i, "endDate", e.target.value)} />
          <Input placeholder="URL" value={item.url} onChange={(e) => handleChange(i, "url", e.target.value)} />
          <Textarea placeholder="Description" value={item.description} onChange={(e) => handleChange(i, "description", e.target.value)} />
          <h4 className="font-medium mt-2">Highlights</h4>
          {item.highlights.map((h, j) => (
            <div key={j} className="flex items-center space-x-2">
              <Input
                placeholder={`Highlight ${j + 1}`}
                value={h}
                onChange={(e) => handleHighlightChange(i, j, e.target.value)}
              />
              <Button
                className="h-6 w-6"
                variant="destructive"
                size="icon"
                onClick={() => {
                  const updated = [...data.projects]
                  updated[i].highlights.splice(j, 1)
                  updateSection('projects', updated)
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
              const updated = [...data.projects]
              updated[i].highlights.push("")
              updateSection('projects', updated)
            }}
          >
            + Add Highlight
          </Button>
        </div>
      ))}
      <Button
        size="lg"
        onClick={() =>
          updateSection('projects', [
            ...data.projects,
            {
              name: "",
              startDate: "",
              endDate: "",
              description: "",
              highlights: [],
              url: "",
            },
          ])
        }
      >
        + Add Project
      </Button>
    </section>
  )
}
