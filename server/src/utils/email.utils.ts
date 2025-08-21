import * as nodemailer from 'nodemailer';
import { getEmailTemplate } from './email.template';

export const sendEmail = async (
  to: string,
  subject: string,
  content: string,
) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const html = getEmailTemplate(subject, content);

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
};
