"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_validator_1 = require("express-validator");
const contact_us_service_1 = require("./contact-us.service");
const contactRouter = express_1.default.Router();
contactRouter.post("/contact", [
    (0, express_validator_1.check)("name").notEmpty().withMessage("Name is required"),
    (0, express_validator_1.check)("email").notEmpty().isEmail().withMessage("Invalid email address"),
    (0, express_validator_1.check)("phone").isMobilePhone("ar-EG").withMessage("Invalid phone number"),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { name, email, phone } = req.body;
        yield (0, contact_us_service_1.sentMail)(name, email, phone);
        res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        res.status(500).send("Internal Server Error");
    }
}));
exports.default = contactRouter;
