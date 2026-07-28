

import { createAuthClient } from "better-auth/react";
import { inferAdditionalFields, jwtClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL,
  plugins: [
    inferAdditionalFields({
      user: {
        role: { type: "string" },
        isPremium: { type: "boolean" },
        isBlocked: { type: "boolean" },
      },
    }),

    jwtClient() 
  
  ],
});

export const { signIn, signUp, signOut, useSession } = authClient;