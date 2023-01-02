import nodemailer from 'nodemailer';
import config from '../config';

interface Data {
  name: string,
  email: string,
  token: string | null,
}

async function sendEmailPassword({name, email, token}:Data):Promise<void> {
  const transport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: config.USER,
      pass: config.PASS,
    }
  });

  const info = await transport.sendMail({
    from: 'Admin Streaming account (ASA)',
    to: email,
    subject: 'Reset your password in Admin Streaming Account (ASA)',
    html: `<p>Dear ${name}, Reset your password and don't lose access to your profiles.</p>
    <p>Reset in the following link: <a href="${process.env.FRONTEND_URL}/auth/save-password/${token}">Reset</a></p>

    <p>If you didn't request this change, ignore this message.</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmailPassword