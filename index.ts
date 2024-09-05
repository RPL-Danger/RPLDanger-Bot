import { config } from "dotenv"
import loadHandlers from "./Handlers"
import { Client, GatewayIntentBits } from "discord.js"

config();

(async () => {
    /* This like permission or smthng idk */
    const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
    
    // load all handlers
    await loadHandlers(client)

    await client.login(process.env.TOKEN)

})().catch(err => {
    console.error(err)
})