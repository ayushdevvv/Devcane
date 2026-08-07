import FieldInput from "../FieldInput";
import { RepeatableItem, AddButton } from "../RepeatableCard";
import { useResumeGenerate } from "../../services/generate.context";

const ExperienceStep = () => {
  const { formData, experience } = useResumeGenerate();

  return (
    <div className="space-y-4">
      {formData.experience.map((ex) => (
        <RepeatableItem
          key={ex.id}
          onRemove={() => experience.remove(ex.id)}
          canRemove={formData.experience.length > 1}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Company"
              value={ex.company}
              onChange={(e) => experience.update(ex.id, { company: e.target.value })}
              placeholder="Acme Corp"
            />
            <FieldInput
              label="Role"
              value={ex.role}
              onChange={(e) => experience.update(ex.id, { role: e.target.value })}
              placeholder="Frontend Developer"
            />
          </div>

          <FieldInput
            label="Location"
            optional
            value={ex.location}
            onChange={(e) => experience.update(ex.id, { location: e.target.value })}
            placeholder="Remote"
          />

          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Start"
              value={ex.startDate}
              onChange={(e) => experience.update(ex.id, { startDate: e.target.value })}
              placeholder="Jan 2024"
            />
            <FieldInput
              label="End"
              value={ex.current ? "Present" : ex.endDate}
              disabled={ex.current}
              onChange={(e) => experience.update(ex.id, { endDate: e.target.value })}
              placeholder="Jun 2024"
            />
          </div>

          <label className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400">
            <input
              type="checkbox"
              checked={ex.current}
              onChange={(e) => experience.update(ex.id, { current: e.target.checked })}
              className="accent-blue-500"
            />
            I currently work here
          </label>

          <FieldInput
            label="What did you do?"
            optional
            textarea
            rows={3}
            value={ex.description.join("\n")}
            onChange={(e) => experience.update(ex.id, { description: e.target.value.split("\n") })}
            placeholder={"One bullet point per line...\nShipped X that improved Y by Z%"}
          />
        </RepeatableItem>
      ))}
      <AddButton onClick={experience.add} label="Add Experience" />
    </div>
  );
};

export default ExperienceStep;