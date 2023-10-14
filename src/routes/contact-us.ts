import express from "express";
import { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import { sentMail } from "./contact-us.service";

const contactRouter = express.Router();

contactRouter.post(
  "/contact",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("email").notEmpty().isEmail().withMessage("Invalid email address"),
    check("phone").isMobilePhone("ar-EG").withMessage("Invalid phone number"),
  ],
  async (req: Request, res: Response) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { name, email, phone } = req.body;

      await sentMail(name, email, phone);

      res.status(200).json({ message: "Email sent successfully" });
    } catch (error) {
      res.status(500).send("Internal Server Error");
    }
  }
);

export default contactRouter;
