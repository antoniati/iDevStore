import * as z from "zod";

export const UserRegisterSchema = z.object({
      firstName: z.string().min(1, { message: "name is required" }),
      lastName: z.string().min(1, { message: "last name is required" }),
      email: z.string().email({ message: "email field is required" }),
      phone: z.string().optional(),
      password: z.string().min(6, { message: "choose a minimum of 6 characters for password" }),
});

export const UserEditSchema = z.object({
      firstName: z.string().min(1, { message: "name is required" }),
      lastName: z.string().min(1, { message: "last name is required" }),
      email: z.string().email({ message: "email field is required" }),
      phone: z.string().optional(),
});

export const LoginSchema = z.object({
      email: z.string().email({ message: "email field is required" }),
      password: z.string().min(1, { message: "password is required" }),
      code: z.string().optional(),
});


export const NewPasswordSchema = z.object({
      password: z.string().min(6, { message: "choose a minimum of 6 characters for password" }),
});

export const ResetSchema = z.object({
      email: z.string().email({ message: "email field is required" }),
});

export const CategorySchema = z.object({
      name: z.string().min(1, { message: "category name is required" }),
      parent: z.string().optional(),
});

export const PropertySchema = z.object({
      name: z.string().min(1, { message: "Property name is required" }),
      values: z.array(z.string()).min(1, { message: "Property values are required" }),
});

export const ProductSchema = z.object({
      name: z.string().min(1, { message: "Product name is required" }),
      categoryId: z.string().optional(),
      categoryName: z.string().optional(),
      price: z.string().min(1, { message: "Product price is required" }),
      images: z.array(z.string()).optional(),
      description: z.string().min(1, { message: "Product description is required" }),
      properties: z.array(PropertySchema).optional(),
});