import bcrypt from "bcryptjs"; // Library for hashing and comparing passwords
import type { NextAuthConfig } from "next-auth"; // TypeScript type for NextAuth configuration
import Credentials from "next-auth/providers/credentials"; // NextAuth provider for custom credential-based authentication
import { LoginSchema } from "@/schemas"; // Schema for validating login credentials
import { getUserByEmail } from "@/actions/read/get-users"; // Function to fetch a user by email

// Define the NextAuth configuration with a custom credentials-based provider
export default {
      providers: [
            // Use the Credentials provider to implement custom logic for user authentication
            Credentials({
                  async authorize(credentials) {
                        // Validate the provided credentials using a predefined schema
                        const validatedFields = LoginSchema.safeParse(credentials);

                        // Check if the validation was successful
                        if (validatedFields.success) {
                              const { email, password } = validatedFields.data; // Extract the email and password

                              // Fetch the user from the database by email
                              const user = await getUserByEmail(email);

                              // If no user is found or the user doesn't have a password, return null (authentication failed)
                              if (!user || !user.password) {
                                    return null;
                              }

                              // Compare the provided password with the stored hashed password
                              const passwordsMatch = await bcrypt.compare(password, user.password);

                              // If the passwords match, return the user (authentication successful)
                              if (passwordsMatch) {
                                    return user; // Returning the user indicates successful authentication
                              }
                        }

                        // If validation fails or passwords don't match, return null (authentication failed)
                        return null;
                  },
            }),
      ],
} satisfies NextAuthConfig; // Type-check to ensure the configuration satisfies the NextAuthConfig interface
