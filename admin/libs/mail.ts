import { Resend } from "resend";

const resend = new Resend("re_QgNneRRt_CLVdoxYBJ4XdnasEartYBMWx");

const domain = process.env.NEXT_PUBLIC_APP_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
      const confirmLink = `${domain}/auth/new-verification?token=${token}`;

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Account Confirmation -iDevStore",
            html: `<p>Click confirm account to complete your account registration: <a href="${confirmLink}">CONFIRM ACCOUNT</a></p>`
      });
};

export const sendPasswordResetEmail = async (email: string, token: string,) => {
      const resetLink = `${domain}/auth/new-password?token=${token}`

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Password Reset - iDevStore",
            html: `<p>Click reset password to create a new password: <a href="${resetLink}">RESET PASSWORD</a></p>`
      });
};

export const sendTwoFactorTokenEmail = async (email: string, token: string) => {
      const twoFactorCode = token;

      await resend.emails.send({
            from: "onboarding@resend.dev",
            to: email,
            subject: "Authentication Code - iDevStore",
            html: `<p>Your 2FA code is: ${twoFactorCode}</p>`
      });
};