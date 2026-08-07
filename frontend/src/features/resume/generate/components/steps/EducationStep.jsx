import FieldInput from "../FieldInput";
import { RepeatableItem, AddButton } from "../RepeatableCard";
import { useResumeGenerate } from "../../services/generate.context";

const EducationStep = () => {
  const { formData, education } = useResumeGenerate();

  return (
    <div className="space-y-4">
      {formData.education.map((ed) => (
        <RepeatableItem
          key={ed.id}
          onRemove={() => education.remove(ed.id)}
          canRemove={formData.education.length > 1}
        >
          <FieldInput
            label="Institution"
            value={ed.institution}
            onChange={(e) => education.update(ed.id, { institution: e.target.value })}
            placeholder="XYZ University"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="Degree"
              value={ed.degree}
              onChange={(e) => education.update(ed.id, { degree: e.target.value })}
              placeholder="B.Tech"
            />
            <FieldInput
              label="Field"
              optional
              value={ed.field}
              onChange={(e) => education.update(ed.id, { field: e.target.value })}
              placeholder="Computer Science"
            />
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <FieldInput
              label="CGPA"
              optional
              value={ed.cgpa}
              onChange={(e) => education.update(ed.id, { cgpa: e.target.value })}
              placeholder="8.7"
            />
            <FieldInput
              label="Start"
              value={ed.startDate}
              onChange={(e) => education.update(ed.id, { startDate: e.target.value })}
              placeholder="2022"
            />
            <FieldInput
              label="End"
              value={ed.endDate}
              onChange={(e) => education.update(ed.id, { endDate: e.target.value })}
              placeholder="2026"
            />
          </div>
        </RepeatableItem>
      ))}
      <AddButton onClick={education.add} label="Add Education" />
    </div>
  );
};

export default EducationStep;