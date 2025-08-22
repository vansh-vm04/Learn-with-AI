import express from "express";
import router from "./route";
import { configDotenv } from "dotenv";
import cors from "cors"

const app = express();
const port = 5000;

app.use(cors());

configDotenv();

app.use(express.json());

app.use('/api/v1',router);

app.listen(port,()=>{
    console.log("Server listening on "+port)
})