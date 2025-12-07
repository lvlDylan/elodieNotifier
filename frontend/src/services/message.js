import {API_BASE_URL} from "@/utils/config.js";

export async function send(title, message) {
    const payload = {title: title, message: message, password: sessionStorage.getItem("pass")};

    const res = await fetch(`${API_BASE_URL}/messages/send`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }
}