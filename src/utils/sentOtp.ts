import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: process.env.EMAIL_USER , 
    pass: process.env.EMAIL_PASS  
  }
});

interface SendOtpOptions {
  to: string;  
  otp: number;  
}

export async function sendOtp({ to, otp }: SendOtpOptions): Promise<void> {
  try {
    const mailOptions: nodemailer.SendMailOptions = {
      from: process.env.EMAIL_USER,
      to, 
      subject: 'Your OTP Code For Email Verification', 
      text: `Your OTP code is ${otp}`,
      html: `<p>Your OTP code is <strong>${otp}</strong></p>`
    };
    await transporter.sendMail(mailOptions);
    console.log('OTP sent successfully');
  } catch (error) {
    console.error('Error sending OTP:', error);
  }
}



