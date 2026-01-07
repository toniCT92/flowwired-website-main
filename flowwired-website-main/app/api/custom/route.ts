import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = (await req.json()) as {
            name?: string;
            email?: string;
            company?: string;
            useCase?: string;
            budget?: string;
        };

        const name = body.name?.trim();
        const email = body.email?.trim().toLowerCase();
        const company = body.company?.trim() || null;
        const useCase = body.useCase?.trim();
        const budget = body.budget?.trim() || null;

        if (!name || !email || !useCase) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        await prisma.customRequest.create({
            data: {
                name,
                email,
                company,
                useCase,
                budget,
            },
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
