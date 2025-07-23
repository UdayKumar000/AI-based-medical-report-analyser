import express from "express";
import upload from "../middleware/multer.middleware.js";
const router = express.Router();

import { generateReportController } from "../controller/generateReportController.js";
router.get("/", (req, res) => {
  return res.status(500).send({ success: true, message: "HEY HOW ARE YOU" });
});
router.post("/generate", upload.single("file"), generateReportController);
export default router;
