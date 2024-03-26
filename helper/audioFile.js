import { promises as fs } from "fs";

//convert audio file to base64 in order to send it to the frontend
export const audioFileToBase64 = async (file) => {
  const data = await fs.readFile(file);
  return data.toString("base64");
};
