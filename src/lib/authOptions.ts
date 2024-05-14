import { db } from "@/utils/db";
import  { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";


export const authOptions:AuthOptions  = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: {
          label: "Name",
          type: "text",
        },
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        const user = await db.query('SELECT * FROM users WHERE name =$1', [credentials!.name]);

        return user.rows[0] || null;
      }
    })
],
  session: {
    strategy: "jwt",
  },
  secret: `${process.env.NEXTAUTH_SECRET}`
};