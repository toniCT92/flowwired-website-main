import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";

export const AUTH_COOKIE = "flowwired_token";

export type AuthPayload = {
    sub: string;
    email: string;
    name?: string | null;
};

function getJwtSecret(): string {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error("JWT_SECRET is missing. Add it to .env");
    }
    return secret;
}

export function signAuthToken(payload: AuthPayload): string {
    return jwt.sign(payload, getJwtSecret(), {
        algorithm: "HS256",
        expiresIn: "7d",
    });
}

export function verifyAuthToken(token: string): AuthPayload {
    return jwt.verify(token, getJwtSecret()) as AuthPayload;
}

export function readAuthTokenFromRequest(req: NextRequest): string | null {
    return req.cookies.get(AUTH_COOKIE)?.value ?? null;
}

export function getAuthFromRequest(req: NextRequest): AuthPayload | null {
    const token = readAuthTokenFromRequest(req);
    if (!token) return null;
    try {
        return verifyAuthToken(token);
    } catch {
        return null;
    }
}

export const authCookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
};
