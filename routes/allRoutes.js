import express from "express";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

import { generateReportController } from "../controller/generateReportController.js";
router.post("/generate", upload.single("file"), generateReportController);
export default router;
