import FieldInput from "../FieldInput";
import { useResumeGenerate } from "../../services/generate.context";

const SkillsStep = () => {
  const { formData, updateSkills } = useResumeGenerate();

  return (
    <>
      <FieldInput
        label="Languages"
        optional
        value={formData.skills.languages}
        onChange={(e) => updateSkills({ languages: e.target.value })}
        placeholder="JavaScript, Python (comma separated)"
      />
      <FieldInput
        label="Frameworks"
        optional
        value={formData.skills.frameworks}
        onChange={(e) => updateSkills({ frameworks: e.target.value })}
        placeholder="React, Express"
      />
      <FieldInput
        label="Databases"
        optional
        value={formData.skills.databases}
        onChange={(e) => updateSkills({ databases: e.target.value })}
        placeholder="MongoDB, PostgreSQL"
      />
      <FieldInput
        label="Tools"
        optional
        value={formData.skills.tools}
        onChange={(e) => updateSkills({ tools: e.target.value })}
        placeholder="Git, Docker, Figma"
      />
      <FieldInput
        label="Others"
        optional
        value={formData.skills.others}
        onChange={(e) => updateSkills({ others: e.target.value })}
        placeholder="Agile, Public Speaking"
      />
    </>
  );
};

export default SkillsStep;