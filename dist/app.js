"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const contact_us_1 = __importDefault(require("./routes/contact-us"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get("/ping", (req, res) => {
    res.status(200).json({ message: `PONG !! from UpSkilling - ${new Date()}` });
});
app.use(body_parser_1.default.json());
// Use the email router for handling email requests
app.use("/", contact_us_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
