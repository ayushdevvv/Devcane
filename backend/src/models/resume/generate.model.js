import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: String,
    degree: String,
    field: String,
    cgpa: String,
    startDate: String,
    endDate: String
}, { _id: false });

const experienceSchema = new mongoose.Schema({
    company: String,
    role: String,
    location: String,
    startDate: String,
    endDate: String,
    current: Boolean,
    description: [String]
}, { _id: false });

const projectSchema = new mongoose.Schema({
    title: String,
    techStack: [String],
    github: String,
    live: String,
    description: [String]
}, { _id: false });

const certificationSchema = new mongoose.Schema({
    title: String,
    issuer: String,
    issueDate: String
}, { _id: false });

const achievementSchema = new mongoose.Schema({
    title: String,
    description: String
}, { _id: false });

const generateSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    mode: {
        type: String,
        enum: ["import", "scratch"],
        required: true
    },

    extractedText: {
        type: String,
        default: ""
    },

    generatedResume: {
        url: String,
        publicId: String
    },

    name: String,
    email: String,
    phone: String,
    location: String,
    linkedin: String,
    github: String,
    portfolio: String,

    summary: String,

    education: [educationSchema],

    experience: [experienceSchema],

    projects: [projectSchema],

    skills: {
        languages: [String],
        frameworks: [String],
        databases: [String],
        tools: [String],
        others: [String]
    },

    certifications: [certificationSchema],

    achievements: [achievementSchema],
    status: {
        type: String,
        enum: [
            "parsed",
            "building",
            "completed",
            "failed"
        ],
        default: "parsed"
    }

}, { timestamps: true });

export default mongoose.model("ResumeGenerate", generateSchema);