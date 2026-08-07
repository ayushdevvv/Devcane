import express from "express";

import { authUser } from "../../middlewares/auth.middleware.js";
import upload from "../../middlewares/upload.middleware.js";

import {
    uploadResume,
    buildResume,
    getAllResumes,
    getSingleResume,
    downloadResume,
    deleteResume,
    getGenerateQuota
} from "../../controllers/resume/generate.controller.js";

const generateRouter = express.Router();

generateRouter.post(
    "/upload",
    authUser,
    upload.single("resume"),
    uploadResume
);

generateRouter.post(
    "/build",
    authUser,
    buildResume
);

generateRouter.get("/quota", authUser, getGenerateQuota);

generateRouter.get("/", authUser, getAllResumes);

generateRouter.get("/:id", authUser, getSingleResume);

generateRouter.get("/:id/download", authUser, downloadResume);

generateRouter.delete("/:id", authUser, deleteResume);

export default generateRouter;