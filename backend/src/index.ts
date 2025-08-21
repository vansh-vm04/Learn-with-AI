import express from "express";
import router from "./route";
import { configDotenv } from "dotenv";

const app = express();
const port = 5000;

configDotenv();

app.use(express.json());

app.use('/api/v1',router);

app.listen(port,()=>{
    console.log("Server listening on "+port)
})