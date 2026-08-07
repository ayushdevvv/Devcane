import fs from "fs";
import ResumeGenerate from "../../models/resume/generate.model.js";
import cloudinary from "../../services/storage/cloudinary.service.js";
import { extractResumeText } from "../../services/resume/shared/parser.service.js";
import { generateResume } from "../../services/resume/generate/generate.service.js";
import { validateResume } from "../../services/resume/generate/validator.service.js";
import { generateResumePdf } from "../../services/resume/generate/resumePdf.service.js";
import {
    checkAndConsumeResumeQuota,
    getResumeQuotaStatus
} from "../../utils/usage/quota.util.js";

const cleanupFile = (filePath) => {
    if (filePath && fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
};

const uploadPdfToCloudinary = async (pdfPath, folder) => {
    const uploaded = await cloudinary.uploader.upload(pdfPath, {
        folder,
        resource_type: "auto", 
        flags: "attachment:false" 
    });

    return {
        url: uploaded.secure_url,
        publicId: uploaded.public_id
    };
};

export const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Resume is required."
            });
        }

        const fileType = req.file.mimetype.includes("pdf") ? "pdf" : "image";

        const extractedText = await extractResumeText(req.file.path, fileType);

        const resume = await ResumeGenerate.create({
            user: req.user._id,
            mode: "import",
            extractedText,
            status: "parsed"
        });

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume: {
                _id: resume._id,
                status: resume.status,
                createdAt: resume.createdAt
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    } finally {
        cleanupFile(req.file?.path);
    }
};

export const buildResume = async (req, res) => {
    try {
        const { mode } = req.body;

        if (mode === "import") {
            return await buildImportedResume(req, res);
        }

        if (mode === "scratch") {
            return await buildScratchResume(req, res);
        }

        return res.status(400).json({
            success: false,
            message: "Invalid mode."
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

const buildImportedResume = async (req, res) => {
    const { resumeId } = req.body;

    const resume = await ResumeGenerate.findOne({
        _id: resumeId,
        user: req.user._id
    });

    if (!resume) {
        return res.status(404).json({
            success: false,
            message: "Resume not found."
        });
    }

    if (resume.status === "completed") {
        return res.status(400).json({
            success: false,
            message: "Resume already generated."
        });
    }

    if (resume.status === "building") {
        return res.status(400).json({
            success: false,
            message: "Resume generation already running."
        });
    }

    // Check daily quota
    const quota = getResumeQuotaStatus(req.user);

    if (quota.remaining <= 0) {
        return res.status(429).json({
            success: false,
            message: "Today's resume generation quota has been exhausted.",
            quota
        });
    }

    if (!resume.extractedText?.trim()) {
        return res.status(400).json({
            success: false,
            message: "Unable to extract text from the uploaded resume."
        });
    }

    resume.status = "building";
    await resume.save();

    let pdfPath = "";

    try {
        const resumeData = await generateResume({
            mode: "import",
            data: resume.extractedText
        });

        Object.assign(resume, resumeData);

        await resume.save();

        pdfPath = await generateResumePdf(
            resume.toObject(),
            `resume-${resume._id}`
        );

        const uploaded = await uploadPdfToCloudinary(
            pdfPath,
            "devcane/resume-generator"
        );

        resume.generatedResume = {
            url: uploaded.url,
            publicId: uploaded.publicId
        };

        resume.status = "completed";

        await resume.save();

        // Consume quota only after successful generation
        const updatedQuota = await checkAndConsumeResumeQuota(req.user);

        return res.status(200).json({
            success: true,
            message: "Resume generated successfully.",
            resume,
            quota: {
                used: updatedQuota.limit - updatedQuota.remaining,
                remaining: updatedQuota.remaining,
                limit: updatedQuota.limit,
                resetAt: updatedQuota.resetAt
            }
        });

    } catch (err) {
        resume.status = "failed";
        await resume.save();
        throw err;
    } finally {
        cleanupFile(pdfPath);
    }
};

const buildScratchResume = async (req, res) => {
    try {
        // Validate user input
        validateResume(req.body);

        // Check daily quota
        const quota = getResumeQuotaStatus(req.user);

        if (quota.remaining <= 0) {
            return res.status(429).json({
                success: false,
                message: "Today's resume generation quota has been exhausted.",
                quota
            });
        }

        const resumeData = await generateResume({
            mode: "scratch",
            data: req.body
        });

        const resume = await ResumeGenerate.create({
            user: req.user._id,
            mode: "scratch",
            ...resumeData,
            status: "building"
        });

        let pdfPath = "";

        try {
            pdfPath = await generateResumePdf(
                resume.toObject(),
                `resume-${resume._id}`
            );

            const uploaded = await uploadPdfToCloudinary(
                pdfPath,
                "devcane/resume-generator"
            );

            resume.generatedResume = {
                url: uploaded.url,
                publicId: uploaded.publicId
            };

            resume.status = "completed";

            await resume.save();

            // Consume quota only after successful generation
            const updatedQuota = await checkAndConsumeResumeQuota(req.user);

            return res.status(201).json({
                success: true,
                message: "Resume created successfully.",
                resume,
                quota: {
                    used: updatedQuota.limit - updatedQuota.remaining,
                    remaining: updatedQuota.remaining,
                    limit: updatedQuota.limit,
                    resetAt: updatedQuota.resetAt
                }
            });

        } catch (err) {
            resume.status = "failed";
            await resume.save();
            throw err;
        } finally {
            cleanupFile(pdfPath);
        }

    } catch (err) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getAllResumes = async (req, res) => {
    try {
        const resumes = await ResumeGenerate.find({ user: req.user._id })
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: resumes.length,
            resumes
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getSingleResume = async (req, res) => {
    try {
        const resume = await ResumeGenerate.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });
        }

        return res.status(200).json({
            success: true,
            resume
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const downloadResume = async (req, res) => {
    try {
        const resume = await ResumeGenerate.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });
        }

        if (!resume.generatedResume?.url) {
            return res.status(404).json({
                success: false,
                message: "Generated resume not found."
            });
        }

        const response = await fetch(resume.generatedResume.url);

        if (!response.ok) {
            throw new Error("Failed to fetch generated resume from storage.");
        }

        const arrayBuffer = await response.arrayBuffer();

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition",
            `attachment; filename="resume-${resume._id}.pdf"`
        );

        return res.send(Buffer.from(arrayBuffer));

    } catch (err) {
        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const deleteResume = async (req, res) => {
    try {
        const resume = await ResumeGenerate.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });
        }

        if (resume.generatedResume?.publicId) {
            await cloudinary.uploader.destroy(resume.generatedResume.publicId, {
                resource_type: "raw"
            });
        }

        await resume.deleteOne();

        return res.status(200).json({
            success: true,
            message: "Resume deleted successfully."
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getGenerateQuota = async (req, res) => {
  try {
    const quota =  getResumeQuotaStatus(req.user);

    return res.status(200).json({
      success: true,
      quota,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

