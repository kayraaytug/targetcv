import { useResumeStore } from "@/store/resumeStore"
import { Template } from "@/types"

type Props = {
  template: Template
  selected?: boolean
  onClick?: () => void
}

export default function ResumeTemplate({ onClick, selected, template }: Props) {
  return (
    <div
      onClick={onClick}
      className={`border rounded-md overflow-hidden cursor-pointer transition-shadow flex flex-col h-full ${
        selected ? 'border-blue-500 shadow-md' : 'border-gray-300'
      }`}
    >
      <div className="aspect-[3/4] w-full">
        <img
          src={`/templates/${template.replace("jsonresume-theme-", "")}.png`}
          alt={template}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="flex justify-center items-center py-2">
        <h4 className="text-lg font-medium text-center m-0">
          {template.replace("jsonresume-theme-", "").replace(/-/g, " ")}
        </h4>
      </div>
    </div>
  );
}

const templates: Template[] = [
  "jsonresume-theme-even",
  "jsonresume-theme-stackoverflow",
];

export function TemplateSection() {
  const { data, updateSection } = useResumeStore();

  const handleSelectTemplate = (template: Template) => {
    updateSection("template", template);
  };

  return (
    <section className="space-y-4 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((template) => (
        <ResumeTemplate
          key={template}
          template={template}
          selected={data.template === template}
          onClick={() => handleSelectTemplate(template)}
        />
      ))}
    </section>
  );
}
