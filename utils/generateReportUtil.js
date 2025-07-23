import cohere from "../config/cohereConfig.js";
import generatePrompt from "./generatePrompt.js";
export default async function generateText(report) {
  const prompt = generatePrompt(report);
  if (!prompt) {
    return { error: "Prompt Required" };
  }
  try {
    //
    const system_message =
      "You are a medical assistant. Analyze My following medical report text and explain it in simple, easy-to-understand terms for a non-medical person. If any abnormalities are found, explain them and what they might mean. My report contains lots of uneccessory data ignore that data. Please give a short paragraph summary, explain any concerns, and advise what the patient should do next. at the end provide summery of whole report is it normal or not do not include any medical terms of blood reports while responding add htmls strong tag instead of **point** and remove those ** ** from the response ";
    const response = await cohere.chat({
      model: "command-a-03-2025",
      messages: [
        { role: "system", content: system_message },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    //
    const aiResponse = response.message.content[0].text;
    if (!aiResponse) {
      return { error: "Response Not Generated" };
    }
    return { response: aiResponse };
  } catch (err) {
    return { error: err.message };
  }
}
