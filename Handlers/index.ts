import { Client } from "discord.js"
import { registerCommands } from "./commands"
import { registerEvents } from "./events"
import { loadFeatures } from "./features"

export default async function loadHandler(client: Client){
    await loadFeatures(client)
    await registerCommands(client)
    await registerEvents(client)
    console.log("Handlers loaded.")
}