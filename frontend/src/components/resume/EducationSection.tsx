import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Education } from "@/types"
import { useResumeStore } from "@/store/resumeStore"

export function EducationSection() {
  const { data, updateSection } = useResumeStore()
  
  const handleChange = (index: number, field: keyof Education, value: string) => {
    const updated = [...data.education]
    updated[index] = { ...updated[index], [field]: value }
    updateSection('education', updated)
  }

  const handleCourseChange = (index: number, cIndex: number, value: string) => {
    const updated = [...data.education]
    updated[index].courses[cIndex] = value
    updateSection('education', updated)
  }

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Education</h3>
      {data.education.map((item, i) => (
        <div key={i} className="border p-4 rounded-md space-y-2">
          <div className="flex justify-between items-center">
            <h4 className="text-lg font-medium">{item.institution || ">"}</h4>
            
            <Button
              className="h-6 w-6"
              variant="destructive"
              size={"icon"}
              onClick={() => {
                const updated = [...data.education]
                updated.splice(i, 1)
                updateSection('education', updated)
              }}
            >
              <X />
            </Button>
          </div>
          <Input placeholder="Institution" value={item.institution} onChange={(e) => handleChange(i, "institution", e.target.value)} />
          <Input placeholder="URL" value={item.url} onChange={(e) => handleChange(i, "url", e.target.value)} />
          <Input placeholder="Area of Study" value={item.area} onChange={(e) => handleChange(i, "area", e.target.value)} />
          <Input placeholder="Study Type (e.g. Bachelor)" value={item.studyType} onChange={(e) => handleChange(i, "studyType", e.target.value)} />
          <Input placeholder="Start Date" value={item.startDate} onChange={(e) => handleChange(i, "startDate", e.target.value)} />
          <Input placeholder="End Date" value={item.endDate} onChange={(e) => handleChange(i, "endDate", e.target.value)} />
          <Input placeholder="Score / GPA" value={item.score} onChange={(e) => handleChange(i, "score", e.target.value)} />
          <h4 className="font-medium mt-2">Courses</h4>
          {item.courses.map((course, j) => (
            <div key={j} className="flex items-center space-x-2">
              <Input
                placeholder={`Course ${j + 1}`}
                value={course}
                onChange={(e) => handleCourseChange(i, j, e.target.value)}
              />
              <Button
                className="h-6 w-6"
                variant="destructive"
                size={"icon"}
                onClick={() => {
                  const updated = [...data.education]
                  updated[i].courses.splice(j, 1)
                  updateSection('education', updated)
                }}
              >
                <X />
              </Button>
            </div>
          ))}
          <Button
            size={"sm"}
            variant="outline"
            onClick={() => {
              const updated = [...data.education]
              updated[i].courses.push("")
              updateSection('education', updated)
            }}
          >
            + Add Course
          </Button>
        </div>
      ))}
      <Button
        size={"lg"}
        onClick={() =>
          updateSection('education', [
            ...data.education,
            {
              institution: "",
              url: "",
              area: "",
              studyType: "",
              startDate: "",
              endDate: "",
              score: "",
              courses: [],
            },
          ])
        }
      >
        + Add Education
      </Button>
    </section>
  )
}
