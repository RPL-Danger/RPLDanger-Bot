import { config } from "dotenv"
import loadHandlers from "./Handlers"
import { Client, Events, GatewayIntentBits } from "discord.js"

config()

/* This like permission or smthng idk */

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })
loadHandlers(client)
client.login(process.env.TOKEN)