export default {
    async fetch(request, env, context) {
      if (request.method !== 'POST') {
        return new Response('Method Not Allowed', { status: 405 });
      }
  
      try {
        // Parse incoming JSON from Mongo Atlas
        const mongoPayload = await request.json();
  
        // Retrieve the Discord webhook from the environment
        const webhook = env.DISCORD_WEBHOOK_URL;
        if (!webhook) {
          return new Response('Discord webhook not configured in env', { status: 500 });
        }
  
        // Build a Discord-friendly body; we place the entire payload in 'content'
        const discordBody = {
          content: 'Mongo Atlas event:\n```json\n' + JSON.stringify(mongoPayload, null, 2) + '\n```'
        };
  
        // Forward the request to Discord
        const discordResponse = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(discordBody)
        });
  
        if (!discordResponse.ok) {
          return new Response('Failed to send to Discord', { status: 500 });
        }
  
        return new Response('OK', { status: 200 });
      } catch (err) {
        console.error(err);
        return new Response('Error parsing Mongo payload', { status: 400 });
      }
    }
  }