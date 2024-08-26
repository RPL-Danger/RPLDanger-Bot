import { Events, Client } from "discord.js"
export default {
    name: Events.ClientReady,
    once: true,
    execute: (bot: Client) => {
        console.log(`Bot ${bot.user?.tag} Online!`)
    }
}