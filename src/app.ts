import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import contactRouter from "./routes/contact-us";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

const app = express();
const port = process.env.PORT;

app.get("/ping", (req: Request, res: Response) => {
  res.status(200).json({ message: `PONG !! from UpSkilling - ${new Date()}` });
});

app.use(bodyParser.json());

// Use the email router for handling email requests
app.use("/", contactRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
