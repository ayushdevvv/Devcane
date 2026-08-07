import express from "express";
import upload from "../../middlewares/upload.middleware.js";
import { authUser } from "../../middlewares/auth.middleware.js";

import {
    uploadResume,
    generateAnalysis,
    getAllAnalysis,
    getSingleAnalysis,
    downloadReport,
    getAnalysisQuota
  
} from "../../controllers/resume/Analysis.controller.js";

const AnalysisRouter = express.Router();

AnalysisRouter.post(
    "/upload",
    authUser,
    upload.single("resume"),
    uploadResume
);

AnalysisRouter.post(
    "/:id/analyze",
    authUser,
    generateAnalysis
);



AnalysisRouter.get("/quota", authUser, getAnalysisQuota);
AnalysisRouter.get("/", authUser, getAllAnalysis);

AnalysisRouter.get("/:id", authUser, getSingleAnalysis);

AnalysisRouter.get("/:id/download", authUser, downloadReport);

export default AnalysisRouter;