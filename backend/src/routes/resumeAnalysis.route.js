import express from "express";
import upload from "../middlewares/upload.middleware.js";
import { authUser } from "../middlewares/auth.middleware.js";

import {
    uploadResume,
    generateAnalysis,
    getAllAnalysis,
    getSingleAnalysis,
    downloadReport,
    getResumeQuota
} from "../controllers/resumeAnalysis.controller.js";

const router = express.Router();

router.post("/upload", authUser, upload.single("resume"), uploadResume);

router.post("/generate/:id", authUser, generateAnalysis);

router.get("/quota", authUser, getResumeQuota);

router.get("/", authUser, getAllAnalysis);

router.get("/:id", authUser, getSingleAnalysis);

router.get("/:id/download", authUser, downloadReport);

export default router;