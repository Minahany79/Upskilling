import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env

export async function sentMail(
  name: string,
  email: string,
  phoneNumber: string
) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST, // e.g., 'smtp.example.com'
    port: parseInt(process.env.SMTP_PORT as string), // Use the appropriate SMTP port
    auth: {
      user: process.env.SMTP_USER_NAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_SENDER,
    to: process.env.SMTP_RECEIVER,
    subject: "Contact Form Submission",
    html: emailTemplate(name, email, phoneNumber),
  };
  await transporter.sendMail(mailOptions);
}


function emailTemplate(
  name: string,
  email: string,
  phoneNumber: string
): string {
  return `<!DOCTYPE html>
<html>
<head>
    <style>
        /* Inline CSS for better email client compatibility */
        body {
            font-family: Arial, sans-serif;
            background-color: #f3f3f3;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #333;
            font-size: 24px;
            margin: 0;
            padding: 0;
        }
        p {
            font-size: 16px;
            color: #555;
        }
        strong {
            color: #000;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Contact Form Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${phoneNumber}</p>
    </div>
</body>
</html>
`;
}
