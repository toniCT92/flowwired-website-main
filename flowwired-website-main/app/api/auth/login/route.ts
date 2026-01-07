import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { AUTH_COOKIE, authCookieOptions, signAuthToken } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const body = (await request.json()) as { email?: string; password?: string };

        const email = (body.email ?? "").trim().toLowerCase();
        const password = body.password ?? "";

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
        }

        const token = signAuthToken({
            sub: user.id,
            email: user.email,
            name: user.name,
        });

        const res = NextResponse.json({
            user: { id: user.id, email: user.email, name: user.name },
        });
        res.cookies.set(AUTH_COOKIE, token, authCookieOptions);
        return res;
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}
