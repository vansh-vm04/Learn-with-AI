import express from "express";
import router from "./route";
import { configDotenv } from "dotenv";
import cors from "cors"

const app = express();
const port = 5000;
configDotenv();

const frontend_origin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontend_origin,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS','PATCH']
  })
);

app.use(express.json());

app.use('/api/v1',router);

app.get('/api/health',async (req,res)=>{
  res.status(200).json({message:"Server is alive"})
})

app.listen(port,()=>{
    console.log("Server listening on "+port)
})