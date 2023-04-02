import { verifyEmailTemplate } from './helpers';
import { logger } from './logger';
import { sendMail } from './mailer';

export async function sendOtpVerificationMail(name: string, email: string, otp: string) {
  try {
    const message = verifyEmailTemplate(name, otp);

    return await sendMail(email, 'Email Verification', message);
  } catch (err: any) {
    logger.error(err.message);
  }
}
