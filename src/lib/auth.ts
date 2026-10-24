import type { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as NextAuthOptions["adapter"],
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;

        const email = credentials.email.trim().toLowerCase();

        const user = await prisma.user.findUnique({
          where: { email },
        });

        // User tidak ada, atau user OAuth (tidak punya password)
        if (!user || !user.passwordHash) return null;

        const isValid = await compare(credentials.password, user.passwordHash);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          nim: user.nim,
          role: user.role,
          image: user.image,
          favoriteLanguage: user.favoriteLanguage,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/masuk", error: "/masuk" },
  callbacks: {
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role ?? "USER";
        token.nim = (user as { nim?: string | null }).nim ?? null;
        token.picture = user.image;
        token.favoriteLanguage = (user as { favoriteLanguage?: string | null }).favoriteLanguage ?? null;
      }

      // Sinkronkan status kuis dari DB agar bisa dibaca middleware (edge).
      if (token.id) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.id as string },
          select: {
            role: true,
            name: true,
            email: true,
            nim: true,
            image: true,
            favoriteLanguage: true,
            quizCompletedAt: true,
            createdAt: true,
          },
        });
        if (dbUser) {
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.nim = dbUser.nim;
          token.picture = dbUser.image;
          token.favoriteLanguage = dbUser.favoriteLanguage;
          token.quizCompletedAt = dbUser.quizCompletedAt
            ? dbUser.quizCompletedAt.toISOString()
            : null;
          token.createdAt = dbUser.createdAt
            ? dbUser.createdAt.toISOString()
            : null;
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string;
        (session.user as { role?: string }).role = token.role as string;
        (session.user as { nim?: string | null }).nim = token.nim as string | null;
        (session.user as { image?: string | null }).image = token.picture as string | null;
        (session.user as { favoriteLanguage?: string | null }).favoriteLanguage = token.favoriteLanguage as string | null;
        (session.user as { quizCompletedAt?: string | null }).quizCompletedAt =
          (token.quizCompletedAt as string | null | undefined) ?? null;
        (session.user as { createdAt?: string | null }).createdAt =
          (token.createdAt as string | null | undefined) ?? null;
      }
      return session;
    },
    async signIn({ user, account }) {
      // GitHub OAuth: pastikan user punya role default & tandai provider.
      if (account?.provider === "github" && user.email) {
        const email = user.email.trim().toLowerCase();
        const dbUser = await prisma.user.findUnique({ where: { email } });

        // User lama (dari credentials) yang login via GitHub dengan email
        // sama -> link ke akun yang sama (tidak buat duplikat).
        if (dbUser && dbUser.provider !== "github") {
          await prisma.user.update({
            where: { id: dbUser.id },
            data: { provider: "github", image: user.image ?? dbUser.image },
          });
        }
      }

      return true;
    },
    async redirect({ url, baseUrl }) {
      // Pengaman: di production, jangan pernah pakai origin localhost.
      const isLocal = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(baseUrl);
      const safeBase =
        process.env.NODE_ENV === "production" && isLocal
          ? process.env.NEXTAUTH_URL &&
            !/localhost|127\.0\.0\.1/i.test(process.env.NEXTAUTH_URL)
            ? process.env.NEXTAUTH_URL
            : process.env.VERCEL_PROJECT_PRODUCTION_URL
              ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
              : baseUrl
          : baseUrl;

      if (url.startsWith("/")) return `${safeBase}${url}`;
      try {
        if (new URL(url).origin === safeBase) return url;
      } catch {
        // URL tidak valid -> fallback ke safeBase
      }
      return safeBase;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("[auth/signIn]", {
        provider: account?.provider,
        email: user?.email,
        hasAccount: !!account,
        hasProfile: !!profile,
      });
    },
    async createUser({ user }) {
      // User baru via OAuth: set default role + provider.
      await prisma.user.update({
        where: { id: user.id },
        data: { role: "USER", provider: "github" },
      });
    },
    async linkAccount({ user, account }) {
      console.log("[auth] Account linked:", account.provider, user.email);
    },
    async signOut() {
      console.log("[auth/signOut]");
    },
  },
  logger: {
    error(code, metadata) {
      const message = metadata instanceof Error ? metadata.message : metadata.error.message;
      console.error("[auth][error]", code, message);
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
};
