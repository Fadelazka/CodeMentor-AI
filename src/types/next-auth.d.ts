import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      quizCompletedAt?: string | null;
    } & DefaultSession["user"];
  }

  interface User {
    role: string;
    quizCompletedAt?: Date | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    quizCompletedAt?: string | null;
  }
}