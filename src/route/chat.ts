import { Router } from "express";
import { chat } from "../lib/openai";

const route = Router();

route.post('/', async (req, res) => {
  const { prompt, uid, template } = req.body;

  const response = await chat(prompt, uid, template);

  res.json({ response });
})

export default route
