import mongoose from "mongoose";

const skillGapSchema = new mongoose.Schema(
  {
    skill: String,
    severity: {
      type: String,
      enum: ["low", "medium", "high"],
    },
  },
  { _id: false }
);

const resumeAnalysisSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    filename: {
      type: String,
      required: true,
    },

    fileType: {
      type: String,
      enum: ["pdf", "image"],
      required: true,
    },

    originalResume: {
      url: {
        type: String,
        required: true,
      },
      publicId: {
        type: String,
        required: true,
      },
    },

    extractedText: {
      type: String,
      default: "",
    },

    prompt: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: [
        "uploaded",
        "parsed",
        "analyzing",
        "completed",
        "failed",
      ],
      default: "uploaded",
    },

    matchScore: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      default: "",
    },

    strengths: {
      type: [String],
      default: [],
    },

    weaknesses: {
      type: [String],
      default: [],
    },

    keywordMatch: {
      type: [String],
      default: [],
    },

    missingKeywords: {
      type: [String],
      default: [],
    },

    atsTips: {
      type: [String],
      default: [],
    },

    skillGap: {
      type: [skillGapSchema],
      default: [],
    },

    learningRoadmap: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("ResumeAnalysis", resumeAnalysisSchema);