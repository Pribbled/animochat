import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
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
        // Callback to restrict to @dlsu.edu.ph domains only.
        async signIn({ profile }) {
            if (profile?.email?.endsWith("@dlsu.edu.ph")) {
                return true;
            }
            return false;
        }
    }
});

export { handler as GET, handler as POST };
    