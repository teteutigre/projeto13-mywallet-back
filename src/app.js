import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routers/authRouter.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

const PORT = process.env.PORT;
app.listen(PORT || 5000, () => console.log(`Listening on port ${PORT}`));
