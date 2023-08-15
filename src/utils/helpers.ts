import otp from 'otp-generator';
import fs from 'fs';
import { type CookieOptions, type Response } from 'express';
import cloudinary from './cloudinary';
import { signJwt } from './jwt';
import {
  ACCESS_TOKEN_EXPIRESIN,
  ACCESS_TOKEN_PRIVATE_KEY,
  NODE_ENV,
  PAYSTACK_INITIALIZE_URL,
  PAYSTACK_SECRET_KEY,
  REFRESH_TOKEN_EXPIRESIN,
  REFRESH_TOKEN_PRIVATE_KEY
} from '../config';
import { type IPaymentResponse, type IPaymentData } from '../api/payment/payment.interface';
import { AppError } from './appError';
import axios from 'axios';

interface IOptions {
  digits?: boolean;
  lowerCaseAlphabets?: boolean;
  upperCaseAlphabets?: boolean;
  specialChars?: boolean;
}

export const accessTokenCookieOptions: CookieOptions = {
  maxAge: 900000, // 15mins
  httpOnly: true,
  secure: NODE_ENV === 'production'
};

const refreshTokenCookieOptions: CookieOptions = {
  maxAge: 3.154e10, // 1 year
  httpOnly: true,
  secure: NODE_ENV === 'production'
};

export const createToken = (res: Response, userId: string) => {
  const accessToken = signJwt({ userId }, ACCESS_TOKEN_PRIVATE_KEY as string, {
    expiresIn: ACCESS_TOKEN_EXPIRESIN
  });

  const refreshToken = signJwt({ userId }, REFRESH_TOKEN_PRIVATE_KEY as string, {
    expiresIn: REFRESH_TOKEN_EXPIRESIN
  });

  res.cookie('accessToken', accessToken, accessTokenCookieOptions);
  res.cookie('refreshToken', refreshToken, refreshTokenCookieOptions);
  res.cookie('loggedIn', true, accessTokenCookieOptions);
};

export function otpGenerator(length?: number, options?: IOptions) {
  return otp.generate(length, options);
}

export const createOtp = (): string => {
  const newOtp: string = otpGenerator(4, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });
  return newOtp;
};

export const makePayment = async (data: IPaymentData) => {
  try {
    const url = PAYSTACK_INITIALIZE_URL as string;

    const response = await axios.post<IPaymentResponse>(url, data, {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET_KEY as string}`,
        'Content-Type': 'application/json'
      }
    });
    return { authorizationUrl: response.data.data.authorization_url, reference: response.data.data.reference };
  } catch (error: any) {
    throw new AppError(400, error.response.data.error);
  }
};

export async function uploadToCloudinary(path: string, folderName: string) {
  const images = await cloudinary.uploader.upload(path, { folder: folderName });
  fs.unlinkSync(path);

  return { url: images.secure_url, publicId: images.public_id };
}

export function minutesToDate(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60 * 1000);
}

export function verifyEmailTemplate(name: string, otp: string) {
  return `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
            <div style="margin:10px auto;width:90%;padding:5px 0">
                <div style="border-bottom:1px solid #eee">
                    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
                </div>
                <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
                <p>Thank you for choosing Simpliby. Use the OTP to complete your registration. OTP is valid for 20 minutes.</p>
                <h2 style="background: #00466a;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
            </div>
        </div>
    `;
}

export function emailVerifiedTemplate(name: string) {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your email has been verified successfully. Proceed to login.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}

export function emailVerifiedPasswordTemplate(name: string) {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your email has been verified successfully. Proceed to change your password.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}

export function storeVerifiedTemplate(name: string) {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Thank you for choosing us, ${name}</p>
        <p>Your store has been verified successfully.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}

export function requestPasswordTemplate(name: string, otp: string) {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Thank you for choosing Simpliby. Enter the OTP to reset your password. OTP is valid for 20 minutes.</p>
        <h2 style="background: #00466a;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}

export function passwordResetCompleteTemplate(name: string) {
  return `
    <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
      <div style="margin:10px auto;width:90%;padding:5px 0">
        <div style="border-bottom:1px solid #eee">
          <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">Simpliby</a>
        </div>
        <p style="font-size:1.1em; font-weight: bold;">Hi, ${name}</p>
        <p>Your password has been reset successfully. Proceed to login with your new password.</p>
        <p>Thank you for choosing Simpliby.</p>
        <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
      </div>
    </div>
  `;
}
