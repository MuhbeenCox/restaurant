import NextAuth, { getServerSession } from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/app/models/User";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@libs/mongoConnect";
import UserInfo from "@app/models/UserInfo";
import ConnectDB from "@app/dbConnect/Connect";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      id: "credentials",
      credentials: {
        username: {
          label: "Email",
          type: "email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          await ConnectDB();
          const user = await User.findOne({ email });

          if (!user) {
            // User does not exist
            throw new Error("No user found with this email.");
          }

          const passwordOk = bcrypt.compareSync(password, user.password);

          if (!passwordOk) {
            // Password does not match
            throw new Error("Incorrect password.");
          }

          // Return user object if credentials are valid
          return user;
        } catch (error) {
          console.error("Error during authorization", error.message);
          throw new Error(error.message);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("Session callback", { session, token });
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      console.log("JWT callback", { token, user });
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};

export const isAdmin = async () => {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user.email;
  if (!userEmail) {
    return false;
  }
  const userInfo = await UserInfo.findOne({ email: userEmail });
  if (!userInfo) {
    return false;
  }
  return userInfo.admin;
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
