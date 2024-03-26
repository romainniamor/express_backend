import express from "express";
import { fakeData } from "../data/initMessage.js";
import { success } from "../helper/success.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.json("Backend");
});

router.get("/japan-class", (req, res) => {
  const message = "Fake data for Japan class";
  res.json(success(message, fakeData));
});

export default router;
