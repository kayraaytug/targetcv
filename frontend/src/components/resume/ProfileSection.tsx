import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { useResumeStore } from "@/store/resumeStore"

export function ProfileSection() {
  const { data, updateBasics } = useResumeStore();
  const { basics } = data;

  const handleChange = (field: keyof typeof basics, value: string) => {
    updateBasics({ ...basics, [field]: value });
  };

  const handleLocationChange = (field: keyof typeof basics.location, value: string) => {
    updateBasics({
      ...basics,
      location: { ...basics.location, [field]: value },
    });
  };

  const handleProfileChange = (index: number, field: keyof typeof basics.profiles[0], value: string) => {
    const newProfiles = [...basics.profiles];
    newProfiles[index] = { ...newProfiles[index], [field]: value };
    updateBasics({ ...basics, profiles: newProfiles });
  };

  return (
    <section className="space-y-4 p-8">
      <h3 className="text-xl font-medium mt-4">Profile</h3>
      <div className="p-4 space-y-2">

        <Input
          type="text"
          placeholder="Full Name"
          value={basics.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Label (e.g. Programmer)"
          value={basics.label}
          onChange={(e) => handleChange("label", e.target.value)}
        />
        <Input
          type="email"
          placeholder="Email"
          value={basics.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Phone"
          value={basics.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Website URL"
          value={basics.url}
          onChange={(e) => handleChange("url", e.target.value)}
        />
        <Textarea
          placeholder="Summary"
          value={basics.summary}
          onChange={(e) => handleChange("summary", e.target.value)}
        />
      </div>

      <h3 className="text-xl font-medium mt-4">Location</h3>
      <div className="p-4 space-y-2">
        <Input
          type="text"
          placeholder="Address"
          value={basics.location.address}
          onChange={(e) => handleLocationChange("address", e.target.value)}
        />
        <Input
          type="text"
          placeholder="City"
          value={basics.location.city}
          onChange={(e) => handleLocationChange("city", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Region"
          value={basics.location.region}
          onChange={(e) => handleLocationChange("region", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Postal Code"
          value={basics.location.postalCode}
          onChange={(e) => handleLocationChange("postalCode", e.target.value)}
        />
        <Input
          type="text"
          placeholder="Country Code"
          value={basics.location.countryCode}
          onChange={(e) => handleLocationChange("countryCode", e.target.value)}
        />
      </div>

      <h3 className="text-xl font-medium mt-4">Social Profiles</h3>
      <div className="p-4 rounded-md space-y-2">
        {basics.profiles.map((profile, idx) => (
          <div key={idx} className="relative border p-8 rounded-md space-y-4 ">
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6 p-0"
              onClick={() => {
                const newProfiles = [...basics.profiles]
                newProfiles.splice(idx, 1)
                updateBasics({ ...basics, profiles: newProfiles })
              }}
            >
              <X />
            </Button>
            <Input
              type="text"
              placeholder="LinkedIn, GitHub, etc."
              value={profile.network}
              onChange={(e) => handleProfileChange(idx, "network", e.target.value)}
            />
            <Input
              type="text"
              placeholder="Username"
              value={profile.username}
              onChange={(e) => handleProfileChange(idx, "username", e.target.value)}
            />
            <Input
              type="text"
              placeholder="URL"
              value={profile.url}
              onChange={(e) => handleProfileChange(idx, "url", e.target.value)}
            />

          </div>
        ))}
        <Button
          variant={"outline"}
          size={"sm"}
          onClick={() => {
            const newProfiles = [...basics.profiles, { network: "", username: "", url: "" }]
            updateBasics({ ...basics, profiles: newProfiles })
          }}
        >
          + Add
        </Button>
      </div>


    </section>
  )
}