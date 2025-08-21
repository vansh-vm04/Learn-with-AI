import express from "express";
import Groq from "groq-sdk";
import { SYSTEM_PROMPT } from "./modules/roadmapPrompt";
import { configDotenv } from "dotenv";
configDotenv();

const router = express.Router();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

router.post("/roadmap", async (req, res) => {
  const { query } = req.body;
  let content;
  try {
    const response = await groq.chat.completions.create({
      messages: [
        {
            role:"system",
            content:SYSTEM_PROMPT
        },
        {
          role: "user",
          content: `i want to learn ${query}`,
        },
      ],
      model: "llama-3.3-70b-versatile",
    });
    
    if(response){
        content = await JSON.parse(response.choices[0]?.message.content!);
    }

    res.status(200).json({message:"Success",content});

  } catch (error) {
    console.log(error);
    res.status(500).json({message:"Internal server error"});
  }
});

export default router;
