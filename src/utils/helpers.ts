import otp from 'otp-generator';

interface IOptions {
  digits?: boolean;
  lowerCaseAlphabets?: boolean;
  upperCaseAlphabets?: boolean;
  specialChars?: boolean;
}

export function otpGenerator(length?: number, options?: IOptions) {
  return otp.generate(length, options);
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
                <p>Thank you for choosing Simpliby. Use the OTP to complete your registration. OTP is valid for 5 minutes</p>
                <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
                <p style="font-size:0.9em;">Regards,<br />Simpliby</p>
            </div>
        </div>
    `;
}
