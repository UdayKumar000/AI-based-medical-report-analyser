import {
  extractTextFromImage,
  extractTextFromPDF,
} from "../utils/convertToText.js";
import generateReportUtil from "../utils/generateReportUtil.js";

export async function generateReportController(req, res) {
  try {
    // check file is recevied
    if (!req.file) {
      return res
        .status(400)
        .send({ success: false, message: "Please Attach File" });
    }

    // check is uploaded file is image or not
    const mimType = req.file?.mimetype;
    if (!mimType) {
      console.log("erro in mimtype");
      return res
        .status(500)
        .send({ success: false, message: "Internal Server Error" });
    }
    // if fiel is pdf file
    if (mimType.split("/")[1] === "pdf") {
      const { report, error } = await extractTextFromPDF(req.file.path);
      if (error) {
        console.log(error.message);
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      if (!report) {
        console.log("report not Generated");
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      const generatedResponse = await generateReportUtil(report);
      if (generatedResponse.error || !generatedResponse.response) {
        console.log(generatedResponse.error);
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      return res.status(200).send({
        success: true,
        message: "Response Generated",
        response: generatedResponse.response,
      });
    }
    // if file is image file
    else if (mimType.split("/")[0] === "image") {
      const { report, error } = await extractTextFromImage(req.file.path);
      if (error) {
        console.log(error.message);
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      if (!report) {
        console.log("report not generated");
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      const generatedResponse = await generateReportUtil(report);
      if (generatedResponse.error || !generatedResponse.response) {
        console.log(generatedResponse.error);
        return res
          .status(500)
          .send({ success: false, message: "Internal Server Error" });
      }
      return res.status(200).send({
        success: true,
        message: "Response Generated",
        response: generatedResponse.response,
      });
    } else {
      return res
        .status(400)
        .send({ success: false, message: "Please Upload a Valid File" });
    }
  } catch (error) {
    console.log("error", error.message);
    return res
      .status(500)
      .send({ success: false, message: "internal server error view console" });
  }
}

// export async function extractTextFromPDF(req, res) {
//   try {
//     // take pdf file from req
//     const filePath = req.file.path;
//     const dataBuffer = fs.readFileSync(filePath);

//     // Parse the pdf conver into TEXT and return
//     const pdfData = await pdfParse(dataBuffer);
//     if (!pdfData) {
//       return res.status(500).send({
//         success: false,
//         message: "Error in converting into pdf to text",
//       });
//     }
//     console.log(pdfData);
//     return res.status(200).send({ data: pdfData.text });
//   } catch (err) {
//     console.log("error", err.message);
//     return res
//       .status(500)
//       .send({ success: false, message: "internal server error view console" });
//   }
// }

// export async function extractTextFromImage(req, res) {
//   try {
//     if (!req.file) {
//       return res
//         .status(400)
//         .send({ success: false, message: "Please Attach File" });
//     }

//     // check is uploaded file is image or not
//     const mimType = req.file?.mimetype;
//     if (!mimType) {
//       return res
//         .status(500)
//         .send({ success: false, message: "Internal Server Error" });
//     }
//     if (mimType.split("/")[0] !== "image") {
//       return res
//         .status(400)
//         .send({ success: false, message: "Please Upload a Valid Image File" });
//     }
//     // take image file from req
//     const filePath = req.file.path;

//     // convert img to text and return
//     const {
//       data: { text },
//     } = await Tesseract.recognize(
//       filePath,
//       "eng", // language
//       { logger: (m) => console.log(m) } // optional progress logger
//     );
//     return res.send({ message: "success", text });
//   } catch (error) {
//     console.log(error.message);
//     return res
//       .status(500)
//       .send({ success: false, message: "Internal Server Error" });
//   }
// }
