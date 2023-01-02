import nodemailer from 'nodemailer';
import config from '../config';

interface Data {
  name: string,
  email: string,
  token: string | null,
  host: string,
}

async function sendEmailSignUp({name, email, token, host}:Data):Promise<void> {
  const transport = nodemailer.createTransport({
    host: `smtp.${host}.com`,
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
    subject: 'Confirm your account in Admin Streaming Account (ASA)',
    html: `<p>Dear ${name}, confirm your account to start managing your profiles.</p>
    <p>Confirm in the following link: <a href="${process.env.FRONTEND_URL}/auth/confirm/${token}">Confirm</a></p>

    <p>If you didn't create this account, ignore this message.</p>
    `,
  });

  console.log("Message sent: %s", info.messageId);
}

export default sendEmailSignUp