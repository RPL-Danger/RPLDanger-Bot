import { config } from "dotenv";
import { Client, Events, GatewayIntentBits } from "discord.js"

config()

/* This like permission or smthng idk */

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] })

client.once(Events.ClientReady, _ => {
    console.log(`Ready! Logged in as ${_.user.tag}`)
})

client.on(Events.MessageCreate, msg => {
    if(msg.author.bot) return
    if(msg.content.toLowerCase() == "ping") return msg.reply("Pong!")
})

client.login(process.env.TOKEN)