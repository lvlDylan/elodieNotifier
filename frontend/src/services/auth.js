import {API_BASE_URL} from "@/utils/config.js";

export async function login(identifier, password) {

    const payload = {identifier: identifier, password: password}

    const res = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(payload)
    });

    if (!res.ok) {
        throw new Error(await res.text());
    } else {
        sessionStorage.setItem("pass", password);
        sessionStorage.setItem("isAuthenticated", "true");
    }
}