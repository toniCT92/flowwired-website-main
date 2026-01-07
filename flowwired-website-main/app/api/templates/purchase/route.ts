import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthFromRequest } from "@/lib/auth";

export async function POST(req: Request) {
    const auth = getAuthFromRequest(req as any);
    if (!auth) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    try {
        const body = (await req.json()) as {
            pack?: string;
        };

        const pack = body.pack?.trim();
        if (!pack) {
            return NextResponse.json(
                { error: "Pack is required" },
                { status: 400 }
            );
        }

        await prisma.templatePurchase.create({
            data: {
                pack,
                userId: auth.sub,
            },
        });

        return NextResponse.json({
            ok: true,
            message: `You purchased pack "${pack}". You'll be contacted in maximum 24–48hrs after the purchase was completed.`,
        });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { error: "Invalid request" },
            { status: 400 }
        );
    }
}
