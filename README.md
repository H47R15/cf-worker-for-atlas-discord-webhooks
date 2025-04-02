```ASCII
 _____ _                 _  __ _                                            
/  __ \ |               | |/ _| |                                           
| /  \/ | ___  _   _  __| | |_| | __ _ _ __ ___                             
| |   | |/ _ \| | | |/ _` |  _| |/ _` | '__/ _ \                            
| \__/\ | (_) | |_| | (_| | | | | (_| | | |  __/                            
 \____/_|\___/ \__,_|\__,_|_| |_|\__,_|_|  \___|                            
                                                                            
                                                                            
 _    _      _     _                 _      _    _            _             
| |  | |    | |   | |               | |    | |  | |          | |            
| |  | | ___| |__ | |__   ___   ___ | | __ | |  | | ___  _ __| | _____ _ __ 
| |/\| |/ _ \ '_ \| '_ \ / _ \ / _ \| |/ / | |/\| |/ _ \| '__| |/ / _ \ '__|
\  /\  /  __/ |_) | | | | (_) | (_) |   <  \  /\  / (_) | |  |   <  __/ |   
 \/  \/ \___|_.__/|_| |_|\___/ \___/|_|\_\  \/  \/ \___/|_|  |_|\_\___|_|   
                                                                            
                                                                            
  ___  _   _             _         ______ _                       _         
 / _ \| | | |           | |        |  _  (_)                     | |        
/ /_\ \ |_| | __ _ ___  | |_ ___   | | | |_ ___  ___ ___  _ __ __| |        
|  _  | __| |/ _` / __| | __/ _ \  | | | | / __|/ __/ _ \| '__/ _` |        
| | | | |_| | (_| \__ \ | || (_) | | |/ /| \__ \ (_| (_) | | | (_| |        
\_| |_/\__|_|\__,_|___/  \__\___/  |___/ |_|___/\___\___/|_|  \__,_|        
                                                                            
```
# Cloudflare Worker for Mongo Atlas webhooks sending to Discord

A Cloudflare Worker that converts Mongo Atlas webhooks into a Discord-friendly format.  
This worker receives incoming webhook payloads from Mongo Atlas, reformats them into a Discord message, and forwards the data to a Discord webhook.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Wrangler Installation](#wrangler-installation)
- [Development](#development)
- [Deployment](#deployment)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Credits](#credits)

## Features

- **Webhook Transformation:** Converts Mongo Atlas webhook payloads to a formatted Discord message.
- **TypeScript & Gulp:** Uses TypeScript for type safety and Gulp to build the project.
- **Cloudflare Worker:** Runs on Cloudflare's serverless platform.
- **Easy Configuration:** Manage settings via environment variables.

## Prerequisites

- [Node.js (>=18)](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/) (or npm if preferred)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/) for Cloudflare Workers deployment

## Installation

1. **Clone the Repository**

   ```bash
   git clone git@github.com:H47R15/cf-worker-for-atlas-discord-webhooks.git
   cd cd-wh-atlas-to-discord
   ```

2. **Install Dependencies**

   Using Yarn:

   ```bash
   yarn install
   ```

## Configuration

### Environment Variables

Create a `.env` file at the root of your project (for local usage) with at least the following variable:

```dotenv
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_webhook_id/your_webhook_token
```

> **Note:** Cloudflare Workers do not automatically use your `.env` file. To securely set the Discord webhook URL in your deployment, use Wrangler’s secret command as described below.

## Wrangler Installation

The Wrangler CLI is required for deploying Cloudflare Workers.

1. **Install Wrangler Globally via Yarn**

   ```bash
   yarn global add @cloudflare/wrangler
   ```

   Alternatively, if you prefer using npm:

   ```bash
   npm install -g @cloudflare/wrangler
   ```

2. **Verify Installation**

   ```bash
   wrangler --version
   ```

3. **Login to Cloudflare**

   ```bash
   wrangler login
   ```

## Development

### Build with Gulp

The project uses Gulp to compile the TypeScript files.

- **To Build:**

  ```bash
  yarn build
  ```

  This command compiles the TypeScript source (from `main.ts`) into JavaScript in the `dist` folder.

### Running Locally

You can test your worker locally using Wrangler:

```bash
yarn start
```

This starts your Worker in a local development environment.

## Deployment

Before deploying, ensure you have set your Discord webhook secret in Cloudflare:

1. **Set the Discord Webhook Secret**

   Using Wrangler, run:
   
   ```bash
   wrangler secret put DISCORD_WEBHOOK_URL
   ```
   
   Follow the prompt to enter your Discord webhook URL (e.g., `https://discord.com/api/webhooks/your_webhook_id/your_webhook_token`).

2. **Deploy Your Worker**

   First, build your project:

   ```bash
   yarn build
   ```

   Then deploy it:

   ```bash
   wrangler deploy
   ```

Your worker will now be deployed to Cloudflare and will use the secret binding for `DISCORD_WEBHOOK_URL`.

## Usage

Once deployed, configure your Mongo Atlas webhook to point to your Cloudflare Worker URL (e.g., `https://<your-worker-subdomain>.workers.dev`).  
The worker will parse the incoming Mongo Atlas payload, convert it to a Discord-friendly message, and forward it to your configured Discord webhook.

To test the worker manually, you can use the following cURL command:

```bash
curl -X POST https://<your-worker-subdomain>.workers.dev \
     -H "Content-Type: application/json" \
     -d '{"test": "data"}'
```

If everything is working, you should get an "OK" response and see your message forwarded to Discord.

## License

This project is licensed under the [MIT License](LICENSE).

## Contributing

Contributions are welcome! Please open issues or pull requests if you have suggestions or improvements.

## Credits

- Developed by H47R15
- Inspired by the need for seamless integration between Mongo Atlas and Discord through Cloudflare Workers

---

*This project is provided "as is", without any warranty or liability.*