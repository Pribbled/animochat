/**
 * NextAuth configuration for Animatch.
 *
 * PURPOSE:
 * - Provides authentication using Google accounts.
 * - Restricts access to DLSU users only (@dlsu.edu.ph).
 *
 * NOTES:
 * - `hd: "dlsu.edu.ph"` in `authorization.params` only *suggests* the domain to Google,
 *   but it is not enforced. That’s why we also check in the `signIn` callback.
 * - This file exports GET/POST handlers for Next.js App Router
 *   at `/api/auth/[...nextauth]`.
 *
 * Required Environment Variables (if you ever want to set it up locally) 
 * - (.env.local):
 * - GOOGLE_CLIENT_ID: OAuth Client ID from Google Cloud Console
 * - GOOGLE_CLIENT_SECRET: OAuth Client Secret from Google Cloud Console
 * - NEXTAUTH_URL: http://localhost:3000
 * - NEXTAUTH_SECRET: Randomly generated string for securing cookies/JWTs
 *   example: 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
 */

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,         // OAuth Client ID
            clientSecret: process.env.GOOGLE_CLIENT_SECRET, // OAuth Client Secret
            authorization: {
                params: {
                    prompt: "select_account", 
                    hd: "dlsu.edu.ph"         
                }
            }
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        // signIn callback that runs on every login attempt; restricts to @dlsu.edu.ph domains only.
        async signIn({ profile }) {
            if (profile?.email?.endsWith("@dlsu.edu.ph")) {
                return true;
            }
            return false;
        }
    }
});

export { handler as GET, handler as POST };
    