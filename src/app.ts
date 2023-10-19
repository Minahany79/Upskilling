import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import contactRouter from "./routes/contact-us";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT;

// Enable CORS for all origins
app.use(cors({ origin: '*' }));

app.use(bodyParser.json());

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: `PONG !! from UpSkilling Domain - ${new Date()}` });
});

app.use("/", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
