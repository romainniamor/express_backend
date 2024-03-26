import ElevenLabs from "elevenlabs-node";
import dotenv from "dotenv";

dotenv.config();

export const textToSpeech = (text) => {
  console.log(`text to speech processing for ${text}`);
  const voice = new ElevenLabs({
    apiKey: process.env.ELEVEN_LABS_API_KEY,
    voiceId: process.env.VOICE_ID,
  });

  return voice
    .textToSpeech({
      // Required Parameters
      fileName: ".vercel/output/static/audio/audio.mp3",
      textInput: `${text}`,
    })

    .then((res) => {
      console.log("res", res);
      if (res.status === "ok" && res.fileName) {
        const filePath = res.fileName;
        console.log("File generated:", filePath);
        return filePath;
      } else {
        throw new Error("Invalid response from textToSpeech");
      }
    })
    .catch((err) => {
      console.log("Error generating file:", err);
      throw err;
    });
};
