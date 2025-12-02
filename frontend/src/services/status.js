import {API_BASE_URL} from "@/utils/config.js";

export async function isOnlineFunc() {
    const res = await fetch(`${API_BASE_URL}/status`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return true;
}