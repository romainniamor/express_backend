import dotenv from "dotenv";
import express from "express";
import { fakeData } from "../data/initMessage.js";
import { success } from "../helper/success.js";
import OpenAI from "openai";
import { prompt } from "../enums/prompt.js";
// import { textToSpeech } from "../helper/textToSpeech.js";
// import { audioFileToBase64 } from "../helper/audioFile.js";

dotenv.config();
const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.json("Backend");
});

router.get("/japan-class", (req, res) => {
  const message = "Fake data for Japan class";
  res.json(success(message, fakeData));
});

router.post("/japan-class/message", async (req, res) => {
  const userMessage = req.body.message;
  if (
    !userMessage ||
    typeof userMessage !== "string" ||
    userMessage.trim().length === 0
  ) {
    return res.status(400).json({ error: "error message" });
  }
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "system",
          content: prompt,
        },
        {
          role: "user",
          content: `How to say in Japanes ${userMessage}`,
        },
      ],
    });
    if (
      !completion.choices ||
      completion.choices.length === 0 ||
      !completion.choices[0].message ||
      !completion.choices[0].message.content
    ) {
      return res.status(500).json({ error: "Unable to translate message" });
    }
    let messages = JSON.parse(completion.choices[0].message.content);

    // const messageToSpeech = messages.japanese;

    // const audioFilePath = await textToSpeech(messageToSpeech);
    // const audio = await audioFileToBase64(audioFilePath);

    // res.send({ messages, audio });
    res.send({ messages });
  } catch (error) {
    res.status(500).json({ error: "OPENAI API ERROR" });
  }
});

export default router;
