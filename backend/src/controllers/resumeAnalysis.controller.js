import fs from "fs";

import ResumeAnalysis from "../models/resumeAnalysis.model.js";

import cloudinary from "../services/storage/cloudinary.service.js";

import { extractResumeText } from "../services/resumeAnalysis/parser.service.js";

import { analyzeResume } from "../services/resumeAnalysis/analysis.service.js";

import { generateReportPdf } from "../services/resumeAnalysis/reportPdf.service.js";

import {
   
    checkAndConsumeResumeQuota,
    getResumeQuotaStatus
} from "../utils/usage/quota.util.js";


export const uploadResume = async (req, res) => {

    try {

        if (!req.file)
            return res.status(400).json({ success: false, message: "Resume file is required." });

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

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

    finally {

        if (req.file?.path && fs.existsSync(req.file.path))
            fs.unlinkSync(req.file.path);

    }

};

export const generateAnalysis = async (req, res) => {
    try {
        const resume = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id,
        });

        if (!resume)
            return res.status(404).json({
                success: false,
                message: "Resume not found.",
            });

        if (resume.status === "completed")
            return res.status(400).json({
                success: false,
                message: "Analysis already exists.",
            });

        if (resume.status === "analyzing")
            return res.status(400).json({
                success: false,
                message: "Analysis is already running.",
            });

        const quota = getResumeQuotaStatus(req.user);

        if (quota.remaining <= 0) {
            return res.status(429).json({
                success: false,
                message: "Today's resume analysis quota is finished. Please come back tomorrow!",
                quota,
            });
        }

        resume.status = "analyzing";
        await resume.save();

        const jobDescription = req.body?.jobDescription?.trim() || "";

        if (!resume.extractedText?.trim()) {
            resume.status = "failed";
            await resume.save();

            return res.status(400).json({
                success: false,
                message: "Unable to extract text from the uploaded resume.",
            });
        }

        const result = await analyzeResume(
            resume.extractedText,
            jobDescription,
            resume.prompt
        );

        Object.assign(resume, {
            ...result,
            status: "completed",
        });

        await resume.save();

        const updatedQuota = await checkAndConsumeResumeQuota(req.user);

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
                resetAt: updatedQuota.resetAt,
            },
        });
    } catch (err) {
        console.log(err);

        await ResumeAnalysis.findByIdAndUpdate(req.params.id, {
            status: "failed",
        });

        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};

export const getAllAnalysis = async (req, res) => {

    try {

        const analysis = await ResumeAnalysis
            .find({ user: req.user._id })
            .select("-extractedText")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: analysis.length,
            analysis
        });

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getSingleAnalysis = async (req, res) => {

    try {

        const analysis = await ResumeAnalysis.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!analysis)
            return res.status(404).json({ success: false, message: "Analysis not found." });

        const response = analysis.toObject();

        delete response.extractedText;

        return res.status(200).json({
            success: true,
            analysis: response
        });

    }

    catch (err) {

        console.log(err);

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

        if (!analysis)
            return res.status(404).json({ success: false, message: "Analysis not found." });

        return generateReportPdf(analysis, res);

    }

    catch (err) {

        console.log(err);

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

export const getResumeQuota = async (req, res) => {
    try {
        const quota = getResumeQuotaStatus(req.user);

        return res.status(200).json({
            success: true,
            quota,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};