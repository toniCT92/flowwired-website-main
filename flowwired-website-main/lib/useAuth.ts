"use client";

import { useEffect, useState } from "react";

type User = {
    id: string;
    email: string;
    name?: string | null;
};

export function useAuth() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/auth/me", {
            credentials: "include",
            cache: "no-store",
        })
            .then((r) => r.json())
            .then((data) => setUser(data.user))
            .finally(() => setLoading(false));
    }, []);

    return { user, loading };
}
