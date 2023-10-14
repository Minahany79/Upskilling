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
exports.EmailsService = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
class EmailsService {
    constructor() { }
    createConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this.transporter = nodemailer_1.default.createTransport({
                host: process.env.SMTP_HOST,
                port: process.env.SMTP_PORT,
                secure: false,
                auth: {
                    user: process.env.SMTP_USER_NAME,
                    pass: process.env.SMTP_PASSWORD,
                },
            });
        });
    }
    sendMail(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createConnection();
            return yield this.transporter.sendMail({
                from: `${process.env.SMTP_SENDER}`,
                to: options.to,
                cc: options.cc,
                bcc: options.bcc,
                subject: options.subject,
                text: options.text,
                html: options.html,
            });
        });
    }
    verifyConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.transporter.verify();
        });
    }
    getTransporter() {
        return this.transporter;
    }
}
exports.EmailsService = EmailsService;
