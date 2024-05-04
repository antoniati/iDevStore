import NextAuth from "next-auth"; // Import NextAuth for authentication middleware
import authConfig from "@/auth.config"; // Custom authentication configuration

import {
      DEFAULT_LOGIN_REDIRECT, // Default URL to redirect to after login
      apiAuthPrefix, // Prefix for API authentication routes
      authRoutes, // Routes related to authentication (e.g., login, sign-up)
      publicRoutes, // Publicly accessible routes
} from "@/routes"; // Route configuration

// Initialize NextAuth middleware with the custom authentication configuration
const { auth } = NextAuth(authConfig);

export default auth((req) => {
      // Middleware function for handling requests based on authentication and routing logic
      const { nextUrl } = req; // Get the URL of the incoming request
      const isLoggedIn = !!req.auth; // Determine if the user is authenticated

      // Determine the type of route based on the URL
      const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix); // Check if the route is an API auth route
      const isPublicRoute = publicRoutes.includes(nextUrl.pathname); // Check if the route is public
      const isAuthRoute = authRoutes.includes(nextUrl.pathname); // Check if the route is related to authentication

      // If the route is an API auth route, allow it without additional checks
      if (isApiAuthRoute) {
            return; // No action needed
      }

      // If the route is an authentication-related route
      if (isAuthRoute) {
            if (isLoggedIn) {
                  // If the user is already logged in, redirect to the default login redirect page
                  return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            }
            // If not logged in, continue to the auth route (e.g., login page)
            return;
      }

      // If the user is not logged in and the route is not public
      if (!isLoggedIn && !isPublicRoute) {
            // Redirect to the login page with the current URL as the callbackUrl (for post-login redirection)
            let callbackUrl = nextUrl.pathname;

            // Include query parameters in the callback URL
            if (nextUrl.search) {
                  callbackUrl += nextUrl.search;
            }

            const encodedCallbackUrl = encodeURIComponent(callbackUrl); // Encode the callback URL

            // Redirect to the login page with the encoded callback URL
            return Response.redirect(
                  new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, nextUrl)
            );
      }

      // If none of the conditions apply, allow the request to proceed
      return;
});

// Configuration to define the paths on which this middleware is invoked
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'], // Define the paths to match for middleware invocation
};
