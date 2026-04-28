import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createClient } from "@supabase/supabase-js";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email:    { label: "Email",      type: "email"    },
        password: { label: "Contraseña", type: "password" },
      },

      async authorize(credentials) {
        const email    = credentials?.email    as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        /* ── DEMO MODE: sin Supabase configurado ── */
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        if (!supabaseUrl) {
          const adminEmail = process.env.ADMIN_EMAIL ?? "admin@rodos.com";
          const adminPass  = process.env.ADMIN_PASSWORD ?? "rodos2025";
          if (
            email.toLowerCase() === adminEmail.toLowerCase() &&
            password === adminPass
          ) {
            return { id: "admin-local", email: adminEmail, name: "Rodrigo", rol: "admin" };
          }
          return null;
        }

        /* ── Producción: consulta Supabase ── */
        const supabase = createClient(supabaseUrl, process.env.SUPABASE_SERVICE_ROLE_KEY!);
        const { data: user, error } = await supabase
          .from("users")
          .select("id, email, nombre, rol, password_hash, activo")
          .eq("email", email.toLowerCase())
          .single();

        if (error || !user || !user.activo) return null;
        const ok = await bcrypt.compare(password as string, user.password_hash);
        if (!ok) return null;

        return { id: user.id, email: user.email, name: user.nombre, rol: user.rol };
      },
    }),
  ],

  callbacks: {
    jwt({ token, user }) {
      if (user) token.rol = (user as { rol?: string }).rol;
      return token;
    },
    session({ session, token }) {
      (session.user as { rol?: unknown }).rol = token.rol;
      return session;
    },
  },

  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt", maxAge: 60 * 60 * 8 },
});
