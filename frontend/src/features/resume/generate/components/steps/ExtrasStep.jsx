import FieldInput from "../FieldInput";
import { RepeatableItem, AddButton } from "../RepeatableCard";
import { useResumeGenerate } from "../../services/generate.context";

const ExtrasStep = () => {
  const { formData, certifications, achievements } = useResumeGenerate();

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Certifications
        </p>
        <div className="space-y-4">
          {formData.certifications.map((c) => (
            <RepeatableItem key={c.id} onRemove={() => certifications.remove(c.id)}>
              <div className="grid sm:grid-cols-3 gap-4">
                <FieldInput
                  label="Title"
                  value={c.title}
                  onChange={(e) => certifications.update(c.id, { title: e.target.value })}
                  placeholder="AWS Certified Developer"
                />
                <FieldInput
                  label="Issuer"
                  value={c.issuer}
                  onChange={(e) => certifications.update(c.id, { issuer: e.target.value })}
                  placeholder="Amazon"
                />
                <FieldInput
                  label="Date"
                  optional
                  value={c.issueDate}
                  onChange={(e) => certifications.update(c.id, { issueDate: e.target.value })}
                  placeholder="2025"
                />
              </div>
            </RepeatableItem>
          ))}
          <AddButton onClick={certifications.add} label="Add Certification" />
        </div>
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
          Achievements
        </p>
        <div className="space-y-4">
          {formData.achievements.map((a) => (
            <RepeatableItem key={a.id} onRemove={() => achievements.remove(a.id)}>
              <FieldInput
                label="Title"
                value={a.title}
                onChange={(e) => achievements.update(a.id, { title: e.target.value })}
                placeholder="Won HackOcean 2026"
              />
              <FieldInput
                label="Description"
                optional
                value={a.description}
                onChange={(e) => achievements.update(a.id, { description: e.target.value })}
                placeholder="1st place among 40 teams"
              />
            </RepeatableItem>
          ))}
          <AddButton onClick={achievements.add} label="Add Achievement" />
        </div>
      </div>
    </div>
  );
};

export default ExtrasStep;