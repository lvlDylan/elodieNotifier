import {API_BASE_URL} from "@/utils/config.js";

export default async function http(path, options = {}, retry = true) {
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
    };


    try {
        const res = await fetch(`${API_BASE_URL}${path}`, {
            ...options,
            headers
        });

        if (!res.ok) {
            const errText = await res.text();
            // noinspection ExceptionCaughtLocallyJS
            throw {kind: 'http', status: res.status, body: errText};
        }

        const text = await res.text();
        try {
            return text ? { kind: 'http', status: res.status, body: JSON.parse(text) } : { kind: 'http', status: res.status };
        } catch (err) {
            return text;
        }
    } catch (err) {
        console.error(`[HTTP] Network error:`, err);
        throw err;
    }
}