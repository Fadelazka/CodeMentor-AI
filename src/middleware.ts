import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

// Rute yang butuh login. Semua route di bawah grup (app) + halaman kuis onboarding.
// (Grup (app) tidak muncul di URL, jadi daftarnya ditulis eksplisit.)
const PROTECTED_PATHS = [
  "/dashboard",
  "/chat",
  "/riwayat",
  "/admin",
  "/profil",
  "/pengaturan",
  "/pengetahuan",
];

// Halaman yang TIDAK boleh terkena pemaksaan kuis (agar tidak redirect loop).
const PUBLIC_PATHS = [
  "/",
  "/masuk",
  "/daftar",
  "/lupa-password",
  "/reset-password",
];

const ONBOARDING_PATH = "/onboarding/quiz";

function matches(pathname: string, base: string) {
  return pathname === base || pathname.startsWith(`${base}/`);
}

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const token = req.nextauth.token;

    // Halaman publik & halaman kuis: jangan pernah dipaksa redirect kuis.
    if (matches(pathname, ONBOARDING_PATH) || PUBLIC_PATHS.some((p) => matches(pathname, p))) {
      return NextResponse.next();
    }

    // ADMIN dikecualikan dari pemaksaan kuis (supaya tidak terkunci di onboarding).
    if (token?.role === "ADMIN") {
      return NextResponse.next();
    }

    // Sudah login tapi kuis onboarding belum selesai -> tahan di halaman kuis.
    if (token && !token.quizCompletedAt && PROTECTED_PATHS.some((p) => matches(pathname, p))) {
      const url = req.nextUrl.clone();
      url.pathname = ONBOARDING_PATH;
      url.search = "";
      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    pages: { signIn: "/masuk" },
    callbacks: {
      // false => withAuth otomatis redirect ke halaman signIn (/masuk?callbackUrl=...)
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/chat/:path*",
    "/riwayat/:path*",
    "/admin/:path*",
    "/profil/:path*",
    "/pengaturan/:path*",
    "/pengetahuan/:path*",
    "/onboarding/quiz",
  ],
};
