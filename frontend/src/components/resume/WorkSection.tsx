import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { Work } from "@/types"
import { useResumeStore } from '@/store/resumeStore'

export function WorkSection() {
    const { data, updateSection } = useResumeStore()
    
    const handleChange = (index: number, field: keyof Work, value: string) => {
        const updated = [...data.work]
        updated[index] = { ...updated[index], [field]: value }
        updateSection('work', updated)
    }

    const handleHighlightChange = (index: number, hIndex: number, value: string) => {
        const updated = [...data.work]
        updated[index].highlights[hIndex] = value
        updateSection('work', updated)
    }

    return (
        <section className="space-y-4 p-8">
            <h3 className="text-xl font-medium mt-4">Work Experience</h3>
            {data.work.map((item, i) => (
                <div key={i} className="border p-4 rounded-md space-y-2">
                    <div className="flex justify-between items-center">
                        <h4 className="text-lg font-medium">{item.name || "Company"}</h4>
                        <Button
                            className="h-6 w-6"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                                const updated = [...data.work]
                                updated.splice(i, 1)
                                updateSection('work', updated)
                            }}
                        >
                            <X/>
                        </Button>
                    </div>
                    <Input placeholder="Company" value={item.name} onChange={(e) => handleChange(i, "name", e.target.value)} />
                    <Input placeholder="Position" value={item.position} onChange={(e) => handleChange(i, "position", e.target.value)} />
                    <Input placeholder="URL" value={item.url} onChange={(e) => handleChange(i, "url", e.target.value)} />
                    <Input placeholder="Start Date" value={item.startDate} onChange={(e) => handleChange(i, "startDate", e.target.value)} />
                    <Input placeholder="End Date" value={item.endDate} onChange={(e) => handleChange(i, "endDate", e.target.value)} />
                    <Textarea placeholder="Summary" value={item.summary} onChange={(e) => handleChange(i, "summary", e.target.value)} />
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
                                    const updated = [...data.work]
                                    updated[i].highlights.splice(j, 1)
                                    updateSection('work', updated)
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
                            const updated = [...data.work]
                            updated[i].highlights.push("")
                            updateSection('work', updated)
                        }}
                    >
                        + Add Highlight
                    </Button>
                </div>
            ))}
            <Button
                size="lg"
                onClick={() => updateSection('work', [
                    ...data.work,
                    { name: '', position: '', url: '', startDate: '', endDate: '', summary: '', highlights: [] }
                ])}
            >
                + Add Work
            </Button>
        </section>
    )
}
