import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            name?: string;
            email?: string;
            message?: string;
        };

        const name = body.name?.trim();
        const email = body.email?.trim().toLowerCase();
        const message = body.message?.trim();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await prisma.contactMessage.create({
            data: { name, email, message },
        });

        return NextResponse.json({ ok: true }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}