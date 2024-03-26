import express from "express";
import dotenv from "dotenv";
import routes from "./api/routes.js";
import cors from "cors";

dotenv.config();

const port = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API ON VERCEL");
});

app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
