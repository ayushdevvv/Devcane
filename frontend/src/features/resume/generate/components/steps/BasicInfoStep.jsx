import FieldInput from "../FieldInput";
import { useResumeGenerate } from "../../services/generate.context";

const BasicInfoStep = () => {
  const { formData, updateBasicInfo, updateLinks } = useResumeGenerate();

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-4">
        <FieldInput
          label="Full Name"
          value={formData.name}
          onChange={(e) => updateBasicInfo({ name: e.target.value })}
          placeholder="Ayush Sharma"
        />
        <FieldInput
          label="Email"
          value={formData.email}
          onChange={(e) => updateBasicInfo({ email: e.target.value })}
          placeholder="you@email.com"
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <FieldInput
          label="Phone"
          optional
          value={formData.phone}
          onChange={(e) => updateBasicInfo({ phone: e.target.value })}
          placeholder="+91 90000 00000"
        />
        <FieldInput
          label="Location"
          optional
          value={formData.location}
          onChange={(e) => updateBasicInfo({ location: e.target.value })}
          placeholder="Delhi, India"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <FieldInput
          label="LinkedIn"
          optional
          value={formData.links.linkedin}
          onChange={(e) => updateLinks({ linkedin: e.target.value })}
          placeholder="linkedin.com/in/..."
        />
        <FieldInput
          label="GitHub"
          optional
          value={formData.links.github}
          onChange={(e) => updateLinks({ github: e.target.value })}
          placeholder="github.com/..."
        />
        <FieldInput
          label="Portfolio"
          optional
          value={formData.links.portfolio}
          onChange={(e) => updateLinks({ portfolio: e.target.value })}
          placeholder="yourname.dev"
        />
      </div>

      <FieldInput
        label="Summary"
        optional
        textarea
        rows={3}
        value={formData.summary}
        onChange={(e) => updateBasicInfo({ summary: e.target.value })}
        placeholder="2-3 lines about who you are and what you're looking for..."
      />
    </>
  );
};

export default BasicInfoStep;