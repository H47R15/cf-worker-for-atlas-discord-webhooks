"use strict";
/// <reference types="@cloudflare/workers-types" />
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch = fetch;
async function fetch(request, env, context) {
    if (request.method !== "POST") {
        return new Response("Method Not Allowed", { status: 405 });
    }
    try {
        // Parse the incoming Mongo Atlas webhook payload
        const payload = await request.json();
        // Retrieve the Discord webhook URL from bindings
        const webhook = env.DISCORD_WEBHOOK_URL;
        if (!webhook) {
            return new Response("Discord webhook URL not set in environment", {
                status: 500,
            });
        }
        // Build a Discord-friendly message body:
        const discordBody = {
            content: "Mongo Atlas event:\n```json\n" +
                JSON.stringify(payload, null, 2) +
                "\n```",
        };
        // Forward the payload to Discord using globalThis.fetch
        const discordResponse = await globalThis.fetch(webhook, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(discordBody),
        });
        if (!discordResponse.ok) {
            return new Response("Failed to forward to Discord", { status: 500 });
        }
        return new Response("OK", { status: 200 });
    }
    catch (error) {
        return new Response("Error: " + error?.message, { status: 500 });
    }
}
