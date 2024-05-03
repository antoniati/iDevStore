import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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