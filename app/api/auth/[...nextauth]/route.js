import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "credentials",
            async authorize(req) {
                const res = await fetch(`${process.env.API_URL}/api/login`, {
                    method: 'POST',
                    body: JSON.stringify({
                        phone_number: req.phone_number,
                        password: req.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                if (res.ok && user) {

                    return user;
                }
                return null
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, token }) {
            session.token = token.access_token;
            if (session?.token ?? false) {
                const authUser = await fetch(`${process.env.API_URL}/api/user`, {
                    method: 'POST',
                    headers: {
                        "Authorization": `Bearer ${session.token}`
                    }
                })

                if (authUser.ok) {
                    const user = await authUser.json();
                    console.log(user);
                    session.user.id = user.id;
                    session.user.name = user.name;
                    session.user.phone_number = user.phone_number;
                    session.token = session.token;
                }
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token.access_token = user?.token
            }
            return token;
        }


    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };