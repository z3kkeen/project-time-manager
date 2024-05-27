import { db } from "@/utils/db";
import { AuthOptions, PagesOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt, {Secret} from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

interface CustomPagesOptions extends PagesOptions {
  signUp?: string;
}

const secretKey: Secret = process.env.NEXTAUTH_SECRET!;

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.name || !credentials?.password) {
          console.log(credentials?.name, credentials?.password);
          
          console.log('Failed to authenticate: Missing credentials');
          return null;
        }
              
        try {
          const userResult = await db.query('SELECT * FROM users WHERE name = $1', [credentials.name]);
          const user = userResult.rows[0];

          
          if (!user) {
            console.log('Failed to authenticate: User not found');
            return null;
          }
          
          console.log('User:', user);
                    
          const isPasswordValid = await bcrypt.compareSync(credentials.password, user.password);
          console.log(user.password);
          console.log(isPasswordValid);
          
              
          if (!isPasswordValid) {
            console.log('Failed to authenticate: Incorrect password');
            return null;
          }

          // generate jwt token
          const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
          console.log('JWT token:', token);

          return {
            ...user,
            token,
          };

        } catch (error) {
          console.error('Error during authentication:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
      signIn: "/login",
      signUp: '/signup'
  } as CustomPagesOptions,

  secret: process.env.NEXTAUTH_SECRET,
};
