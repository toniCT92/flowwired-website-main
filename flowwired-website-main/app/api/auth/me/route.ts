import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthFromRequest } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
    const auth = getAuthFromRequest(req);

    const res = NextResponse.json(
        auth
            ? { user: { id: auth.sub, email: auth.email, name: auth.name ?? null } }
            : { user: null }
    );

    res.headers.set(
        "Cache-Control",
        "no-store, no-cache, must-revalidate, proxy-revalidate"
    );
    res.headers.set("Pragma", "no-cache");
    res.headers.set("Expires", "0");

    return res;
}
