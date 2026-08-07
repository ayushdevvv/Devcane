import FieldInput from "../FieldInput";
import { RepeatableItem, AddButton } from "../RepeatableCard";
import { useResumeGenerate } from "../../services/generate.context";

const ProjectsStep = () => {
  const { formData, projects } = useResumeGenerate();

  return (
    <div className="space-y-4">
      {formData.projects.map((p) => (
        <RepeatableItem
          key={p.id}
          onRemove={() => projects.remove(p.id)}
          canRemove={formData.projects.length > 1}
        >
          <FieldInput
            label="Project Title"
            value={p.title}
            onChange={(e) => projects.update(p.id, { title: e.target.value })}
            placeholder="Devcane"
          />
          <FieldInput
            label="Tech Stack"
            optional
            value={p.techStack}
            onChange={(e) => projects.update(p.id, { techStack: e.target.value })}
            placeholder="React, Node.js, MongoDB (comma separated)"
          />
          <div className="grid sm:grid-cols-2 gap-4">
            <FieldInput
              label="GitHub"
              optional
              value={p.github}
              onChange={(e) => projects.update(p.id, { github: e.target.value })}
              placeholder="github.com/..."
            />
            <FieldInput
              label="Live URL"
              optional
              value={p.live}
              onChange={(e) => projects.update(p.id, { live: e.target.value })}
              placeholder="project.vercel.app"
            />
          </div>
          <FieldInput
            label="Description"
            optional
            textarea
            rows={3}
            value={p.description.join("\n")}
            onChange={(e) => projects.update(p.id, { description: e.target.value.split("\n") })}
            placeholder={"One bullet point per line..."}
          />
        </RepeatableItem>
      ))}
      <AddButton onClick={projects.add} label="Add Project" />
    </div>
  );
};

export default ProjectsStep;