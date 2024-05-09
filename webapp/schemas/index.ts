import * as z from "zod";

export const OrderSchema = z.object({
      line_items: z.object({}).optional(),
      firstName: z.string().min(1, { message: "First name is required." }),
      lastName: z.string().min(1, { message: "Last name is required." }),
      email: z.string().email({ message: "Please enter a valid email address." }),
      city: z.string().min(1, { message: "City is required." }),
      state: z.string().min(1, { message: "State is required." }),
      zip: z.string().min(1, { message: "ZIP code is required." }),
      street: z.string().min(1, { message: "Street address is required." }),
      phone: z.string().min(1, { message: "Phone number is required." }),
      cartProducts: z.array(z.string(), { message: "Cart must contain at least one product." }),
      paid: z.boolean().optional(),
});
