import fs from "fs";
import pdfParse from "pdf-parse";
import Tesseract from "tesseract.js";

export async function extractTextFromPDF(pdfFile) {
  try {
    // take pdf file from req
    const filePath = pdfFile;
    const dataBuffer = fs.readFileSync(filePath);

    // Parse the pdf conver into TEXT and return
    const pdfData = await pdfParse(dataBuffer);
    if (!pdfData) {
      return res.status(500).send({
        success: false,
        message: "Error in converting into pdf to text",
      });
    }
    return { report: pdfData.text };
  } catch (err) {
    return { error: err.message };
  }
}

export async function extractTextFromImage(imageFile) {
  try {
    // take image file from req
    const filePath = imageFile;

    // convert img to text and return
    const {
      data: { text },
    } = await Tesseract.recognize(
      filePath,
      "eng" // language
      // optional progress logger
    );
    return { report: text };
  } catch (error) {
    return { error: error.message };
  }
}
