import nodemailer from 'nodemailer';
import { SERVICE, EMAIL_PASS, EMAIL_USER } from '../config';
import { logger } from './logger';

const transporter = nodemailer.createTransport({
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  },
  service: SERVICE
});

export async function sendMail(email: string, subject: string, message: string) {
  try {
    const mailOptions = {
      from: `Simpliby ${EMAIL_USER as string}`,
      to: email,
      subject,
      html: message
    };
    return await transporter.sendMail(mailOptions);
  } catch (err: any) {
    logger.error(err.message);
  }
}
