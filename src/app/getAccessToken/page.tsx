"use client";

import { useState } from "react";

import { fetchWithAuth } from "@/utils/fetchWithAuth";

export default function TokenTestPage() {
    const [result, setResult] = useState<string>("");

    //  request with token
    const callWithAuth = async () => {
        try {
            const res = await fetchWithAuth("http://localhost:5000/api/testuser", {
                method: "GET"
            });
            const json = await res.json();
            setResult("request with token success:\n" + JSON.stringify(json, null, 2));
        } catch (err) {
            setResult("request with token failed: " + (err instanceof Error ? err.message : String(err)));
        }
    };

    // request without token(should fail)
    const callWithoutAuth = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/testuser", {
                method: "GET"
            });

            const text = await res.text();
            setResult("request without token response:\n" + `status code: ${res.status}\ncontent: ${text}`);
        } catch (err) {
            setResult("request without token failed: " + (err instanceof Error ? err.message : String(err)));
        }
    };

    return (
        <main style={{ padding: "2rem", fontFamily: "sans-serif" }}>
            <h1>JWT test</h1>
            <div style={{ marginBottom: "1rem" }}>
                <button onClick={callWithAuth} style={{ marginRight: "1rem" }}>
                    request with token
                </button>
                <button onClick={callWithoutAuth}>request without token</button>
            </div>

            <pre style={{ background: "#f3f3f3", padding: "1rem", borderRadius: "6px" }}>
                {result}
            </pre>
        </main>
    );
}

