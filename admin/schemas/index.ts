import * as z from "zod";

export const UserRegisterSchema = z.object({
      firstName: z.string().min(1, { message: "name is required" }),
      lastName: z.string().min(1, { message: "last name is required" }),
      email: z.string().email({ message: "email field is required" }),
      phone: z.string().optional(),
      password: z.string().min(6, { message: "choose a minimum of 6 characters for password" }),
});

export const LoginSchema = z.object({
      email: z.string().email({ message: "email field is required" }),
      password: z.string().min(1, { message: "password is required" }),
});


export const NewPasswordSchema = z.object({
      password: z.string().min(6, { message: "choose a minimum of 6 characters for password" }),
});

export const ResetSchema = z.object({
      email: z.string().email({ message: "email field is required" }),
});