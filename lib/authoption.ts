import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Normally you’d check DB here
        const user = {
          id: '1',
          email: credentials?.email,
          name: 'User Name',
        };
        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub || '';
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Always redirect to root after login
      return baseUrl;
    },
  },

  pages: {
    signIn: '/signin',
  },
};
