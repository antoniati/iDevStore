"use server";

import { db } from "@/libs/db";

export const getVerificationTokenByToken = async (token: string) => {
      try {
            const verificationToken = await db.verificationToken.findUnique({ where: { token } });
            return verificationToken;

      } catch {
            return null;
      };
};

export const getVerificationTokenByEmail = async (email: string) => {
      try {
            const verificationToken = await db.verificationToken.findFirst({ where: { email } });
            return verificationToken;

      } catch {
            return null;
      };
};

export const getPasswordResetTokenByToken = async (token: string) => {
      try {
            const passwordResetToken = await db.passwordResetToken.findUnique({ where: { token } });
            return passwordResetToken;

      } catch {
            return null;
      };
};

export const getPasswordResetTokenByEmail = async (email: string) => {
      try {
            const passwordResetToken = await db.passwordResetToken.findFirst({ where: { email } });
            return passwordResetToken;

      } catch {
            return null;
      };
};

export const getTwoFactorTokenByToken = async (token: string) => {
      try {
            const twoFactorToken = await db.twoFactorToken.findUnique({ where: { token } });
            return twoFactorToken;

      } catch {
            return null;
      };
};

export const getTwoFactorTokenByEmail = async (email: string) => {
      try {
            const twoFactorToken = await db.twoFactorToken.findFirst({ where: { email } });
            return twoFactorToken;

      } catch {
            return null;
      };
};
