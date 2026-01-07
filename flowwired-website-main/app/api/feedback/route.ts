import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            name?: string;
            email?: string;
            message?: string;
        };

        const name = body.name?.trim() || null;
        const email = body.email?.trim().toLowerCase() || null;
        const message = (body.message ?? "").trim();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: { name, email, message },
            select: { id: true, name: true, email: true, message: true, createdAt: true },
        });

        return NextResponse.json({ feedback }, { status: 201 });
    } catch {
        return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
}

export async function GET() {
    const feedback = await prisma.feedback.findMany({
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, message: true, createdAt: true },
        take: 50,
    });

    const res = NextResponse.json({ feedback });
    res.headers.set("Cache-Control", "no-store");
    return res;
}
