import { Events, Client } from "discord.js"
import { loadFeatures } from "../Handlers/features"
export default {
    name: Events.ClientReady,
    once: true,
    execute: async (bot: Client) => {
        await loadFeatures(bot)
        console.log(`Bot ${bot.user?.tag} Online!`)
    }
}