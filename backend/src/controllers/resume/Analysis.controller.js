import fs from "fs";

import ResumeAnalysis from "../../models/resume/Analysis.model.js";
import cloudinary from "../../services/storage/cloudinary.service.js";
import { extractResumeText } from "../../services/resume/shared/parser.service.js";
import { analyzeResume } from "../../services/resume/analysis/analysis.service.js";
import { generateReportPdf } from "../../services/resume/analysis/reportPdf.service.js";
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
                message: "Resume file is required."
            });
        }

        const fileType = req.file.mimetype.includes("pdf") ? "pdf" : "image";

        const extractedText = await extractResumeText(req.file.path, fileType);

        const uploaded = await cloudinary.uploader.upload(req.file.path, {
            folder: "devcane/resume-analysis",
            resource_type: "raw"
        });

        const resume = await ResumeAnalysis.create({
            user: req.user._id,
            filename: req.file.originalname,
            fileType,
            originalResume: {
                url: uploaded.secure_url,
                publicId: uploaded.public_id
            },
            extractedText,
            prompt: req.body.prompt?.trim() || "",
            status: "parsed"
        });

        return res.status(201).json({
            success: true,
            message: "Resume uploaded successfully.",
            resume: {
                _id: resume._id,
                filename: resume.filename,
                fileType: resume.fileType,
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

export const generateAnalysis = async (req, res) => {
    try {
        console.log("🔵 ANALYSIS START:", req.params.id);

        const resume = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        console.log("🟢 RESUME FOUND:", !!resume);

        if (!resume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found."
            });
        }

        if (resume.status === "completed") {
            return res.status(400).json({
                success: false,
                message: "Analysis already exists."
            });
        }

        if (resume.status === "analyzing") {
            return res.status(400).json({
                success: false,
                message: "Analysis is already running."
            });
        }

        const quota = getResumeQuotaStatus(req.user);

        console.log("🟢 QUOTA:", quota);

        if (quota.remaining <= 0) {
            return res.status(429).json({
                success: false,
                message: "Today's resume analysis quota has been exhausted.",
                quota
            });
        }

        console.log(
            "🟢 EXTRACTED TEXT LENGTH:",
            resume.extractedText?.length
        );

        if (!resume.extractedText?.trim()) {
            resume.status = "failed";
            await resume.save();

            return res.status(400).json({
                success: false,
                message: "Unable to extract text from the uploaded resume."
            });
        }

        resume.status = "analyzing";
        await resume.save();

        console.log("🟡 CALLING AI...");

        const jobDescription =
            req.body?.jobDescription?.trim() || "";

        const result = await analyzeResume(
            resume.extractedText,
            jobDescription,
            resume.prompt
        );

        console.log("🟢 AI ANALYSIS SUCCESS");

        Object.assign(resume, result);
        resume.status = "completed";

        let pdfPath = "";

        try {
            console.log("🟡 GENERATING REPORT PDF...");

            pdfPath = await generateReportPdf(
                resume.toObject(),
                `analysis-${resume._id}`
            );

            console.log("🟢 PDF GENERATED:", pdfPath);

            console.log("🟡 UPLOADING PDF TO CLOUDINARY...");

            const uploaded = await uploadPdfToCloudinary(
                pdfPath,
                "devcane/resume-analysis"
            );

            console.log("🟢 CLOUDINARY UPLOAD SUCCESS:", uploaded);

            resume.generatedReport = {
                url: uploaded.url,
                publicId: uploaded.publicId
            };

        } finally {
            cleanupFile(pdfPath);
        }

        console.log("🟡 SAVING ANALYSIS...");

        await resume.save();

        console.log("🟢 ANALYSIS SAVED");

        const updatedQuota =
            await checkAndConsumeResumeQuota(req.user);

        console.log("🟢 QUOTA UPDATED:", updatedQuota);

        const response = resume.toObject();
        delete response.extractedText;

        return res.status(200).json({
            success: true,
            message: "Resume analyzed successfully.",
            analysis: response,
            quota: {
                used: updatedQuota.limit - updatedQuota.remaining,
                remaining: updatedQuota.remaining,
                limit: updatedQuota.limit,
                resetAt: updatedQuota.resetAt
            }
        });

    } catch (err) {
        console.error("❌❌ RESUME ANALYSIS FAILED ❌❌");
        console.error("MESSAGE:", err.message);
        console.error("STACK:", err.stack);

        try {
            await ResumeAnalysis.findByIdAndUpdate(
                req.params.id,
                { status: "failed" }
            );
        } catch (dbErr) {
            console.error("STATUS UPDATE FAILED:", dbErr.message);
        }

        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const downloadReport = async (req, res) => {
    try {
        const analysis = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!analysis || !analysis.generatedReport?.url) {
            return res.status(404).json({
                success: false,
                message: "Report not found or not generated yet."
            });
        }

     
        const response = await fetch(analysis.generatedReport.url);
        
        if (!response.ok) throw new Error("Failed to fetch PDF from storage.");

        res.setHeader("Content-Type", "application/pdf");
        res.setHeader(
            "Content-Disposition", 
            `inline; filename="analysis-${analysis._id}.pdf"`
        );

        const arrayBuffer = await response.arrayBuffer();
        return res.send(Buffer.from(arrayBuffer));

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
};

export const getAllAnalysis = async (req,res)=>{

try {

    const analysisList = await ResumeAnalysis.find({user:req.user._id}).select("-extractedText")

    if(!analysisList || analysisList.length === 0){

        return res.status(404).json({ message:"No analysis found for this user."})
    }

    return res.status(200).json({
        success: true,
        message: "Analysis found.",
        analysis: analysisList
    });
    
} catch (error) {
    console.error(error);
    return res.status(500).json({
        success: false,
        message: "An error occurred while fetching analysis."
    });
}

}

export const getSingleAnalysis = async (req,res)=>{

    try {

        const analysis = await ResumeAnalysis.findOne({_id:req.params.id,user:req.user._id}).select("-extractedText")

        if(!analysis){
            return res.status(404).json({ message:"Analysis not found for this user."})
        }

        return res.status(200).json({
            success: true,
            message: "Analysis found.",
            analysis: analysis
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "An error occurred while fetching the analysis."
        });
    }
}

export const getAnalysisQuota = async (req, res) => {
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
